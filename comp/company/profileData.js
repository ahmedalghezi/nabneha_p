import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

export default function ProfileData({route}) {
  const {code} = route.params; // Get the 'code' parameter from the route

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://inprove-sport.info/jizdan/products/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error(error);
      });
  }, [code]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.content}>
        {data.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Name</Text>
              <Text style={styles.cell}>{data[0].name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Address</Text>
              <Text style={styles.cell}>{data[0].address}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Phone</Text>
              <Text style={styles.cell}>{data[0].phone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Email</Text>
              <Text style={styles.cell}>{data[0].email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Identity Number</Text>
              <Text style={styles.cell}>{data[0].identity_number}</Text>
            </View>
          </View>
        ) : (
          <Text>No results found</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333',
    color: '#fff',
    fontWeight: 'bold',
  },
  cell: {
    flex: 3,
    padding: 10,
  },
});
