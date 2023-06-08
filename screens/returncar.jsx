import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { Picker } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
    returnNumber: Yup.string().required("El número de devolución es requerido"),
    rentNumber: Yup.string().required("El número de renta es requerido"),
    licensePlate: Yup.string().required("El número de placa es requerido"),
    returnDate: Yup.string().required("La fecha de devolución es requerida"),
});

const ReturnCarForm = () => {
    const [rentOptions, setRentOptions] = useState([]);
    const [selectedRent, setSelectedRent] = useState("");

    useEffect(() => {
        getRents();
    }, []);

    const getRents = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/rents`);

            const availableRents = response.data.filter(
                (rent) => rent.status === "Activo"
            );

            setRentOptions(availableRents);
        } catch (error) {
            showMessage({
                message: "Error al obtener las rentas",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const generateRandomNumber = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };

    const formatDateString = (text) => {
        const formattedText = text.replace(/[^0-9]/g, "");
        const year = formattedText.slice(0, 4);
        const month = formattedText.slice(4, 6);
        const day = formattedText.slice(6, 8);

        let formattedDate = "";

        if (year) {
            formattedDate += year;
            if (month) {
                formattedDate += `-${month}`;
                if (day) {
                    formattedDate += `-${day}`;
                }
            }
        }

        return formattedDate;
    };

    const handleSave = async (values) => {
        try {
            // Verificar si la renta existe
            const response = await axios.get(
                `http://localhost:8000/rents?rentnumber=${values.rentNumber}`
            );

            if (!(response.data.length > 0)) {
                showMessage({
                    message: "Por favor, seleccione una renta",
                    type: "warning",
                    icon: "warning",
                    duration: 3000,
                });
                return;
            }

            // Verificar si la placa coincide con la renta seleccionada
            const selectedRentObject = response.data[0];
            if (selectedRentObject.platenumber !== values.licensePlate) {
                showMessage({
                    message: "La placa no coincide con la renta seleccionada",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
                return;
            }

            const returnDate = new Date(values.returnDate);
            const initialDate = new Date(selectedRentObject.initialdate);
            const endDate = new Date(selectedRentObject.finaldate);

            if (returnDate < initialDate || returnDate > endDate) {
                showMessage({
                    message:
                        "La fecha de devolución debe estar dentro del período de la renta, comuníquese con un administrador",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
                return;
            }

            // Guardar la devolución
            const returnObject = {
                id: response.data.length + 1,
                returnnumber: values.returnNumber,
                rentnumber: values.rentNumber,
                returndate: values.returnDate,
            };

            await axios.post(`http://localhost:8000/returncars`, returnObject);

            // Actualizar la renta
            const updatedRent = {
                id: selectedRentObject.id,
                ...selectedRentObject,
                status: "Inactivo",
            };

            await axios.put(
                `http://localhost:8000/rents/${selectedRentObject.id}`,
                updatedRent
            );

            // Actualizar el carro
            const carResponse = await axios.get(
                `http://localhost:8000/cars?platenumber=${values.licensePlate}`
            );

            const carObject = carResponse.data[0];

            const updatedCar = {
                id: carObject.id,
                ...carObject,
                state: "Disponible",
            };

            await axios.put(
                `http://localhost:8000/cars/${carObject.id}`,
                updatedCar
            );

            showMessage({
                message: "Devolución guardada correctamente",
                type: "success",
                icon: "success",
                duration: 3000,
            });

            formikRef.current.resetForm();
        } catch (error) {
            showMessage({
                message: "Error al guardar la devolución",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const formikRef = useRef(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Devolución de Carros</Text>
            <Formik
                formikRef={formikRef}
                initialValues={{
                    returnNumber: generateRandomNumber().toString(),
                    rentNumber: "",
                    returnDate: "",
                    licensePlate: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSave}
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
                        <Picker
                            style={styles.input}
                            selectedValue={selectedRent}
                            onValueChange={(itemValue) => {
                                setSelectedRent(itemValue);
                                handleChange("rentNumber")(itemValue);
                            }}
                        >
                            <Picker.Item label="Seleccione una renta" />

                            {rentOptions.map((rent) => (
                                <Picker.Item
                                    key={rent.id}
                                    label={rent.rentnumber}
                                    value={rent.rentnumber}
                                />
                            ))}
                        </Picker>
                        {touched.rentNumber && errors.rentNumber && (
                            <Text style={styles.error}>
                                {errors.rentNumber}
                            </Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Número de Placa"
                            onChangeText={handleChange("licensePlate")}
                            onBlur={handleBlur("licensePlate")}
                            value={values.licensePlate}
                        />
                        {touched.licensePlate && errors.licensePlate && (
                            <Text style={styles.error}>
                                {errors.licensePlate}
                            </Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha Devolución"
                            onChangeText={(text) => {
                                const formattedDate = formatDateString(text);
                                handleChange("returnDate")(formattedDate);
                            }}
                            onBlur={handleBlur("returnDate")}
                            value={values.returnDate}
                        />
                        {touched.returnDate && errors.returnDate && (
                            <Text style={styles.error}>
                                {errors.returnDate}
                            </Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Número de Devolución"
                            onChangeText={handleChange("returnNumber")}
                            onBlur={handleBlur("returnNumber")}
                            value={values.returnNumber}
                            editable={false}
                        />
                        {touched.returnNumber && errors.returnNumber && (
                            <Text style={styles.error}>
                                {errors.returnNumber}
                            </Text>
                        )}

                        <Button title="Guardar" onPress={handleSubmit} />
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

export default ReturnCarForm;
