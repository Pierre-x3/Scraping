import { createServer, Server } from 'http';

import app from './app';

const PORT: number | string = process.env.PORT || 4000;

const server: Server = createServer(app);

try {
  server.listen(PORT, (): void => {
    console.info(`Se conectó al puerto ${PORT}`);
  })  
} catch (error) {
  console.error(`Falló conexión al puerto ${PORT}`);
}

