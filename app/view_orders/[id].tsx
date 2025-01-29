import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Linking
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import useFormDataStorage from "@/hooks/useFormData";
import BottomBar from "@/components/bottom_bar";

const ViewOrders = () => {
  const { id } = useLocalSearchParams(); // Get order ID from navigation params
  console.log(id)
  const { getFormDataById, deleteFormData } = useFormDataStorage();
  const [orderData, setOrderData] = useState<any>(null);
  const phoneNumber = "1234567890";
    const messageText = "Hello! This is a test message.";
  
    // Handler for phone, message, and WhatsApp actions
    const handlePhonePress = () => {
      const phoneUrl = `tel:${phoneNumber}`;
      Linking.openURL(phoneUrl).catch(() =>
        Alert.alert("Error", "Phone app could not be opened.")
      );
    };
  
    const handleMessagePress = () => {
      const messageUrl = `sms:${phoneNumber}?body=${encodeURIComponent(
        messageText
      )}`;
      Linking.openURL(messageUrl).catch(() =>
        Alert.alert("Error", "Message app could not be opened.")
      );
    };
  
    const handleWhatsAppPress = () => {
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        messageText
      )}`;
      Linking.openURL(whatsappUrl).catch(() =>
        Alert.alert(
          "Error",
          "WhatsApp is not installed on this device or could not be opened."
        )
      );
    };
    const handleFormSubmit = (formData:any) => {
      console.log("Form Data received from DeviceKYCForm:", formData);
      // Process or save the data here
    };
  
  
    const handlePrintPress = async  () => {
      
   
    };
  
   

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getFormDataById(id as string);
        console.log(data)
        if (data) setOrderData(data);
        else Alert.alert("Error", "Order not found.");
      };
      fetchData();
    }
  }, [id]);

  if (!orderData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Loading order details...</Text>
      </SafeAreaView>
    );
  }

 

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity onPress={() => router.push(`./edit_orders/${id}`)}>
          <AntDesign name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Receiver Details</Text>
          <Text style={styles.text}>👤 Name: {orderData.name}</Text>
          <Text style={styles.text}>💼 Designation: {orderData.designation}</Text>
        </View>

        {orderData.selectedCustomer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Details</Text>
            <Text style={styles.text}>👤 Name: {orderData.selectedCustomer.name}</Text>
            <Text style={styles.text}>📞 Number: {orderData.selectedCustomer.number}</Text>
            <Text style={styles.text}>📍 Address: {orderData.selectedCustomer.address}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <Text style={styles.text}>📱 Device Model: {orderData.orderDetails.deviceModel}</Text>
          <Text style={styles.text}>📦 Order Status: {orderData.orderDetails.orderStatus}</Text>
          <Text style={styles.text}>🔧 Problems:</Text>
          {orderData.orderDetails.problems.length > 0 ? (
            orderData.orderDetails.problems.map((problem: string, index: number) => (
              <Text key={index} style={styles.listItem}>• {problem}</Text>
            ))
          ) : (
            <Text style={styles.text}>No problems listed.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimate Details</Text>
          <Text style={styles.text}>💰 Repair Cost: ₹{orderData.estimateDetails.repairCost}</Text>
          <Text style={styles.text}>💵 Advance Paid: ₹{orderData.estimateDetails.advancePaid}</Text>
          <Text style={styles.text}>📅 Pickup Date: {orderData.estimateDetails.pickupDate || "N/A"}</Text>
          <Text style={styles.text}>⏰ Pickup Time: {orderData.estimateDetails.pickupTime || "N/A"}</Text>
          
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Repair Partner Details</Text>
          <Text style={styles.text}>🏢 Repair Station: {orderData.repairPartnerDetails.selectedRepairStation || "N/A"}</Text>
          <Text style={styles.text}>🏠 In-House Option: {orderData.repairPartnerDetails.selectedInHouseOption || "N/A"}</Text>
          <Text style={styles.text}>🏬 Service Center Option: {orderData.repairPartnerDetails.selectedServiceCenterOption || "N/A"}</Text>
          <Text style={styles.text}>📅 Pickup Date: {orderData.repairPartnerDetails.pickupDate || "N/A"}</Text>
          <Text style={styles.text}>⏰ Pickup Time: {orderData.repairPartnerDetails.pickupTime || "N/A"}</Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
    
      <BottomBar
        onPhonePress={handlePhonePress}
        onMessagePress={handleMessagePress}
        onWhatsAppPress={handleWhatsAppPress}
        onPrintPress={handlePrintPress}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#047857",
    padding: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#047857",
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 14,
    marginLeft: 10,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 120,
  },
  deleteButton: {
    backgroundColor: "#DC2626",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default ViewOrders;
