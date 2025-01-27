import { StyleSheet } from "react-native";

export const CustomerDetailsStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 16,
  },
  selectedCustomerContainer: {
    marginBottom: 16,
  },
  selectedCustomerText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  searchInput: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#065F46",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 16,
  },
  inputField: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
  listItem: {
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 16,
  },
  closeButtonText: {
    textAlign: "center",
    color: "#374151",
    fontWeight: "600",
  },
  emptyListText: {
    color: "#6B7280",
    textAlign: "center",
    paddingVertical: 16,
  },
});

