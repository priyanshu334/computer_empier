import React, { useState, useRef } from "react";
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import * as FileSystem from "expo-file-system";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useCameraStorage } from "@/hooks/useCameraImagesStorage"; // Import the custom hook

interface CameraPageProps {
  onCapturePhoto: (index: number, photoUrl: string) => void;
}

export default function CameraPage({ onCapturePhoto }: CameraPageProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCameraIndex, setShowCameraIndex] = useState<number | null>(null);

  const cameraRef = useRef<CameraView | null>(null);

  // Use the custom hook to manage photos
  const { photos, updatePhoto, clearPhotos } = useCameraStorage();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  async function capturePhoto(index: number) {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (!photo || !photo.uri) {
        console.error("Failed to capture photo");
        return;
      }

      const filePath = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;

      await FileSystem.moveAsync({
        from: photo.uri,
        to: filePath,
      });

      // Update the photos in AsyncStorage and call the parent callback
      updatePhoto(index, filePath);

      // Pass the file path to the parent component via the callback
      if (onCapturePhoto) {
        onCapturePhoto(index, filePath); // You are passing the path here
      }

      setShowCameraIndex(null);
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlashMode() {
    setFlashMode((current) => (current === "off" ? "on" : current === "on" ? "auto" : "off"));
  }

  return (
    <View style={styles.container}>
      {showCameraIndex === null ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.gridContainer}>
            {[0, 1, 2, 3].map((index) => (
              <View key={index} style={styles.gridItem}>
                <Button
                  title={`Open Camera ${index + 1}`}
                  onPress={() => setShowCameraIndex(index)}
                  color="#4CAF50"
                />
                <View style={styles.previewContainer}>
                  <Text style={styles.previewText}>Photo Preview:</Text>
                  {photos[index] ? (
                    <Image
                      source={{ uri: photos[index]! }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <Image
                      source={require("../assets/images/c2.png")}
                      style={styles.previewImage}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          flash={flashMode}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={() => capturePhoto(showCameraIndex)}
            >
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
              <Text style={styles.text}>Flash: {flashMode}</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 30,
    width: "30%",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "#FF4081",
    padding: 20,
    borderRadius: 50,
    width: "30%",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  gridItem: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  previewContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  previewText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
});
