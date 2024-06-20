import React from 'react';
import { View, Button, Alert, StyleSheet, Linking } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  const requestStoragePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        Alert.alert('Permissão concedida!');
      } else if (result === RESULTS.DENIED) {
        Alert.alert('Permissão negada.');
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permissão bloqueada. Vá para as configurações do dispositivo para permitir.',
          '',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Abrir Configurações', onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Erro ao solicitar permissão', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Solicitar Permissão de Armazenamento"
        onPress={requestStoragePermission}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
