// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* Home.js se encarga de visualizar la pantalla de inicio/bienvenida de la aplicación. 
   Desde esta pantalla es posible acceder al listado de canciones y añadir una nueva */  

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native'; //¿ES REALMENTE FlatList LO QUE NECESITO EN ESTE CASO?
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles.js';

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
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