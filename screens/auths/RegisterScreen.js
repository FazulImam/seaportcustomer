import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, registerFailure } from '../../redux/registerActions';
import { loginSuccess } from '../../redux/actions';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Dialog, Portal, Paragraph } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false); // State to control the visibility of the dialog
  const [errorMessage, setErrorMessage] = useState(''); // State to store the error message
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleRegister = async () => {
    if (confirmPassword !== password) {
      setErrorMessage("Passwords do not match");
      setVisible(true);
      return;
    }
    
    dispatch(registerRequest());

    try {
      const response = await fetch('http://192.168.122.186:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username : name, email, password }),
      });

      const data = await response.json();
    
      if (response.ok) {
        dispatch(loginSuccess(data));
      } else {
        dispatch(registerFailure(data.message));
        setErrorMessage("The Email already exists");
        setVisible(true);
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
      setErrorMessage(error.message);
      setVisible(true);
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate('Tab');
    }
  }, [user]);

  const handleName = (text) => {
    setName(text);
  };

  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={handleName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
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
  title: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 10,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  link: {
    color: '#BB86FC',
  },
});

export default RegisterScreen;
