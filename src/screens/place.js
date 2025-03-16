import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, List } from 'react-native-paper';
import database from '@react-native-firebase/database';

export default () => {
  const [places, setPlaces] = useState([]);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceLat, setNewPlaceLat] = useState(null);
  const [newPlaceLon, setNewPlaceLon] = useState(null);
  useEffect(() => {
    const onValueChange = database()
      .ref(`/locations`)
      .on('value', snapshot => {
        // console.log('User data: ', Object.values(snapshot.val()));
        if(snapshot.exists()) setPlaces(Object.values(snapshot.val()));
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/locations`).off('value', onValueChange);
  }, []);

  const handleAddPlace = async () => {
    const newRef = database().ref('/locations').push(); // Create a new unique reference
    const newItem = { 
    name: newPlaceName, 
    latitude: newPlaceLat, 
    longitude: newPlaceLon 
    };

    console.log("Adding New Place2...");
    newRef.set(newItem)
    .then(() => {
        console.log('Data added successfully.');
        console.log("Adding New Place3...");
        setPlaces([newItem, ...places]);
        setNewPlaceName('');
        setNewPlaceLat(null);
        setNewPlaceLon(null);
    })
    .catch(error => {
        console.error("Error adding place:", error);
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.inputRow}>
            <TextInput
              label="Latitude"
              value={newPlaceLat}
              onChangeText={v => setNewPlaceLat(Number(v))}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Lognitude"
              value={newPlaceLon}
              onChangeText={v => setNewPlaceLon(Number(v))}
              mode="outlined"
              style={styles.input}
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              label="Marker Name"
              value={newPlaceName}
              onChangeText={setNewPlaceName}
              mode="outlined"
              style={styles.input}
            />
            <Button mode="contained" onPress={handleAddPlace} style={styles.button}>
              Add
            </Button>
          </View>
          <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item, idx }) => (
              <List.Item key={idx} title={item.name} left={() => <List.Icon icon="map-marker" />} />
            )}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    height: 50,
  },
});
