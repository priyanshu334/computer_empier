import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterComponent from "@/components/filter_section";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="">
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
      <FilterComponent />

      <ScrollView>
        {/* Navigation Button Example */}
        <View className="p-4">
          <TouchableOpacity
            onPress={() => router.push("./service_providers")} // Navigate to Service Providers
            className="bg-emerald-700 p-4 rounded-md"
          >
            <Text className="text-white text-lg text-center">
              Go to Service Providers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("./service_center")} // Navigate to Service Providers
            className="bg-emerald-700 p-4 rounded-md my-8"
          >
            <Text className="text-white text-lg text-center">
              Go to Service Center
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("./All_orders")} // Navigate to Service Providers
            className="bg-emerald-700 p-4 rounded-md my-8"
          >
            <Text className="text-white text-lg text-center">All orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
