import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useServiceCenters } from "../hooks/useServiceCenters";
import { router } from "expo-router";

interface ServiceCenterType {
  id: string;
  name: string;
  contact: string;
  address: string;
}

export default function ServiceCenter() {
  const { centers, addOrUpdateCenter, deleteCenter } = useServiceCenters();
  const [centerName, setCenterName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [editingCenter, setEditingCenter] = useState<ServiceCenterType | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleAddOrEditCenter = () => {
    if (centerName && contactNumber && address) {
      const newCenter: ServiceCenterType = {
        id: editingCenter ? editingCenter.id : Math.random().toString(),
        name: centerName,
        contact: contactNumber,
        address,
      };

      console.log(editingCenter ? "Updating center:" : "Adding new center:", newCenter);
      addOrUpdateCenter(newCenter);

      setCenterName("");
      setContactNumber("");
      setAddress("");
      setEditingCenter(null);
    } else {
      console.log("Validation failed - missing required fields");
    }
  };

  const handleEditCenter = (center: ServiceCenterType) => {
    console.log("Editing center:", center);
    setCenterName(center.name);
    setContactNumber(center.contact);
    setAddress(center.address);
    setEditingCenter(center);
  };

  const handleUploadToAppwrite = async () => {
    setIsSyncing(true);
    console.log("Starting upload of", centers.length, "centers to Appwrite...");
    
    try {
      for (const center of centers) {
        console.log("Uploading center:", center.name);
        await addOrUpdateCenter(center);
      }
      console.log("Upload completed successfully");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDownloadFromAppwrite = async () => {
    setIsSyncing(true);
    console.log("Fetching centers from Appwrite...");
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Download completed. Retrieved", centers.length, "centers");
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteCenter = (center: ServiceCenterType) => {
    console.log("Deleting center:", center.name);
    deleteCenter(center.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0FDF4]">
      {/* Header */}
      <View className="flex-row justify-between items-center bg-emerald-900 p-4 border-b-[1px]">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold absolute left-0 right-0 text-center">
          Service Centers
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

      {/* Service Center Details Section */}
      <View className="p-4 bg-white rounded-md m-4 shadow-md">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          {editingCenter ? "Edit Service Center" : "New Service Center"}
        </Text>

        {/* Input Fields */}
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

      {/* List of Service Centers */}
      <View className="p-4">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          List of Service Centers
        </Text>
        <FlatList
          data={centers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-white p-4 rounded-md mb-2 shadow">
              <View>
                <Text className="text-gray-800 font-semibold">{item.name}</Text>
                <Text className="text-gray-500">{item.contact}</Text>
                <Text className="text-gray-500">{item.address}</Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => handleEditCenter(item)}
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
      </View>
    </SafeAreaView>
  );
}