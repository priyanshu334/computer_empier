import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For calendar and clock icons
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const EstimateDetails: React.FC = () => {
  const [repairCost, setRepairCost] = useState<string>("");
  const [advancePaid, setAdvancePaid] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || pickupDate;
    setShowDatePicker(Platform.OS === "ios");
    setPickupDate(currentDate);
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || pickupTime;
    setShowTimePicker(Platform.OS === "ios");
    setPickupTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimate Details</Text>

      {/* Repair Cost Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Repair Cost</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Repair Cost"
          value={repairCost}
          onChangeText={setRepairCost}
          keyboardType="numeric"
        />
      </View>

      {/* Advance Paid Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Advance Paid</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Advance Paid"
          value={advancePaid}
          onChangeText={setAdvancePaid}
          keyboardType="numeric"
        />
      </View>

      {/* Pickup Date */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pickup Date</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pickup Time</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateText}>
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

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
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
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#34D399",
    borderRadius: 8,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default EstimateDetails;
