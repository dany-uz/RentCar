import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";

const ForgotPasswordForm = () => {
    const [username, setUsername] = useState("");
    const [reservedWord, setReservedWord] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleResetPassword = () => {
        // Lógica para reestablecer la contraseña utilizando los datos ingresados
        console.log("Restablecer contraseña");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Olvidaste la Contraseña?</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Palabra Reservada"
                value={reservedWord}
                onChangeText={setReservedWord}
            />
            <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <Button title="Restablecer" onPress={handleResetPassword} />
            <TouchableOpacity>
                <Text style={styles.link}>Iniciar Sesión</Text>
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

export default ForgotPasswordForm;
