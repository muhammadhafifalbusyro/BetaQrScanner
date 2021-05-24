import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

class Splash extends React.Component {
  componentDidMount = () => {
    // Remember the timer handle
    this.timerHandle = setTimeout(() => {
      this.props.navigation.replace("MainScreen");
      this.timerHandle = 0;
    }, 4000);
  };
  componentWillUnmount = () => {
    // Is our timer running?
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="#5894f5" />
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/reader.png")}
            style={styles.icon}
          />
          <Text style={styles.textIcon}>BetaBarcodeScanner</Text>
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.loading}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4287f5",
    justifyContent: "center",
    alignItems: "center",
  },
  textIcon: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  textIcon2: {
    color: "white",
  },
  loading: {
    marginTop: 10,
  },
  icon: {
    resizeMode: "contain",
    height: 100,
    width: 100,
  },
});
