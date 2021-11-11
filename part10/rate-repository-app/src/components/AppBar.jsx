import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import useAuthorization from '../hooks/useAuthorization';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 10,
    paddingBottom: 10
  }
});

const AppBar = () => { 
  const { data: user } = useAuthorization();

  const authStorage = useAuthStorage();

  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          {user && 
          <Link to="/createReview">
            <Text style={styles.text}>Create a review</Text>
          </Link>
          }
        </Pressable>
        <Pressable>
          {user && 
          <Link to="/myReviews">
            <Text style={styles.text}>My reviews</Text>
          </Link>
          }
        </Pressable>
        <Pressable>
          {!user ?
            <Link to="/signin">
              <Text style={styles.text}>Sign in</Text>
            </Link>
            :
            <Link onPress={() => signOut()}>
              <Text style={styles.text}>Sign out</Text>
            </Link>
          }
        </Pressable>
        <Pressable>
          {!user &&
          <Link to="/signup">
            <Text style={styles.text}>Sign up</Text>
          </Link>}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;