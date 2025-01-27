import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CameraDialog from "./model_details"; // Import CameraDialog
import DialogComponent from "./lock_code";
import BarcodeScanner from "./bar_code_scan";

const DeviceKYCForm = () => {
  const [isPowerAdapterChecked, setPowerAdapterChecked] = useState(false);
  const [isKeyboardChecked, setKeyboardChecked] = useState(false);
  const [isMouseChecked, setMouseChecked] = useState(false);
  const [isDeviceOnWarranty, setDeviceOnWarranty] = useState(false);
  const [isCameraDialogVisible, setCameraDialogVisible] = useState(false); // State for modal visibility

  const handleLockCodeSubmit = (lockCode) => {
    console.log("Lock Code submitted by user:", lockCode);
    // You can handle the lock code here (e.g., save it, validate it, etc.)
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Device KYC Form</Text>

      {/* Buttons Section */}
      <View style={styles.buttonGroup}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => setCameraDialogVisible(true)} // Show modal
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="info-circle" size={20} color="#4B5563" />
            <Text style={styles.buttonText}>Model Details</Text>
          </View>
        </TouchableOpacity> */}
        <CameraDialog/>
 
        {/* <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="lock" size={20} color="#4B5563" />
            <Text style={styles.buttonText}>Set Lock Code</Text>
          </View>
        </TouchableOpacity> */}
          <DialogComponent onLockCodeSubmit={handleLockCodeSubmit} />

          

        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="pattern" size={20} color="#4B5563" />
            <Text style={styles.buttonText}>Set Pattern Lock Code</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <AntDesign name="scan1" size={20} color="#4B5563" />
            <Text style={styles.buttonText}>Open Barcode Scanner</Text>
          </View>
        </TouchableOpacity> */}
        <BarcodeScanner/>
      </View>

      {/* Accessories List Section */}
      <Text style={styles.label}>Accessories List</Text>
      <View style={styles.checkboxGroup}>
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Power Adapter"
          isChecked={isPowerAdapterChecked}
          onPress={(isSelected) => setPowerAdapterChecked(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={styles.checkboxText}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Keyboard"
          isChecked={isKeyboardChecked}
          onPress={(isSelected) => setKeyboardChecked(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={styles.checkboxText}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Mouse"
          isChecked={isMouseChecked}
          onPress={(isSelected) => setMouseChecked(isSelected)}
          iconStyle={{ borderColor: "#34D399", borderRadius: 4 }}
          textStyle={styles.checkboxText}
        />
      </View>

      {/* Additional Options Section */}
      <View style={styles.additionalOptions}>
        {/* TextInput for Other Accessories */}
        <View style={styles.inputContainer}>
          <AntDesign
            name="pluscircleo"
            size={20}
            color="#4B5563"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Other Accessories"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* TextInput for Additional Details */}
        <View style={styles.inputContainer}>
          <FontAwesome
            name="info-circle"
            size={20}
            color="#4B5563"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Additional Details"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          unfillColor="#FFFFFF"
          text="Device on Warranty"
          isChecked={isDeviceOnWarranty}
          onPress={(isSelected) => setDeviceOnWarranty(isSelected)}
          iconStyle={{ borderColor: "#34D399" }}
          textStyle={styles.checkboxText}
          className="mb-4"
        />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Camera Dialog */}
      {isCameraDialogVisible && (
        <CameraDialog
          visible={isCameraDialogVisible}
          onClose={() => setCameraDialogVisible(false)} // Close modal
        />
      )}
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonGroup: {
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#4B5563",
    marginLeft: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  checkboxGroup: {
    marginBottom: 16,
  },
  checkboxText: {
    textDecorationLine: "none",
    color: "#4B5563",
  },
  additionalOptions: {
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#34D399",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  additionalOptions: {
    flexDirection: "column",
    gap: 16,
  },
  
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
  },
  
  icon: {
    marginRight: 8,
  },
  
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  
});

export default DeviceKYCForm;
