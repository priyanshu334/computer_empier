import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const ReceiverDetails = () => {
  const [selectedRepairStation, setSelectedRepairStation] = useState<
    "in-house" | "service-center" | null
  >(null);
  const [selectedInHouseOption, setSelectedInHouseOption] = useState("");
  const [selectedServiceCenterOption, setSelectedServiceCenterOption] = useState("");
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || pickupDate;
    setShowDatePicker(Platform.OS === "ios");
    setPickupDate(currentDate);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || pickupTime;
    setShowTimePicker(Platform.OS === "ios");
    setPickupTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Receiver Details</Text>

      {/* Select Repair Station */}
      <Text style={styles.subHeader}>Select Repair Station</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.repairStationOption}
          onPress={() => setSelectedRepairStation("in-house")}
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
          onPress={() => setSelectedRepairStation("service-center")}
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
            onValueChange={setSelectedInHouseOption}
            style={styles.picker}
          >
            <Picker.Item label="Provider 1" value="provider1" />
            <Picker.Item label="Provider 2" value="provider2" />
          </Picker>
        </View>
      )}

      {selectedRepairStation === "service-center" && (
        <View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.subHeader}>Select Service Center Option</Text>
            <Picker
              selectedValue={selectedServiceCenterOption}
              onValueChange={setSelectedServiceCenterOption}
              style={styles.picker}
            >
              <Picker.Item label="Service 1" value="service1" />
              <Picker.Item label="Service 2" value="service2" />
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
          <View style={styles.iconsContainer}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={32} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbox-outline" size={32} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="logo-whatsapp" size={32} color="#4B5563" />
            </TouchableOpacity>
          </View>
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
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
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

export default ReceiverDetails;
