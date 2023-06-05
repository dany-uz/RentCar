import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";

const RentForm = () => {
    const [licensePlate, setLicensePlate] = useState("");
    const [initialDate, setInitialDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rentNumber, setRentNumber] = useState("");

    const handleSave = () => {
        // Lógica para guardar la renta utilizando los datos ingresados
        console.log("Guardar renta");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rentar</Text>
            <TextInput
                style={styles.input}
                placeholder="Placa"
                value={licensePlate}
                onChangeText={setLicensePlate}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha Inicial"
                value={initialDate}
                onChangeText={setInitialDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha Final"
                value={endDate}
                onChangeText={setEndDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Número Renta"
                value={rentNumber}
                onChangeText={setRentNumber}
            />
            <Button title="Guardar" onPress={handleSave} />
            <TouchableOpacity>
                <Text style={styles.link}>Listar vehículos Disponibles</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.link}>Cerrar sesión</Text>
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

export default RentForm;
