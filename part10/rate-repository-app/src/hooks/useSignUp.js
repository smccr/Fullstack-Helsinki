import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    return data;
  };

  return [signUp, result];
};

export default useSignUp;