import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Color, colors, fonts, windowWidth } from '../../utils';
import { MYAPP } from '../../utils/localStorage';

export default function MyImageUpload({ label, onFileChange }) {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        onFileChange(`data:${selectedImage.type};base64,${selectedImage.base64}`)
        setImageUri(`data:${selectedImage.type};base64,${selectedImage.base64}`);
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };



  // Function to handle capturing an image using the camera
  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // Include Base64 encoding for better handling of the image
    };
    Alert.alert(MYAPP, 'Silahkan pilih ambil gambar', [
      { text: 'BATAL' },
      {
        text: 'KAMERA',
        onPress: () => {
          launchCamera({
            ...options,
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 500,
          }, (response) => {

            if (response.didCancel) {
              console.log('User cancelled camera');
            } else if (response.errorMessage) {
              console.log('Camera Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
              const capturedImage = response.assets[0];
              onFileChange(`data:${capturedImage.type};base64,${capturedImage.base64}`)
              setImageUri(`data:${capturedImage.type};base64,${capturedImage.base64}`);
            }
          });
        }
      },
      {
        text: 'GALERI',
        onPress: () => {
          launchImageLibrary({
            ...options,
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 500,
          }, (response) => {

            if (response.didCancel) {
              console.log('User cancelled camera');
            } else if (response.errorMessage) {
              console.log('Camera Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
              const capturedImage = response.assets[0];
              onFileChange(`data:${capturedImage.type};base64,${capturedImage.base64}`)
              setImageUri(`data:${capturedImage.type};base64,${capturedImage.base64}`);
            }
          });
        }
      }
    ])
  };

  useEffect(() => {
    requestCameraPermission();
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>

      {/* Display the selected or captured image */}
      {imageUri && (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        </View>
      )}

      <View style={{ padding: 10, borderRadius: 10, borderColor: Color.blueGray[300], borderWidth: 1 }}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Upload File</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,


  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    color: colors.primary,
    fontFamily: fonts.primary[400]
  },
  image: {
    width: '100%',
    height: 220,
    // borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'stretch'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Color.blueGray[300],
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: "center"
  },
});
