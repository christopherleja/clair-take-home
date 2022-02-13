import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./src/screens/SearchScreen";
import SearchResultsScreen from "./src/screens/SearchResultsScreen";

export default function App() {
  const navRef = useRef(null);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={SearchResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
