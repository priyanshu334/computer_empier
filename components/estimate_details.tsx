import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For calendar and clock icons
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const EstimateDetails = () => {
  // Define state types
  const [repairCost, setRepairCost] = useState<string>('');
  const [advancePaid, setAdvancePaid] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null); // Use Date or null
  const [pickupTime, setPickupTime] = useState<Date | null>(null); // Use Date or null
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  // Date change handler
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || pickupDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPickupDate(currentDate);
  };

  // Time change handler
  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || pickupTime;
    setShowTimePicker(Platform.OS === 'ios');
    setPickupTime(currentTime);
  };

  return (
    <View className="bg-white p-6 rounded-lg shadow-lg mx-4 my-4">
      {/* Title */}
      <Text className="text-2xl font-semibold text-gray-800 mb-6">Estimate Details</Text>

      {/* Repair Cost Input */}
      <View className="flex-row items-center mb-4">
        <Text className="text-xl font-medium text-gray-600 mr-2">₹</Text>
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Repair Cost"
          value={repairCost}
          onChangeText={setRepairCost}
          keyboardType="numeric"
        />
      </View>

      {/* Advance Paid Input */}
      <View className="flex-row items-center mb-6">
        <Text className="text-xl font-medium text-gray-600 mr-2">₹</Text>
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Advance Paid"
          value={advancePaid}
          onChangeText={setAdvancePaid}
          keyboardType="numeric"
        />
      </View>

      {/* Pickup Date */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Pickup Date</Text>
        <TouchableOpacity
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-lg text-gray-800">{pickupDate ? pickupDate.toLocaleDateString() : 'Select Date'}</Text>
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
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-2">Pickup Time</Text>
        <TouchableOpacity
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
          onPress={() => setShowTimePicker(true)}
        >
          <Text className="text-lg text-gray-800">{pickupTime ? pickupTime.toLocaleTimeString() : 'Select Time'}</Text>
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
      <TouchableOpacity className="bg-green-500 text-white rounded-md px-6 py-3 mt-4 shadow-lg">
        <Text className="text-lg font-semibold">Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EstimateDetails;
