import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import database from '@react-native-firebase/database';

export default () => {
    const navigation = useNavigation();
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        const onValueChange = database()
          .ref(`/locations`)
          .on('value', snapshot => {
            // console.log('User data: ', Object.values(snapshot.val()));
            if(snapshot.exists()) setMarkers(Object.values(snapshot.val()));
          });
    
        // Stop listening for updates when no longer required
        return () => database().ref(`/locations`).off('value', onValueChange);
      }, []);
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                onMapReady={() => console.log("Map is ready!")}
                initialRegion={{
                    latitude: 3.006197,
                    longitude: 101.702423,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {markers.length && markers.map((marker, index) => (
                    <Marker
                    key={index}
                    coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                    title={marker.name}
                    description={marker.name}
                    />
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    //   height: 400,
    //   width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
