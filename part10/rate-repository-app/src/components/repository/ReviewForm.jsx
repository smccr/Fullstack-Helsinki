import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../common/FormikTextInput';
import theme from '../theme';
import Text from '../Text';
import useCreateReview from '../../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''

};

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  formField: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    padding: 10
  },
  button: {
    marginTop: 10,
    padding: 20,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    color: 'white'
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required').trim(),
  repositoryName: yup.string().required('Repository name is required').trim(),
  rating: yup.number().required('Rating is required').typeError('Numbers only').integer('Integers only').min(0, 'Rating should be minimum 0').max(100, 'Rating should be maximum 100'),
  text: yup.string().trim()
});


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.formField}
        name="ownerName"
        placeholder="Repository owner name"
        testID="ownerNameField"
      />
      <FormikTextInput
        style={styles.formField}
        name="repositoryName"
        placeholder="Repository name"
        testID="repoNameField"
      />
      <FormikTextInput
        style={styles.formField}
        name="rating"
        placeholder="Rating between 0 and 100"
        testID="ratingField"
      />
      <FormikTextInput
        style={styles.formField}
        name="text"
        placeholder="Review"
        testID="reviewField"
        multiline
      />
      <Pressable onPress={onSubmit} testID="submitButton">
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >

      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    try {
      const data = await createReview(values);
      if (data) {
        history.push(`/${data.createReview.repositoryId}`);
      }
    }
    catch (e) {
      console.log(e);
    }
  };
  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;