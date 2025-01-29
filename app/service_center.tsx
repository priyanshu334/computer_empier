import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useServiceCenters } from "../hooks/useServiceCenters"; // Import the custom hook
import { router } from "expo-router";

// Type definition for a service center
interface ServiceCenterType {
  id: string;
  name: string;
  contact: string;
  address: string;
}

export default function ServiceCenter() {
  const { centers, addOrUpdateCenter, deleteCenter } = useServiceCenters(); // Use the custom hook
  const [centerName, setCenterName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [editingCenter, setEditingCenter] = useState<ServiceCenterType | null>(null);

  // Add or update a service center
  const handleAddOrEditCenter = () => {
    if (centerName && contactNumber && address) {
      const newCenter: ServiceCenterType = {
        id: editingCenter ? editingCenter.id : Math.random().toString(),
        name: centerName,
        contact: contactNumber,
        address,
      };

      addOrUpdateCenter(newCenter); // Use the custom hook's method to save the center

      // Clear input fields
      setCenterName("");
      setContactNumber("");
      setAddress("");
      setEditingCenter(null); // Reset editing state
    }
  };

  // Edit a service center
  const handleEditCenter = (center: ServiceCenterType) => {
    setCenterName(center.name);
    setContactNumber(center.contact);
    setAddress(center.address);
    setEditingCenter(center);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0FDF4]">
      {/* Header */}
      <View className="flex-row justify-start items-center bg-emerald-900 p-4 border-b-[1px]">
        <TouchableOpacity onPress={() => router.push("/")}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold absolute left-0 right-0 text-center">
          Service Centers
        </Text>
      </View>

      {/* Service Center Details Section */}
      <View className="p-4 bg-white rounded-md m-4 shadow-md">
        <Text className="text-lg font-semibold text-blue-600 mb-4">
          {editingCenter ? "Edit Service Center" : "New Service Center"}
        </Text>

        {/* Input Fields */}
        <View className="flex flex-col gap-2">
          {/* Service Center Name */}
          <View className="flex-row items-center bg-[#F0FDF4] border border-gray-300 rounded-md px-3 py-2">
            <AntDesign name="home" size={20} color="gray" />
            <TextInput
              placeholder="Service Center Name"
              value={centerName}
              onChangeText={setCenterName}
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

          {/* Address */}
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

        {/* Add or Save Button */}
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
                <TouchableOpacity onPress={() => deleteCenter(item.id)}>
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
