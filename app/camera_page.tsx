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

interface CameraPageProps {
  onCapturePhoto: (index: number, photoUrl: string) => void; // Define the callback function
}

export default function CameraPage({ onCapturePhoto }: CameraPageProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCameraIndex, setShowCameraIndex] = useState<number | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<(string | null)[]>([null, null, null, null]);
  const [photoPaths, setPhotoPaths] = useState<(string | null)[]>([null, null, null, null]);

  const cameraRef = useRef<CameraView | null>(null);

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

      const updatedPhotos = [...capturedPhotos];
      const updatedPaths = [...photoPaths];
      updatedPhotos[index] = filePath;
      updatedPaths[index] = filePath;

      setCapturedPhotos(updatedPhotos);
      setPhotoPaths(updatedPaths);

      // Call the parent callback with the captured photo URL
      if (onCapturePhoto) {
        onCapturePhoto(index, filePath);
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
                />
                <View style={styles.previewContainer}>
                  <Text style={styles.previewText}>Photo Preview:</Text>
                  {capturedPhotos[index] ? (
                    <Image
                      source={{ uri: capturedPhotos[index]! }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <Image
                      source={require("../assets/images/c2.png")}
                      style={styles.previewImage}
                    />
                  )}
                  {photoPaths[index] && (
                    <Text style={styles.filePath}>File Path: {photoPaths[index]}</Text>
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
              style={styles.button}
              onPress={() => capturePhoto(showCameraIndex)}
            >
              <Text style={styles.text}>Take Picture</Text>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  gridItem: {
    width: "45%",
    marginBottom: 20,
  },
  previewContainer: {
    padding: 10,
    alignItems: "center",
  },
  previewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  previewImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  filePath: {
    marginTop: 10,
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
});
