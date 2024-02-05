/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OliSdk } from 'oli-react-native-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [clicks, setClicks] = useState(0);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('my-key', value);
      await AsyncStorage.setItem('oli-key', value);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    storeData('test-oli-sdk-huehue');
  }, []);

  return (
    <View style={styles.container}>
      <Text>#FicaMarcelinha</Text>
      <Text onPress={() => setClicks(clicks + 1)}>Cliques: {clicks}</Text>
      <View style={styles.navbar}>
        <Text style={{ color: '#FFFFFF', marginLeft: 16 }}>Home</Text>
        <Text style={{ color: '#FFFFFF', marginLeft: 16 }}>Perfil</Text>
        <Text style={{ color: '#FFFFFF', marginLeft: 16 }}>Produtos</Text>
      </View>
      <OliSdk id="5ee469e0-b545-46c3-92b5-452a50bc9b79" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  navbar: {
    display: 'flex',
    gap: 16,
    fontSize: '18px',
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    marginBottom: 32,
    backgroundColor: '#396FF2',
    zIndex: 99,
    position: 'absolute',
    bottom: 0,
  },
});
