import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    <View className="bg-[#F0FDF4] p-4 rounded-md shadow">
      {/* Title */}
      <Text className="text-lg font-semibold text-blue-600 mb-4">
        Receiver Details
      </Text>

      {/* Name Input */}
      <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-3 py-2 mb-4">
        <AntDesign name="user" size={20} color="gray" />
        <TextInput
          placeholder="Enter Your Name"
          className="flex-1 ml-3 text-gray-800"
          onChangeText={onNameChange}
        />
      </View>

      {/* Designation Selection */}
      <Text className="text-base font-semibold text-gray-800 mb-2">
        Designation
      </Text>
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() => handleDesignationSelect("Owner")}
          className={`flex-1 items-center py-3 rounded-md mr-2 ${
            selectedDesignation === "Owner"
              ? "bg-blue-600"
              : "bg-gray-200"
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
          className={`flex-1 items-center py-3 rounded-md ml-2 ${
            selectedDesignation === "Staff"
              ? "bg-blue-600"
              : "bg-gray-200"
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
