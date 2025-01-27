import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type ReceiverDetailsProps = {
  onNameChange: (name: string) => void;
  onDesignationChange: (designation: string) => void;
};

const ReceiverDetails: React.FC<ReceiverDetailsProps> = ({
  onNameChange,
  onDesignationChange,
}) => {
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");

  const handleDesignationSelect = (designation: string) => {
    setSelectedDesignation(designation);
    onDesignationChange(designation);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md mx-4 my-4">
      {/* Title */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">Receiver Details</Text>

      {/* Name Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-2">Receiver Name</Text>
        <View className="flex-row items-center justify-between border border-gray-300 rounded-md p-2 bg-gray-50">
          <AntDesign name="user" size={24} color="gray" />
          <TextInput
            placeholder="Enter Receiver Name"
            className="ml-2 text-lg text-gray-800 flex-1"
            onChangeText={onNameChange}
          />
        </View>
      </View>

      {/* Designation Selection */}
      <Text className="text-sm font-medium mb-2">Designation</Text>
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          onPress={() => handleDesignationSelect("Owner")}
          className={`flex-1 items-center justify-center rounded-md py-3 ${
            selectedDesignation === "Owner" ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedDesignation === "Owner"
                ? "text-white"
                : "text-gray-800"
            }`}
          >
            Owner
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDesignationSelect("Staff")}
          className={`flex-1 items-center justify-center rounded-md py-3 ${
            selectedDesignation === "Staff" ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedDesignation === "Staff"
                ? "text-white"
                : "text-gray-800"
            }`}
          >
            Staff
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReceiverDetails;
