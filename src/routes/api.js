import { Router } from 'express';
import { forward } from '../services/api.js';

const router = Router();

// Todo lo que el navegador pida a /api/* se reenvía a la API (sin CORS).
router.use(async (req, res) => {
  try {
    const hasBody = !['GET', 'HEAD'].includes(req.method);
    const { status, body } = await forward(req.method, req.url, {
      body: hasBody ? req.body : undefined,
      authorization: req.get('authorization'),
    });
    res.status(status).json(body);
  } catch (err) {
    console.error('Error contactando la API:', err.message);
    res.status(502).json({ error: 'No se pudo conectar con el servidor.' });
  }
});

export default router;
