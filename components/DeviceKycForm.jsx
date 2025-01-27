import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const DeviceKYCForm = () => {
  const [isPowerAdapterChecked, setPowerAdapterChecked] = useState(false);
  const [isKeyboardChecked, setKeyboardChecked] = useState(false);
  const [isMouseChecked, setMouseChecked] = useState(false);
  const [isDeviceOnWarranty, setDeviceOnWarranty] = useState(false);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <Text className="text-lg font-bold text-blue-600 mb-4">Device KYC Form</Text>

      {/* Buttons Section */}
      <TouchableOpacity className="flex flex-row items-center bg-green-500 p-3 rounded-md mb-4 shadow-md">
        <FontAwesome name="info-circle" size={20} color="white" />
        <Text className="text-white ml-2">Model Details</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row items-center bg-green-500 p-3 rounded-md mb-4 shadow-md">
        <MaterialIcons name="lock" size={20} color="white" />
        <Text className="text-white ml-2">Set Lock Code</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row items-center bg-green-500 p-3 rounded-md mb-4 shadow-md">
        <MaterialIcons name="pattern" size={20} color="white" />
        <Text className="text-white ml-2">Set Pattern Lock Code</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row items-center bg-green-500 p-3 rounded-md mb-4 shadow-md">
        <AntDesign name="scan1" size={20} color="white" />
        <Text className="text-white ml-2">Open Barcode Scanner</Text>
      </TouchableOpacity>

      {/* Accessories List Section */}
      <Text className="text-lg font-bold text-blue-600 mb-2">Accessories List</Text>
      <View className="space-y-4 mb-4">
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Power Adapter"
          isChecked={isPowerAdapterChecked}
          onPress={(isSelected) => setPowerAdapterChecked(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={{ textDecorationLine: "none" }}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Keyboard"
          isChecked={isKeyboardChecked}
          onPress={(isSelected) => setKeyboardChecked(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={{ textDecorationLine: "none" }}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Mouse"
          isChecked={isMouseChecked}
          onPress={(isSelected) => setMouseChecked(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={{ textDecorationLine: "none" }}
        />
      </View>

      {/* Additional Options Section */}
      <TouchableOpacity className="flex flex-row items-center border border-gray-300 p-3 rounded-md mb-4">
        <AntDesign name="pluscircleo" size={20} color="#6B7280" />
        <Text className="text-gray-600 ml-2">Other Accessories</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row items-center border border-gray-300 p-3 rounded-md mb-4">
        <FontAwesome name="info-circle" size={20} color="#6B7280" />
        <Text className="text-gray-600 ml-2">Additional Details</Text>
      </TouchableOpacity>

      <View className="flex flex-row items-center mb-4">
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Device on Warranty"
          isChecked={isDeviceOnWarranty}
          onPress={(isSelected) => setDeviceOnWarranty(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={{ textDecorationLine: "none" }}
        />
      </View>
    </View>
  );
};

export default DeviceKYCForm;
