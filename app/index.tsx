import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterComponent from "@/components/filter_section";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./_layout"; // Import the root stack params type

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, "Index">;

export default function Index() {
  const navigation = useNavigation<IndexScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row justify-center items-center bg-emerald-900 p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Go back to the previous screen
          className="absolute left-4"
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white font-semibold text-lg flex-1 text-center">
          All Record
        </Text>
        <View className="flex flex-row gap-4">
          {/* Dropdown Button */}
          <TouchableOpacity className="bg-white p-2 rounded-md">
            <AntDesign name="arrowdown" size={24} color="#000" />
          </TouchableOpacity>
          {/* Sync Button */}
          <TouchableOpacity className="bg-white p-2 rounded-md">
            <AntDesign name="sync" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Section */}
      <View className="flex-1 p-4">
        <FilterComponent />
      </View>

      {/* Navigation Button Example */}
      <View className="p-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("ServiceProviders")} // Navigate to "Service Providers" screen
          className="bg-emerald-700 p-4 rounded-md"
        >
          <Text className="text-white text-lg text-center">Go to Service Providers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
