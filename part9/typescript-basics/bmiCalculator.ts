const calculateBmi = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0) {
    throw new Error('Height and weight values must be greater than 0!');
  }

  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16 && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17 && bmi <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return 'Obese (Class I)';
  } else if (bmi >= 35 && bmi <= 39.9) {
    return 'Obese (Class II)';
  } else if (bmi >= 40) {
    return 'Obese (Class III)';
  }
};

try {
  console.log(calculateBmi(180, 0));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
