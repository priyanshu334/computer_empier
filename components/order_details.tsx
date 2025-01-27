import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const OrderDetails: React.FC = () => {
  const [deviceModel, setDeviceModel] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("Pending");
  const [problemText, setProblemText] = useState<string>("");
  const [problems, setProblems] = useState<string[]>([]);

  const handleAddProblem = () => {
    if (!problemText.trim()) {
      alert("Please enter a valid problem description.");
      return;
    }
    setProblems((prevProblems) => [...prevProblems, problemText]);
    setProblemText(""); // Clear the input after adding
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>

      {/* Device Model Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Device Model</Text>
        <TextInput
          style={styles.input}
          value={deviceModel}
          onChangeText={setDeviceModel}
          placeholder="Enter Device Model"
        />
      </View>

      {/* Order Status Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Order Status</Text>
        <Picker
          selectedValue={orderStatus}
          onValueChange={(itemValue) => setOrderStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Processing" value="Processing" />
          <Picker.Item label="Shipped" value="Shipped" />
          <Picker.Item label="Delivered" value="Delivered" />
          <Picker.Item label="Cancelled" value="Cancelled" />
        </Picker>
      </View>

      {/* Problem Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Problems List</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={problemText}
          onChangeText={setProblemText}
          placeholder="Describe Problems"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddProblem}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Display Added Problems */}
      <View style={styles.problemsContainer}>
        <Text style={styles.problemsTitle}>Added Problems:</Text>
        {problems.length > 0 ? (
          <FlatList
            data={problems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.problemItem}>
                <Text style={styles.problemText}>
                  Problem {index + 1}: {item}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noProblemsText}>No problems added yet.</Text>
        )}
      </View>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  addButton: {
    backgroundColor: "teal",
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  problemsContainer: {
    marginTop: 16,
  },
  problemsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  problemItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  problemText: {
    fontSize: 14,
    color: "#333",
  },
  noProblemsText: {
    fontSize: 14,
    color: "#666",
  },
});

export default OrderDetails;
