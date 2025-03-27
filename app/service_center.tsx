import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useServiceCenters } from "../hooks/useServiceCenters";
import { useServiceCenters as useServiceCentersApp } from "../hooks/useServiceCenterApp";

interface ServiceCenterType {
  id: string;
  $id?: string;
  name: string;
  contact: string;
  address: string;
}

interface AppwriteServiceCenterType {
  $id: string;
  name: string;
  contact: string;
  address: string;
}

export default function ServiceCenter() {
  const { 
    centers: localCenters, 
    addOrUpdateCenter: updateLocalCenter, 
    deleteCenter: deleteLocalCenter 
  } = useServiceCenters();
  
  const { 
    createServiceCenter,
    getAllServiceCenters,
    updateServiceCenter,
    deleteServiceCenter,
  } = useServiceCentersApp();

  const [centerName, setCenterName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [editingCenter, setEditingCenter] = useState<ServiceCenterType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddOrEditCenter = () => {
    if (!centerName || !contactNumber || !address) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const centerData: ServiceCenterType = {
      id: editingCenter?.id || Date.now().toString(),
      $id: editingCenter?.$id,
      name: centerName,
      contact: contactNumber,
      address
    };

    updateLocalCenter(centerData);
    resetForm();
  };

  const handleDeleteCenter = (center: ServiceCenterType) => {
    Alert.alert(
      "Confirm Delete",
      `Delete ${center.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => deleteLocalCenter(center.id) 
        }
      ]
    );
  };

  const resetForm = () => {
    setCenterName("");
    setContactNumber("");
    setAddress("");
    setEditingCenter(null);
  };

  const uploadToAppwrite = async () => {
    setIsLoading(true);
    try {
      for (const center of localCenters) {
        if (center.$id) {
          await updateServiceCenter(center.$id, {
            name: center.name,
            contact: center.contact,
            address: center.address
          });
        } else {
          const newCenter = await createServiceCenter({
            name: center.name,
            contact: center.contact,
            address: center.address
          });
          updateLocalCenter({
            ...center,
            $id: newCenter.$id
          });
        }
      }
      Alert.alert("Success", "All data uploaded to Appwrite");
    } catch (error) {
      Alert.alert("Error", "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFromAppwrite = async () => {
    setIsLoading(true);
    try {
      const cloudCenters: AppwriteServiceCenterType[] = await getAllServiceCenters();
      cloudCenters.forEach((center: AppwriteServiceCenterType) => {
        updateLocalCenter({
          id: center.$id,
          $id: center.$id,
          name: center.name,
          contact: center.contact,
          address: center.address
        });
      });
      Alert.alert("Success", "Data downloaded from Appwrite");
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
          Service Centers
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
          {editingCenter ? "Edit Service Center" : "Add Service Center"}
        </Text>

        <View className="flex flex-col gap-2">
          <View className="flex-row items-center bg-[#F0FDF4] border border-gray-300 rounded-md px-3 py-2">
            <AntDesign name="home" size={20} color="gray" />
            <TextInput
              placeholder="Service Center Name"
              value={centerName}
              onChangeText={setCenterName}
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
            <MaterialIcons name="location-on" size={20} color="gray" />
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              className="flex-1 ml-3 text-gray-800"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAddOrEditCenter}
          className="bg-emerald-700 py-3 rounded-md mt-6"
        >
          <Text className="text-center text-white font-semibold text-lg">
            {editingCenter ? "Save Changes" : "Add Service Center"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          Service Centers ({localCenters.length})
        </Text>
        
        {localCenters.length === 0 ? (
          <Text className="text-gray-500 text-center py-4">
            No service centers added yet
          </Text>
        ) : (
          <FlatList
            data={localCenters}
            keyExtractor={(item: ServiceCenterType) => item.id}
            renderItem={({ item }: { item: ServiceCenterType }) => (
              <View className="flex-row items-center justify-between bg-white p-4 rounded-md mb-2 shadow">
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">{item.name}</Text>
                  <Text className="text-gray-500">{item.contact}</Text>
                  <Text className="text-gray-500">{item.address}</Text>
                  {item.$id && (
                    <Text className="text-xs text-gray-400">Synced with cloud</Text>
                  )}
                </View>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() => {
                      setEditingCenter(item);
                      setCenterName(item.name);
                      setContactNumber(item.contact);
                      setAddress(item.address);
                    }}
                    className="mr-4"
                  >
                    <AntDesign name="edit" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteCenter(item)}>
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