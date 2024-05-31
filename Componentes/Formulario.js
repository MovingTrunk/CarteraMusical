// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* Formulario.js se encarga de visualizar el formulario que permite introducir los datos para catalogar y guardar una nueva canción */  

import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles.js';
import Cartera from './Cartera.js'
import * as ImagePicker from 'expo-image-picker';

const Formulario = ({ navigation }) => {

  //State para los datos del formulario.
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
  const handleGuardar = async () => {
    if (!datos.titulo) {
      alert('Por favor, introduce el título de la canción.');
      return;
    }
    try {
      const datosCadena = JSON.stringify(datos); //Convertimos el objeto "datos" en una cadena.
      await AsyncStorage.setItem(datos.titulo, datosCadena)
      console.log('Datos de la canción guardados:', datosCadena);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  //State para el control de los datos introducidos en el formulario
  const handleChange = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
  };

  //Selección de video de la galería del móvil
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    //Añado la ruta de almacenamiento del video en el móvil al objeto datos.
    if (!result.canceled) {
      handleChange('videoURI', result.assets[0].uri)
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
          onChangeText={(text) => handleChange('titulo', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Autor</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿De quién es la canción?"
          value={datos.autor}
          maxLength={50}
          onChangeText={(text) => handleChange('autor', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fecha de grabación</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿Qué día la grabaste?"
          value={datos.fecha}
          maxLength={50}
          onChangeText={(text) => handleChange('fecha', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Instrumento</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿Qué instrumento has usado?"
          value={datos.instrumento}
          maxLength={50}
          onChangeText={(text) => handleChange('instrumento', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Estilo</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="Selecciona..."
          value={datos.estilo}
          onChangeText={(text) => handleChange('estilo', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dificultad</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="Selecciona..."
          value={datos.dificultad}
          onChangeText={(text) => handleChange('dificultad', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tiempo de aprendizaje</Text>
        <TextInput style={{ textAlign: 'center' }}
          placeholder="¿Cuánto tiempo tardaste en aprenderla?"
          value={datos.tiempoAprendizaje}
          maxLength={50}
          onChangeText={(text) => handleChange('tiempoAprendizaje', text)}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Resultado</Text>
        <TextInput style={{ textAlign: 'center', marginBottom: 30 }}
          placeholder="Selecciona..."
          value={datos.resultado}
          onChangeText={(text) => handleChange('resultado', text)}
        />
        <TouchableOpacity
          onPress={pickImage} // Llama directamente a la función pickImage
          style={styles.mainButtons2}>
          <Text style={styles.text}>Selecciona tu video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { handleGuardar() }}
          style={styles.mainButtons}>
          <Text style={styles.text}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Formulario;