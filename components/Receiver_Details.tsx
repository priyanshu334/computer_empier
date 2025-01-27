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
    <View className="bg-[#F0FDF4] p-4 rounded-md border border-gray-300">
      {/* Title */}
      <Text className="text-lg font-semibold text-blue-600">
        Receiver Details
      </Text>

      {/* Name Input */}
      <View className="flex flex-row justify-start items-center gap-2 px-2 bg-white border border-gray-300 rounded-md">
        <AntDesign name="user" size={24} color="gray" />
        <TextInput
          placeholder="Enter Your Name"
          className="text-gray-800"
          onChangeText={onNameChange}
          style={{ color: "#1f2937" }}
        />
      </View>

      {/* Designation Selection */}
      <Text className="text-base font-semibold text-gray-800">Designation</Text>
      <View className="flex flex-row justify-between">
        <TouchableOpacity
          onPress={() => handleDesignationSelect("Owner")}
          className={`flex-1 items-center justify-center rounded-md mr-2 ${
            selectedDesignation === "Owner" ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedDesignation === "Owner"
                ? "text-blue-900"
                : "text-gray-800"
            }`}
          >
            Owner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDesignationSelect("Staff")}
          className={`flex-1 items-center py-3 rounded-md ml-2 ${
            selectedDesignation === "Staff" ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedDesignation === "Staff"
                ? "text-blue-800"
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
