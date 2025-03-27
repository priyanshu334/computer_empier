import { useState, useEffect } from "react";
import { Client, Databases, ID } from "appwrite";

const APPWRITE_PROJECT_ID = "67c98460002cbfb5dc8f"; // Replace with your Appwrite project ID
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"; // Replace if using a custom endpoint
const DATABASE_ID = "67c98754000a680dd1eb"; // Replace with your Appwrite database ID
const COLLECTION_ID = "67e3a4200005a9309b50";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

interface ServiceProvider {
  id: string;
  name: string;
  contact: string;
  description?: string;
}

export function useServiceProviders() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch service providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setProviders(response.documents.map((doc) => ({
          id: doc.$id,
          name: doc.name,
          contact: doc.contact,
          description: doc.description,
        })));
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Add or update provider
  const addOrUpdateProvider = async (provider: ServiceProvider) => {
    try {
      if (provider.id) {
        // Update existing provider
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, provider.id, {
          name: provider.name,
          contact: provider.contact,
          description: provider.description,
        });
      } else {
        // Create new provider
        const newProvider = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          name: provider.name,
          contact: provider.contact,
          description: provider.description,
        });
        provider.id = newProvider.$id;
      }
      setProviders((prev) => [...prev.filter((p) => p.id !== provider.id), provider]);
    } catch (error) {
      console.error("Error adding/updating provider:", error);
    }
  };

  // Delete provider
  const deleteProvider = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  return { providers, addOrUpdateProvider, deleteProvider, loading };
}