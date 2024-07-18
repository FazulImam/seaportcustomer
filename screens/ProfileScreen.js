import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
  const { loading, error, user } = useSelector((state) => state.auth);
  console.log(user)
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/R.85a97099af7bf3ab323f57378cd57a64?rik=orHm44N7yNKHgw&pid=ImgRaw&r=0' }}
            style={styles.image}
          />
          <Text style={styles.name}>{user.user.username}</Text>
          <Text style={styles.info}> {user.user.email} </Text>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Back to Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    elevation: 5,
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#BB86FC',
  },
  name: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#BB86FC',
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    width: '60%',
    borderRadius: 20,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default ProfileScreen;
