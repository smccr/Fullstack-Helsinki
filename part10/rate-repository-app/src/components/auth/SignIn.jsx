import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../common/FormikTextInput';
import theme from '../theme';
import Text from '../Text';
import useSignIn from '../../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
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
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.formField}
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        style={styles.formField}
        secureTextEntry
        name="password"
        placeholder="Password"
        testID="passwordField"
      />
      <Pressable onPress={onSubmit} testID="submitButton">
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {

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

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });

      if (data) {
        history.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;