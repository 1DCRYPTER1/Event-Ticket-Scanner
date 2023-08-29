import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not Yet Scanned')


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
  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: '+ type + '\nData: '+data)
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


  //Return the View

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>

      <BarCodeScanner 
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{ height: 550, width: 400 }}/>
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='#cd6600' />}
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
    backgroundColor: 'tomato'
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },
});
