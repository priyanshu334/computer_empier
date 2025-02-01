import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import DialogComponent from "./lock_code";
import { useRouter } from "expo-router";
import { useCameraStorage } from "@/hooks/useCameraImagesStorage";
import CameraComponent from "./camera_compo";
import CameraPage from "@/app/camera_page";


const DeviceKYCForm = ({ onSubmit }) => {
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
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const { photos, updatePhoto } = useCameraStorage();
  const [capturedPhotos, setCapturedPhotos] = useState([null, null, null, null]);

  const [showCameraIndex, setShowCameraIndex] = useState(null);

  function handlePhotoCaptured(photoPath) {
    const updatedPhotos = [...capturedPhotos];
    updatedPhotos[showCameraIndex] = photoPath;
    setCapturedPhotos(updatedPhotos);
  }
  console.log(photos)
  const router = useRouter();

  // Update parent component when form data changes
  useEffect(() => {
    onSubmit?.(formData);
  }, [formData, onSubmit]);

  useEffect(() => {
    updateFormData("cameraData", photos);
  }, [photos])
  console.log(photos)

  const updateFormData = (key, value) => {
    setFormData((prev) => {
      if (Array.isArray(prev[key]) && Array.isArray(value)) {
        return { ...prev, [key]: [...prev[key], ...value] }; // Merge arrays
      }
      return { ...prev, [key]: value };
    });
  };
  
  const handleLockCodeSubmit = (code) => {
    updateFormData("lockCode", code);
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

  const handleDeleteAccessory = (index) => {
    updateFormData(
      "additionalDetailsList",
      formData.additionalDetailsList.filter((_, i) => i !== index)
    );
  };

  const handleWarrantyCheck = (checked) => {
    updateFormData("isDeviceOnWarranty", checked);
    if (checked) setShowDatePicker(true);
    else updateFormData("warrantyExpiryDate", null);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep picker open on iOS
    if (selectedDate) updateFormData("warrantyExpiryDate", selectedDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Device KYC Form</Text>

      {/* Camera Button */}
     
      {/* <View style={styles.container}>
      {showCameraIndex === null ? (
        <View style={styles.gridContainer}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={styles.gridItem}>
              <Button
                title={`Open Camera ${index + 1}`}
                onPress={() => setShowCameraIndex(index)}
              />
              <View style={styles.previewContainer}>
                <Text style={styles.previewText}>Photo Preview:</Text>
                {capturedPhotos[index] ? (
                  <Image
                    source={{ uri: capturedPhotos[index]}}
                    style={styles.previewImage}
                  />
                ) : (
                  <Text>No Image Captured</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ) : (
        <CameraComponent
          onPhotoCaptured={handlePhotoCaptured}
          onClose={() => setShowCameraIndex(null)}
        />
      )}
    </View> */}

      {/* Lock Code Section */}
      <View style={styles.buttonGroup}>
        <DialogComponent onLockCodeSubmit={handleLockCodeSubmit} />
        <View style={{flexDirection: "row",rowGap:10 ,marginBlock:10}}>
          <Text style={{fontWeight:"bold", marginRight:10}}>Lock Code: </Text>
          <Text style={{color:"red"}}>
            {formData.lockCode || "Not Set"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/PatternLock")}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="pattern" size={20} color="#FFFFFF" />
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
          isChecked={formData.isPowerAdapterChecked}
          onPress={(checked) => updateFormData("isPowerAdapterChecked", checked)}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          text="Keyboard"
          isChecked={formData.isKeyboardChecked}
          onPress={(checked) => updateFormData("isKeyboardChecked", checked)}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#34D399"
          text="Mouse"
          isChecked={formData.isMouseChecked}
          onPress={(checked) => updateFormData("isMouseChecked", checked)}
        />
      </View>

      {formData.additionalDetailsList.map((detail, index) => (
        <View key={index} style={styles.additionalItemContainer}>
          <Text style={styles.additionalItem}>
            {index + 1}. {detail}
          </Text>
          <TouchableOpacity onPress={() => handleDeleteAccessory(index)}>
            <AntDesign name="delete" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Additional Accessories */}
      <Text style={styles.label}>Additional Accessories</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter accessory name"
          value={formData.otherAccessories}
          onChangeText={(text) => updateFormData("otherAccessories", text)}
          onSubmitEditing={handleAddAccessory}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAddAccessory}>
          <AntDesign name="plus" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Additional Details */}
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
          value={formData.additionalDetails}
          onChangeText={(text) => updateFormData("additionalDetails", text)}
        />
      </View>

      {/* Warranty Checkbox */}
      <BouncyCheckbox
        size={25}
        fillColor="#34D399"
        text="Device on Warranty"
        isChecked={formData.isDeviceOnWarranty}
        onPress={handleWarrantyCheck}
        style={{ marginTop: 6 }}
      />

      {/* Warranty Expiry Date Picker */}
      {formData.isDeviceOnWarranty && (
        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Warranty Expiry Date:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>
              {formData.warrantyExpiryDate
                ? formData.warrantyExpiryDate.toDateString()
                : "Select Date"}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#047857",
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 8,
  },
  button: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "teal",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#FFFFFF", 
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  checkboxGroup: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
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
    paddingVertical: 2,
    backgroundColor: "#F9FAFB",
    gap: 8,
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
    paddingHorizontal: 8,
    gap: 8,
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
  },
});


export default DeviceKYCForm;
