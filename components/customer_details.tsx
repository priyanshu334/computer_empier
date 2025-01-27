import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CustomerDetailsProps = {
  onSearchChange: (searchTerm: string) => void;
  onSelect: () => void;
  onAdd: (customerDetails: {
    name: string;
    number: string;
    address: string;
  }) => void;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  onSearchChange,
  onSelect,
  onAdd,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [storedCustomers, setStoredCustomers] = useState<
    { name: string; number: string; address: string }[]
  >([]);

  // Load customers from AsyncStorage on component mount
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await AsyncStorage.getItem("customers");
        if (data) {
          setStoredCustomers(JSON.parse(data));
        }
      } catch (error) {
        console.error("Failed to load customers from AsyncStorage:", error);
      }
    };
    loadCustomers();
  }, []);

  // Save customers to AsyncStorage
  const saveCustomers = async (customers: typeof storedCustomers) => {
    try {
      await AsyncStorage.setItem("customers", JSON.stringify(customers));
      setStoredCustomers(customers);
    } catch (error) {
      console.error("Failed to save customers to AsyncStorage:", error);
    }
  };

  // Add a new customer
  const handleAddCustomer = () => {
    if (!customerName || !customerNumber || !customerAddress) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newCustomer = {
      name: customerName,
      number: customerNumber,
      address: customerAddress,
    };

    const updatedCustomers = [...storedCustomers, newCustomer];
    saveCustomers(updatedCustomers);
    setModalVisible(false);
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");
    onAdd(newCustomer); // Callback to parent component
  };

  // Clear all stored customers
  const clearAllCustomers = async () => {
    try {
      await AsyncStorage.removeItem("customers");
      setStoredCustomers([]);
      Alert.alert("Success", "All customers have been cleared!");
    } catch (error) {
      console.error("Failed to clear customers:", error);
    }
  };

  return (
    <View className="flex-1 flex-col gap-4 bg-[#F0FDF4] p-4 rounded-md border border-gray-300 shadow">
      {/* Title */}
      <Text className="text-lg font-semibold text-blue-600">
        Customer Details
      </Text>

      {/* Search Input and Buttons */}
      <View className="flex flex-col gap-4">
        {/* Search Input */}
        <View className="px-2 bg-white border border-gray-300 rounded-md">
          <TextInput
            onChangeText={onSearchChange}
            placeholder="Enter Your Name"
            className="text-gray-800"
            style={{ color: "#1f2937" }}
          />
        </View>
        <View className="flex flex-row justify-start items-center gap-4">
          {/* Select Button */}
          <TouchableOpacity
            onPress={onSelect}
            className="bg-emerald-700 flex justify-center items-center p-4 rounded-md"
          >
            <Text className=" text-white font-semibold ">Select</Text>
          </TouchableOpacity>

          {/* Add Button */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-emerald-700 rounded-md flex items-center justify-center  p-4"
          >
            <Text className="text-white font-semibold">Add</Text>
          </TouchableOpacity>

          {/* Clear Button */}
          <TouchableOpacity
            onPress={clearAllCustomers}
            className="bg-red-600 rounded-md flex items-center justify-center p-4"
          >
            <Text className="text-white font-semibold">Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Adding Customer */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text className="text-lg font-semibold text-blue-600 mb-4">
              Add Customer
            </Text>

            {/* Customer Name */}
            <TextInput
              placeholder="Customer Name"
              className="bg-white border border-gray-300 rounded-md px-3 py-2 mb-3"
              value={customerName}
              onChangeText={setCustomerName}
            />

            {/* Customer Number */}
            <TextInput
              placeholder="Customer Number"
              keyboardType="numeric"
              className="bg-white border border-gray-300 rounded-md px-3 py-2 mb-3"
              value={customerNumber}
              onChangeText={setCustomerNumber}
            />

            {/* Customer Address */}
            <TextInput
              placeholder="Address"
              className="bg-white border border-gray-300 rounded-md px-3 py-2 mb-4"
              value={customerAddress}
              onChangeText={setCustomerAddress}
            />

            {/* Action Buttons */}
            <View className="flex-row justify-end space-x-2">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddCustomer}
                className="bg-green-500 px-4 py-2 rounded-md"
              >
                <Text className="text-white font-semibold">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CustomerDetails;
