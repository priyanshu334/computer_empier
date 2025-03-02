import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker"; // Picker for dropdown
import { useServiceCenters } from "../hooks/useServiceCenters"; // Import the custom hook
import { useServiceProviders } from "@/hooks/useServiceProvider";

type RepairPartnerProps = {
  onDataChange: (data: {
    selectedRepairStation: string | null;
    selectedInHouseOption: string;
    selectedServiceCenterOption: string;
    pickupDate: Date | null;
    pickupTime: Date | null;
  }) => void;
  initialData?: {
    selectedRepairStation: string | null;
    selectedInHouseOption: string;
    selectedServiceCenterOption: string;
    pickupDate: Date | null;
    pickupTime: Date | null;
  };
};

const RepairPartner: React.FC<RepairPartnerProps> = ({ onDataChange, initialData }) => {
  const { centers } = useServiceCenters(); // Use the custom hook to fetch centers
  const { providers } = useServiceProviders();
  const [selectedRepairStation, setSelectedRepairStation] = useState<
  "in-house" | "service-center" | null
>(
  (initialData?.selectedRepairStation as "in-house" | "service-center" | null) || null
);

  const [selectedInHouseOption, setSelectedInHouseOption] = useState(initialData?.selectedInHouseOption || "");
  const [selectedServiceCenterOption, setSelectedServiceCenterOption] = useState(initialData?.selectedServiceCenterOption || "");
  const [pickupDate, setPickupDate] = useState<Date | null>(initialData?.pickupDate || null);
  const [pickupTime, setPickupTime] = useState<Date | null>(initialData?.pickupTime || null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      onDataChange(initialData);
    }
  }, [initialData]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || pickupDate;
    setShowDatePicker(Platform.OS === "ios");
    setPickupDate(currentDate);
    onDataChange({
      selectedRepairStation,
      selectedInHouseOption,
      selectedServiceCenterOption,
      pickupDate: currentDate,
      pickupTime,
    });
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || pickupTime;
    setShowTimePicker(Platform.OS === "ios");
    setPickupTime(currentTime);
    onDataChange({
      selectedRepairStation,
      selectedInHouseOption,
      selectedServiceCenterOption,
      pickupDate,
      pickupTime: currentTime,
    });
  };

  const phoneNumber = selectedServiceCenterOption;
  const messageText = "Hello! This is a test message.";

  // Handler for phone, message, and WhatsApp actions
  const handlePhonePress = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(() =>
      Alert.alert("Error", "Phone app could not be opened.")
    );
  };

  const handleMessagePress = () => {
    const messageUrl = `sms:${phoneNumber}?body=${encodeURIComponent(
      messageText
    )}`;
    Linking.openURL(messageUrl).catch(() =>
      Alert.alert("Error", "Message app could not be opened.")
    );
  };

  const handleWhatsAppPress = () => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      messageText
    )}`;
    Linking.openURL(whatsappUrl).catch(() =>
      Alert.alert(
        "Error",
        "WhatsApp is not installed on this device or could not be opened."
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Receiver Details</Text>

      {/* Select Repair Station */}
      <Text style={styles.subHeader}>Select Repair Station</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.repairStationOption}
          onPress={() => {
            setSelectedRepairStation("in-house");
            onDataChange({
              selectedRepairStation: "in-house",
              selectedInHouseOption,
              selectedServiceCenterOption,
              pickupDate,
              pickupTime,
            });
          }}
        >
          <Ionicons
            name={selectedRepairStation === "in-house" ? "checkbox" : "square-outline"}
            size={24}
            color={selectedRepairStation === "in-house" ? "#2563EB" : "#4B5563"}
          />
          <Text style={styles.optionText}>In-house</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.repairStationOption}
          onPress={() => {
            setSelectedRepairStation("service-center");
            onDataChange({
              selectedRepairStation: "service-center",
              selectedInHouseOption,
              selectedServiceCenterOption,
              pickupDate,
              pickupTime,
            });
          }}
        >
          <Ionicons
            name={
              selectedRepairStation === "service-center" ? "checkbox" : "square-outline"
            }
            size={24}
            color={selectedRepairStation === "service-center" ? "#2563EB" : "#4B5563"}
          />
          <Text style={styles.optionText}>Service Center</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Dropdowns */}
      {selectedRepairStation === "in-house" && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.subHeader}>Select Service Provider</Text>
          <Picker
            selectedValue={selectedInHouseOption}
            onValueChange={(itemValue) => {
              setSelectedInHouseOption(itemValue);
              onDataChange({
                selectedRepairStation,
                selectedInHouseOption: itemValue,
                selectedServiceCenterOption,
                pickupDate,
                pickupTime,
              });
            }}
            style={styles.picker}
          >
            {providers.map((provider) => (
              <Picker.Item
                key={provider.id}
                label={provider.name}
                value={provider.id}
              />
            ))}
          </Picker>

        
        </View>
      )}

      {selectedRepairStation === "service-center" && (
        <View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.subHeader}>Select Service Center Option</Text>
            <Picker
              selectedValue={selectedServiceCenterOption}
              onValueChange={(itemValue) => {
                setSelectedServiceCenterOption(itemValue);
                onDataChange({
                  selectedRepairStation,
                  selectedInHouseOption,
                  selectedServiceCenterOption: itemValue,
                  pickupDate,
                  pickupTime,
                });
              }}
              style={styles.picker}
            >
              {/* Dynamically populate the Picker with service center options */}
              {centers.map((center) => (
                <Picker.Item
                  key={center.id}
                  label={center.name}
                  value={center.id}
                />
              ))}
            </Picker>
          </View>

          {/* Pickup Date */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.subHeader}>Pickup Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {pickupDate ? pickupDate.toLocaleDateString() : "Select Date"}
              </Text>
              <Ionicons name="calendar-outline" size={24} color="#4B5563" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={pickupDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Pickup Time */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.subHeader}>Pickup Time</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {pickupTime ? pickupTime.toLocaleTimeString() : "Select Time"}
              </Text>
              <Ionicons name="time-outline" size={24} color="#4B5563" />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={pickupTime || new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          {/* Communication Icons */}
        
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
   
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginTop:10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#047857"
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  repairStationOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4B5563",
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 8,
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  datePickerText: {
    fontSize: 16,
    color: "#4B5563",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
});

export default RepairPartner;