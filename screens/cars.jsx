import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Picker } from "react-native-web";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const validationSchema = Yup.object().shape({
    platenumber: Yup.string().required("El número de placa es requerido"),
    brand: Yup.string().required("La marca es requerida"),
    state: Yup.string().required("El estado es requerido"),
    dailyvalue: Yup.number()
        .typeError("El valor diario debe ser un número")
        .positive("El valor diario debe ser mayor que cero")
        .required("El valor diario es requerido"),
});

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        try {
            const response = await axios.get("http://localhost:8000/cars");
            setCars(response.data);
        } catch (error) {
            showMessage({
                message: "Error al obtener los carros",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const handleAdd = async (values) => {
        try {
            // Verificar si la placa ya está registrada
            const response = await axios.get(
                `http://localhost:8000/cars?platenumber=${values.platenumber}`
            );
            if (response.data.length > 0) {
                showMessage({
                    message: "La placa ya está registrada",
                    type: "warning",
                    icon: "warning",
                    duration: 3000,
                });
                return;
            }

            const newCar = {
                id: cars.length + 1,
                platenumber: values.platenumber,
                brand: values.brand,
                state: values.state,
                dailyvalue: values.dailyvalue,
            };

            await axios.post("http://localhost:8000/cars", newCar);
            showMessage({
                message: "Carro agregado correctamente",
                type: "success",
                icon: "success",
                duration: 3000,
            });
            getCars();
            formikRef.current.resetForm();
        } catch (error) {
            showMessage({
                message: "Error al agregar el carro",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const handleEdit = async (values) => {
        try {
            const updatedCar = {
                id: selectedCar.id,
                ...values,
            };

            await axios.put(
                `http://localhost:8000/cars/${selectedCar.id}`,
                updatedCar
            );
            showMessage({
                message: "Carro actualizado correctamente",
                type: "success",
                icon: "success",
                duration: 3000,
            });
            getCars();
            setEditMode(false);
            setSelectedCar(null);

            formikRef.current.resetForm();
        } catch (error) {
            showMessage({
                message: "Error al actualizar el carro",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const handleDelete = async (carId) => {
        try {
            await axios.delete(`http://localhost:8000/cars/${carId}`);
            showMessage({
                message: "Carro eliminado correctamente",
                type: "success",
                icon: "success",
                duration: 3000,
            });
            getCars();
        } catch (error) {
            showMessage({
                message: "Error al eliminar el carro",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    const handleEditButton = (car) => {
        setEditMode(true);
        setSelectedCar(car);

        // Set values to formik
        formikRef.current.setFieldValue("platenumber", car.platenumber);
        formikRef.current.setFieldValue("brand", car.brand);
        formikRef.current.setFieldValue("state", car.state);
        formikRef.current.setFieldValue("dailyvalue", car.dailyvalue);
    };

    const handleCancelButton = () => {
        setEditMode(false);
        setSelectedCar(null);
    };

    const formikRef = useRef(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Carros</Text>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    platenumber: "",
                    brand: "",
                    state: "",
                    dailyvalue: "",
                }}
                validationSchema={validationSchema}
                onSubmit={editMode ? handleEdit : handleAdd}
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
                            placeholder="Número de Placa"
                            onChangeText={handleChange("platenumber")}
                            onBlur={handleBlur("platenumber")}
                            value={values.platenumber}
                        />
                        {touched.platenumber && errors.platenumber && (
                            <Text style={styles.error}>
                                {errors.platenumber}
                            </Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Marca"
                            onChangeText={handleChange("brand")}
                            onBlur={handleBlur("brand")}
                            value={values.brand}
                        />
                        {touched.brand && errors.brand && (
                            <Text style={styles.error}>{errors.brand}</Text>
                        )}

                        {/* El State debe ser un Picker que tiene dos opciones "Disponible" y "No disponible" */}

                        <Picker
                            selectedValue={values.state}
                            style={styles.input}
                            onValueChange={handleChange("state")}
                        >
                            <Picker.Item label="Disponible" value="Disponible" />
                            <Picker.Item label="No disponible" value="No disponible" />
                        </Picker> 

                        {touched.state && errors.state && (
                            <Text style={styles.error}>{errors.state}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Valor Diario"
                            onChangeText={handleChange("dailyvalue")}
                            onBlur={handleBlur("dailyvalue")}
                            value={values.dailyvalue}
                            keyboardType="numeric"
                        />
                        {touched.dailyvalue && errors.dailyvalue && (
                            <Text style={styles.error}>
                                {errors.dailyvalue}
                            </Text>
                        )}

                        <Button
                            title={editMode ? "Actualizar" : "Agregar"}
                            onPress={handleSubmit}
                        />

                        {editMode && (
                            <Button
                                title="Cancelar"
                                onPress={handleCancelButton}
                                color="red"
                            />
                        )}
                    </>
                )}
            </Formik>

            <View style={styles.carsContainer}>
                <Text style={styles.subtitle}>Lista de Carros</Text>
                {cars.map((car) => (
                    <View key={car.id} style={styles.carContainer}>
                        <Text>Número de Placa: {car.platenumber}</Text>
                        <Text>Marca: {car.brand}</Text>
                        <Text>Estado: {car.state}</Text>
                        <Text>Valor Diario: {car.dailyvalue}</Text>
                        {!editMode && (
                            <>
                                <Button
                                    title="Editar"
                                    onPress={() => handleEditButton(car)}
                                />
                                <Button
                                    title="Eliminar"
                                    onPress={() => handleDelete(car.id)}
                                    color="red"
                                />
                            </>
                        )}
                    </View>
                ))}
            </View>
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
    carContainer: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
    },
    carsContainer: {
        flex: 1,
        width: "100%",
        marginTop: 16,
        overflow: "scroll",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
};

export default Cars;
