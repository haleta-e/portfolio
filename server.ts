import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import { initDatabase } from './backend/src/database/db';
import { apiRouter } from './backend/src/routes/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB schema & seeds
initDatabase();

const app = express();

// Trust reverse proxy (Cloud Run, Render, Railway, Nginx)
app.set('trust proxy', 1);

// Security headers (configure helmet to allow inline script & images for dev)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'portfolio-super-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax',
    },
  })
);

// Static media and storage routes
app.use('/storage/uploads', express.static(path.join(__dirname, 'backend', 'storage', 'uploads')));
app.use('/image', express.static(path.join(__dirname, 'image')));

// Mount API router
app.use('/api', apiRouter);

// Health check endpoint for Render/Cloud Run
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Start server function
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = Number(process.env.PORT) || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Full-Stack Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
