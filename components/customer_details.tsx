import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

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

  const handleAddCustomer = () => {
    onAdd({
      name: customerName,
      number: customerNumber,
      address: customerAddress,
    });
    setModalVisible(false);
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");
  };

  return (
    <View className="bg-[#F0FDF4] p-4 rounded-md shadow">
      {/* Title */}
      <Text className="text-lg font-semibold text-blue-600 mb-4">
        Customer Details
      </Text>

      {/* Search Input and Buttons */}
      <View className="flex-row items-center space-x-2">
        {/* Search Input */}
        <View className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2">
          <TextInput
            placeholder="Search and select from customers..."
            className="text-gray-800"
            onChangeText={onSearchChange}
          />
        </View>

        {/* Select Button */}
        <TouchableOpacity
          onPress={onSelect}
          className="bg-pink-500 px-4 py-2 rounded-md"
        >
          <Text className="text-white font-semibold">Select</Text>
        </TouchableOpacity>

        {/* Add Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-green-500 px-4 py-2 rounded-md"
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
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
