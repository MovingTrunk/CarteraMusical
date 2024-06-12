// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* Cartera.js se encarga de visualizar el listado de canciones catalogadas por el usuario. 
   Desde esta pantalla es posible acceder al detalle de cada canción. */  

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles.js';

const Cartera = ({ navigation }) => {
  const [datos, setDatos] = useState([]);

 useEffect(() => {
    cargarDatosGuardados();
  }, []);

  const cargarDatosGuardados = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const datosArray = await AsyncStorage.multiGet(keys);
      const datosParseados = datosArray.map(([key, value]) => JSON.parse(value));
      setDatos(datosParseados);
      console.log('Datos recuperados de AsyncStorage:', datosParseados);
    } catch (error) {
      console.error('Error al cargar datos desde AsyncStorage:', error);
    }
  };

  const controlarItemClick = (item) => {
    // Contiene las acciones a realizar cuando se hace clic en un elemento de la lista de Mi Cartera Musical
    // Navega a la pantalla de detalle_cancion y pasa los datos del elemento clicado
    navigation.navigate('DetalleCancion', { item });
    console.log('Elemento clicado:', item);
  };

  const renderizarBoton = (item) => {
    return (
      <TouchableOpacity onPress={() => controlarItemClick(item)}>
        <Text style={styles.button}>{item.titulo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Cartera Musical</Text>
      {datos.length === 0 ? (
      <View style={styles.container}>
      {/* Image source: https://icon-icons.com/es/icono/cuadro-vacío-reproducir-botón-video/112670 Author: ReactiveDoodles App */}
      <Image
        style={styles.image}
        source={require('../assets/carteraVacia.png')}
        resizeMode="contain"
      />
      <Text style={styles.emptyMessage}>Tu cartera está vacía</Text>
      </View>
    ) : (
      <FlatList
        data={datos}
        renderItem={({ item }) => renderizarBoton(item)}
        keyExtractor={(item, index) => index.toString()} 
      />
    )}
      {/* con keyExtractor se extrae de cada item de la lista, su clave (index), en este caso será el título de la canción, y se convierte a cadena de texto */}
    </View>
  );
};


export default Cartera;
