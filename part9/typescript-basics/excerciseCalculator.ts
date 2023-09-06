interface exerciseReport {
  perdiodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  excerciseHours: number[],
  targetHours: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
