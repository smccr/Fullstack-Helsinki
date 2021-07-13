import express from 'express';
const app = express();
import diagnoseRouter from './routes/diagnoses';

import cors from 'cors';

const options : cors.CorsOptions = {
  allowedHeaders: ['Access-Control-Allow-Origin']
};

app.use(cors(options));
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);

app.get('/api/ping', (_req, res) => {
  console.log('ping');
  return res.send("<h1>Hello</h1>");
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});