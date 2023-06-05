import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';

const RentForm = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rentNumber, setRentNumber] = useState('');

  const handleSave = () => {
    // Lógica para guardar la renta utilizando los datos ingresados
    console.log('Guardar renta');
  };

  return (
    <View>
      <Text>Rentar</Text>
      <TextInput
        placeholder="Placa"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />
      <TextInput
        placeholder="Fecha Inicial"
        value={initialDate}
        onChangeText={setInitialDate}
      />
      <TextInput
        placeholder="Fecha Final"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TextInput
        placeholder="Número Renta"
        value={rentNumber}
        onChangeText={setRentNumber}
      />
      <Button title="Guardar" onPress={handleSave} />
      <TouchableOpacity>
        <Text>Listar vehículos Disponibles</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RentForm;
