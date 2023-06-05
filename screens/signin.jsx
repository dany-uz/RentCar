import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica para iniciar sesión con los datos ingresados
    console.log('Iniciar sesión');
  };

  return (
    <View>
      <Text>Inicio de Sesión</Text>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <TouchableOpacity>
        <Text>Registrarse aquí</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>¿Olvidaste la contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
