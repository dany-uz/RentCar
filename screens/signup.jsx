import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const RegistrationForm = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [reservedWord, setReservedWord] = useState("");

    const handleRegistration = () => {
        // Lógica para registrar al usuario utilizando los datos ingresados
        console.log("Registrarse");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Rol"
                value={role}
                onChangeText={setRole}
            />
            <TextInput
                style={styles.input}
                placeholder="Palabra Reservada"
                value={reservedWord}
                onChangeText={setReservedWord}
            />
            <Button title="Registrarse" onPress={handleRegistration} />
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

export default RegistrationForm;
