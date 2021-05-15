import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';
import { BarCodeScanner } from 'expo-barcode-scanner';

class App extends React.Component{
  state={
    hasPermission:null,
    scanned:false
  }
  async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  }
 handleBarCodeScanned = ({ type, data }) => {
   this.setState({scanned:true})
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Linking.openURL(`http://www.google.com/search?q=${data}`);
  };
  render(){
    const{hasPermission,scanned}= this.state
    if (hasPermission=== null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else{
      return(
        <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({scanned:false})} />}
    </View>
  )
      
    }
    
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
