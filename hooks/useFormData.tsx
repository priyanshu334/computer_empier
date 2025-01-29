import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FORM_DATA_KEY = "@form_data_list"; // Key for storing the list of form data

// Define the types for the form data
interface FormData {
  id: string; // Unique ID for each form entry
  name: string;
  designation: string;
  selectedCustomer: { name: string; number: string; address: string } | null;
  orderDetails: {
    deviceModel: string;
    orderStatus: string;
    problems: string[];
  };
  estimateDetails: {
    repairCost: string;
    advancePaid: string;
    pickupDate: string | null;
    pickupTime: string | null;
  };
  repairPartnerDetails: {
    selectedRepairStation: string | null;
    selectedInHouseOption: string;
    selectedServiceCenterOption: string;
    pickupDate: string | null;
    pickupTime: string | null;
  };
}

const useFormDataStorage = () => {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);

  // Load all data from AsyncStorage on component mount
  useEffect(() => {
    loadFormData();
  }, []);

  // Fetch all stored form data
  const loadFormData = async () => {
    try {
      const data = await AsyncStorage.getItem(FORM_DATA_KEY);
      if (data) {
        const parsedData: FormData[] = JSON.parse(data);
        setFormDataList(parsedData);
      }
    } catch (error) {
      console.error("Failed to load form data from AsyncStorage", error);
    }
  };

  // Save the entire list of form data back to AsyncStorage
  const saveAllFormData = async (dataList: FormData[]) => {
    try {
      await AsyncStorage.setItem(FORM_DATA_KEY, JSON.stringify(dataList));
      setFormDataList(dataList); // Update local state
    } catch (error) {
      console.error("Failed to save form data to AsyncStorage", error);
    }
  };

  // Create: Add a new form entry
  const createFormData = async (data: FormData) => {
    const newDataList = [...formDataList, data];
    await saveAllFormData(newDataList);
  };

  // Read: Get a single form entry by ID (now async)
  const getFormDataById = async (id: string): Promise<FormData | undefined> => {
    try {
      const data = await AsyncStorage.getItem(FORM_DATA_KEY);
      if (data) {
        const parsedData: FormData[] = JSON.parse(data);
        return parsedData.find((item) => item.id === id);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
    return undefined;
  };

  // Update: Edit an existing form entry
  const updateFormData = async (id: string, updatedData: FormData) => {
    const newDataList = formDataList.map((item) =>
      item.id === id ? updatedData : item
    );
    await saveAllFormData(newDataList);
  };

  // Delete: Remove a form entry by ID
  const deleteFormData = async (id: string) => {
    const newDataList = formDataList.filter((item) => item.id !== id);
    await saveAllFormData(newDataList);
  };

  // Clear All: Delete all form data from AsyncStorage
  const clearAllFormData = async () => {
    try {
      await AsyncStorage.removeItem(FORM_DATA_KEY);
      setFormDataList([]); // Clear local state
    } catch (error) {
      console.error("Failed to clear form data from AsyncStorage", error);
    }
  };

  return {
    formDataList,
    createFormData,
    getFormDataById,
    updateFormData,
    deleteFormData,
    clearAllFormData,
  };
};

export default useFormDataStorage;
