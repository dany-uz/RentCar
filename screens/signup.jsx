import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [reservedWord, setReservedWord] = useState('');

  const handleRegistration = () => {
    // Lógica para registrar al usuario utilizando los datos ingresados
    console.log('Registrarse');
  };

  return (
    <View>
      <Text>Registro de Usuario</Text>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Rol"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        placeholder="Palabra Reservada"
        value={reservedWord}
        onChangeText={setReservedWord}
      />
      <Button title="Registrarse" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationForm;
