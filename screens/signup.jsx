import React, { useEffect, useRef } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Picker } from "react-native-web";
import * as Yup from "yup";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es requerido"),
    name: Yup.string().required("El nombre es requerido"),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
            "La contraseña debe contener al menos una letra y un número"
        )
        .required("La contraseña es requerida"),
    role: Yup.string().required("El rol es requerido"),
    reservedword: Yup.string().required("La palabra reservada es requerida"),
});

const SignupForm = () => {
    const handleRegistration = async (values) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/users?username=${values.username}`
            );

            if (response.data.length > 0) {
                showMessage({
                    message: "El usuario ya existe",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
                return;
            } else {
                showMessage({
                    message: "Usuario registrado correctamente",
                    type: "success",
                    icon: "success",
                    duration: 3000,
                });

                values = { id: response.data.length, ...values };
                const registrationResponse = await axios.post(
                    `http://localhost:8000/users`,
                    values
                );

                formikRef.current.resetForm();
            }
        } catch (error) {
            showMessage({
                message: "Error en el registro",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const formikRef = useRef(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Usuario</Text>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    username: "",
                    name: "",
                    password: "",
                    role: "",
                    reservedword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleRegistration}
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
                            placeholder="Nombre"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                        />
                        {touched.name && errors.name && (
                            <Text style={styles.error}>{errors.name}</Text>
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

                        <Picker
                            style={styles.input}
                            selectedValue={values.role}
                            onValueChange={handleChange("role")}
                        >
                            <Picker.Item label="Administrador" value="admin" />
                            <Picker.Item label="Usuario" value="user" />
                        </Picker>
                        {touched.role && errors.role && (
                            <Text style={styles.error}>{errors.role}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Palabra Reservada"
                            onChangeText={handleChange("reservedword")}
                            onBlur={handleBlur("reservedword")}
                            value={values.reservedword}
                        />
                        {touched.reservedword && errors.reservedword && (
                            <Text style={styles.error}>
                                {errors.reservedword}
                            </Text>
                        )}

                        <Button title="Registrarse" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
            <TouchableOpacity>
                <Text style={styles.link}>¿Ya tienes una cuenta?</Text>
            </TouchableOpacity>
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

export default SignupForm;
