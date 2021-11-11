import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from "react-router-dom";

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import theme from '../theme';
import useRepository from '../../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem {...repository} showButton />
      <ItemSeparator />
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id: id,
    first: 5
  });

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;