// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* VerVideo.js se encarga de reproducir el video asociado a una canción */  

import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Asset } from 'expo-asset'; // Importa el módulo Asset de expo-asset para gestionar recursos locales
import { Video } from 'expo-av'; // Importa el componente Video de expo-av para reproducir videos

// Componente principal para controlar la visualización del video, que recibe la URI del video
const VerVideo = ({ route }) => {

    //console.log(route.params);
    const { videoURI } = route.params; // Extrae el URI del video desde los parámetros de la ruta

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Reproduciendo Video</Text>
            <VideoPlayer videoURI={videoURI} />
        </View>
    );
};

// Componente que se encarga de cargar y reproducir el video
const VideoPlayer = ({ videoURI }) => {
    const [videoLoaded, setVideoLoaded] = React.useState(false); // Estado para controlar si el video se ha cargado

    // useEffect que se ejecuta cuando el componente se monta o cuando cambia el URI del video
    React.useEffect(() => {
        const loadVideo = async () => {
            const asset = Asset.fromURI(videoURI); // Crea un nuevo asset desde el URI del video
            await asset.downloadAsync(); // Descarga el asset del video
            setVideoLoaded(true); // Actualiza el estado indicando que el video se ha cargado
        };

        loadVideo();
    }, [videoURI]);

    if (!videoLoaded) {
        return <Text>Cargando video...</Text>;
    }

    return (
        <Video
            source={{ uri: videoURI }}
            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            useNativeControls
            resizeMode="contain"
            shouldPlay
        />
    );
};

export default VerVideo;