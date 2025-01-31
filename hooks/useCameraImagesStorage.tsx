import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "captured_photos";

export function useCameraStorage() {
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const savePhotos = async (updatedPhotos: (string | null)[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
      setPhotos(updatedPhotos);
    } catch (error) {
      console.error("Error saving photos to AsyncStorage", error);
    }
  };

  const loadPhotos = async () => {
    try {
      const storedPhotos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      }
    } catch (error) {
      console.error("Error loading photos from AsyncStorage", error);
    }
  };

  const updatePhoto = async (index: number, photoUrl: string) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index] = photoUrl;
    await savePhotos(updatedPhotos);
  };

  const clearPhotos = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setPhotos([null, null, null, null]);
    } catch (error) {
      console.error("Error clearing photos from AsyncStorage", error);
    }
  };

  return { photos, updatePhoto, clearPhotos };
}
