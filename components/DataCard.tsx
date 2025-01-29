import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface DataCardProps {
  orderStatus: string;
  customerName: string;
  customerNumber: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
}

const DataCard: React.FC<DataCardProps> = ({
  orderStatus,
  customerName,
  customerNumber,
  date,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{customerName}</Text>
      <Text style={styles.subtitle}>Order Status: {orderStatus}</Text>
      <Text style={styles.subtitle}>Contact: {customerNumber}</Text>
      <Text style={styles.subtitle}>Pickup Date: {date}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <AntDesign name="edit" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <AntDesign name="delete" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 4,
  },
});

export default DataCard;
