import React from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';

import ReviewItem from './ReviewItem';
import theme from '../theme';
import useAuthorization from '../../hooks/useAuthorization';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, refetch } = useAuthorization({
    includeReviews: true
  });

  const [deleteReview] = useDeleteReview();

  const reviewNodes = data
    ? data.reviews.edges.map(edge => edge.node)
    : [];

  const handleDeleteButton = (reviewID) => {
    Alert.alert("Delete review", "Are you sure you want to delete this review?", [
      {
        text: "Cancel",
        onPress: () => console.log("CANCEL"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          await deleteReview(reviewID);
          refetch();
        }
      }
    ]);
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          showButton
          handleDeleteButton={handleDeleteButton}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;