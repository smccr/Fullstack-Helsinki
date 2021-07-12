interface resultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): resultValues => {
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
    ratingDescription: string;
  }

  const rating = (): ratingValues => {
    if (average < (target / 2)) {
      return { rating: 1, ratingDescription: "Too bad, try better next time" };
    } else if (average <= (target * 0.75)) {
      return { rating: 2, ratingDescription: "Not too bad but could be better" };
    } else {
      return { rating: 3, ratingDescription: "Well done!" };
    }
  };

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
};

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  const parsedArray: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    parsedArray.push(Number(args[i]));
  }
  return parsedArray;
};

try {
  const values: number[] = parseArguments(process.argv);
  console.log(calculateExercises(values.slice(1), values[0]));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  }
}