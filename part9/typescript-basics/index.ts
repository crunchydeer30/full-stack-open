import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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
    return res.status(400).json({error: errorMessage});
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
