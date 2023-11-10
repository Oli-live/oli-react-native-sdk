import * as React from 'react';

import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OliSdk } from 'oli-react-native-sdk';

export default function App() {
  const [clicks, setClicks] = useState(0);
  return (
    <View style={styles.container}>
      <Text>#FicaMarcelinha</Text>
      <Text onPress={() => setClicks(clicks + 1)}>Cliques: {clicks}</Text>
      <OliSdk id="7ad8804c-b249-444a-b71e-1d53f9087b4e" />
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
});
