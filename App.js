// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* App.js se encarga de gestionar las pantallas a las que se puede navegar en la aplicación */  

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Formulario from './Componentes/Formulario.js';
import Cartera from './Componentes/Cartera.js';
import Home from './Componentes/Home.js';
import DetalleCancion from './Componentes/DetalleCancion.js';
import VerVideo from  './Componentes/VerVideo.js';

// Creación del objeto Stack que contiene las propiedades y métodos para configurar y controlar la navegación entre pantallas
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: ''
          }}
        />
        <Stack.Screen
          name="Formulario"
          component={Formulario}
          options={{ title: 'Nueva canción' }}
        />
        <Stack.Screen name="Cartera"
          component={Cartera}
          options={{ title: 'Mi Cartera Musical' }} 
        />
        <Stack.Screen
          name="DetalleCancion"
          component={DetalleCancion}
          options={{ title: 'Canción'
          }}
        />
        <Stack.Screen
          name="VerVideo"
          component={VerVideo}
          options={{ title: 'Video'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;