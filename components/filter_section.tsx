import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useServiceCenters } from "../hooks/useServiceCenters";
import { useServiceProviders } from "../hooks/useServiceProvider";

interface Filters {
  serviceCenter: string | null;
  serviceProvider: string | null;
  selectedDate: Date | null;
  customerSearch: string;
}

interface FilterSectionProps {
  onApplyFilters: (filters: Filters) => void;
  initialFilters: Filters;
}

const FilterSection = ({ onApplyFilters, initialFilters }: FilterSectionProps) => {
  const [serviceCenter, setServiceCenter] = useState<string | null>(initialFilters.serviceCenter);
  const [serviceProvider, setServiceProvider] = useState<string | null>(initialFilters.serviceProvider);
  const [customerSearch, setCustomerSearch] = useState<string>(initialFilters.customerSearch || "");
  const [serviceCenterOpen, setServiceCenterOpen] = useState(false);
  const [serviceProviderOpen, setServiceProviderOpen] = useState(false);
  const { centers } = useServiceCenters();
  const { providers } = useServiceProviders();

  const [serviceProviderItems, setServiceProviderItems] = useState(
    providers.map((provider) => ({
      label: provider.name,
      value: provider.id,
    }))
  );

  // Date Picker State
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialFilters.selectedDate);

  // Toggle filter section
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      serviceCenter,
      serviceProvider,
      selectedDate,
      customerSearch,
    });
    setIsFilterVisible(false); // Hide filters after applying
  };

  return (
    <View style={styles.container}>
      {/* Header with Clickable Filter Button */}
      <TouchableOpacity style={styles.header} onPress={toggleFilterVisibility}>
        <AntDesign name="filter" size={24} color="#047857" />
        <Text style={styles.headerText}>Filters</Text>
      </TouchableOpacity>

      {/* Conditional Rendering of Filter Box */}
      {isFilterVisible && (
        <View style={styles.filterBox}>
          {/* Customer Name Search */}
          <TextInput
            placeholder="Enter customer name"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={customerSearch}
            onChangeText={setCustomerSearch}
          />

          {/* Service Center Dropdown */}
          <View style={{ zIndex: serviceCenterOpen ? 2000 : 1000 }}>
            <DropDownPicker
              open={serviceCenterOpen}
              value={serviceCenter}
              items={centers.map((center) => ({
                label: center.name,
                value: center.id,
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
            {/* Repair Date Picker Button */}
            <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
              <AntDesign name="calendar" size={20} color="#9CA3AF" />
              <Text style={styles.dateButtonText}>
                {selectedDate ? selectedDate.toDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>

            {/* Apply Filters Button */}
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#ECFDF5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#047857",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#047857",
    marginLeft: 8,
  },
  filterBox: {
    marginTop: 8,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    height: 48,
    borderRadius: 8,
    marginBottom: 16,
  },
  dropdownContainer: {
    borderColor: "#D1D5DB",
  },
  dropdownText: {
    fontSize: 14,
    color: "#374151",
  },
  dropdownPlaceholder: {
    color: "#9CA3AF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  dateButtonText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  applyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#047857",
    borderRadius: 8,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterSection;
