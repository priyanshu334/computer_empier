import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import ReceiverDetails from "@/components/Receiver_Details";
import CustomerDetails from "@/components/customer_details";
import OrderDetails from "@/components/order_details"; // Import OrderDetails component
import { SafeAreaView } from "react-native-safe-area-context";
import EstimateDetails from "@/components/estimate_details";
import RepairPartner from "@/components/repair_partner";

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
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
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
        <RepairPartner/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default All_orders;
