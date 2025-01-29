import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useServiceCenters } from "../hooks/useServiceCenters"; // Custom hook to load Service Centers
import { useServiceProviders } from "../hooks/useServiceProvider"; // Custom hook to load Service Providers

const FilterComponent = () => {
  const [serviceCenter, setServiceCenter] = useState<string | null>(null);
  const [serviceProvider, setServiceProvider] = useState<string | null>(null);

  const [serviceCenterOpen, setServiceCenterOpen] = useState(false);
  const [serviceProviderOpen, setServiceProviderOpen] = useState(false);

  const { centers } = useServiceCenters(); // Using custom hook to get service centers
  const { providers } = useServiceProviders(); // Using custom hook to get service providers

  // Sample data for service providers
  const [serviceProviderItems, setServiceProviderItems] = useState([
    { label: "Provider 1", value: "provider1" },
    { label: "Provider 2", value: "provider2" },
  ]);

  useEffect(() => {
    // You can modify this if you want to update service providers dynamically
    setServiceProviderItems(
      providers.map((provider) => ({
        label: provider.name,
        value: provider.id,
      }))
    );
  }, [providers]);

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <AntDesign name="filter" size={24} color="#047857" />
        <Text style={styles.headerText}>Filters</Text>
      </View>

      <View style={styles.filterBox}>
        {/* Customer Name Input */}
        <TextInput
          placeholder="Enter customer name"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        {/* Service Center Dropdown */}
        <View style={{ zIndex: serviceCenterOpen ? 2000 : 1000 }}>
          <DropDownPicker
            open={serviceCenterOpen}
            value={serviceCenter}
            items={centers.map((center) => ({
              label: center.name, 
              value: center.id
            }))}
            setOpen={setServiceCenterOpen}
            setValue={setServiceCenter}
            setItems={() => {}}
            placeholder="Select Service Center"
            placeholderStyle={styles.dropdownPlaceholder}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
          />
        </View>

        {/* Service Provider Dropdown */}
        <View style={{ zIndex: serviceProviderOpen ? 2000 : 999 }}>
          <DropDownPicker
            open={serviceProviderOpen}
            value={serviceProvider}
            items={serviceProviderItems}
            setOpen={setServiceProviderOpen}
            setValue={setServiceProvider}
            setItems={setServiceProviderItems}
            placeholder="Select Service Provider"
            placeholderStyle={styles.dropdownPlaceholder}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
          />
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          {/* Repair Date */}
          <TouchableOpacity style={styles.dateButton}>
            <AntDesign name="calendar" size={20} color="#9CA3AF" />
            <Text style={styles.dateButtonText}>Select Date</Text>
          </TouchableOpacity>

          {/* Apply Filters Button */}
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#047857",
    marginLeft: 8,
  },
  filterBox: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#F0FDF4",
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: "#F0FDF4",
    borderColor: "#D1D5DB",
    height: 48,
    borderRadius: 8,
  },
  dropdownContainer: {
    backgroundColor: "#F0FDF4",
    borderColor: "#D1D5DB",
  },
  dropdownPlaceholder: {
    color: "#9CA3AF",
  },
  dropdownText: {
    fontSize: 14,
    color: "#374151",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  applyButton: {
    backgroundColor: "#047857",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterComponent;
