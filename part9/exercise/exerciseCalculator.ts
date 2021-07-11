interface resultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: Array<number>, target: number): resultValues => {
  let zeroDays = 0;
  const reducer = (accumulator: number, currentValue: number): number => {
    if (currentValue === 0) {
      zeroDays++;
    }
    return accumulator + currentValue;
  };
  const average = exerciseHours.reduce(reducer) / exerciseHours.length;
  const success = average >= target ? true : false;

  interface ratingValues {
    rating: number;
    ratingDescription: String;
  }

  const rating = (): ratingValues => {
    if (average < (target / 2)) {
      return { rating: 1, ratingDescription: "Too bad, try better next time" }
    } else if (average <= (target * 0.75)) {
      return { rating: 2, ratingDescription: "Not too bad but could be better" }
    } else {
      return { rating: 3, ratingDescription: "Well done!" }
    }
  }

  const ratingResult = rating();

  const result = {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.length - zeroDays,
    success: success,
    rating: ratingResult.rating,
    ratingDescription: ratingResult.ratingDescription,
    target: target,
    average: average
  };

  return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));