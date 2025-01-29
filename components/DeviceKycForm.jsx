import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CameraDialog from "./model_details"; // Import CameraDialog
import DialogComponent from "./lock_code";
import { useRouter } from "expo-router";

const DeviceKYCForm = ({ onSubmit }) => {
  const [isPowerAdapterChecked, setPowerAdapterChecked] = useState(false);
  const [isKeyboardChecked, setKeyboardChecked] = useState(false);
  const [isMouseChecked, setMouseChecked] = useState(false);
  const [isDeviceOnWarranty, setDeviceOnWarranty] = useState(false);
  const [isCameraDialogVisible, setCameraDialogVisible] = useState(false);
  const [cameraData, setCameraData] = useState(null);
  const [otherAccessories, setOtherAccessories] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [additionalDetailsList, setAdditionalDetailsList] = useState([]);
  const [lockCode, setLockCode] = useState("");
  const router = useRouter();

  const handleLockCodeSubmit = (code) => {
    console.log("Lock Code submitted:", code);
    setLockCode(code);
  };

  const handleAddAccessory = () => {
    if (otherAccessories.trim()) {
      setAdditionalDetailsList((prevList) => [...prevList, otherAccessories.trim()]);
      setOtherAccessories("");
    }
  };

  const handleDeleteAccessory = (index) => {
    setAdditionalDetailsList((prevList) =>
      prevList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleSubmit = () => {
    const formData = {
      isPowerAdapterChecked,
      isKeyboardChecked,
      isMouseChecked,
      isDeviceOnWarranty,
      cameraData,
      otherAccessories,
      additionalDetailsList,
      lockCode,
    };

    onSubmit?.(formData);
  };

  const handleNavigateToPatternLock = () => {
    router.push("/PatternLock");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Device KYC Form</Text>

      {/* Camera Dialog */}
      <CameraDialog
        visible={isCameraDialogVisible}
        onClose={() => setCameraDialogVisible(false)}
        onSave={(data) => {
          setCameraData(data);
          setCameraDialogVisible(false);
        }}
      />

      {/* Buttons Section */}
      <View style={styles.buttonGroup}>
        <DialogComponent onLockCodeSubmit={handleLockCodeSubmit} />
        <Text style={styles.infoText}>Lock Code: {lockCode || "Not Set"}</Text>

        <TouchableOpacity style={styles.button} onPress={handleNavigateToPatternLock}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="pattern" size={20} color="#4B5563" />
            <Text style={styles.buttonText}>Set Pattern Lock Code</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Accessories List */}
      <Text style={styles.label}>Accessories List</Text>
      <View style={styles.checkboxGroup}>
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          text="Power Adapter"
          isChecked={isPowerAdapterChecked}
          onPress={setPowerAdapterChecked}
          iconStyle={{ borderColor: "#34D399" }}
          textStyle={styles.checkboxText}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          text="Keyboard"
          isChecked={isKeyboardChecked}
          onPress={setKeyboardChecked}
          iconStyle={{ borderColor: "#34D399" }}
          textStyle={styles.checkboxText}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          text="Mouse"
          isChecked={isMouseChecked}
          onPress={setMouseChecked}
          iconStyle={{ borderColor: "#34D399" }}
          textStyle={styles.checkboxText}
        />
      </View>

      {/* Additional Options */}
      <Text style={styles.label}>Additional Accessories</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter accessory name"
          value={otherAccessories}
          onChangeText={setOtherAccessories}
          onSubmitEditing={handleAddAccessory}
          returnKeyType="done"
        />
      </View>
      {additionalDetailsList.map((detail, index) => (
        <View key={index} style={styles.additionalItemContainer}>
          <Text style={styles.additionalItem}>
            {index + 1}. {detail}
          </Text>
          <TouchableOpacity onPress={() => handleDeleteAccessory(index)}>
            <AntDesign name="delete" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.inputContainer}>
        <FontAwesome name="info-circle" size={20} color="#4B5563" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Additional Details"
          value={additionalDetails}
          onChangeText={setAdditionalDetails}
        />
      </View>

      <BouncyCheckbox
        size={25}
        fillColor="#34D399"
        text="Device on Warranty"
        isChecked={isDeviceOnWarranty}
        onPress={setDeviceOnWarranty}
        iconStyle={{ borderColor: "#34D399" }}
        textStyle={styles.checkboxText}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  additionalItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  additionalItem: {
    fontSize: 14,
    color: "#4B5563",
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
  infoText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
});

export default DeviceKYCForm;
