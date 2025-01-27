import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ReceiverDetails from "@/components/Receiver_Details";
import CustomerDetails from "@/components/customer_details";
import OrderDetails from "@/components/order_details"; // Import OrderDetails component
import { SafeAreaView } from "react-native-safe-area-context";
import EstimateDetails from "@/components/estimate_details";
import RepairPartner from "@/components/repair_partner";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const All_orders = () => {
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
    <SafeAreaView className="flex flex-col">
      {/* Header */}
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

      {/* add order section */}
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        className="flex flex-col gap-4"
      >
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
        <RepairPartner />
      </ScrollView>
    </SafeAreaView>
  );
};

export default All_orders;
