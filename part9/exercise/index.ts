import { calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();


app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.get('/bmi', (req, res) => {
  try {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if(!(height && weight)){
      return res.status(400).json({error: "malformatted parameters" })
    }
    
    const response = {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message)
  }



})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});