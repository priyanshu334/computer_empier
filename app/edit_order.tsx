import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Alert, 
  StyleSheet,
  ActivityIndicator 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useLocalSearchParams, router } from "expo-router";
// Import all your components
import ReceiverDetails from "@/components/Receiver_Details";
import CustomerDetails from "@/components/customer_details";
import OrderDetails from "@/components/order_details";
import EstimateDetails from "@/components/estimate_details";
import RepairPartner from "@/components/repair_partner";
import DeviceKYCForm from "@/components/DeviceKycForm";
import BottomBar from "@/components/bottom_bar";
import useFormDataStorage from "@/hooks/useFormData";

const EditOrder = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>(null);

  // All your existing state variables
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

  const { getFormDataById, updateFormData } = useFormDataStorage();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) {
          Alert.alert("Error", "No order ID found in parameters");
          return;
        }
        
        const data = await getFormDataById(id as string);
        console.log(data); // Debugging step: Check if data is fetched correctly
        
        if (data) {
          // Populate all states with existing data
          setName(data.name);
          setDesignation(data.designation);
          setSelectedCustomer(data.selectedCustomer);
          setOrderDetails(data.orderDetails);
          setEstimateDetails(data.estimateDetails);
          setRepairPartnerDetails(data.repairPartnerDetails);
          setIsAgreed(true);
          setInitialData(data);
        } else {
          Alert.alert("Error", "Order not found");
          router.back();
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load order data");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async () => {
    if (!name || !designation || !orderDetails.deviceModel || !estimateDetails.repairCost || !estimateDetails.advancePaid) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const updatedData = {
      id: id as string,
      name,
      designation,
      selectedCustomer,
      orderDetails,
      estimateDetails,
      repairPartnerDetails,
    };

    try {
      await updateFormData(id as string, updatedData);
      Alert.alert("Success", "Order updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update the order.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#047857" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Order</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <ReceiverDetails
          onNameChange={setName}
          onDesignationChange={setDesignation}
          initialName={initialData?.name}
          initialDesignation={initialData?.designation}
        />

        <CustomerDetails
          onSearchChange={setSearchTerm}
          onAdd={(customer) => {/* Add logic if needed */}}
          onSelect={setSelectedCustomer}
          initialCustomer={initialData?.selectedCustomer}
        />

        <OrderDetails 
          onDataChange={setOrderDetails}
          initialData={initialData?.orderDetails}
        />

        <EstimateDetails 
          onDataChange={setEstimateDetails}
          initialData={initialData?.estimateDetails}
        />
    

        <RepairPartner 
          onDataChange={setRepairPartnerDetails}
          initialData={initialData?.repairPartnerDetails}
        />
      </ScrollView>

      {/* Terms and Submit */}
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          text="I agree to the Terms and Conditions"
          isChecked={isAgreed}
          onPress={setIsAgreed}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={styles.checkboxText}
        />
      </View>

      {isAgreed && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Update Order</Text>
        </TouchableOpacity>
      )}

      <BottomBar
        onPhonePress={() => Linking.openURL(`tel:1234567890`)}
        onMessagePress={() => Linking.openURL(`sms:1234567890`)}
        onWhatsAppPress={() => Linking.openURL(`whatsapp://send?phone=1234567890`)}
        onPrintPress={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default EditOrder;
