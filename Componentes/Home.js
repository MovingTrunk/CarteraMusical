// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* Home.js se encarga de visualizar la pantalla de inicio/bienvenida de la aplicación. 
   Desde esta pantalla es posible acceder al listado de canciones y añadir una nueva */  

//Import de librerias y componentes a utilizar  
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles.js';

// Definición del componente Home
const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      {/* Image source: https://pixabay.com/es/vectors/silueta-musical-clave-bajo-3309171/ Author: Mohamed_hassan */}
      <Image
        style={styles.image} S
        source={require('../assets/silhouette-3309171_640.webp')}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bienvenido a Cartera Musical</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Formulario')}
        style={styles.mainButtons}>
        <Text style={styles.text}>Añadir canción</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cartera')}
        style={styles.mainButtons}>
        <Text style={styles.text}>Mi Cartera Musical</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;