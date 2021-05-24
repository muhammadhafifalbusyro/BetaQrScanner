import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Splash from "../screens/Splash";
import History from "../screens/History";
import Icon from "react-native-vector-icons/Feather";
import Result from "../screens/Result";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let sizeIcon;

          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home";
            sizeIcon = size;
          } else if (route.name === "History") {
            iconName = focused ? "clock" : "clock";
            sizeIcon = size;
          }
          return <Icon name={iconName} size={sizeIcon} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4287f5",
        inactiveTintColor: "grey",
        showLabel: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}
function CoreNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CoreNavigation;
