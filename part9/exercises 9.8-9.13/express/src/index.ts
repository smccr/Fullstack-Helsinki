import express from 'express';
const app = express();
import diagnoseRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

import cors from 'cors';

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  console.log('ping');
  return res.send("<h1>Hello</h1>");
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});