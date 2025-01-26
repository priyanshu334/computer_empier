import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const FilterComponent = () => {
  const [serviceCenter, setServiceCenter] = React.useState(null);
  const [serviceProvider, setServiceProvider] = React.useState(null);

  const [serviceCenterOpen, setServiceCenterOpen] = React.useState(false);
  const [serviceProviderOpen, setServiceProviderOpen] = React.useState(false);

  const [serviceCenterItems, setServiceCenterItems] = React.useState([
    { label: "Center 1", value: "center1" },
    { label: "Center 2", value: "center2" },
  ]);

  const [serviceProviderItems, setServiceProviderItems] = React.useState([
    { label: "Provider 1", value: "provider1" },
    { label: "Provider 2", value: "provider2" },
  ]);

  return (
    <View className="bg-white p-6 rounded-lg shadow-lg">
      {/* Title */}
      <View className="flex flex-row items-center mb-6">
        <AntDesign name="filter" size={24} color="#047857" />
        <Text className="ml-3 text-2xl font-bold text-[#047857]">
          Filters
        </Text>
      </View>

      {/* Customer Name Input */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Customer Name</Text>
        <TextInput
          placeholder="Enter customer name"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-100 border border-gray-300 rounded-lg h-12 px-4 text-base"
        />
      </View>

      {/* Service Center Dropdown */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Service Center</Text>
        <DropDownPicker
          open={serviceCenterOpen}
          value={serviceCenter}
          items={serviceCenterItems}
          setOpen={setServiceCenterOpen}
          setValue={setServiceCenter}
          setItems={setServiceCenterItems}
          placeholder="Select Service Center"
          style={{
            backgroundColor: "#F3F4F6",
            borderColor: "#E5E7EB",
            borderRadius: 8,
            height: 48,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
          }}
          textStyle={{
            fontSize: 14,
            color: "#374151",
          }}
        />
      </View>

      {/* Service Provider Dropdown */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Service Provider</Text>
        <DropDownPicker
          open={serviceProviderOpen}
          value={serviceProvider}
          items={serviceProviderItems}
          setOpen={setServiceProviderOpen}
          setValue={setServiceProvider}
          setItems={setServiceProviderItems}
          placeholder="Select Service Provider"
          style={{
            backgroundColor: "#F3F4F6",
            borderColor: "#E5E7EB",
            borderRadius: 8,
            height: 48,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
          }}
          textStyle={{
            fontSize: 14,
            color: "#374151",
          }}
        />
      </View>

      {/* Repair Date */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Repair Date</Text>
        <TouchableOpacity className="flex flex-row items-center bg-gray-100 border border-gray-300 rounded-lg h-12 px-4">
          <AntDesign name="calendar" size={20} color="#9CA3AF" />
          <Text className="ml-3 text-gray-500 text-base">Select Date</Text>
        </TouchableOpacity>
      </View>

      {/* Apply Filters Button */}
      <View>
        <TouchableOpacity className="bg-[#047857] py-3 rounded-lg">
          <Text className="text-center text-white text-lg font-medium">
            Apply Filters
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterComponent;
