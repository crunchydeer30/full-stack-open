import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './excerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight)
    return res.status(400).json({ error: 'malformatted parameters' });

  try {
    const bmi = calculateBmi(+height, +weight);
    return res.status(200).json({
      height,
      weight,
      bmi,
    });
  } catch (error: unknown) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

app.post('/excercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExcercises, target } = req.body;

  if (!dailyExcercises || !target)
    return res.status(400).json({ error: 'parameters missing' });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  if(isNaN(Number(target)) || dailyExcercises.some((n: any) => isNaN(Number(n)))) {
    return res.status(400).json({error: 'maloformatted parameters'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exerciseReport = calculateExercises(target, dailyExcercises);

  return res.json(exerciseReport);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
