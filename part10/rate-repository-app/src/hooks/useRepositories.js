import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {

  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const fetch = ({ orderBy, orderDirection, searchKeyword }) => {
    refetch({
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword
    });
  };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories: data?.repositories, loading, error, fetch, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;