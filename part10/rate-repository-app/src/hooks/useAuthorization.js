import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorization = (variables) => {

  const { data, error, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  return { data: data?.authorizedUser, loading, error, refetch };
};

export default useAuthorization;