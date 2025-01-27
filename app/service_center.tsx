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

export default function ServiceCenter() {
  const [centers, setCenters] = useState([
    {
      id: "1",
      name: "mmbdm,bf",
      contact: "7020754395",
      address: "Sample Address",
    },
  ]);
  const [centerName, setCenterName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleAddCenter = () => {
    if (centerName && contactNumber && address) {
      setCenters([
        ...centers,
        {
          id: Math.random().toString(),
          name: centerName,
          contact: contactNumber,
          address,
        },
      ]);
      setCenterName("");
      setContactNumber("");
      setAddress("");
    }
  };

  const handleDeleteCenter = (id: string) => {
    setCenters(centers.filter((center) => center.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0FDF4]">
      {/* Header */}
      <View className="flex flex-row items-center justify-start bg-emerald-900 p-4 border-b-[1px]">
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold absolute left-0 right-0 text-center">
          Service Centers
        </Text>
      </View>

      {/* Service Center Details Section */}
      <View className="flex flex-col gap-4 p-4 bg-white rounded-md m-4 shadow-md">
        <Text className="text-lg font-semibold text-blue-600">
          New Service Center
        </Text>

        {/* Input Fields */}
        <View className="flex flex-col gap-2">
          {/* Service Center Name */}
          <View className="flex flex-row items-center bg-[#F0FDF4] border border-gray-300 rounded-md px-3 py-2">
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

        {/* Add Service Center Button */}
        <TouchableOpacity
          onPress={handleAddCenter}
          className="bg-emerald-700 py-3 rounded-md my-4"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Add Service Center
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
              <TouchableOpacity onPress={() => handleDeleteCenter(item.id)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
