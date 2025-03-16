import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput, Button, Card, Title } from 'react-native-paper';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Success", "Logged in successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Success", "Account created successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
  <View style={styles.container}>
  <Card style={styles.card}>
    <Card.Content>
      <Title style={styles.title}>Login</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button variant="contained" color="primary" onClick={handleSignUp} style={styles.button}>
        SignUp
      </Button>
    </Card.Content>
  </Card>
</View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    card: {
      width: '90%',
      padding: 20,
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      marginBottom: 15,
    },
    button: {
      marginTop: 10,
    },
  });