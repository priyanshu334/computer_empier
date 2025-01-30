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
import { loadCustomers, saveCustomers } from "@/hooks/useCustomer"; // Utility functions

type CustomerDetailsProps = {
  onSearchChange: (searchTerm: string) => void;
  onAdd: (customerDetails: { name: string; number: string; address: string }) => void;
  onSelect: (customerDetails: { name: string; number: string; address: string } | null) => void;
  initialCustomer?: { name: string; number: string; address: string } | null;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  onSearchChange,
  onAdd,
  onSelect,
  initialCustomer,
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
  const [selectedCustomer, setSelectedCustomer] = useState(initialCustomer || null);

  useEffect(() => {
    const loadCustomerData = async () => {
      const customers = await loadCustomers();
      setStoredCustomers(customers);
      setFilteredCustomers(customers);
    };
    loadCustomerData();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    onSearchChange(term);
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

    setStoredCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
    setAddModalVisible(false);
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");

    onAdd(newCustomer);
  };

  const handleSelectCustomer = (customer: { name: string; number: string; address: string }) => {
    setSelectedCustomer(customer);
    setSelectModalVisible(false);
    onSelect(customer);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Details</Text>

      {selectedCustomer && (
        <View style={styles.selectedCustomerContainer}>
          <Text style={styles.subTitle}>Selected Customer</Text>
          <View style={styles.customerBox}>
            <Text style={styles.customerName}>{selectedCustomer.name}</Text>
            <Text style={styles.customerInfo}>Number: {selectedCustomer.number}</Text>
            <Text style={styles.customerInfo}>Address: {selectedCustomer.address}</Text>
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.subTitle}>Search Customer</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setSelectModalVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Add Customer Modal */}
      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Customer</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Customer Name</Text>
              <TextInput style={styles.input} placeholder="Enter Name" value={customerName} onChangeText={setCustomerName} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Customer Number</Text>
              <TextInput style={styles.input} placeholder="Enter Number" keyboardType="numeric" value={customerNumber} onChangeText={setCustomerNumber} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Customer Address</Text>
              <TextInput style={styles.input} placeholder="Enter Address" value={customerAddress} onChangeText={setCustomerAddress} />
            </View>

            <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddCustomer} style={styles.addButton}>
                <Text style={styles.buttonText}>Add Customer</Text>
              </TouchableOpacity>
             
            </View>
          </View>
        </View>
      </Modal>

      {/* Select Customer Modal */}
      <Modal
  visible={isSelectModalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setSelectModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Select Customer</Text>

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectCustomer(item)} style={styles.listItem}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.customerInfo}>Number: {item.number}</Text>
            <Text style={styles.customerInfo}>Address: {item.address}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noCustomers}>No customers found.</Text>}
        style={styles.flatList}
      />

      <TouchableOpacity onPress={() => setSelectModalVisible(false)} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#047857", marginBottom: 10 },
  selectedCustomerContainer: {
    marginBottom: 15,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  subTitle: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
  customerBox: { borderWidth: 1, padding: 8, borderRadius: 4, borderColor: "#ccc" },
  customerName: { fontSize: 14, fontWeight: "bold" },
  customerInfo: { fontSize: 14, color: "#555" },
  input: { borderWidth: 1, fontSize: 16, padding: 12, borderRadius: 6, borderColor: "#ccc", backgroundColor: "#f9f9f9", marginBottom: 10 },
  inputContainer: {
    marginBottom: 10,
  },
  buttonContainer: { flexDirection: "row", gap: 10 },
  button: { flex: 1, maxWidth: "30%", backgroundColor: "#047857", alignItems: "center", justifyContent: "center", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
  
  // Updated styles for the modal
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  
  // Limit the modal height and make it scrollable
  modalContent: { 
    width: "90%", 
    backgroundColor: "white", 
    padding: 16, 
    borderRadius: 8, 
    maxHeight: 400, // Limit the modal height
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#047857", marginBottom: 10 },
  modalButtonContainer: { flexDirection: "row", justifyContent: "space-between" },
  addButton: { backgroundColor: "#34D399", padding: 10, borderRadius: 5 },
  cancelButton: { backgroundColor: "#ccc", padding: 10, borderRadius: 5 },
  cancelButtonText: { color: "#333" },

  // Limit the FlatList height
  flatList: {
    maxHeight: 250, // Limit the height of the FlatList inside the modal
    marginBottom: 10,
  },

  noCustomers: { textAlign: "center", marginVertical: 10 },
  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});



export default CustomerDetails;
