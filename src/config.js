export const config = {
  port: Number(process.env.PORT) || 4000,
  apiUrl: (process.env.API_URL || 'http://127.0.0.1:3000').replace(/\/$/, ''),
};
