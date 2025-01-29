import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type OrderDetailsProps = {
  onDataChange: (data: {
    deviceModel: string;
    orderStatus: string;
    problems: string[];
  }) => void;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ onDataChange }) => {
  const [deviceModel, setDeviceModel] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("Pending");
  const [problemText, setProblemText] = useState<string>("");
  const [problems, setProblems] = useState<string[]>([]);

  const handleAddProblem = () => {
    if (!problemText.trim()) {
      alert("Please enter a valid problem description.");
      return;
    }
    setProblems((prevProblems) => {
      const updatedProblems = [...prevProblems, problemText];
      onDataChange({ deviceModel, orderStatus, problems: updatedProblems }); // Send updated data to parent
      return updatedProblems;
    });
    setProblemText(""); // Clear the input after adding
  };

  const handleDeleteProblem = (index: number) => {
    setProblems((prevProblems) => {
      const updatedProblems = prevProblems.filter((_, i) => i !== index);
      onDataChange({ deviceModel, orderStatus, problems: updatedProblems }); // Send updated data to parent
      return updatedProblems;
    });
  };

  const handleDeviceModelChange = (model: string) => {
    setDeviceModel(model);
    onDataChange({ deviceModel: model, orderStatus, problems });
  };

  const handleOrderStatusChange = (status: string) => {
    setOrderStatus(status);
    onDataChange({ deviceModel, orderStatus: status, problems });
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
          onChangeText={handleDeviceModelChange}
          placeholder="Enter Device Model"
        />
      </View>

      {/* Order Status Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Order Status</Text>
        <Picker
          selectedValue={orderStatus}
          onValueChange={handleOrderStatusChange}
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
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteProblem(index)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  problemText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  noProblemsText: {
    fontSize: 14,
    color: "#666",
  },
});

export default OrderDetails;
