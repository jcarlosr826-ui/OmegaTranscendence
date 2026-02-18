// frontend/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [status, setStatus] = useState('');
  const [hello, setHello] = useState('');

 // frontend/App.js
const backendURL = "https://YOUR_CLOUD_URL_HERE/api";

  // Fetch backend status
  const fetchStatus = async () => {
    try {
      const res = await fetch(`${backendURL}/status`);
      const data = await res.json();
      setStatus(data.status);
    } catch (err) {
      setStatus('Backend unreachable');
    }
  };

  // Fetch hello message
  const fetchHello = async () => {
    try {
      const res = await fetch(`${backendURL}/hello`);
      const data = await res.json();
      setHello(data.message);
    } catch (err) {
      setHello('Error reaching backend');
    }
  };

  // On load, fetch both
  useEffect(() => {
    fetchStatus();
    fetchHello();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Omega Frontend</Text>
      <Text>Status: {status}</Text>
      <Text>Hello: {hello}</Text>
      <Button title="Refresh Status" onPress={fetchStatus} />
      <Button title="Refresh Hello" onPress={fetchHello} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 }
});
