import pg from "pg";
import { config } from "./config.js";

export const pool = new pg.Pool({ connectionString: config.dbUrl });

export async function initDb() {
  await pool.query("CREATE EXTENSION IF NOT EXISTS postgis;");
  await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      phone TEXT UNIQUE NOT NULL,
      name TEXT,
      gender TEXT CHECK (gender IN ('male','female','undisclosed')),
      avatar_url TEXT,
      rider_status TEXT DEFAULT 'none',
      rating NUMERIC DEFAULT 5.0,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS otp_codes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      phone TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used BOOLEAN DEFAULT FALSE
    );
    CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_codes(phone);
  `);
}
