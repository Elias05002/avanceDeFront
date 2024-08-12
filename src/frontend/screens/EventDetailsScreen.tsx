import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';


const allEvents = [
  {
    id: 1,
    title: 'Futbol',
    teams: ['América', 'Chivas'],
    image: require('../../../assets/images/Futbol.jpg'),
    description: 'Apuestas en partidos de futbol soccer.',
  },
  {
    id: 2,
    title: 'Baseball',
    teams: ['Yankees', 'Red Sox'],
    image: require('../../../assets/images/Baseball.jpeg'),
    description: 'Apuestas en partidos de baseball.',
  },
  {
    id: 3,
    title: 'Ajedrez',
    teams: ['Magnus Carlsen', 'Ian Nepomniachtchi'],
    image: require('../../../assets/images/Ajedrez.jpeg'),
    description: 'Apuestas en partidos de ajedrez.',
  },
  {
    id: 4,
    title: 'Lucha libre',
    teams: ['Undertaker', 'Edge'],
    image: require('../../../assets/images/WWE.jpg'),
    description: 'Apuestas en peleas de lucha libre.',
  },
  {
    id: 5,
    title: 'Futbol Americano',
    teams: ['Cowboys', 'Patriots'],
    image: require('../../../assets/images/Americano.jpg'),
    description: 'Apuestas en partidos de futbol americano.',
  },
  {
    id: 6,
    title: 'Tennis',
    teams: ['Nadal', 'Federer'],
    image: require('../../../assets/images/Tennis.jpg'),
    description: 'Apuestas en partidos de tennis.',
  },
  {
    id: 7,
    title: 'Formula 1',
    teams: ['Hamilton', 'Verstappen'],
    image: require('../../../assets/images/Formula-1.jpeg'),
    description: 'Apuestas en carreras de la formula 1.',
  },
  {
    id: 8,
    title: 'E-Sports',
    teams: ['Team Liquid', 'Fnatic'],
    image: require('../../../assets/images/E-Sports.jpg'),
    description: 'Apuestas en torneos de los E-Sports.',
  },
  {
    id: 9,
    title: 'Death Battle',
    teams: ['Dante', 'Bayonetta'],
    image: require('../../../assets/images/Death-Battle.jpg'),
    description: 'Apuestas acerca de los encuentros en la Death Battle.',
  },
  {
    id: 10,
    title: 'Box',
    teams: ['Canelo', 'Mayweather'],
    image: require('../../../assets/images/Box.jpg'),
    description: 'Apuestas en las pelea de box.',
  },
  {
    id: 11,
    title: 'Ciclismo',
    teams: ['Froome', 'Nairo Quintana'],
    image: require('../../../assets/images/Ciclismo.jpg'),
    description: 'Apuestas en las carreras de ciclismo',
  },
  {
    id: 12,
    title: 'Juegos Olimpicos',
    teams: ['USA', 'China'],
    image: require('../../../assets/images/Juegos-olimpicos.jpg'),
    description: 'Apuestas en los eventos de los juegos olimpicos Paris 2024.',
  },
];

const participantsByEvent = {
  Futbol: ['América', 'Chivas', 'Pumas', 'Cruz Azul', 'Atlas', 'León', 'Monterrey', 'Necaxa', 'Pachuca', 'Tigres'],
  Baseball: ['Yankees', 'Red Sox', 'Dodgers', 'Giants', 'Diamondbacks', 'Rockies', 'Padres', 'Pirates', 'Cardinals', 'Reds'],
  Ajedrez: ['Magnus Carlsen', 'Ian Nepomniachtchi', 'Hikaru Nakamura', 'Fabiano Caruana', 'Anatoly Karpov', 'Robert Fischer', 'Gary Kasparov', 'José Raúl Capablanca', 'Vladimir Kramnik', 'Wiswanathan Anand'],
  'Lucha libre': ['Undertaker', 'Edge', 'John Cena', 'Kane', 'Roman Reigns', 'Brock Lesnar', 'Seth Rollins', 'Randy Orton', 'Damian Priest', 'Jey Uso'],
  'Futbol Americano': ['Cowboys', 'Patriots', 'Packers', '49ers', 'Buffalo Bills', 'Dolphins', 'Jets', 'Ravens', 'Bengals', 'Steelers'],
  Tennis: ['Nadal', 'Federer', 'Djokovic', 'Murray', 'Sinner', 'Djokovic', 'Alcaraz', 'Zverev', 'Medvedev'],
  'Formula 1': ['Hamilton', 'Verstappen', 'Leclerc', 'Bottas', 'Sargeant', 'Ricciardo', 'Norris', 'Gasly', 'Perez', 'Alonso'],
  'E-Sports': ['Team Liquid', 'Fnatic', 'TSM', 'G2 Esports', 'Rainbow7', 'Infinity eSports', 'Xten Esports', 'Cloud9', 'SK Telecom', 'Heretics'],
  'Death Battle': ['Dante', 'Homelander', 'Kratos', 'Master Chief', 'Satoru Gojo', 'Madara Uchiha', 'Doom Slayer', 'Darth Vader', 'Omni-man', 'Saitama'],
  Box: ['Canelo', 'Mayweather', 'Pacquiao', 'Tyson','Ali', 'Foreman', 'Robinson', 'Louis', 'Marciano', 'Crawford'],
  Ciclismo: ['Froome', 'Nairo Quintana', 'Pogacar', 'Roglic', 'Vingegaard', 'Valverde', 'Bernal', 'Postlberger', 'López', 'De Lie'],
  'Juegos Olimpicos': ['EUA', 'China', 'Rusia', 'Japón', 'México', 'Australia', 'Francia', 'Grecia', 'Suiza', 'Reino Unido'],
};

const EventDetailsScreen: React.FC<{ route: any, navigate: (screen: string) => void }> = ({ route, navigate }) => {
 
  const [event, setEvent] = useState<any>(null);
  const [saldo, setSaldo] = useState<number>(0)

  useEffect(() => {
    const fetchEventDetails = async () => {
      const selectedEvent = allEvents.find(event => event.id === eventId);
      if (selectedEvent) {
        const eventType = selectedEvent.title;
        const participants = participantsByEvent[eventType] || [];
        const shuffledParticipants = participants.sort(() => 0.5 - Math.random());
        const assignedParticipants = shuffledParticipants.slice(0, 2);
        setEvent({ ...selectedEvent, teams: assignedParticipants });
      }
    };

    const fetchUserSaldo = async () => {
      try {
        
        if (userSession) {
          const user = JSON.parse(userSession);
          const response = await fetch(`http://192.168.0.115:3000/api/clientes/validarSaldo/${user.ID}`);
          const data = await response.json();
          console.log(data.saldo, data.Saldo, data)
          if (response.ok) {
            setSaldo(data.saldo);
          } else {
            Alert.alert('Error', 'No se pudo recuperar el saldo del usuario.');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Error al recuperar el saldo del usuario.');
      }
    };

    fetchEventDetails();
    fetchUserSaldo();
  }, [eventId]);

  const [selectedTeam, setSelectedTeam] = useState('');
  const [betAmount, setBetAmount] = useState('');

const handleBet = async () => {
  if (selectedTeam === '' || betAmount === '') {
    Alert.alert('Error', 'Debe seleccionar un equipo y una cantidad a apostar.');
    return;
  }

  const amount = parseFloat(betAmount);
  if (amount > saldo) {
    Alert.alert('Error', 'La cantidad apostada es mayor que el saldo disponible.');
    return;
  }

  try {
    const userSession = await AsyncStorage.getItem('userSession');

    if (userSession === null) {
      Alert.alert('Error', 'No se pudo recuperar la sesión del usuario.');
      return;
    }

    const user = JSON.parse(userSession);

    // Elegir aleatoriamente un ganador entre los dos equipos disponibles
    const winner = event.teams[Math.floor(Math.random() * event.teams.length)];
    const isWin = selectedTeam === winner;

    // Calcular el resultado y el monto a ganar/perder
    const amount = parseFloat(betAmount);
    const commission = amount * 0.10;
    const netAmount = isWin ? amount * 2 - commission : -(amount + commission);

    const resultMessage = isWin
      ? `¡Ganaste! Has apostado $${amount} al equipo ${selectedTeam}. Ganaste $${amount * 2 - commission}.`
      : `Perdiste. Has apostado $${amount} al equipo ${selectedTeam}. Perdiste $${amount + commission}.`;

    Alert.alert('Resultado de la apuesta', resultMessage);

    // Guardar los datos de la apuesta en el backend
    const response = await fetch('http://192.168.0.115:3000/api/apuestas/generarApuesta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.ID,
        eventId: event.id,
        team: selectedTeam,
        amount: betAmount,
        gameName: event.title,
        userName: user.name,
        result: isWin ? 'Ganado' : 'Perdido',
        netAmount,
        commission,
        date: new Date().toISOString(),
        equipo1: event.teams[0],
        equipo2: event.teams[1],
        winner: winner,
        selected: selectedTeam
      }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate('Games');
    } else {
      Alert.alert('Error', data.message || 'Error al realizar la apuesta.');
    }
  } catch (error) {
    Alert.alert('Error', 'Error de red. Por favor, inténtalo de nuevo.');
  }
};
  

  const handleBack = () => {
    navigate('GamesScreen');
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={event.image} style={styles.eventImage} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <Text style={styles.saldoText}>Saldo actual: ${saldo.toFixed(2)}</Text>

      <Text style={styles.label}>Selecciona tu equipo favorito:</Text>
      {event.teams.map((team: string) => (
        <TouchableOpacity
          key={team}
          style={[styles.teamButton, selectedTeam === team && styles.selectedTeamButton]}
          onPress={() => setSelectedTeam(team)}
        >
          <Text style={styles.teamButtonText}>{team}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Ingresa la cantidad a apostar:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        placeholderTextColor="#999"
        value={betAmount}
        onChangeText={setBetAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.betButton} onPress={handleBet}>
        <Text style={styles.betButtonText}>Realizar Apuesta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.betButton} onPress={handleBack}>
        <Text style={styles.betButtonText}>Volver a Juegos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#FF6F00',
  },
  eventImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: '#FF6F00',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#FF6F00',
    marginVertical: 8,
  },
  teamButton: {
    backgroundColor: '#333',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  selectedTeamButton: {
    backgroundColor: '#FF6F00',
  },
  teamButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 16,
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 8,
  },
  betButton: {
    marginTop: 18,
    backgroundColor: '#FF6F00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  betButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  saldoText: {
    fontSize: 18,
    color: '#FF6F00',
    marginBottom: 16,
  },
});

export default EventDetailsScreen;
