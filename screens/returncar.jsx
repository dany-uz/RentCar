import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';

const ReturnCarForm = () => {
  const [rentNumber, setRentNumber] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSave = () => {
    // Lógica para guardar la devolución del carro utilizando los datos ingresados
    console.log('Guardar devolución');
  };

  return (
    <View>
      <Text>Devolución de Carros</Text>
      <TextInput
        placeholder="Número Renta"
        value={rentNumber}
        onChangeText={setRentNumber}
      />
      <TextInput
        placeholder="Número de Placa"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />
      <TextInput
        placeholder="Fecha Devolución"
        value={returnDate}
        onChangeText={setReturnDate}
      />
      <Button title="Guardar" onPress={handleSave} />
      <TouchableOpacity>
        <Text>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReturnCarForm;
