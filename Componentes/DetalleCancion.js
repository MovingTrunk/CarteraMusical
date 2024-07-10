// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* DetalleCancion.js se encarga de visualizar los datos asociados a una canción ya catalogada por el usuario. 
   Permite reproducir el video de la cancion, y eliminar la canción. */

//Import de librerias y componentes a utilizar   
import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles.js';

// Definición del componente DetalleCancion
// route: información sobre la ruta actual.
// navigation: permite navegar entre pantallas.
const DetalleCancion = ({ route, navigation }) => {
    // Obteniendo los datos de la canción desde las props de la ruta
    // route.params contiene un objeto con la información de la canción (item) que se va a mostrar en detalle.
    const { item } = route.params;

    // Definición de la función confirmarEliminacion, que toma el parámetro 'titulo' en referencia al título de la canción a eliminar.
    const confirmarEliminacion = (titulo) => {
        Alert.alert(
            ' ', // No se incluye título para la alerta
            `¿Estás seguro de que deseas eliminar la canción "${titulo}"?`, // Se personaliza el mensaje con el título de la canción recibido por parámetro.
            [
                // Definición de los botones
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    // Al pulsar el botón Eliminar se ejecuta la función eliminarTitulo pasándole el título de la canción como parámetro.
                    onPress: () => eliminarTitulo(titulo), 
                },
            ],
            { cancelable: false } // Evita que se pueda cancelar la alerta pulsando fuera de la misma.
        );
    };

    // Definición de la función eliminarTitulo, que recibe el parámetro 'titulo' desde confirmarEliminacion .
    const eliminarTitulo = async (titulo) => {
        try {
            // Elimina el elemento almacenado con la clave 'titulo' usando AsyncStorage
            await AsyncStorage.removeItem(titulo);
            Alert.alert('¡ELIMINADA!', `La canción "${titulo}" se ha eliminado de tu Cartera`, // Mensaje de confirmación.
                [
                    {
                        text: 'OK',
                        // Navegación automática a Home tras confirmar mensaje de eliminación.
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
            {/* Creación de TouchableOpacity para el botón "Reproducir Video", que navega a VerVideo pasándole el videoURI como parámetro */}
            {item.videoURI && (
                <TouchableOpacity style={styles.mainButtons3} onPress={() => navigation.navigate('VerVideo', { videoURI: item.videoURI })}>
                    <Text style={styles.text}>Reproducir Video    </Text>
                    {/* Image source: https://icon-icons.com/es/icono/iconfinder-video-editor-películas-producción/112661 Author: ReactiveDoodles App */}
                    <Image
                        style={{width:45, height:45, resizeMode: 'cover'}}
                        source={require('../assets/RepVideo.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
            {/* Creación de TouchableOpacity para el botón "Eliminar", que llama a confirmarEliminacion pasándole el título como parámetro */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => { confirmarEliminacion(item.titulo) }}>
                <Text style={{ color: 'white' }}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DetalleCancion;