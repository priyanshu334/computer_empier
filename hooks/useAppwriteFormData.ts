import { databases } from "../appwriteConfig";

const DATABASE_ID = "67c98754000a680dd1eb"; // Replace with your database ID
const COLLECTION_ID = "67c9971a0022218bbef2"; // Replace with your collection ID

export const useAppwriteFormData = () => {
  // Create a new form data entry
  const createFormData = async (formData: any) => {
    try {
      const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", formData);
      console.log("Form Data Created:", response);
      return response;
    } catch (error) {
      console.error("Error creating form data:", error);
    }
  };

  // Get all form data
  const getAllFormData = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      return response.documents;
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  // Get a single form entry by ID
  const getFormDataById = async (id: string) => {
    try {
      const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
      return response;
    } catch (error) {
      console.error("Error fetching form data by ID:", error);
    }
  };

  // Update an existing form entry
  const updateFormData = async (id: string, updatedData: any) => {
    try {
      const response = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, updatedData);
      console.log("Updated Form Data:", response);
      return response;
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  };

  // Delete a form entry
  const deleteFormData = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      console.log("Deleted form data with ID:", id);
    } catch (error) {
      console.error("Error deleting form data:", error);
    }
  };

  return {
    createFormData,
    getAllFormData,
    getFormDataById,
    updateFormData,
    deleteFormData,
  };
};
