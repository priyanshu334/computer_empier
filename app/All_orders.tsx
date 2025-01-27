import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ReceiverDetails from "@/components/Receiver_Details";
import CustomerDetails from "@/components/customer_details";
import OrderDetails from "@/components/order_details"; // Import OrderDetails component
import { SafeAreaView } from "react-native-safe-area-context";
import EstimateDetails from "@/components/estimate_details";
import RepairPartner from "@/components/repair_partner";
import DeviceKYCForm from "@/components/DeviceKycForm";
import BottomBar from "@/components/bottom_bar";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const All_orders = () => {

    const handlePhonePress = () => {
        console.log("Phone button pressed!");
        // Add navigation or functionality here
      };
    
      const handleMessagePress = () => {
        console.log("Message button pressed!");
        // Add navigation or functionality here
      };
    
      const handleWhatsAppPress = () => {
        console.log("WhatsApp button pressed!");
        // Add navigation or functionality here
      };
    
      const handlePrintPress = () => {
        console.log("Print button pressed!");
        // Add navigation or functionality here
      };
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectCustomer = () => {
    alert("Customer selected!");
  };

  const handleAddCustomer = () => {
    alert("New customer added!");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

      <View className="flex flex-row items-center justify-start bg-emerald-900 p-4">
        <TouchableOpacity
          onPress={() => router.back()} // Navigate back
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold absolute left-0 right-0 text-center">
          All Record
        </Text>
      </View>

        {/* Receiver Details Component */}
        <ReceiverDetails
          onNameChange={(newName) => setName(newName)}
          onDesignationChange={(newDesignation) =>
            setDesignation(newDesignation)
          }
        />

        {/* Customer Details Component */}
        <CustomerDetails
          onSearchChange={(newSearchTerm: any) => setSearchTerm(newSearchTerm)}
          onSelect={handleSelectCustomer}
          onAdd={handleAddCustomer}
        />

        {/* Order Details Component */}
        <OrderDetails 
          // Pass any required props to OrderDetails here 
        /> 

        {/* Estimate Details Component */}
        <EstimateDetails />
        <DeviceKYCForm/>
        <RepairPartner/>
        <BottomBar
        onPhonePress={handlePhonePress}
        onMessagePress={handleMessagePress}
        onWhatsAppPress={handleWhatsAppPress}
        onPrintPress={handlePrintPress}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

export default All_orders;
