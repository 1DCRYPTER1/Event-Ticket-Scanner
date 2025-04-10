import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity, Image } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

import logo from './assets/folksicaltemp.png'; 
// Import Axios for making API requests
import axios from 'axios';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not Yet Scanned')
  const [apiResponse, setApiResponse] =useState(null);
  //Newly Added
  const [showPopup, setShowPopup] = useState(false)

  const askForCameraPermission = () => {
    (async () =>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  } 

  // Request for Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the Bar code
  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true);
    setText(data);
    setShowPopup(true);
    //
    console.log('Type: '+ type + '\nData: '+data);
    //console.log('Type of data:', typeof data);
    try {
      const response = await axios.post('https://api-folksical.hexcode.tk/checkin', { ticket_id: data }, 
      {
        headers: {
          accept: 'application/json',
          auth: 'folksical',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      setApiResponse(JSON.stringify(response.data));
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error sending QR code data:', error);
      // console.log('Error response:', error.response);
      // console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
      // console.log('Error headers:', error.response.headers);
      setApiResponse(JSON.stringify(error.response.data));
      
    }
  }

  // Check permissions and return the screens
  if(hasPermission === null){
    return(
      <View style={styles.container}>
        <Text>Requesting for Camera Permission</Text>
      </View>
    )
  }

  if(hasPermission === false){
    return(
      <View style={styles.container}>
        <Text style={{margin: 10}}>No access to Camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} ></Button>
      </View>
    )
  }

  // Return the View
  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 550, width: 400 }}
        />
      </View>

      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
  
            <Text style={styles.popupText}>

              <Text>
                {apiResponse && JSON.parse(apiResponse).message
                  ? <Text style={{ color: 'green' }}>{JSON.parse(apiResponse).message}</Text>
                  : apiResponse && JSON.parse(apiResponse).detail
                    ? <Text style={{ color: '#cd6600' }}>{JSON.parse(apiResponse).detail}</Text>
                    : ''}
              </Text>
              {'\n\n'}

              <Text style={{ color: 'black', fontWeight: 'bold' }}>Name:</Text>{'\n'}
              <Text style={{ color: '#cd6600' }}>{apiResponse && JSON.parse(apiResponse).name}</Text>
              {'\n\n'}

              <Text style={{ color: 'black', fontWeight: 'bold' }}>Ticket ID:</Text>{'\n'}
              <Text style={{ color: '#cd6600'}}>{apiResponse && JSON.parse(apiResponse).ticket_id}</Text>
            
            </Text>
            
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                setScanned(false);
                setShowPopup(false);
              }}
            >
              <Text style={styles.popupButtonText}>Scan Again?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!showPopup && (
        <Text style={[styles.maintext, { textAlign: 'center' }]}>
          <Text style={{ fontWeight: 'bold' }}>Last Scanned:</Text>{'\n'}
          {text}
        </Text>
      )}

      {scanned && !showPopup && (
        <Button title={'Scan Again?'} onPress={() => setScanned(false)} color="#cd6600" />
      )}

      <Text style={styles.footerText}>Made in ❤️ for Folksical</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3d88d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },

  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  popup: {
    width: '100%',
    backgroundColor: '#f0b55b',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    height: '50%',
    justifyContent: 'space-between',
  },

  popupText: {
    fontSize: 25,
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  popupButton: {
    backgroundColor: '#cd6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center', // Align the button to the center horizontally
    marginTop: 'auto', // Push the button to the bottom of the popup
  },

  popupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerText: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },


  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 120,
  },

});
