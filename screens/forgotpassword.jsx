import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState('');
  const [reservedWord, setReservedWord] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = () => {
    // Lógica para reestablecer la contraseña utilizando los datos ingresados
    console.log('Reestablecer contraseña');
  };

  return (
    <View>
      <Text>¿Olvidaste la Contraseña?</Text>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Palabra Reservada"
        value={reservedWord}
        onChangeText={setReservedWord}
      />
      <TextInput
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Reestablecer" onPress={handleResetPassword} />
      <TouchableOpacity>
        <Text>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordForm;
