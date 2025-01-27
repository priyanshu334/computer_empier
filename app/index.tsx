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
      <View className="flex flex-row items-center bg-emerald-900 p-4">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text className="absolute left-0 right-0 text-center text-white text-lg font-bold">
          All Record
        </Text>

        {/* Right-side Buttons */}
        <View className="flex flex-row gap-4 ml-auto">
          {/* Dropdown Button */}
          <TouchableOpacity>
            <AntDesign name="arrowdown" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Sync Button */}
          <TouchableOpacity>
            <AntDesign name="sync" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Filter Section */}
      <View className="flex-1">
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
