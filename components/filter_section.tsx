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
    <View className="flex flex-col gap-4 p-4 border bg-[#F0FDF4]">
      {/* Title */}
      <View className="flex flex-row gap-2 items-center">
        <AntDesign name="filter" size={24} color="#047857" />
        <Text className="text-lg font-bold text-blue-600">Filters</Text>
      </View>
      <View className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md bg-white">
        {/* Customer Name Input */}
        <View className="bg-[#F0FDF4]">
          <TextInput
            placeholder="Enter customer name"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-md p-2"
            style={{ height: 42 }}
          />
        </View>

        {/* Service Center Dropdown */}
        <View
          className="flex flex-col gap-2"
          style={{ zIndex: serviceCenterOpen ? 2000 : 1000 }}
        >
          {/* <Text className="font-semibold">Service Center</Text> */}
          <DropDownPicker
            open={serviceCenterOpen}
            value={serviceCenter}
            items={serviceCenterItems}
            setOpen={setServiceCenterOpen}
            setValue={setServiceCenter}
            setItems={setServiceCenterItems}
            placeholder="Select Service Center"
            placeholderStyle={{ color: "#888" }}
            style={{
              backgroundColor: "#F0FDF4",
              borderColor: "#d1d5db",
              height: 48,
            }}
            dropDownContainerStyle={{
              backgroundColor: "#F0FDF4",
              borderColor: "#d1d5db",
            }}
            textStyle={{
              fontSize: 14,
              color: "#374151",
            }}
          />
        </View>

        {/* Service Provider Dropdown */}
        <View
          style={{
            zIndex: serviceProviderOpen ? 2000 : 999,
          }}
        >
          {/* <Text className="font-semibold">Service Provider</Text> */}
          <DropDownPicker
            open={serviceProviderOpen}
            value={serviceProvider}
            items={serviceProviderItems}
            setOpen={setServiceProviderOpen}
            setValue={setServiceProvider}
            setItems={setServiceProviderItems}
            placeholder="Select Service Provider"
            placeholderStyle={{ color: "#888" }}
            style={{
              backgroundColor: "#F0FDF4",
              borderColor: "#d1d5db",
              height: 48,
            }}
            dropDownContainerStyle={{
              backgroundColor: "#F0FDF4",
              borderColor: "#d1d5db",
            }}
            textStyle={{
              fontSize: 14,
              color: "#374151",
            }}
          />
        </View>

        <View className="flex flex-row justify-between">
          {/* Repair Date */}
          <View className="flex flex-col gap-4 justify-center">
            {/* <Text className="font-semibold">Repair Date</Text> */}
            <TouchableOpacity className="flex flex-row gap-4">
              <AntDesign name="calendar" size={20} color="#9CA3AF" />
              <Text className="font-medium">Select Date</Text>
            </TouchableOpacity>
          </View>

          {/* Apply Filters Button */}
          <View>
            <TouchableOpacity className="bg-emerald-700 p-4 rounded-md">
              <Text className="font-semibold text-white">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterComponent;