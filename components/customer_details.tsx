import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { loadCustomers, saveCustomers } from "../hooks/useCustomer"; // Import the utility functions

type CustomerDetailsProps = {
  onSearchChange: (searchTerm: string) => void;
  onAdd: (customerDetails: { name: string; number: string; address: string }) => void;
  onSelect: (customerDetails: { name: string; number: string; address: string } | null) => void;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  onSearchChange,
  onAdd,
  onSelect,
}) => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isSelectModalVisible, setSelectModalVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [storedCustomers, setStoredCustomers] = useState<
    { name: string; number: string; address: string }[]
  >([]);
  const [filteredCustomers, setFilteredCustomers] = useState<
    { name: string; number: string; address: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<
    { name: string; number: string; address: string } | null
  >(null);

  useEffect(() => {
    const loadCustomerData = async () => {
      const customers = await loadCustomers();
      setStoredCustomers(customers);
      setFilteredCustomers(customers); // Initialize with all customers
    };
    loadCustomerData();
  }, [customerAddress, customerName, customerNumber]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    onSearchChange(term); // Notify parent component
    const filtered = storedCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

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

    setAddModalVisible(false);
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");

    onAdd(newCustomer);
   
  };

  const handleSelectCustomer = (customer: { name: string; number: string; address: string }) => {
    setSelectedCustomer(customer);
    setSelectModalVisible(false);
    onSelect(customer); // Notify parent component about the selected customer
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md my-10">
      <Text className="text-lg font-semibold text-blue-600 mb-5">Customer Details</Text>

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

      <View className="mb-4">
        <Text className="text-sm font-medium mb-2">Search Customer</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          placeholder="Enter Name"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>

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

      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text className="text-lg font-semibold text-blue-600 mb-4">Add Customer</Text>

            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Customer Name</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter Name"
                value={customerName}
                onChangeText={setCustomerName}
              />
            </View>

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

            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Customer Address</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter Address"
                value={customerAddress}
                onChangeText={setCustomerAddress}
              />
            </View>

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

      <Modal
        visible={isSelectModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text className="text-lg font-semibold text-blue-600 mb-4">Select Customer</Text>

            <FlatList
              data={filteredCustomers}
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
                <Text className="text-gray-600 text-center py-4">No customers found.</Text>
              }
            />

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
