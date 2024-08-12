import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen: React.FC<{ navigate: (screen: string) => void }> = ({ navigate }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('');

  const handleRegister = async () => {
    if (
      name === '' ||
      lastName === '' ||
      !birthDate ||
      gender === '' ||
      phone === '' ||
      email === '' ||
      username === '' ||
      password === '' ||
      currency === ''
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.115:3000/api/clientes/registroClientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nombre: name,
          Apellido: lastName,
          FechaNacimiento: birthDate.toISOString().split('T')[0],
          Sexo: gender,
          Telefono: phone,
          Correo: email,
          Usuario: username,
          Contrasena: password,
          Moneda: currency,
        }),
      });

      if (response.ok) {
        Alert.alert('Registro exitoso', `Bienvenido, ${name}!`);
        navigate('Home');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el registro.');
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#ff0000', '#433c3c']} // Ajusta los colores del gradiente según tu preferencia
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      >
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={{ color: birthDate ? '#FFF' : '#999' }}>
              {birthDate ? birthDate.toISOString().split('T')[0] : 'Fecha de Nacimiento'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || birthDate;
                setShowDatePicker(Platform.OS === 'ios');
                setBirthDate(currentDate);
              }}
            />
          )}
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Selecciona tu sexo" value="" color="#999" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
            <Picker.Item label="Otro" value="Otro" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Picker
            selectedValue={currency}
            style={styles.picker}
            onValueChange={(itemValue) => setCurrency(itemValue)}
          >
            <Picker.Item label="Selecciona tu moneda" value="" color="#999" />
            <Picker.Item label="Peso Mexicano" value="Peso Mexicano" />
            <Picker.Item label="Dólar Estadounidense" value="Dólar Estadounidense" />
            <Picker.Item label="Euro" value="Euro" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
         
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
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
  picker: {
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

export default RegisterScreen;
