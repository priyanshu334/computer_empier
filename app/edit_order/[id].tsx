import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  StyleSheet 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import ReceiverDetails from "@/components/Receiver_Details";
import CustomerDetails from "@/components/customer_details";
import OrderDetails from "@/components/order_details";
import EstimateDetails from "@/components/estimate_details";
import RepairPartner from "@/components/repair_partner";
import DeviceKYCForm from "@/components/DeviceKycForm";
import useFormDataStorage from "@/hooks/useFormData";

const EditOrder = () => {
  const { orderId } = useLocalSearchParams();
  const { getFormDataById, updateFormData } = useFormDataStorage();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (orderId) {
      const order = getFormDataById(orderId);
      if (order) {
        setFormData(order);
      } else {
        Alert.alert("Error", "Order not found");
        router.push("/");
      }
    }
  }, [orderId]);

  if (!formData) return null;

  const handleUpdate = async () => {
    try {
      await updateFormData(orderId, formData);
      Alert.alert("Success", "Order updated successfully!");
      router.push("/");
    } catch (error) {
      Alert.alert("Error", "Failed to update the order.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Order</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ReceiverDetails
          onNameChange={(name) => setFormData({ ...formData, name })}
          onDesignationChange={(designation) => setFormData({ ...formData, designation })}
          name={formData.name}
          designation={formData.designation}
        />

        <CustomerDetails
          onSelect={(customer) => setFormData({ ...formData, selectedCustomer: customer })}
          selectedCustomer={formData.selectedCustomer}
        />

        <OrderDetails
          onDataChange={(orderDetails) => setFormData({ ...formData, orderDetails })}
          orderDetails={formData.orderDetails}
        />

        <EstimateDetails
          onDataChange={(estimateDetails) => setFormData({ ...formData, estimateDetails })}
          estimateDetails={formData.estimateDetails}
        />

        <DeviceKYCForm
          onSubmit={(kycData) => setFormData({ ...formData, kycData })}
        />
        
        <RepairPartner
          onDataChange={(repairPartnerDetails) => setFormData({ ...formData, repairPartnerDetails })}
          repairPartnerDetails={formData.repairPartnerDetails}
        />
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
        <Text style={styles.submitButtonText}>Save Changes</Text>
      </TouchableOpacity>
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
