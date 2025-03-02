import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useFormDataStorage from "../hooks/useFormData";
import DataCard from "@/components/DataCard";
import FilterComponent from "@/components/filter_section";
import Photos from "@/components/photos";

// Type definition for the filter structure
interface Filters {
  serviceCenter: string | null;
  serviceProvider: string | null;
  selectedDate: Date | null;
  customerSearch: string;  // Ensuring it is always a string
}

export default function Index() {
  const router = useRouter();
  const { formDataList, deleteFormData } = useFormDataStorage();

  // State for filters
  const [filters, setFilters] = useState<Filters>({
    serviceCenter: null,
    serviceProvider: null,
    selectedDate: null,
    customerSearch: "",  // Ensuring a default empty string
  });

  // Memoized filtered data to prevent unnecessary re-renders
  const filteredData = useMemo(() => {
    return formDataList.filter((data) => {
      const matchesServiceCenter = filters.serviceCenter
        ? data.repairPartnerDetails.selectedServiceCenterOption === filters.serviceCenter
        : true;

      const matchesServiceProvider = filters.serviceProvider
        ? data.repairPartnerDetails.selectedInHouseOption === filters.serviceProvider
        : true;

      // Handling null `pickupDate` gracefully
      const matchesDate = filters.selectedDate
        ? data.estimateDetails.pickupDate &&
          new Date(data.estimateDetails.pickupDate).toDateString() ===
            filters.selectedDate.toDateString()
        : true;

      const matchesCustomerSearch = filters.customerSearch
        ? data.selectedCustomer?.name.toLowerCase().includes(filters.customerSearch.toLowerCase()) ||
          data.selectedCustomer?.number.includes(filters.customerSearch)
        : true;

      return matchesServiceCenter && matchesServiceProvider && matchesDate && matchesCustomerSearch;
    });
  }, [formDataList, filters]); // Runs only when dependencies change

  // Format the date, return 'N/A' if null
  const formatDate = (date: Date | null): string => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Edit the selected record
  const handleEdit = (id: string) => {
    // console.log(`item to edit: ${id}`);
    router.push(`./edit_order/${id}`);
  };

  const handleView = (id: string) => {
    // console.log(`Viewing item: ${id}`);
    router.push(`./view_orders/${id}`);
  };

  // Delete the selected record
  const handleDelete = async (id: string) => {
    // console.log(`Deleting item: ${id}`);
    await deleteFormData(id);
  };

  return (
    <SafeAreaView style={styles.container}   >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Records</Text>
          <View style={styles.rightButtons}>
            <TouchableOpacity>
              <AntDesign name="arrowdown" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="sync" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}   nestedScrollEnabled={true}>
          {/* Filter Component */}
          <FilterComponent
            onApplyFilters={setFilters}
            initialFilters={filters}
          />

          {/* No records message */}
          {filteredData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No records found.</Text>
            </View>
          ) : (
            filteredData.map((data: any) => (
              <DataCard
                key={data.id}
                orderStatus={data.orderDetails.orderStatus}
                orderModel={data.orderDetails.deviceModel}
                customerName={data.selectedCustomer?.name || "N/A"}
                customerNumber={data.selectedCustomer?.number || "N/A"}
                date={formatDate(data.estimateDetails.pickupDate)}
                onEdit={() => handleEdit(data.id)}
                onView={() => handleView(data.id)}
                onDelete={() => handleDelete(data.id)}
                
              />
            ))
          )}
        
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomBar}>
     
          
          <TouchableOpacity onPress={() => router.push("/service")} style={styles.navButton}>
            <AntDesign name="home" size={24} color="#fff" />
            <Text style={styles.navText}>Centers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Add_orders")} style={styles.navButton}>
            <AntDesign name="filetext1" size={24} color="#fff" />
            <Text style={styles.navText}>Add Order</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#047857",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#047857",
    padding: 6,
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },
});
