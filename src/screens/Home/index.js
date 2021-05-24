import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  Image,
  TouchableNativeFeedback,
  Touchable,
  Dimensions,
  StatusBar,
} from "react-native";
import * as Linking from "expo-linking";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const heighDim = Dimensions.get("window").height;

class Home extends React.Component {
  state = {
    hasPermission: null,
    scanned: false,
    sound: null,
    historyList: [],
  };

  async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
    this.sound = new Audio.Sound();
    this.sound.loadAsync(require("../../../assets/beep.mp3"));
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.state.historyList.push(data);
    AsyncStorage.setItem("history", JSON.stringify(this.state.historyList));

    this.setState({ scanned: true });
    this.sound.setPositionAsync(0);
    this.sound.playAsync();
    this.props.navigation.navigate("Result", {
      link: data,
    });
  };
  handleAlert = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => false,
        style: "cancel",
      },
      { text: "OK", onPress: () => this.handleBarCodeScanned() },
    ]);
  };
  render() {
    setTimeout(() => {
      AsyncStorage.getItem("history").then((value) => {
        if (value != null) {
          const history = JSON.parse(value);
          this.setState({ historyList: history });
        }
      });
    }, 1000);
    const { hasPermission, scanned } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#f2f3f5" />
          <View style={styles.header}>
            <Text style={styles.textHeader}>Home</Text>
          </View>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <TouchableNativeFeedback
              onPress={() => this.setState({ scanned: false })}
            >
              <View style={styles.button}>
                <Text style={styles.textButton}>Repeat Scan</Text>
              </View>
            </TouchableNativeFeedback>
          )}
          <Image
            source={require("../../../assets/scan.gif")}
            style={styles.imageScan}
          />
        </View>
      );
    }
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    height: 50,
    width: "90%",
    backgroundColor: "#4287f5",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  textButton: {
    fontWeight: "bold",
    color: "white",
  },
  imageScan: {
    height: heighDim / 4,
    width: heighDim / 4,
    alignSelf: "center",
  },
  header: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444444",
  },
});
