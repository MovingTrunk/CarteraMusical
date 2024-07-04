// Este proyecto ha sido desarrollado como parte del Trabajo de Fin de Estudio, en el Grado en Ingeniería Informática de UNIR.

/* styles.js contiene la definición de los distintos estilos que van a utilizarse en las distintas partes de la aplicación */  

import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight
  },
  deleteButton: {
    backgroundColor: 'darkred',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    color: 'white',
    marginBottom: 10,
    width: 300,
  },
  mainButtons: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 200,
  },
  mainButtons2: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    fontWeight: 'bold',
    marginBottom: 10
  },
  mainButtons3: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 10,
    flexDirection: 'row', // Alinear texto e imagen horizontalmente
    alignItems: 'center',
    height: 50,
  },
  image: {
    width: 350, // Ancho de la imagen
    height: 200, // Alto de la imagen
    alignSelf: 'center',
    resizeMode: 'cover',
    marginBottom: 80
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default styles;