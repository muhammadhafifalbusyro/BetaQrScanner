import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

class History extends React.Component {
  state = {
    historyList: [],
    id: "",
  };
  delete = (id) => {
    let newDelete = this.state.historyList.filter((value, key) => {
      return key != id;
    });
    this.setState({ historyList: newDelete });
    AsyncStorage.setItem("history", JSON.stringify(newDelete));
  };
  render() {
    setTimeout(() => {
      AsyncStorage.getItem("history").then((value) => {
        if (value != null) {
          this.setState({ historyList: JSON.parse(value) });
        }
      });
    }, 1000);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f3f5" />
        <View style={styles.header}>
          <Text style={styles.textHeader}>History</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        >
          {this.state.historyList.map((value, key) => {
            return (
              <View
                key={key}
                style={{
                  height: 70,
                  width: "90%",
                  backgroundColor: "white",
                  borderRadius: 5,
                  elevation: 5,
                  margin: 5,
                  padding: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/reader.png")}
                  style={{ height: 40, width: 40 }}
                />
                <Text
                  style={{
                    color: "grey",
                    textAlign: "left",
                    width: "60%",
                  }}
                >
                  {value}
                </Text>
                <Icon
                  name="trash"
                  size={30}
                  color="red"
                  onPress={() => this.delete(key)}
                />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default History;
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
