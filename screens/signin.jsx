import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Lógica para iniciar sesión con los datos ingresados
        console.log("Iniciar sesión");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <TouchableOpacity>
                <Text style={styles.link}>¿Olvidaste la Contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.link}>Registrarse</Text>
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

export default LoginForm;
