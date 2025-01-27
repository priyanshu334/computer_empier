import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for WhatsApp

interface BottomBarProps {
  onPhonePress?: () => void;
  onMessagePress?: () => void;
  onWhatsAppPress?: () => void;
  onPrintPress?: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
  onPhonePress,
  onMessagePress,
  onWhatsAppPress,
  onPrintPress,
}) => {
  return (
    <View className="flex flex-row justify-around items-center bg-white shadow-md rounded-t-2xl p-4">
      {/* Phone Button */}
      <TouchableOpacity
        onPress={onPhonePress}
        className="flex items-center"
      >
        <View className="bg-emerald-700 p-3 rounded-full">
          <AntDesign name="phone" size={24} color="white" />
        </View>
        <Text className="text-emerald-700 font-semibold mt-1">Phone</Text>
      </TouchableOpacity>

      {/* Message Button */}
      <TouchableOpacity
        onPress={onMessagePress}
        className="flex items-center"
      >
        <View className="p-3 rounded-full">
          <MaterialIcons name="message" size={24} color="teal" />
        </View>
        <Text className="text-teal-700 font-semibold mt-1">Message</Text>
      </TouchableOpacity>

      {/* WhatsApp Button */}
      <TouchableOpacity
        onPress={onWhatsAppPress}
        className="flex items-center"
      >
        <View className="p-3 rounded-full">
          <FontAwesome name="whatsapp" size={24} color="teal" />
        </View>
        <Text className="text-teal-700 font-semibold mt-1">WhatsApp</Text>
      </TouchableOpacity>

      {/* Print Button */}
      <TouchableOpacity
        onPress={onPrintPress}
        className="flex items-center"
      >
        <View className="p-3 rounded-full">
          <MaterialIcons name="print" size={24} color="teal" />
        </View>
        <Text className="text-teal-700 font-semibold mt-1">Print</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
