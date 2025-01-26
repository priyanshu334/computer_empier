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
    <View className="bg-[#EAF7F0] p-4 rounded-md">
      {/* Title */}
      <View className="flex flex-row items-center mb-4">
        <AntDesign name="search1" size={20} color="#007ACC" />
        <Text className="ml-2 text-lg font-semibold text-[#007ACC]">
          Filters
        </Text>
      </View>

      {/* Customer Name Input */}
      <View className="mb-4">
        <TextInput
          placeholder="Customer Name"
          placeholderTextColor="#999999"
          className="bg-white border border-gray-300 rounded-md h-10 px-3 flex flex-row items-center"
        />
      </View>

      {/* Service Center Dropdown */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-2">Service Center</Text>
        <DropDownPicker
          open={serviceCenterOpen}
          value={serviceCenter}
          items={serviceCenterItems}
          setOpen={setServiceCenterOpen}
          setValue={setServiceCenter}
          setItems={setServiceCenterItems}
          placeholder="Select Service Center"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#D1D5DB",
            borderRadius: 8,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#ffffff",
            borderColor: "#D1D5DB",
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      </View>

      {/* Service Provider Dropdown */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-2">Service Provider</Text>
        <DropDownPicker
          open={serviceProviderOpen}
          value={serviceProvider}
          items={serviceProviderItems}
          setOpen={setServiceProviderOpen}
          setValue={setServiceProvider}
          setItems={setServiceProviderItems}
          placeholder="Select Service Provider"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#D1D5DB",
            borderRadius: 8,
          }}
          dropDownContainerStyle={{
            backgroundColor: "#ffffff",
            borderColor: "#D1D5DB",
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      </View>

      {/* Repair Date */}
      <View className="mb-4">
        <TouchableOpacity className="flex flex-row items-center bg-white border border-gray-300 rounded-md h-10 px-3">
          <AntDesign name="calendar" size={20} color="#999999" />
          <Text className="ml-2 text-gray-500">Repair Date</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterComponent;
