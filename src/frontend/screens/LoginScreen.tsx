import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC<{ navigate: (screen: string) => void }> = ({ navigate }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current; // Valor inicial de la opacidad (1 = totalmente visible)

  useEffect(() => {
    // Configura la animación para que la imagen parpadee
    const startBlinking = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0, // Opacidad baja a 0 (invisible)
            duration: 700, // Duración de la animación
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1, // Opacidad sube a 1 (visible)
            duration: 700, // Duración de la animación
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startBlinking();
  }, [fadeAnim]);

  const handleLogin = async () => {
    if (identifier === '' || password === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
    } else {
      try {
        const response = await fetch('http://192.168.0.115:3000/api/clientes/iniciarSesionClientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier, // Puede ser correo electrónico o nombre de usuario
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Almacena el estado de inicio de sesión
          await AsyncStorage.setItem('userSession', JSON.stringify(data.user));
          Alert.alert('Login exitoso', `Bienvenido de nuevo, ${data.user.Nombre}!`);
          navigate('Games');
        } else {
          Alert.alert('Error', data.message || 'Error al iniciar sesión.');
        }
      } catch (error) {
        Alert.alert('Error', 'Error de red. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#ff0000', '#433c3c']} // Ajusta los colores del gradiente según tu preferencia
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Animated.Image
          source={require('../../../assets/img/log2.png')} // Asegúrate de que la ruta sea correcta
          style={[styles.logo, { opacity: fadeAnim }]} // Aplica la animación al estilo de la imagen
        />
        <Text style={styles.titulo}>Inicio de Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico o Usuario"
          placeholderTextColor="#999"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
       
       
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150, // Ajusta el tamaño según tus necesidades
    height: 150, // Ajusta el tamaño según tus necesidades
    marginBottom: 24,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'Redressed-Regular',
    color: 'white',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default LoginScreen;
