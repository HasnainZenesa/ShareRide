import 'dotenv/config';
export const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DATABASE_URL,
  otpExpMin: parseInt(process.env.OTP_EXP_MIN || '10', 10),
};
