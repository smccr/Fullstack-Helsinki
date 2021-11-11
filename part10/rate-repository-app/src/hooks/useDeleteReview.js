import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const response = await mutate({
      variables: {
        id
      }
    });

    return response;
  };
  return [deleteReview, result];
};

export default useCreateReview;