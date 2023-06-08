import React, { useRef, useEffect } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
    useEffect(() => {
        checkLoggedInUser();
      }, []);
      
      const checkLoggedInUser = async () => {
        try {
          const user = await AsyncStorage.getItem("user");
          setIsLoggedIn(!!user); // Verifica si el usuario existe en AsyncStorage
        } catch (error) {
          console.log("Error al obtener el usuario de AsyncStorage:", error);
        }
      };

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <Text>
                    Ya estás logueado. No puedes ver el formulario principal.
                </Text>
            ) : (
                <>
                    <Text style={styles.title}>Devolución de Carros</Text>
                    {/* Resto del código del formulario principal */}
                </>
            )}
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

export default HomeScreen;
