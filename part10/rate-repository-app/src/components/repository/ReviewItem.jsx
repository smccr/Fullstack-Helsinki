import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { format } from 'date-fns';
import { useHistory } from "react-router-dom";

import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  rating: {
    marginRight: 10,
    padding: 10,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  ratingText: {
    color: theme.colors.primary
  },
  ratingUsername: {
    fontWeight: 'bold',
    paddingBottom: 2
  },
  ratingDate: {
    paddingBottom: 3
  },
  reviewTextContainer: {
    flexShrink: 1
  },
  reviewText: {
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 20
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    paddingVertical: 20,
    width: 175,
    borderRadius: 5
  },
  buttonBlue: {
    backgroundColor: theme.colors.primary,

  },
  buttonRed: {
    backgroundColor: theme.colors.errorColor,
  },
  textWhite: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

const ReviewItem = ({ review, showButton = false, handleDeleteButton }) => {
  const history = useHistory();
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.reviewTextContainer}>
          <Text style={styles.ratingUsername}>{showButton ? `${review.repository.ownerName}/${review.repository.name}` : review.user.username}</Text>
          <Text style={styles.ratingDate}>{format(new Date(review.createdAt), 'dd-MM-yyyy')}</Text>
          <Text style={styles.reviewText} >{review.text}</Text>
        </View>
      </View>

      {showButton &&
        <View style={styles.buttonContainer}>
          <View style={[styles.button, styles.buttonBlue]}>
            <Pressable onPress={() => history.push(review.repositoryId)}>
              <Text style={styles.textWhite} >View repository</Text>
            </Pressable>
          </View>
          <View style={[styles.button, styles.buttonRed]}>
            <Pressable onPress={() => handleDeleteButton(review.id)}>
              <Text style={styles.textWhite} >Delete review</Text>
            </Pressable>
          </View>
        </View>
      }

    </View>
  );
};

export default ReviewItem;