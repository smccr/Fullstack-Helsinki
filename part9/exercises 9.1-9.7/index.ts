import { calculateBmi } from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(!(height && weight)){
      throw new Error('malformatted parameters');
    }
    
    const response = {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    };

    return res.status(200).json(response);
  } catch (error) {
    if(error instanceof Error) {
      return res.status(400).json(error.message);
    } else {
      throw error;
    }
  }
});

app.post('/calculator', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body : any = req.body;

    interface bodyValues {
      daily_exercises: number[];
      target: number;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } : bodyValues = body;
    if(!daily_exercises || !target) {
      throw new Error('Missing parameters');
    }

    const numbersParams = daily_exercises.every((value : number) => !isNaN(value));
    if(!numbersParams) {
      throw new Error('Malformatted parameters');
    }
    const response = exerciseCalculator(daily_exercises, target);
    
    return res.json(response);
  } catch (error) {
    if(error instanceof Error) {
      return res.status(400).json({error: error.message});
    } else {
      throw error;
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});