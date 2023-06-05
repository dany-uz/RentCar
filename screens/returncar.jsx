import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";

const ReturnCarForm = () => {
    const [rentNumber, setRentNumber] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const handleSave = () => {
        // Lógica para guardar la devolución del carro utilizando los datos ingresados
        console.log("Guardar devolución");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Devolución de Carros</Text>
            <TextInput
                style={styles.input}
                placeholder="Número Renta"
                value={rentNumber}
                onChangeText={setRentNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Placa"
                value={licensePlate}
                onChangeText={setLicensePlate}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha Devolución"
                value={returnDate}
                onChangeText={setReturnDate}
            />
            <Button title="Guardar" onPress={handleSave} />
            <TouchableOpacity>
                <Text style={styles.link}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    link: {
        color: "blue",
        marginTop: 8,
    },
};

export default ReturnCarForm;
