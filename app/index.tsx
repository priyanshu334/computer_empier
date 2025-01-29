import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useFormDataStorage from "../hooks/useFormData";
import DataCard from "@/components/DataCard";
import FilterComponent from "@/components/filter_section";

export default function Index() {
  const router = useRouter();
  const { formDataList, deleteFormData } = useFormDataStorage();

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle edit
  const handleEdit = (id: string) => {
    router.push(`/edit_order/${id}`);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    await deleteFormData(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text style={styles.headerTitle}>All Records</Text>

        {/* Right-side Buttons */}
        <View style={styles.rightButtons}>
          <TouchableOpacity>
            <AntDesign name="arrowdown" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="sync" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <FilterComponent/>

      {/* Content */}
      <ScrollView style={styles.content}>
        {formDataList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No records found.</Text>
          </View>
        ) : (
          formDataList.map((data: any) => (
            <DataCard
              key={data.id}
              orderStatus={data.orderDetails.orderStatus}
              customerName={data.selectedCustomer?.name || "N/A"}
              customerNumber={data.selectedCustomer?.number || "N/A"}
              date={formatDate(data.estimateDetails.pickupDate)}
              onEdit={() => handleEdit(data.id)}
              onDelete={() => handleDelete(data.id)}
            />
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => router.push("./service_providers")}
          style={styles.navButton}
        >
          <AntDesign name="team" size={24} color="#fff" />
          <Text style={styles.navText}>Providers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/service")}
          style={styles.navButton}
        >
          <AntDesign name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Centers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/Add_orders")}
          style={styles.navButton}
        >
          <AntDesign name="filetext1" size={24} color="#fff" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor:"#047857",
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
  content: {
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
