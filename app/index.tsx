import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterComponent from "@/components/filter_section";
import SplashScreen from "@/components/SplashScreen";
import { useRouter } from "expo-router";

export default function Index() {
  const [isSplashVisible, setSplashVisible] = useState(true); // State for splash screen visibility
  const router = useRouter();

  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setSplashVisible(false)} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row justify-center items-center bg-emerald-900 p-4">
        <TouchableOpacity
          onPress={() => router.back()} // Navigate back
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

      {/* Navigation Buttons */}
      <View className="p-4">
        <TouchableOpacity
          onPress={() => router.push("./service_providers")}
          className="bg-emerald-700 p-4 rounded-md"
        >
          <Text className="text-white text-lg text-center">Go to Service Providers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("./service_center")}
          className="bg-emerald-700 p-4 rounded-md my-8"
        >
          <Text className="text-white text-lg text-center">Go to Service Center</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("./All_orders")}
          className="bg-emerald-700 p-4 rounded-md my-8"
        >
          <Text className="text-white text-lg text-center">All orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
