import { preview } from 'vite';

const port = process.env.PORT || 5173;

const server = await preview({
  preview: {
    port: port,
    host: '0.0.0.0',
  },
});

server.printUrls();
