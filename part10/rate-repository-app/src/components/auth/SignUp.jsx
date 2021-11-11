import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../common/FormikTextInput';
import theme from '../theme';
import Text from '../Text';
import useSignUp from '../../hooks/useSignUp';
import useSignIn from '../../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
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
  username: yup.string().required('Username is required').min(1).max(30, 'Maximum 30 chars'),
  password: yup.string().required('Password is required').min(5, 'Minimum 5 chars').max(50, 'Maximum 50 chars'),
  passwordConfirm: yup.string().required("Password confirm is required").test('match', 'Passwords don\'t match', function (pass) {
    return pass === this.parent.password;
  })
});


const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        style={styles.formField}
        secureTextEntry
        name="passwordConfirm"
        placeholder="Confirm password"
        testID="passwordField2"
      />
      <Pressable onPress={onSubmit} testID="submitButton">
        <Text style={styles.button}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >

      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      
      const data = await signUp({ username, password });

      if (data) {
        const dataSignIn = await signIn({ username, password });
        if(dataSignIn) {
          history.push('/');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;