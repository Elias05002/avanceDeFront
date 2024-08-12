import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const allEvents = [
  {
    id: 1,
    title: 'Futbol',
    image: require('../../../assets/images/Futbol.jpg'),
    description: 'Apuestas en partidos de futbol soccer.',
  },
  {
    id: 2,
    title: 'Baseball',
    image: require('../../../assets/images/Baseball.jpeg'),
    description: 'Apuestas en partidos de baseball.',
  },
  {
    id: 3,
    title: 'Ajedrez',
    image: require('../../../assets/images/Ajedrez.jpeg'),
    description: 'Apuestas en partidos de ajedrez.',
  },
  {
    id: 4,
    title: 'Lucha libre',
    image: require('../../../assets/images/WWE.jpg'),
    description: 'Apuestas en peleas de lucha libre.',
  },
  {
    id: 5,
    title: 'Futbol Americano',
    image: require('../../../assets/images/Americano.jpg'),
    description: 'Apuestas en partidos de futbol americano.',
  },
  {
    id: 6,
    title: 'Tennis',
    image: require('../../../assets/images/Tennis.jpg'),
    description: 'Apuestas en partidos de tennis.',
  },
  {
    id: 7,
    title: 'Formula 1',
    image: require('../../../assets/images/Formula-1.jpeg'),
    description: 'Apuestas en carreras de la formula 1.',
  },
  {
    id: 8,
    title: 'E-Sports',
    image: require('../../../assets/images/E-Sports.jpg'),
    description: 'Apuestas en torneos de los E-Sports.',
  },
  {
    id: 9,
    title: 'Death Battle',
    image: require('../../../assets/images/Death-Battle.jpg'),
    description: 'Apuestas acerca de los encuentros en la Death Battle.',
  },
  {
    id: 10,
    title: 'Box',
    image: require('../../../assets/images/Box.jpg'),
    description: 'Apuestas en las peleas de box.',
  },
  {
    id: 11,
    title: 'Ciclismo',
    image: require('../../../assets/images/Ciclismo.jpg'),
    description: 'Apuestas en las carreras de ciclismo.',
  },
  {
    id: 12,
    title: 'Juegos Olimpicos',
    image: require('../../../assets/images/Juegos-olimpicos.jpg'),
    description: 'Apuestas en los eventos de los juegos olimpicos Paris 2024.',
  },
];

const getRandomColor = () => {
  // Genera un color hex aleatorio
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
};

const GamesScreen: React.FC<{ navigate: (screen: string, params?: any) => void }> = ({ navigate }) => {
  const [displayedEvents, setDisplayedEvents] = useState(allEvents.slice(0, 4));
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const [buttonColor, setButtonColor] = useState(getRandomColor());

  useEffect(() => {
    const updateEvents = () => {
      const shuffledEvents = allEvents.sort(() => 0.5 - Math.random());
      setDisplayedEvents(shuffledEvents.slice(0, 4));
    };

    const interval = setInterval(updateEvents, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20, // Mueve el botón 20 unidades hacia arriba
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // Vuelve a la posición original
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    );

    bounce.start();

    return () => bounce.stop();
  }, [bounceAnim]);

  useEffect(() => {
    const colorChange = Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 200, // Cambia el color cada 2 segundos
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ])
    );

    colorChange.start();

    return () => colorChange.stop();
  }, [colorAnim]);

  useEffect(() => {
    // Genera un nuevo color aleatorio en cada ciclo de la animación
    colorAnim.addListener(({ value }) => {
      if (value === 1) {
        setButtonColor(getRandomColor());
      }
    });

    return () => colorAnim.removeAllListeners();
  }, [colorAnim]);

  const handlePress = (eventId: number) => {
    navigate('EventDetails', { eventId });
  };

  const handleFloatButtonPress = () => {
    navigate('Home'); // Cambia 'Home' al nombre de la pantalla a la que deseas navegar
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {displayedEvents.map(event => (
          <LinearGradient
            key={event.id}
            colors={['#000000', '#ff0000', '#433c3c']}
            style={styles.eventContainer}
          >
            <TouchableOpacity onPress={() => handlePress(event.id)}>
              <Image source={event.image} style={styles.eventImage} />
            </TouchableOpacity>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <LinearGradient
              colors={['#000000', '#ff0000', '#433c3c']}
              style={styles.button}
            >
              <TouchableOpacity onPress={() => handlePress(event.id)}>
                <Text style={styles.buttonText}>Ver Detalles</Text>
              </TouchableOpacity>
            </LinearGradient>
          </LinearGradient>
        ))}
      </ScrollView>
      <Animated.View style={[styles.floatingButton, { 
        transform: [{ translateY: bounceAnim }],
        backgroundColor: buttonColor,
      }]}>
        <TouchableOpacity onPress={handleFloatButtonPress}>
          <Text style={styles.floatingButtonText}>Bonus extra</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  scrollContainer: {
    padding: 16,
  },
  eventContainer: {
    marginBottom: 24,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
  },
  eventImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 12,
  },
  eventDescription: {
    fontSize: 14,
    color: '#C0C0C0',
    marginVertical: 8,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default GamesScreen;
