import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



const HomeScreen: React.FC<{ navigate: (screen: string) => void }> = ({ navigate }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Valor inicial de opacidad: 1 (visible)

  useEffect(() => {
    // Animación de parpadeo continuo
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0, // Opacidad a 0 (invisible)
          duration: 700, // Duración de medio segundo
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1, // Opacidad a 1 (visible)
          duration: 700, // Duración de medio segundo
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

 
  

  return (
    <LinearGradient
      colors={['#000000', '#ff0000', '#433c3c']} // Ajusta los colores del gradiente según tu preferencia
      style={styles.gradient}
    >
      
      <View style={styles.container}>
        <Animated.Image
          source={require('../../../assets/img/log2.png')} // Usa require para imágenes locales
          style={[styles.image, { opacity: fadeAnim }]} // Aplica la animación de parpadeo
        />
          <Text style={styles.title}>Bienvenido</Text>
        <TouchableOpacity style={styles.button}>
          <Text onPress={()=> alert("pressed")} style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigate('')}>
          <Text style={styles.buttonText}>Recarga</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigate('')}>
          <Text style={styles.buttonText}>Historial</Text>
        </TouchableOpacity>
        
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  }, 
  image: {
    width: 200, // Ajusta el tamaño según tus necesidades
    height: 200, // Ajusta el tamaño según tus necesidades
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Redressed-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    alignSelf: 'center', 
    textTransform: 'uppercase', // Convierte el texto a mayúsculas
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

export default HomeScreen;