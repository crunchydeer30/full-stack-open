interface excerciseData {
  target: number;
  exceriseHours: number[];
}

interface exerciseReport {
  perdiodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArguments = (args: string[]): excerciseData => {
  if (args.length < 4) throw new Error('Too few arguments');
  if (!isNaN(Number(args[0])))
    throw new Error('Target hours value must be a number!');
  if (args.slice(3).some((n) => isNaN(Number(n))))
    throw new Error('All training hours values must be numbers!');

  return {
    target: Number(args[2]),
    exceriseHours: args.slice(3).map((n) => Number(n)),
  };
};

export const calculateExercises = (
  targetHours: number,
  excerciseHours: number[]
): exerciseReport => {
  if (!excerciseHours.length) throw new Error('No data provided!');

  const average =
    excerciseHours.reduce((a, b) => a + b, 0) / excerciseHours.length;

  const rating =
    targetHours / average > 1 ? 1 : targetHours / average < 1 ? 3 : 0;

  return {
    perdiodLength: excerciseHours.length,
    trainingDays: excerciseHours.filter((day) => day > 0).length,
    success: targetHours <= average,
    rating,
    ratingDescription:
      rating === 1 ? 'Bad' : rating === 3 ? 'Great' : 'Average',
    target: targetHours,
    average,
  };
};

// try {
//   const { target, exceriseHours } = parseArguments(process.argv);
//   console.log(calculateExercises(target, exceriseHours));
// } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.log(error.message);
//   }
// }