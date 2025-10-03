import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

console.log('PORT environment variable:', process.env.PORT);
console.log('Using port:', port);

// Serve static files
app.use(express.static(join(__dirname, 'dist')));

// Fallback for SPA routing
app.use((req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
