// screens/LoginScreen.js
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { loginRequest, loginFailure,loginSuccess } from '../../redux/actions';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button, Dialog, Portal, Paragraph } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false); // State to control the visibility of the dialog
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    dispatch(loginRequest());
    try {

      const response = await fetch('http://192.168.112.186:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data));
      } else {
        dispatch(loginFailure(data.message));
        setErrorMessage("The Account doesn't exist");
        setVisible(true);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleUser = async () => {
    const response = await fetch('http://192.168.112.186:1337/api/riders', {
      method: 'GET'
    });
    const data = await response.json();

    const emails = data.data;

    for (let i = 0; i < emails.length; i++) {

      if(emails[i].attributes.email !== user.user.email) {
        navigation.navigate('Tab');
      }
    }
    
    dispatch(loginFailure("Account doesn't exist"));
    setErrorMessage("Account doesn't exist");
    setVisible(true);

  }

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    if (user) { 
      handleUser()
    }
  }, [user]);
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://example.com/logo.png' }} style={styles.logo} />
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        label="Email"
        value={credentials.identifier}
        onChangeText={(text) => setCredentials({ ...credentials, identifier: text })}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <Button mode="contained" onPress={() => handleLogin()} style={styles.button}>
        Login
      </Button>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{errorMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '100%',
    padding: 10,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  link: {
    color: '#BB86FC',
  },
});

export default LoginScreen;
