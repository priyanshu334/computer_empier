import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
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
import { router } from "expo-router";
import useFormDataStorage from "@/hooks/useFormData";

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

  const [deviceKYCDetails, setDeviceKYCDetails] = useState<{
    isPowerAdapterChecked: boolean;
    isKeyboardChecked: boolean;
    isMouseChecked: boolean;
    isDeviceOnWarranty: boolean;
    warrantyExpiryDate: Date | null;
    cameraData: any;
    otherAccessories: string;
    additionalDetailsList: string[];
    lockCode: string;
  }>({
    isPowerAdapterChecked: false,
    isKeyboardChecked: false,
    isMouseChecked: false,
    isDeviceOnWarranty: false,
    warrantyExpiryDate: null,
    cameraData: null,
    otherAccessories: "",
    additionalDetailsList: [],
    lockCode: "",
  });

  const { createFormData } = useFormDataStorage();

  // Generate a unique ID that complies with Appwrite's requirements
  const generateUniqueId = (): string => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36
    const random = Math.random().toString(36).substring(2, 8); // Random string (6 characters)
    const id = `${timestamp}-${random}`;

    // Ensure the ID is at most 36 characters long
    const truncatedId = id.substring(0, 36);

    // Replace invalid characters (anything not a-z, A-Z, 0-9, or underscore) with underscores
    const validId = truncatedId.replace(/[^a-zA-Z0-9_]/g, "_");

    // Ensure the ID does not start with a leading underscore
    return validId.startsWith("_") ? validId.substring(1) : validId;
  };

  const handleSubmit = async () => {
    console.log("Submitting data...");

    // Validate required fields
    if (
      !name ||
      !designation ||
      !orderDetails.deviceModel ||
      !estimateDetails.repairCost ||
      !estimateDetails.advancePaid
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    // Convert pickupDate and pickupTime to strings if they are Date objects
    const formattedEstimateDetails = {
      ...estimateDetails,
      pickupDate: estimateDetails.pickupDate
        ? estimateDetails.pickupDate.toISOString()
        : null,
      pickupTime: estimateDetails.pickupTime
        ? estimateDetails.pickupTime.toISOString()
        : null,
    };

    const formattedRepairPartnerDetails = {
      ...repairPartnerDetails,
      pickupDate: repairPartnerDetails.pickupDate
        ? repairPartnerDetails.pickupDate.toISOString()
        : null,
      pickupTime: repairPartnerDetails.pickupTime
        ? repairPartnerDetails.pickupTime.toISOString()
        : null,
    };

    const formattedDeviceKYCDetails = {
      ...deviceKYCDetails,
      warrantyExpiryDate: deviceKYCDetails.warrantyExpiryDate
        ? deviceKYCDetails.warrantyExpiryDate.toISOString()
        : null,
    };

    // Create new data object
    const id = generateUniqueId();
    try {
      const newData = {
        id: id, // Unique ID
        name,
        designation,
        selectedCustomer,
        orderDetails,
        estimateDetails: formattedEstimateDetails,
        repairPartnerDetails: formattedRepairPartnerDetails,
        deviceKYC: formattedDeviceKYCDetails,
      };
      console.log("New data is:", newData);

      await createFormData(newData);
      Alert.alert("Success", "Order added successfully!");
      resetForm();
      router.push("/");
    } catch (error) {
      console.error("Error saving form data:", error);
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
    setDeviceKYCDetails({
      isPowerAdapterChecked: false,
      isKeyboardChecked: false,
      isMouseChecked: false,
      isDeviceOnWarranty: false,
      warrantyExpiryDate: null,
      cameraData: null,
      otherAccessories: "",
      additionalDetailsList: [],
      lockCode: "",
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
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* Receiver Details */}
        <ReceiverDetails
          onNameChange={(newName) => setName(newName)}
          onDesignationChange={(newDesignation) => setDesignation(newDesignation)}
        />

        {/* Customer Details */}
        <CustomerDetails
          onSearchChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
          onAdd={(customer) => {
            Alert.alert("Success", "New customer added: " + customer.name);
          }}
          onSelect={setSelectedCustomer}
        />

        {/* Order Details */}
        <OrderDetails onDataChange={setOrderDetails} />

        {/* Estimate Details */}
        <EstimateDetails onDataChange={setEstimateDetails} />

        {/* Device KYC and Repair Partner */}
        <DeviceKYCForm onSubmit={setDeviceKYCDetails} />
        <RepairPartner onDataChange={setRepairPartnerDetails} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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