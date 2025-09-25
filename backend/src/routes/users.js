import { Router } from "express";
import { pool } from "../db.js";
import { authMiddleware } from "../utils/auth.js";

const router = Router();
router.use(authMiddleware);

const DEFAULTS = {
  male: "https://i.pravatar.cc/150?img=12",
  female: "https://i.pravatar.cc/150?img=47",
  undisclosed: "https://i.pravatar.cc/150?u=neutral",
};

router.post("/", async (req, res) => {
  const uid = req.user.id;
  const { name, gender, avatarUrl } = req.body || {};

  if (gender && !["male", "female", "undisclosed"].includes(gender)) {
    return res.status(400).json({ error: "invalid gender" });
  }

  const finalAvatar = avatarUrl || (gender ? DEFAULTS[gender] : null);

  const q = await pool.query(
    `UPDATE users SET
       name = COALESCE($1, name),
       gender = COALESCE($2, gender),
       avatar_url = COALESCE($3, CASE WHEN avatar_url IS NULL AND $2 IS NOT NULL THEN $4 ELSE avatar_url END)
     WHERE id=$5
     RETURNING id, phone, name, gender, avatar_url, rider_status, rating, created_at`,
    [name || null, gender || null, avatarUrl || null, finalAvatar || null, uid]
  );

  res.json({ user: q.rows[0] });
});

export default router;
