import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useServiceProviders } from "../hooks/useServiceProvider"; // Import the custom hook
import { router } from "expo-router";

// Type definition for a service provider
interface ServiceProvider {
  id: string;
  name: string;
  contact: string;
  description?: string;
}

export default function ServiceProviders() {
  const { providers, addOrUpdateProvider, deleteProvider } = useServiceProviders(); // Use the custom hook
  const [providerName, setProviderName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingProvider, setEditingProvider] = useState<ServiceProvider | null>(null);

  // Add or update a service provider
  const handleAddOrEditProvider = () => {
    if (providerName && contactNumber) {
      const newProvider: ServiceProvider = {
        id: editingProvider ? editingProvider.id : Math.random().toString(),
        name: providerName,
        contact: contactNumber,
        description,
      };

      addOrUpdateProvider(newProvider); // Use the custom hook's method to save the provider

      // Clear form
      setProviderName("");
      setContactNumber("");
      setDescription("");
      setEditingProvider(null); // Reset editing state
    }
  };

  // Edit a service provider
  const handleEditProvider = (provider: ServiceProvider) => {
    setProviderName(provider.name);
    setContactNumber(provider.contact);
    setDescription(provider.description || "");
    setEditingProvider(provider);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0FDF4]">
      {/* Header */}
      <View className="flex-row justify-start items-center bg-emerald-900 p-4 border-b-[1px]">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold absolute left-0 right-0 text-center">
          Service Providers
        </Text>
      </View>

      {/* Provider Details Section */}
      <View className="p-4 bg-white rounded-md m-4 shadow-md">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          {editingProvider ? "Edit Service Provider" : "New Service Provider"}
        </Text>

        {/* Input Fields */}
        <View className="flex flex-col gap-2">
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

        {/* Add or Save Provider Button */}
        <TouchableOpacity
          onPress={handleAddOrEditProvider}
          className="bg-emerald-700 py-3 rounded-md mt-6"
        >
          <Text className="text-center text-white font-semibold text-lg">
            {editingProvider ? "Save Changes" : "Add Provider"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Service Providers */}
      <View className="p-4">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          Service Providers
        </Text>
        <FlatList
          data={providers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-white p-4 rounded-md mb-2 shadow">
              <View>
                <Text className="text-gray-800 font-semibold">{item.name}</Text>
                <Text className="text-gray-500">{item.contact}</Text>
                {item.description && (
                  <Text className="text-gray-500">{item.description}</Text>
                )}
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity onPress={() => handleEditProvider(item)} className="mr-4">
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteProvider(item.id)}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
