import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';

const HomeScreen = () => {
  const [productId, setProductId] = useState('');

  const handleSearch = async () => {
    const response = await fetch('http://192.168.112.186:1337/api/packets', {
      method: 'GET',
    });

    const data = await response.json();
    const products = data.data;
    const product =await products.find(p => p.attributes.productId === productId);
    console.log(product)
    if (product) {
      Alert.alert(
        'Product Information',
        `Product ID: ${product.attributes.productId}\nProduct: ${product.attributes.product}\nAddress: ${product.attributes.address}\nStatus: ${product.attributes.status}`
      );
    } else {
      Alert.alert('No product found with this ID');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: 'https://example.com/logo.png' }} style={styles.logo} />
      <Text style={styles.title}>Welcome to Our Shipping Company</Text>
      <Text style={styles.paragraph}>
        Enter Product ID
      </Text>
      <TextInput
        label="Product ID"
        value={productId}
        onChangeText={text => setProductId(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSearch} style={styles.button}>
        Search
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#BB86FC',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    marginTop: 10,
  },
});

export default HomeScreen;
