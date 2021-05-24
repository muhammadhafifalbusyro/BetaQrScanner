import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  Touchable,
  ToastAndroid,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

class Result extends React.Component {
  state = {
    link: this.props.route.params.link,
  };
  visitSite = () => {
    const link = this.state.link;
    if (link.includes("://")) {
      Linking.openURL(data);
    } else {
      Linking.openURL(`http://www.google.com/search?q=${link}`);
    }
  };
  copyToCLipboard = () => {
    Clipboard.setString(this.state.link);
    ToastAndroid.show(
      "Copy to clipboard",
      ToastAndroid.CENTER,
      ToastAndroid.SHORT
    );
  };
  render() {
    const link = this.state.link;
    const newLink = [];
    for (let x = 0; x <= 3; x++) {
      if (x <= 29) {
        newLink.push(link[x]);
      } else {
        newLink.push(" ...");
      }
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f3f5" />
        <View style={styles.header}>
          <Text style={styles.textHeader}>Result</Text>
        </View>
        <View style={{ width: "100%", padding: 10 }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View
                style={{
                  height: 40,
                  width: "80%",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <Text style={{ color: "grey" }}>
                  {this.state.link.length <= 30 ? this.state.link : newLink}
                </Text>
              </View>
              <TouchableNativeFeedback onPress={() => this.copyToCLipboard()}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    elevation: 3,
                  }}
                >
                  <Icon name="clipboard" size={30} color="grey" />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View
              style={{
                width: "100%",
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.goBack()}
              >
                <View
                  style={{
                    height: 40,
                    width: "45%",
                    backgroundColor: "orange",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Back
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => this.visitSite()}>
                <View
                  style={{
                    height: 40,
                    width: "45%",
                    backgroundColor: "#4287f5",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Visit Site
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
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
