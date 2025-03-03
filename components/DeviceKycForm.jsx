import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Image,
  Modal
} from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import DialogComponent from "./lock_code";
import { useRouter } from "expo-router";
import { useCameraStorage } from "@/hooks/useCameraImagesStorage";
import CameraComponent from "./camera_compo";
import CameraPage from "@/app/camera_page";
import { Button } from "react-native";


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
 
  const [capturedPhotos, setCapturedPhotos] = useState([null, null, null, null]);
  const [showCameraIndex, setShowCameraIndex] = useState(null);
  const [userInputs, setUserInputs] = useState(["", "", "", ""]);
  

  function handlePhotoCaptured(photoPath) {
    const updatedPhotos = [...formData.cameraData];
    updatedPhotos[showCameraIndex] = photoPath;
    
    setFormData((prev) => ({
      ...prev,
      cameraData: updatedPhotos, // Save images in form data
    }));
  
    setCapturedPhotos(updatedPhotos); // Update local state (optional)
    setShowCameraIndex(null);
  }
  const router = useRouter();

  // Update parent component when form data changes
  useEffect(() => {
    onSubmit?.(formData);
  }, [formData, onSubmit]);

  
  

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
    <ScrollView contentContainerClassName={styles.container}>
      <Text style={{   fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#047857" }}>Device KYC Form</Text>
      <View style={styles.container}>
  <View style={styles.gridContainer}>
    {[0, 1, 2, 3].map((index) => (
      <View key={index} style={styles.gridItem}>
        <Button title={`Open Camera ${index + 1}`} onPress={() => setShowCameraIndex(index)} />
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Photo Preview:</Text>
          {capturedPhotos[index] ? (
            <Image source={{ uri: capturedPhotos[index] }} style={styles.previewImage} />
          ) : (
            <Text>No Image Captured</Text>
          )}
        </View>
      </View>
    ))}
  </View>

  {/* Fullscreen Camera Modal */}
  <Modal visible={showCameraIndex !== null} animationType="slide" transparent={false}>
    <View style={styles.cameraContainer}>
      <CameraComponent
        onPhotoCaptured={handlePhotoCaptured}
        onClose={() => setShowCameraIndex(null)}
      />
    </View>
  </Modal>
</View>
      
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
          
           
            <Text style={styles.buttonText}>Set Pattern Lock Code</Text>
  
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
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
    justifyContent: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  gridItem: {
    width: "45%",
    marginBottom: 20,
  },
  previewContainer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  previewImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#008080",
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: "#F9FAFB",
    marginTop: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  submitButton: {
    backgroundColor: "#34D399",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
