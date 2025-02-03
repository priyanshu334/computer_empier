import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  Button,
  Platform,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import DialogComponent from "./lock_code";
import { AntDesign } from "@expo/vector-icons";
import CameraComponent from "./camera_compo";
import PatternLock from "./parttern_lock";
import { router } from "expo-router";

type DeviceKYCFormProps = {
  initialData?: {
    isPowerAdapterChecked: boolean;
    isKeyboardChecked: boolean;
    isMouseChecked: boolean;
    isDeviceOnWarranty: boolean;
    warrantyExpiryDate: Date | null;
    cameraData: string[];
    otherAccessories: string;
    additionalDetailsList: string[];
    lockCode: string;
  };
  onDataChange: (data: any) => void;
};

const DeviceKYCForm: React.FC<DeviceKYCFormProps> = ({ initialData, onDataChange }) => {
  const [formData, setFormData] = useState({
    isPowerAdapterChecked: false,
    isKeyboardChecked: false,
    isMouseChecked: false,
    isDeviceOnWarranty: false,
    warrantyExpiryDate: null,
    cameraData: [],
    otherAccessories: "",
    additionalDetailsList: [],
    lockCode: "",
    ...initialData,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCameraIndex, setShowCameraIndex] = useState<number | null>(null);

  useEffect(() => {
    onDataChange(formData);
  }, [formData]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePhotoCaptured = (photoPath: string) => {
    const updatedPhotos = [...formData.cameraData];
    if (showCameraIndex !== null) {
      updatedPhotos[showCameraIndex] = photoPath;
      updateFormData("cameraData", updatedPhotos);
    }
    setShowCameraIndex(null);
  };

  const handleAddAccessory = () => {
    if (formData.otherAccessories.trim()) {
      updateFormData("additionalDetailsList", [
        ...formData.additionalDetailsList,
        formData.otherAccessories.trim(),
      ]);
      updateFormData("otherAccessories", "");
    }
  };

  const handleDeleteAccessory = (index: number) => {
    updateFormData(
      "additionalDetailsList",
      formData.additionalDetailsList.filter((_, i) => i !== index)
    );
  };

  const handleWarrantyCheck = (checked: boolean) => {
    updateFormData("isDeviceOnWarranty", checked);
    if (checked) setShowDatePicker(true);
    else updateFormData("warrantyExpiryDate", null);
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) updateFormData("warrantyExpiryDate", selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device KYC Form</Text>

      {/* Camera Grid Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Device Photos</Text>
        <View style={styles.gridContainer}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={styles.gridItem}>
              <Button
                title={`Camera ${index + 1}`}
                onPress={() => setShowCameraIndex(index)}
                color="#047857"
              />
              {formData.cameraData[index] && (
                <Image
                  source={{ uri: formData.cameraData[index] }}
                  style={styles.previewImage}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Lock Code Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Security Settings</Text>
        <DialogComponent onLockCodeSubmit={(code: string) => updateFormData("lockCode", code)} />
        <View style={styles.lockCodeContainer}>
          <Text style={styles.lockCodeText}>Current Lock Code:</Text>
          <Text style={styles.lockCodeValue}>
            {formData.lockCode || "Not Set"}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
  <TouchableOpacity style={{ backgroundColor: '#047857', padding: 10, borderRadius: 5}} onPress={() => router.push("/PatternLock")}>
    <Text>Go to Pattern Lock</Text>
  </TouchableOpacity>
</View>

      {/* Accessories Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Standard Accessories</Text>
        <View style={styles.checkboxGroup}>
          <BouncyCheckbox
            size={25}
            fillColor="#047857"
            text="Power Adapter"
            isChecked={formData.isPowerAdapterChecked}
            onPress={(checked) => updateFormData("isPowerAdapterChecked", checked)}
            textStyle={styles.checkboxText}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#047857"
            text="Keyboard"
            isChecked={formData.isKeyboardChecked}
            onPress={(checked) => updateFormData("isKeyboardChecked", checked)}
            textStyle={styles.checkboxText}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#047857"
            text="Mouse"
            isChecked={formData.isMouseChecked}
            onPress={(checked) => updateFormData("isMouseChecked", checked)}
            textStyle={styles.checkboxText}
          />
        </View>
      </View>

      {/* Additional Accessories Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Additional Accessories</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter accessory name"
            value={formData.otherAccessories}
            onChangeText={(text) => updateFormData("otherAccessories", text)}
            onSubmitEditing={handleAddAccessory}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddAccessory}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        {formData.additionalDetailsList.map((detail, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}>{detail}</Text>
            <TouchableOpacity onPress={() => handleDeleteAccessory(index)}>
              <AntDesign name="closecircle" size={18} color="#dc2626" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Warranty Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Warranty Information</Text>
        <View style={styles.checkboxGroup}>
          <BouncyCheckbox
            size={25}
            fillColor="#047857"
            text="Device Under Warranty"
            isChecked={formData.isDeviceOnWarranty}
            onPress={handleWarrantyCheck}
            textStyle={styles.checkboxText}
          />
        </View>
        
        {formData.isDeviceOnWarranty && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Warranty Expiry:</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {formData.warrantyExpiryDate?.toDateString() || "Select Date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.warrantyExpiryDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        )}
      </View>

      {/* Camera Modal */}
      <Modal visible={showCameraIndex !== null} animationType="slide">
        <View style={styles.modalContainer}>
          {showCameraIndex !== null && (
            <CameraComponent
              onPhotoCaptured={handlePhotoCaptured}
              onClose={() => setShowCameraIndex(null)}
            />
          )}
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
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#047857",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
    color: "#334155",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    gap: 8,
    marginBottom: 12,
  },
  previewImage: {
    width: "100%",
    height: 100,
    borderRadius: 6,
  },
  lockCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  lockCodeText: {
    fontSize: 14,
    color: "#64748b",
  },
  lockCodeValue: {
    fontWeight: "500",
    color: "#dc2626",
  },
  checkboxGroup: {
    gap: 8,
  },
  checkboxText: {
    textDecorationLine: "none",
    color: "#1e293b",
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f8fafc",
  },
  addButton: {
    backgroundColor: "#047857",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: "white",
    fontWeight: "500",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 14,
    color: "#334155",
    flexShrink: 1,
  },
  dateContainer: {
    marginTop: 12,
  },
  dateLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f8fafc",
  },
  dateText: {
    fontSize: 14,
    color: "#334155",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default DeviceKYCForm;