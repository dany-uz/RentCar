import React, { useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es requerido"),
    reservedWord: Yup.string().required("La palabra reservada es requerida"),
    newPassword: Yup.string().required("La nueva contraseña es requerida"),
});

const ForgotPasswordForm = () => {
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users`);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleResetPassword = async (values) => {
        try {
            // Verificar si el usuario existe y la palabra reservada coincide
            const userExists = await axios.get(
                `http://localhost:8000/users?username=${values.username}`
            );

            if (!(userExists.data.length > 0)) {
                showMessage({
                    message: "El usuario no existe",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
                return;
            }

            const { username, reservedWord, newPassword } = values;
            if (userExists.data[0].reservword !== reservedWord) {
                showMessage({
                    message: "La palabra reservada no coincide",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
                return;
            }

            // Restablecer la contraseña
            
            const response = await axios.put(
                `http://localhost:8000/users/${userExists.data[0].id}`,
                {
                    ...userExists.data[0],
                    password: newPassword,
                }
            );

            showMessage({
                message: "Contraseña restablecida correctamente",
                type: "success",
                icon: "success",
                duration: 3000,
            });
        } catch (error) {
            showMessage({
                message: "Error al restablecer la contraseña",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Olvidaste la Contraseña?</Text>
            <Formik
                initialValues={{
                    username: "",
                    reservedWord: "",
                    newPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleResetPassword}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
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
                            placeholder="Palabra Reservada"
                            onChangeText={handleChange("reservedWord")}
                            onBlur={handleBlur("reservedWord")}
                            value={values.reservedWord}
                        />
                        {touched.reservedWord && errors.reservedWord && (
                            <Text style={styles.error}>
                                {errors.reservedWord}
                            </Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Nueva contraseña"
                            secureTextEntry
                            onChangeText={handleChange("newPassword")}
                            onBlur={handleBlur("newPassword")}
                            value={values.newPassword}
                        />
                        {touched.newPassword && errors.newPassword && (
                            <Text style={styles.error}>
                                {errors.newPassword}
                            </Text>
                        )}

                        <Button title="Restablecer" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </View>
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

export default ForgotPasswordForm;
