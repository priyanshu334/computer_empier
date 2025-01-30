import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Alert, 
  StyleSheet 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ReceiverDetails from "@/components/Receiver_Details";
import CustomerDetails from "@/components/customer_details";
import OrderDetails from "@/components/order_details";
import EstimateDetails from "@/components/estimate_details";
import RepairPartner from "@/components/repair_partner";
import DeviceKYCForm from "@/components/DeviceKycForm";
import BottomBar from "@/components/bottom_bar";
import { router } from "expo-router";
import useFormDataStorage from "@/hooks/useFormData";
import { v4 as uuidv4 } from 'uuid';

const Add_orders = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    name: string;
    number: string;
    address: string;
  } | null>(null);

  const [orderDetails, setOrderDetails] = useState<{
    deviceModel: string;
    orderStatus: string;
    problems: string[];
  }>({
    deviceModel: "",
    orderStatus: "Pending",
    problems: [],
  });

  const [estimateDetails, setEstimateDetails] = useState<{
    repairCost: string;
    advancePaid: string;
    pickupDate: Date | null;
    pickupTime: Date | null;
  }>({
    repairCost: "",
    advancePaid: "",
    pickupDate: null,
    pickupTime: null,
  });

  const [repairPartnerDetails, setRepairPartnerDetails] = useState<{
    selectedRepairStation: string | null;
    selectedInHouseOption: string;
    selectedServiceCenterOption: string;
    pickupDate: Date | null;
    pickupTime: Date | null;
  }>({
    selectedRepairStation: null,
    selectedInHouseOption: "",
    selectedServiceCenterOption: "",
    pickupDate: null,
    pickupTime: null,
  });
 
  const handleFormSubmit = (formData:any) => {
    console.log("Form Data received from DeviceKYCForm:", formData);
    // Process or save the data here
  };
  // Customer details handlers
  const handleAddCustomer = (customerDetails: { name: string; number: string; address: string }) => {
    
    Alert.alert("Success", "New customer added: " + customerDetails.name);
  };

  const handleSelectCustomer = (customer: { name: string; number: string; address: string } | null) => {
    if (customer) {
      setSelectedCustomer(customer);
      alert("Selected Customer: " + customer.name);
    } else {
      setSelectedCustomer(null);
      alert("No customer selected.");
    }
  };

  // Order and Estimate handlers
  const handleOrderDataChange = (data: {
    deviceModel: string;
    orderStatus: string;
    problems: string[];
  }) => {
    setOrderDetails(data);
  };

  const handleEstimateDataChange = (data: {
    repairCost: string;
    advancePaid: string;
    pickupDate: Date | null;
    pickupTime: Date | null;
  }) => {
    setEstimateDetails(data);
  };  const handleRepairPartnerDataChange = (data: {
    selectedRepairStation: string | null;
    selectedInHouseOption: string;
    selectedServiceCenterOption: string;
    pickupDate: Date | null;
    pickupTime: Date | null;
  }) => {
    setRepairPartnerDetails(data);
  };

  const {
    createFormData,
  } = useFormDataStorage();

  const handleSubmit = async () => {
    console.log("Submitting data...");
  
    // Validate required fields
    if (!name || !designation || !orderDetails.deviceModel || !estimateDetails.repairCost || !estimateDetails.advancePaid) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
  
    // Convert pickupDate and pickupTime to strings if they are Date objects
    const formattedEstimateDetails = {
      ...estimateDetails,
      pickupDate: estimateDetails.pickupDate ? estimateDetails.pickupDate.toISOString() : null,
      pickupTime: estimateDetails.pickupTime ? estimateDetails.pickupTime.toISOString() : null,
    };
  
    const formattedRepairPartnerDetails = {
      ...repairPartnerDetails,
      pickupDate: repairPartnerDetails.pickupDate ? repairPartnerDetails.pickupDate.toISOString() : null,
      pickupTime: repairPartnerDetails.pickupTime ? repairPartnerDetails.pickupTime.toISOString() : null,
    };
  
    // Create new data object
    const newData = {
      id: uuidv4(), // Unique ID
      name,
      designation,
      selectedCustomer,
      orderDetails,
      estimateDetails: formattedEstimateDetails,
      repairPartnerDetails: formattedRepairPartnerDetails,
    };
  
    console.log("Form data to be saved:", newData);  // Log data before saving
  
    try {
      await createFormData(newData);
      console.log("Form data saved successfully");  // Log success
      Alert.alert("Success", "Order added successfully!");
      resetForm();
      router.push("/");
    } catch (error) {
      console.error("Error saving form data:", error); // Log error
      Alert.alert("Error", "Failed to save the order.");
    }
  };
  
  

  const resetForm = () => {
    setName("");
    setDesignation("");
    setSelectedCustomer(null);
    setOrderDetails({
      deviceModel: "",
      orderStatus: "Pending",
      problems: [],
    });
    setEstimateDetails({
      repairCost: "",
      advancePaid: "",
      pickupDate: null,
      pickupTime: null,
    });
    setRepairPartnerDetails({
      selectedRepairStation: null,
      selectedInHouseOption: "",
      selectedServiceCenterOption: "",
      pickupDate: null,
      pickupTime: null,
    });
    setIsAgreed(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Records</Text>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Receiver Details */}
        <ReceiverDetails
          onNameChange={(newName) => setName(newName)}
          onDesignationChange={(newDesignation) => setDesignation(newDesignation)}
        />

        {/* Customer Details */}
        <CustomerDetails
          onSearchChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
          onAdd={handleAddCustomer}
          onSelect={handleSelectCustomer}
        />

        {/* Order Details */}
        <OrderDetails onDataChange={handleOrderDataChange} />

        {/* Estimate Details */}
        <EstimateDetails onDataChange={handleEstimateDataChange} />

        {/* Device KYC and Repair Partner */}
        <DeviceKYCForm onSubmit={handleFormSubmit} />
        <RepairPartner onDataChange={handleRepairPartnerDataChange} />
      </ScrollView>

      {/* Terms and Conditions Checkbox */}
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          text="I agree to the Terms and Conditions"
          isChecked={isAgreed}
          onPress={(isSelected) => setIsAgreed(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={styles.checkboxText}
        />
      </View>

      {/* Submit Button */}
      {isAgreed && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Bar */}
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: "white",
  
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#047857",
    padding: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#34D399",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Add_orders;
