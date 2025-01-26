import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const OrderDetails = () => {
  const [deviceModel, setDeviceModel] = useState('');
  const [orderStatus, setOrderStatus] = useState('Pending');
  const [problems, setProblems] = useState([]);

  const handleAddProblem = () => {
    // Add problem logic here
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md">
      <Text className="text-lg font-bold mb-4">Order Details</Text>

      <View className="mb-4">
        <Text className="text-sm font-medium mb-2">Enter Device Model</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2"
          value={deviceModel}
          onChangeText={setDeviceModel}
          placeholder="Enter Device Model"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium mb-2">Order Status</Text>
        <Picker
          selectedValue={orderStatus}
          onValueChange={(itemValue) => setOrderStatus(itemValue)}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10 }} // Apply basic styling
        >
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Processing" value="Processing" />
          <Picker.Item label="Shipped" value="Shipped" />
          <Picker.Item label="Delivered" value="Delivered" />
          <Picker.Item label="Cancelled" value="Cancelled" />
        </Picker>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium mb-2">Problems List</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 h-24" // Added height for multiline input
          multiline
          numberOfLines={4}
          placeholder="Describe Problems"
        />
        <TouchableOpacity
          className="bg-green-500 text-white rounded-md px-4 py-2 mt-2"
          onPress={handleAddProblem}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetails;