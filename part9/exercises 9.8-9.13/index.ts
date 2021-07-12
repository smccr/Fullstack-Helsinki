import express from 'express';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  return res.send("<h1>Hello</h1>");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});