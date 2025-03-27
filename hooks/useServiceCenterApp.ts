import { useState, useEffect } from "react";
import { Client, Databases, ID } from "appwrite";

const APPWRITE_PROJECT_ID = "67c98460002cbfb5dc8f";
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const DATABASE_ID = "67c98754000a680dd1eb";
const COLLECTION_ID = "67e3a3390032e3fba2e5";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

interface ServiceCenterType {
  id: string;
  name: string;
  contact: string;
  address: string;
}

export function useServiceCenters() {
  const [centers, setCenters] = useState<ServiceCenterType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch service centers
  useEffect(() => {
    const fetchCenters = async () => {
      console.log("[Appwrite] Starting to fetch service centers...");
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        console.log(`[Appwrite] Successfully fetched ${response.documents.length} centers`);
        
        const mappedCenters = response.documents.map((doc) => ({
          id: doc.$id,
          name: doc.name,
          contact: doc.contact,
          address: doc.address,
        }));
        
        console.log("[Appwrite] Processed centers data:", mappedCenters);
        setCenters(mappedCenters);
      } catch (error) {
        console.error("[Appwrite] Error fetching service centers:", error);
      } finally {
        console.log("[Appwrite] Finished fetch operation");
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // Add or update service center
  const addOrUpdateCenter = async (center: ServiceCenterType) => {
    const operation = center.id ? "update" : "create";
    console.log(`[Appwrite] Starting ${operation} operation for center:`, center);

    try {
      if (center.id) {
        console.log(`[Appwrite] Updating existing center (ID: ${center.id})`);
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, center.id, {
          name: center.name,
          contact: center.contact,
          address: center.address,
        });
        console.log(`[Appwrite] Successfully updated center (ID: ${center.id})`);
      } else {
        console.log("[Appwrite] Creating new center");
        const newCenter = await databases.createDocument(
          DATABASE_ID, 
          COLLECTION_ID, 
          ID.unique(), 
          {
            name: center.name,
            contact: center.contact,
            address: center.address,
          }
        );
        center.id = newCenter.$id;
        console.log(`[Appwrite] Successfully created center (ID: ${center.id})`);
      }

      setCenters((prev) => {
        const updatedCenters = [...prev.filter((c) => c.id !== center.id), center];
        console.log(`[Appwrite] Local state updated with ${operation}d center`);
        return updatedCenters;
      });
    } catch (error) {
      console.error(`[Appwrite] Error during ${operation} operation:`, error);
      throw error; // Re-throw to allow component to handle the error
    }
  };

  // Delete service center
  const deleteCenter = async (id: string) => {
    console.log(`[Appwrite] Starting delete operation for center ID: ${id}`);
    
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      console.log(`[Appwrite] Successfully deleted center (ID: ${id})`);
      
      setCenters((prev) => {
        const updatedCenters = prev.filter((c) => c.id !== id);
        console.log(`[Appwrite] Removed center from local state (ID: ${id})`);
        return updatedCenters;
      });
    } catch (error) {
      console.error(`[Appwrite] Error deleting center (ID: ${id}):`, error);
      throw error; // Re-throw to allow component to handle the error
    }
  };

  return { centers, addOrUpdateCenter, deleteCenter, loading };
}