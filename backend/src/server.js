import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_,res)=>res.json({ok:true}));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

initDb().then(()=>{
  app.listen(config.port, ()=> console.log('API http://localhost:'+config.port));
}).catch(err=>{ console.error('DB init failed', err); process.exit(1); });
