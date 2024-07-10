// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* Formulario.js se encarga de visualizar el formulario que permite introducir los datos para catalogar y guardar una nueva canción */  

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles.js';
import * as ImagePicker from 'expo-image-picker';

// Definición del componente Formulario
const Formulario = ({ navigation }) => {

  // Definición del Hook useState para gestionar y almacenar los datos del formulario, inicializado con valores vacíos.
  const [datos, setDatos] = useState({
    titulo: '',
    autor: '',
    fecha: '',
    estilo: '',
    instrumento: '',
    dificultad: '',
    tiempoAprendizaje: '',
    resultado: '',
    videoURI: ''
  });

  //Función para gestionar el almacenamiento por medio de AsyncStorage de los datos introducidos en el Formulario
  const controlarGuardar = async () => {
    if (!datos.titulo) {
      // Alert informativo para título vacío.
      alert('Por favor, introduce el título de la canción.');
      return;
    }
    try {
      // Verificar si el título ya existe
      const tituloExistente = await AsyncStorage.getItem(datos.titulo);
      if (tituloExistente !== null) {
        Alert.alert(
          'Error',
          `La canción con el título "${datos.titulo}" ya existe.`,
          [{ text: 'OK' }]
        );
        return;
      }

      // Conversión del objeto "datos" en una cadena JSON.
      const datosCadena = JSON.stringify(datos); 
      // Almacenamiento de los datos en AsyncStorage usando el título como clave
      await AsyncStorage.setItem(datos.titulo, datosCadena)
      console.log('Datos de la canción guardados:', datosCadena);
      // Alerta de éxito y navegación a la pantalla 'Cartera'
      Alert.alert(
        '¡ENHORABUENA!',
        `La canción "${datos.titulo}" se ha añadido a tu Cartera`,
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Cartera')
          }
        ]
      );
      // Cualquier error que ocurra durante el almacenamiento
    } catch (error) {
      console.log(error.message);
    }
  };

  // Función para actualizar los datos del formulario en el state
  const controlarCambios = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
  };

  // Función para seleccionar un video de la galería del móvil
  const pickImage = async () => {
    // Lanza el selector de imágenes para seleccionar videos
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // sólo videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // Nivel más alto de calidad
    });

    console.log(result);

    // Añado la ruta de almacenamiento del video en el móvil al objeto datos (si el usuario no cancela).
    if (!result.canceled) {
      controlarCambios('videoURI', result.assets[0].uri)
      Alert.alert(
        'Video seleccionado',
        'Se ha seleccionado el video correctamente.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Título de la canción</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="Introduce el título de la canción"
          value={datos.titulo}
          maxLength={50}
          onChangeText={(text) => controlarCambios('titulo', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Autor</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿De quién es la canción?"
          value={datos.autor}
          maxLength={50}
          onChangeText={(text) => controlarCambios('autor', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fecha de grabación</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿Qué día la grabaste?"
          value={datos.fecha}
          maxLength={50}
          onChangeText={(text) => controlarCambios('fecha', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Instrumento</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿Qué instrumento has usado?"
          value={datos.instrumento}
          maxLength={50}
          onChangeText={(text) => controlarCambios('instrumento', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Estilo</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="Selecciona..."
          value={datos.estilo}
          onChangeText={(text) => controlarCambios('estilo', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dificultad</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="Selecciona..."
          value={datos.dificultad}
          onChangeText={(text) => controlarCambios('dificultad', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tiempo de aprendizaje</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿Cuánto tiempo tardaste en aprenderla?"
          value={datos.tiempoAprendizaje}
          maxLength={50}
          onChangeText={(text) => controlarCambios('tiempoAprendizaje', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Resultado</Text>
        <TextInput style={{ textAlign: 'center', marginBottom: 30 }}
          placeholder="Selecciona..."
          value={datos.resultado}
          onChangeText={(text) => controlarCambios('resultado', text)}
        />
        <TouchableOpacity
          onPress={pickImage} // Llama directamente a la función pickImage
          style={styles.mainButtons2}>
          <Text style={styles.text}>Selecciona tu video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { controlarGuardar() }}
          style={styles.mainButtons}>
          <Text style={styles.text}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Formulario;