import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useServiceProviders } from "../hooks/useServiceProvider";
import { useServiceProviders as useServiceProvidersApp } from "../hooks/useServiceProviderApp";

interface ServiceProviderType {
  id: string;
  $id?: string;
  name: string;
  contact: string;
  description?: string;
}

interface AppwriteServiceProviderType {
  $id: string;
  name: string;
  contact: string;
  description?: string;
}

export default function ServiceProviders() {
  const { 
    providers: localProviders, 
    addOrUpdateProvider: updateLocalProvider, 
    deleteProvider: deleteLocalProvider 
  } = useServiceProviders();
  
  const { 
    createServiceProvider,
    getAllServiceProviders,
    updateServiceProvider,
    deleteServiceProvider,
  } = useServiceProvidersApp();

  const [providerName, setProviderName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingProvider, setEditingProvider] = useState<ServiceProviderType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddOrEditProvider = () => {
    if (!providerName || !contactNumber) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const providerData: ServiceProviderType = {
      id: editingProvider?.id || Date.now().toString(),
      $id: editingProvider?.$id,
      name: providerName,
      contact: contactNumber,
      description
    };

    updateLocalProvider(providerData);
    resetForm();
  };

  const handleDeleteProvider = (provider: ServiceProviderType) => {
    Alert.alert(
      "Confirm Delete",
      `Delete ${provider.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => deleteLocalProvider(provider.id) 
        }
      ]
    );
  };

  const resetForm = () => {
    setProviderName("");
    setContactNumber("");
    setDescription("");
    setEditingProvider(null);
  };

  const uploadToAppwrite = async () => {
    setIsLoading(true);
    try {
      for (const provider of localProviders) {
        if (provider.$id) {
          await updateServiceProvider(provider.$id, {
            name: provider.name,
            contact: provider.contact,
            description: provider.description
          });
        } else {
          const newProvider = await createServiceProvider({
            name: provider.name,
            contact: provider.contact,
            description: provider.description
          });
          updateLocalProvider({
            ...provider,
            $id: newProvider.$id
          });
        }
      }
      Alert.alert("Success", "All providers uploaded to Appwrite");
    } catch (error) {
      Alert.alert("Error", "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFromAppwrite = async () => {
    setIsLoading(true);
    try {
      const cloudProviders: AppwriteServiceProviderType[] = await getAllServiceProviders();
      cloudProviders.forEach((provider: AppwriteServiceProviderType) => {
        updateLocalProvider({
          id: provider.$id,
          $id: provider.$id,
          name: provider.name,
          contact: provider.contact,
          description: provider.description
        });
      });
      Alert.alert("Success", "Providers downloaded from Appwrite");
    } catch (error) {
      Alert.alert("Error", "Download failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0FDF4]">
      <View className="flex-row justify-between items-center bg-emerald-900 p-4 border-b-[1px]">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text className="text-white text-lg font-bold absolute left-0 right-0 text-center">
          Service Providers
        </Text>
        
        <View className="flex-row">
          <TouchableOpacity 
            onPress={downloadFromAppwrite} 
            disabled={isLoading}
            className="mr-4"
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <AntDesign name="download" size={24} color="#fff" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={uploadToAppwrite} 
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <AntDesign name="upload" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4 bg-white rounded-md m-4 shadow-md">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          {editingProvider ? "Edit Service Provider" : "Add Service Provider"}
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
              placeholder="Description (Optional)"
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

      <View className="p-4">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          Service Providers ({localProviders.length})
        </Text>
        
        {localProviders.length === 0 ? (
          <Text className="text-gray-500 text-center py-4">
            No service providers added yet
          </Text>
        ) : (
          <FlatList
            data={localProviders}
            keyExtractor={(item: ServiceProviderType) => item.id}
            renderItem={({ item }: { item: ServiceProviderType }) => (
              <View className="flex-row items-center justify-between bg-white p-4 rounded-md mb-2 shadow">
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">{item.name}</Text>
                  <Text className="text-gray-500">{item.contact}</Text>
                  {item.description && (
                    <Text className="text-gray-500">{item.description}</Text>
                  )}
                  {item.$id && (
                    <Text className="text-xs text-gray-400">Synced with cloud</Text>
                  )}
                </View>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() => {
                      setEditingProvider(item);
                      setProviderName(item.name);
                      setContactNumber(item.contact);
                      setDescription(item.description || "");
                    }}
                    className="mr-4"
                  >
                    <AntDesign name="edit" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteProvider(item)}>
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}