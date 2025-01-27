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
    <View className="flex flex-row justify-around items-center bg-white shadow-lg rounded-t-2xl p-4">
      {/* Phone Button */}
      <TouchableOpacity
        onPress={onPhonePress}
        className="flex items-center hover:opacity-80"
      >
        <View className="bg-emerald-700 p-4 rounded-full shadow-md">
          <AntDesign name="phone" size={28} color="white" />
        </View>
        <Text className="text-emerald-700 font-semibold mt-2 text-lg">Phone</Text>
      </TouchableOpacity>

      {/* Message Button */}
      <TouchableOpacity
        onPress={onMessagePress}
        className="flex items-center hover:opacity-80"
      >
        <View className="bg-teal-500 p-4 rounded-full shadow-md">
          <MaterialIcons name="message" size={28} color="white" />
        </View>
        <Text className="text-teal-700 font-semibold mt-2 text-lg">Message</Text>
      </TouchableOpacity>

      {/* WhatsApp Button */}
      <TouchableOpacity
        onPress={onWhatsAppPress}
        className="flex items-center hover:opacity-80"
      >
        <View className="bg-teal-500 p-4 rounded-full shadow-md">
          <FontAwesome name="whatsapp" size={28} color="white" />
        </View>
        <Text className="text-teal-700 font-semibold mt-2 text-lg">WhatsApp</Text>
      </TouchableOpacity>

      {/* Print Button */}
      <TouchableOpacity
        onPress={onPrintPress}
        className="flex items-center hover:opacity-80"
      >
        <View className="bg-teal-500 p-4 rounded-full shadow-md">
          <MaterialIcons name="print" size={28} color="white" />
        </View>
        <Text className="text-teal-700 font-semibold mt-2 text-lg">Print</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
