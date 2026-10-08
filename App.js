// @ts-check
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function App() {
  return <SafeAreaView style={styles.page}><Text style={styles.text}>Friendly Paw: Intern Day — it works.</Text></SafeAreaView>;
}
const styles = StyleSheet.create({ page: { flex: 1, justifyContent: 'center', alignItems: 'center' }, text: { fontSize: 18 } });
