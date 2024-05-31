// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* DetalleCancion.js se encarga de visualizar los datos asociados a una canción ya catalogada por el usuario. 
   Permite reproducir el video de la cancion, y eliminar la canción. */  

import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Video from 'react-native-video';
import styles from '../styles.js';

const DetalleCancion = ({ route, navigation }) => {
    // Obteniendo los datos de la canción desde las props de la ruta
    const { item } = route.params;

    const confirmarEliminacion = (titulo) => {
        Alert.alert(
            ' ',
            `¿Estás seguro de que deseas eliminar la canción "${titulo}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => eliminarTitulo(titulo),
                },
            ],
            { cancelable: false }
        );
    };

    const eliminarTitulo = async (titulo) => {
        try {
            await AsyncStorage.removeItem(titulo);
            Alert.alert('¡ELIMINADA!', `La canción "${titulo}" se ha eliminado de tu Cartera`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Home')
                    }
                ]
            );
            console.log(`Elemento con el título "${titulo}" ha sido eliminado.`);
        } catch (error) {
            console.error(`Error al eliminar el elemento con el título "${titulo}":`, error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{item.titulo}</Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Autor:</Text> {item.autor}
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Fecha de grabación:</Text> {item.fecha}
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Instrumento:</Text> {item.instrumento}
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Estilo:</Text> {item.estilo}
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Dificultad:</Text> {item.dificultad}
            </Text>
            <Text>
                <Text style={{ fontWeight: 'bold' }}>Tiempo de aprendizaje:</Text> {item.tiempoAprendizaje}
            </Text>
            <Text style={{ marginBottom: 30 }}>
                <Text style={{ fontWeight: 'bold' }}>Resultado:</Text> {item.resultado}
            </Text>
            <TouchableOpacity style={styles.mainButtons3} onPress={() => navigation.navigate('VerVideo', { videoURI: item.videoURI })}>
                <Text style={styles.text}>Reproducir Video    </Text>
                <Image
                    style={{width:45, heigh:45, resizeMode: 'cover'}}
                    source={require('../assets/RepVideo.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => { confirmarEliminacion(item.titulo) }}>
                <Text style={{ color: 'white' }}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DetalleCancion;