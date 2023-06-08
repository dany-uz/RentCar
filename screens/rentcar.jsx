import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { Picker } from "react-native-web";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
    licensePlate: Yup.string().required("La placa es requerida"),
    initialDate: Yup.date().required("La fecha inicial es requerida"),
    endDate: Yup.date()
        .required("La fecha final es requerida")
        .test(
            "is-greater",
            "La fecha final debe ser mayor que la fecha inicial",
            function (endDate) {
                const { initialDate } = this.parent;
                if (!initialDate || !endDate) {
                    return true;
                }
                return new Date(endDate) > new Date(initialDate);
            }
        ),
    rentNumber: Yup.string().required("El número de renta es requerido"),
});

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

const RentForm = () => {
    const [carOptions, setCarOptions] = useState([]);
    const [selectedCar, setSelectedCar] = useState("");

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/cars`);

            const availableCars = response.data.filter(
                (car) => car.state === "Disponible"
            );

            setCarOptions(availableCars);
        } catch (error) {
            console.log(error);
        }
    };

    const changeState = async (car) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/cars/${car.id}`,
                {
                    ...car,
                    state: "No disponible",
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async (values) => {
        try {
            values.licensePlate = selectedCar;

            const selectedCarInfo = carOptions.find(
                (car) => car.platenumber === selectedCar
            );

            const getRents = await axios.get(`http://localhost:8000/rents`);
            const auto_id = getRents.data.length + 1;

            const user = await AsyncStorage.getItem("user");
            const parsedUser = JSON.parse(user);

            values = { 
                id: auto_id, 
                rentnumber: values.rentNumber,
                username: parsedUser.username,
                platenumber: values.licensePlate,
                initialdate: values.initialDate,
                finaldate: values.endDate,
                status: "Activo",
            };

            const response = await axios.post(
                `http://localhost:8000/rents`,
                values
            );

            if (selectedCar) {
                await axios.put(
                    `http://localhost:8000/cars/${selectedCarInfo.id}`,
                    {
                        ...selectedCarInfo,
                        state: "No disponible",
                    }
                );
            }

            showMessage({
                message: "Datos guardados correctamente",
                type: "success",
                icon: "success",
                duration: 3000,
            });

            formikRef.current.resetForm();
            getCars();
        } catch (error) {
            showMessage({
                message: "Error al guardar los datos",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const formikRef = useRef(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rentar</Text>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    licensePlate: "",
                    initialDate: "",
                    endDate: "",
                    rentNumber: "",
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
                            selectedValue={selectedCar}
                            onValueChange={(itemValue) => {
                                setSelectedCar(itemValue);
                                handleChange("licensePlate")(itemValue);
                            }}
                        >
                            <Picker.Item label="Seleccione un vehículo" />
                            {carOptions.map((car) => (
                                <Picker.Item
                                    key={car.id}
                                    label={car.platenumber}
                                    value={car.platenumber}
                                />
                            ))}
                        </Picker>

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha Inicial"
                            onChangeText={(text) => {
                                const formattedDate = formatDateString(text);
                                handleChange("initialDate")(formattedDate);
                            }}
                            onBlur={handleBlur("initialDate")}
                            value={values.initialDate}
                        />
                        {touched.initialDate && errors.initialDate && (
                            <Text style={styles.error}>
                                {errors.initialDate}
                            </Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha Final"
                            onChangeText={(text) => {
                                const formattedDate = formatDateString(text);
                                handleChange("endDate")(formattedDate);
                            }}
                            onBlur={handleBlur("endDate")}
                            value={values.endDate}
                        />
                        {touched.endDate && errors.endDate && (
                            <Text style={styles.error}>{errors.endDate}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Número Renta"
                            onChangeText={handleChange("rentNumber")}
                            onBlur={handleBlur("rentNumber")}
                            value={values.rentNumber}
                        />
                        {touched.rentNumber && errors.rentNumber && (
                            <Text style={styles.error}>
                                {errors.rentNumber}
                            </Text>
                        )}

                        <Button title="Guardar" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
            <TouchableOpacity>
                <Text style={styles.link}>Listar vehículos Disponibles</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.link}>Cerrar sesión</Text>
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

export default RentForm;
