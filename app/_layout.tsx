import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index"; // Import your Index component
import ServiceProviders from "./service_provider"; // Import your Service Providers component

// Define types for the navigation
export type RootStackParamList = {
  Index: undefined;
  ServiceProviders: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen
          name="Index"
          component={Index}
          options={{ headerShown: false }} // Hide header for Index screen
        />
        <Stack.Screen
          name="ServiceProviders"
          component={ServiceProviders}
          options={{ title: "Service Providers" }} // Set the header title for ServiceProviders
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
