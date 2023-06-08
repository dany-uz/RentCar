import React, { useRef } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
});

const LoginForm = () => {

    const handleSubmit = async (values) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/users?username=${values.username}&password=${values.password}`
            );

            if (response.data.length > 0) {
                showMessage({
                    message: "Inicio de sesión exitoso",
                    type: "success",
                    icon: "success",
                    duration: 3000,
                });

                await AsyncStorage.setItem(
                    "user",
                    JSON.stringify(response.data[0])
                );

                formikRef.current.resetForm();

            } else {
                showMessage({
                    message: "Usuario o contraseña incorrectos",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });

                return;
            }
        } catch (error) {
            showMessage({
                message: "Error al iniciar sesión: " + error.message,
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const flashMessage = useRef(null);
    const formikRef = useRef(null);

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                    />
                    {touched.username && errors.username && (
                        <Text style={styles.error}>{errors.username}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                    />
                    {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                    )}
                    <Button title="Iniciar Sesión" onPress={handleSubmit} />
                    <TouchableOpacity>
                        <Text style={styles.link}>
                            ¿Olvidaste la Contraseña?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.link}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
};

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
    error: {
        color: "red",
        marginBottom: 8,
    },
    link: {
        color: "blue",
        marginTop: 8,
    },
};

export default LoginForm;
