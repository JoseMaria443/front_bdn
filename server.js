import { createApp } from './src/app.js';
import { config } from './src/config.js';

createApp().listen(config.port, () => {
  console.log(`Front BDN en http://localhost:${config.port}  ->  API: ${config.apiUrl}`);
});
