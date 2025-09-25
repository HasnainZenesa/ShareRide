import jwt from 'jsonwebtoken';
import { config } from '../config.js';
export function signToken(p){ return jwt.sign(p, config.jwtSecret, { expiresIn:'30d' }); }
export function authMiddleware(req,res,next){
  const h=req.headers.authorization||''; const t=h.startsWith('Bearer ')?h.slice(7):null;
  if(!t) return res.status(401).json({error:'Unauthorized'});
  try{ req.user=jwt.verify(t, config.jwtSecret); next(); }catch{ res.status(401).json({error:'Invalid token'}); }
}
