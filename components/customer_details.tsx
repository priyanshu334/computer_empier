import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CustomerDetailsProps = {
  onSearchChange: (searchTerm: string) => void;
  onAdd: (customerDetails: { name: string; number: string; address: string }) => void;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ onSearchChange, onAdd }) => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isSelectModalVisible, setSelectModalVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [storedCustomers, setStoredCustomers] = useState<
    { name: string; number: string; address: string }[]
  >([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    { name: string; number: string; address: string } | null
  >(null);

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

    // Clear the modal fields
    setAddModalVisible(false);
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");

    onAdd(newCustomer); // Callback to parent component
    Alert.alert("Success", "Customer added successfully!");
  };

  // Handle customer selection
  const handleSelectCustomer = (customer: { name: string; number: string; address: string }) => {
    setSelectedCustomer(customer);
    setSelectModalVisible(false);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md my-4">
      <Text className="text-lg font-semibold text-blue-600 mb-4">Customer Details</Text>

      {/* Selected Customer */}
      {selectedCustomer && (
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2">Selected Customer</Text>
          <View className="border border-gray-300 rounded-md p-2">
            <Text className="text-base font-medium">{selectedCustomer.name}</Text>
            <Text className="text-sm text-gray-600">Number: {selectedCustomer.number}</Text>
            <Text className="text-sm text-gray-600">Address: {selectedCustomer.address}</Text>
          </View>
        </View>
      )}

      {/* Search Input */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-2">Search Customer</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          placeholder="Enter Name"
          onChangeText={onSearchChange}
        />
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-4 justify-start items-center mb-4">
        <TouchableOpacity
          onPress={() => setSelectModalVisible(true)}
          className="bg-emerald-700 p-4 rounded-md flex justify-center items-center"
        >
          <Text className="text-white font-semibold">Select</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAddModalVisible(true)}
          className="bg-emerald-700 p-4 rounded-md flex justify-center items-center"
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Adding Customer */}
      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text className="text-lg font-semibold text-blue-600 mb-4">Add Customer</Text>

            {/* Customer Name */}
            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Customer Name</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter Name"
                value={customerName}
                onChangeText={setCustomerName}
              />
            </View>

            {/* Customer Number */}
            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Customer Number</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter Number"
                keyboardType="numeric"
                value={customerNumber}
                onChangeText={setCustomerNumber}
              />
            </View>

            {/* Customer Address */}
            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Customer Address</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter Address"
                value={customerAddress}
                onChangeText={setCustomerAddress}
              />
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-between space-x-2">
              <TouchableOpacity
                onPress={handleAddCustomer}
                className="bg-green-500 px-4 py-2 rounded-md"
              >
                <Text className="text-white font-semibold">Add Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAddModalVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Selecting Customer */}
      <Modal
        visible={isSelectModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text className="text-lg font-semibold text-blue-600 mb-4">Select Customer</Text>

            {/* Customer List */}
            <FlatList
              data={storedCustomers}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectCustomer(item)}
                  className="border-b border-gray-200 py-2"
                >
                  <Text className="text-base font-medium">{item.name}</Text>
                  <Text className="text-sm text-gray-600">Number: {item.number}</Text>
                  <Text className="text-sm text-gray-600">Address: {item.address}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text className="text-gray-600 text-center py-4">No customers available.</Text>
              }
            />

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setSelectModalVisible(false)}
              className="bg-gray-300 px-4 py-2 rounded-md mt-4"
            >
              <Text className="text-gray-800 font-semibold text-center">Close</Text>
            </TouchableOpacity>
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
  