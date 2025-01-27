import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function ServiceProviders() {
  const [providers, setProviders] = useState([
    { id: "1", name: "mmdmv", contact: "7020754395" },
  ]);
  const [providerName, setProviderName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProvider = () => {
    if (providerName && contactNumber) {
      setProviders([
        ...providers,
        {
          id: Math.random().toString(),
          name: providerName,
          contact: contactNumber,
        },
      ]);
      setProviderName("");
      setContactNumber("");
      setDescription("");
    }
  };

  const handleDeleteProvider = (id: any) => {
    setProviders(providers.filter((provider) => provider.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0FDF4]">
      {/* Header */}
      <View className="flex-row items-center bg-emerald-900 p-4">
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold ml-4">
          Service Providers
        </Text>
      </View>

      {/* Provider Details Section */}
      <View className="p-4 bg-white rounded-md m-4 shadow-md">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          Service Provider Details
        </Text>

        {/* Input Fields */}
        <View className="space-y-4">
          {/* Provider Name */}
          <View className="flex-row items-center bg-[#F0FDF4] border border-gray-300 rounded-md px-3 py-2">
            <AntDesign name="user" size={20} color="gray" />
            <TextInput
              placeholder="Provider Name"
              value={providerName}
              onChangeText={setProviderName}
              className="flex-1 ml-3 text-gray-800"
            />
          </View>

          {/* Contact Number */}
          <View className="flex-row items-center bg-[#F0FDF4] border border-gray-300 rounded-md px-3 py-2">
            <AntDesign name="phone" size={20} color="gray" />
            <TextInput
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={setContactNumber}
              className="flex-1 ml-3 text-gray-800"
            />
          </View>

          {/* Description */}
          <View className="flex-row items-center bg-[#F0FDF4] border border-gray-300 rounded-md px-3 py-2">
            <MaterialIcons name="description" size={20} color="gray" />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              className="flex-1 ml-3 text-gray-800"
            />
          </View>
        </View>

        {/* Add Provider Button */}
        <TouchableOpacity
          onPress={handleAddProvider}
          className="bg-emerald-700 py-3 rounded-md mt-6"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Add Provider
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Service Providers */}
      <View className="p-4">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          List of Service Providers
        </Text>
        <FlatList
          data={providers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-white p-4 rounded-md mb-2 shadow">
              <View>
                <Text className="text-gray-800 font-semibold">{item.name}</Text>
                <Text className="text-gray-500">{item.contact}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteProvider(item.id)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
