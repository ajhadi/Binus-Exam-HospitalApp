import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import hospitalImages from '../constants/hospitalImages'; // Import the image mapping

export default function HospitalListScreen({ navigation }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dekontaminasi.com/api/id/covid19/hospitals')
      .then(response => {
        setHospitals(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item }) => {
    const hospitalImage = hospitalImages[item.name];

    return (
      <View style={styles.card}>
        <Image source={hospitalImage || require('../assets/images/default.jpg')} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Map', { province: item.province })}>
            <Text style={styles.mapLink}>{item.province}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={hospitals}
      keyExtractor={(item) => item.name.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 11,
    color: '#666',
  },
  mapLink: {
    color: '#0288D1',
    fontSize: 16,
    marginTop: 3,
  },
});
