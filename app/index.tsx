import React, { useState, useEffect } from "react";
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

// Type definition for the filter structure
interface Filters {
  serviceCenter: string | null;
  serviceProvider: string | null;
  selectedDate: Date | null;
}

export default function Index() {
  const router = useRouter();
  const { formDataList, deleteFormData } = useFormDataStorage();

  // Initialize filteredData with unfiltered data
  const [filteredData, setFilteredData] = useState(formDataList);
  console.log(formDataList)
  console.log("data is",filteredData)
  const [data ,setData] = useState({formDataList})
  console.log("hello data is ",data)
  const [filters, setFilters] = useState<Filters>({
    serviceCenter: null,
    serviceProvider: null,
    selectedDate: null,
  });

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
  const handleEdit = async (id: string) => {
    console.log(`item to edit: ${id}`);
    router.push(`./edit_order/${id}`);

  };
  console.log("hello data is ",data)

  const handleView = async (id: string) => {
    console.log("hello data is ",id);
    router.push(`./view_orders/${id}`);
  }

  // Delete the selected record
  const handleDelete = async (id: string) => {
    console.log(`item to delete : ${id}`)
    await deleteFormData(id);
    setFilteredData(formDataList.filter((data) => data.id !== id));
  };

  // Apply the filters to the data
  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // Re-apply filters whenever formDataList or filters change
  useEffect(() => {
    const filtered = formDataList.filter((data) => {
      const matchesServiceCenter = filters.serviceCenter
        ? data.repairPartnerDetails.selectedServiceCenterOption === filters.serviceCenter
        : true;
      const matchesServiceProvider = filters.serviceProvider
        ? data.repairPartnerDetails.selectedInHouseOption === filters.serviceProvider
        : true;

      // Handling null `selectedDate` gracefully
      const matchesDate = filters.selectedDate
        ? data.estimateDetails.pickupDate===
          filters.selectedDate.toDateString()
        : true;

      return matchesServiceCenter && matchesServiceProvider && matchesDate;
    });

    setFilteredData(filtered); // Update state with filtered data
  }, [formDataList, filters]); // Run whenever formDataList or filters change

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
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
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Filter Component */}
          <FilterComponent
            onApplyFilters={applyFilters}
            initialFilters={filters}
          />

          {/* No records message */}
          {filteredData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No records found.</Text>
            </View>
          ) : (
            console.log("hello data is ",filteredData),
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
          <TouchableOpacity onPress={() => router.push("/View_page")} style={styles.navButton}>
            <AntDesign name="team" size={24} color="#fff" />
            <Text style={styles.navText}>View Order</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/service")} style={styles.navButton}>
            <AntDesign name="home" size={24} color="#fff" />
            <Text style={styles.navText}>Centers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Add_orders")} style={styles.navButton}>
            <AntDesign name="filetext1" size={24} color="#fff" />
            <Text style={styles.navText}>Orders</Text>
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
    padding: 12,
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
