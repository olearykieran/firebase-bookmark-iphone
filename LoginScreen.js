// LoginScreen.js
import React from 'react';
import {View, Text, Button} from 'react-native';
import {signInWithGoogle} from './AuthService';

const LoginScreen = () => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;
