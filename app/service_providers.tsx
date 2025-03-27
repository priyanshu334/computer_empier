import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useServiceProviders } from "../hooks/useServiceProvider";
import { router } from "expo-router";

interface ServiceProvider {
  id: string;
  name: string;
  contact: string;
  description?: string;
}

export default function ServiceProviders() {
  const { providers, addOrUpdateProvider, deleteProvider } = useServiceProviders();
  const [providerName, setProviderName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingProvider, setEditingProvider] = useState<ServiceProvider | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleAddOrEditProvider = () => {
    if (providerName && contactNumber) {
      const newProvider: ServiceProvider = {
        id: editingProvider ? editingProvider.id : Math.random().toString(),
        name: providerName,
        contact: contactNumber,
        description,
      };

      addOrUpdateProvider(newProvider);

      setProviderName("");
      setContactNumber("");
      setDescription("");
      setEditingProvider(null);
    }
  };

  const handleEditProvider = (provider: ServiceProvider) => {
    setProviderName(provider.name);
    setContactNumber(provider.contact);
    setDescription(provider.description || "");
    setEditingProvider(provider);
  };

  const handleUploadToAppwrite = async () => {
    setIsSyncing(true);
    try {
      for (const provider of providers) {
        await addOrUpdateProvider(provider);
      }
    } catch (error) {
      console.error("Error uploading providers:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDownloadFromAppwrite = async () => {
    setIsSyncing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0FDF4]">
      {/* Header with sync buttons */}
      <View className="flex-row justify-between items-center bg-emerald-900 p-4 border-b-[1px]">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold absolute left-0 right-0 text-center">
          Service Providers
        </Text>
        <View className="flex-row">
          <TouchableOpacity 
            onPress={handleDownloadFromAppwrite} 
            className="mr-4"
            disabled={isSyncing}
          >
            {isSyncing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <AntDesign name="download" size={24} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleUploadToAppwrite}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <AntDesign name="upload" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Provider Form Section */}
      <View className="p-4 bg-white rounded-md m-4 shadow-md">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          {editingProvider ? "Edit Provider" : "New Provider"}
        </Text>

        <View className="flex flex-col gap-2">
          <View className="flex-row items-center bg-[#F0FDF4] border border-gray-300 rounded-md px-3 py-2">
            <AntDesign name="user" size={20} color="gray" />
            <TextInput
              placeholder="Provider Name"
              value={providerName}
              onChangeText={setProviderName}
              className="flex-1 ml-3 text-gray-800"
            />
          </View>

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

        <TouchableOpacity
          onPress={handleAddOrEditProvider}
          className="bg-emerald-700 py-3 rounded-md mt-6"
        >
          <Text className="text-center text-white font-semibold text-lg">
            {editingProvider ? "Save Changes" : "Add Provider"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Providers List */}
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
                <TouchableOpacity 
                  onPress={() => handleEditProvider(item)} 
                  className="mr-4"
                >
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