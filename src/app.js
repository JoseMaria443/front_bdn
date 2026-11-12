import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import apiRouter from './routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  app.use('/api', apiRouter);
  app.use(express.static(path.join(__dirname, '..', 'public'), { extensions: ['html'] }));

  // La raíz lleva al login
  app.get('/', (_req, res) => res.redirect('/login'));
  return app;
}
