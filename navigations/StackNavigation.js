import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from '../screens/auths/LoginScreen';
import RegisterScreen from '../screens/auths/RegisterScreen';
import ForgotPasswordScreen from '../screens/auths/ForgotPasswordScreen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const { loading, error, user } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && <Stack.Screen name="Login" component={LoginScreen} />}
        {!user && <Stack.Screen name="Register" component={RegisterScreen} />}
        {!user && <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />}
        <Stack.Screen name="Tab" component={TabNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;