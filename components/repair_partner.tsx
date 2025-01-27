import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date/Time Picker
import { Picker } from '@react-native-picker/picker';

const ReceiverDetails = () => {
  const [selectedRepairStation, setSelectedRepairStation] = useState<'in-house' | 'service-center' | null>(null);
  const [selectedInHouseOption, setSelectedInHouseOption] = useState('');
  const [selectedServiceCenterOption, setSelectedServiceCenterOption] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Handle date change
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || pickupDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPickupDate(currentDate);
  };

  // Handle time change
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || pickupTime;
    setShowTimePicker(Platform.OS === 'ios');
    setPickupTime(currentTime);
  };

  return (
    <View className="bg-white p-6 rounded-lg shadow-md mx-4 my-4">
      {/* Receiver Details Heading */}
      <Text className="text-2xl font-semibold text-gray-800 mb-6">Receiver Details</Text>

      {/* Select Repair Station */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">Select Repair Station</Text>

      {/* In-house and Service Center Checkboxes */}
      <View className="flex-row mb-6">
        <TouchableOpacity
          className={`flex-row items-center mr-6 ${selectedRepairStation === 'in-house' ? 'text-blue-500' : 'text-gray-700'}`}
          onPress={() => setSelectedRepairStation('in-house')}
        >
          <Ionicons
            name={selectedRepairStation === 'in-house' ? 'checkbox' : 'square-outline'}
            size={24}
            color="#4B5563"
          />
          <Text className="ml-2 text-gray-800">In-house</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center ${selectedRepairStation === 'service-center' ? 'text-blue-500' : 'text-gray-700'}`}
          onPress={() => setSelectedRepairStation('service-center')}
        >
          <Ionicons
            name={selectedRepairStation === 'service-center' ? 'checkbox' : 'square-outline'}
            size={24}
            color="#4B5563"
          />
          <Text className="ml-2 text-gray-800">Service Center</Text>
        </TouchableOpacity>
      </View>

      {/* Show dropdowns based on selected station */}
      {selectedRepairStation === 'in-house' && (
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Select Service Provider</Text>
          <Picker
            selectedValue={selectedInHouseOption}
            onValueChange={setSelectedInHouseOption}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingLeft: 8,
              backgroundColor: '#F9FAFB'
            }}
          >
            <Picker.Item label="Provider 1" value="provider1" />
            <Picker.Item label="Provider 2" value="provider2" />
          </Picker>
        </View>
      )}

      {selectedRepairStation === 'service-center' && (
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Select Service Center Option</Text>
          <Picker
            selectedValue={selectedServiceCenterOption}
            onValueChange={setSelectedServiceCenterOption}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingLeft: 8,
              backgroundColor: '#F9FAFB'
            }}
          >
            <Picker.Item label="Service 1" value="service1" />
            <Picker.Item label="Service 2" value="service2" />
          </Picker>
        </View>
      )}

      {/* Pickup Date */}
      <View className="mb-6">
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

      {/* Icons for Phone, Text Message, WhatsApp */}
      <View className="flex-row mb-6">
        <TouchableOpacity className="mr-6">
          <Ionicons name="call-outline" size={32} color="#4B5563" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-6">
          <Ionicons name="chatbox-outline" size={32} color="#4B5563" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="logo-whatsapp" size={32} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReceiverDetails;
