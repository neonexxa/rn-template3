import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.avatarContainer}>
            <Avatar.Icon size={80} icon="account" />
          </View>
          <Title style={styles.title}>{user?.displayName || 'User'}</Title>
          <Paragraph>Email: {user?.email || 'Not available'}</Paragraph>
          <Paragraph>Last Login: {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'Not available'}</Paragraph>
          <Button mode="contained" onPress={() => auth().signOut()} style={styles.button}>
            Logout
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default ProfileScreen;
