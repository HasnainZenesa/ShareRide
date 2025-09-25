import { Router } from "express";
import { pool } from "../db.js";
import { config } from "../config.js";
import { signToken } from "../utils/auth.js";
import { sendEmailOTP, sendSmsOTP } from "../utils/notify.js";
import { verifyGoogleIdToken } from "../utils/google.js";

const router = Router();

// Generate OTP (phone OR email)
router.post("/otp", async (req, res) => {
  try {
    const { phone, email, channel } = req.body || {};
    const useEmail = !!email || channel === "email";
    const useSms = !!phone || channel === "sms";

    if (!useEmail && !useSms) {
      return res.status(400).json({ error: "Provide phone (SMS) or email (Email OTP)" });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + config.otpExpMin * 60 * 1000);

    // store identity always in otp_codes.phone column (even if it's actually email)
    const identity = useSms ? phone : email;

    await pool.query(
      "INSERT INTO otp_codes (phone, code, expires_at, channel) VALUES ($1,$2,$3,$4)",
      [identity, code, expiresAt, useEmail ? "email" : "sms"]
    );

    // notify (do NOT fail request if SMS/Email provider not configured)
    try {
      if (useEmail) await sendEmailOTP(email, code);
      else await sendSmsOTP(phone, code);
    } catch (nerr) {
      console.warn("[notify warning]", nerr?.message || nerr);
    }

    return res.json({ ok: true, message: `OTP sent via ${useEmail ? "email" : "sms"}` });
  } catch (e) {
    console.error("[/auth/otp]", e);
    return res.status(500).json({ error: "server error" });
  }
});

// Verify OTP -> upsert user -> JWT
router.post("/verify", async (req, res) => {
  try {
    const { phone, email, otp } = req.body || {};
    const identity = email || phone;
    if (!identity || !otp) return res.status(400).json({ error: "identity & otp required" });

    const q = await pool.query(
      `SELECT * FROM otp_codes
       WHERE (phone=$1) AND code=$2 AND used=false AND expires_at>now()
       ORDER BY expires_at DESC LIMIT 1`,
      [identity, otp]
    );
    if (q.rowCount === 0) return res.status(400).json({ error: "invalid/expired otp" });

    await pool.query("UPDATE otp_codes SET used=true WHERE id=$1", [q.rows[0].id]);

    let user;
    if (email) {
      const up = await pool.query(
        `INSERT INTO users (email, phone) VALUES ($1, NULL)
         ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email
         RETURNING id, phone, email, name, gender, avatar_url, rider_status, rating, created_at`,
        [email]
      );
      user = up.rows[0];
    } else {
      const up = await pool.query(
        `INSERT INTO users (phone) VALUES ($1)
         ON CONFLICT (phone) DO UPDATE SET phone=EXCLUDED.phone
         RETURNING id, phone, email, name, gender, avatar_url, rider_status, rating, created_at`,
        [phone]
      );
      user = up.rows[0];
    }

    const token = signToken({ id: user.id, phone: user.phone, email: user.email });
    return res.json({ token, user });
  } catch (e) {
    console.error("[/auth/verify]", e);
    return res.status(500).json({ error: "server error" });
  }
});

// Google Sign-In (idToken from client)
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken) return res.status(400).json({ error: "idToken required" });
    const payload = await verifyGoogleIdToken(idToken);
    const { email, name, picture } = payload || {};
    if (!email) return res.status(400).json({ error: "no email in token" });

    const up = await pool.query(
      `INSERT INTO users (email, name, avatar_url)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET name=COALESCE(EXCLUDED.name, users.name),
                                      avatar_url=COALESCE(EXCLUDED.avatar_url, users.avatar_url)
       RETURNING id, phone, email, name, gender, avatar_url, rider_status, rating, created_at`,
      [email, name || null, picture || null]
    );

    const user = up.rows[0];
    const token = signToken({ id: user.id, email: user.email });
    return res.json({ token, user });
  } catch (e) {
    console.error("[/auth/google]", e);
    return res.status(400).json({ error: "google token invalid" });
  }
});

export default router;
