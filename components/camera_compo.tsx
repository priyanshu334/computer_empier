import React, { useState } from "react";
import { CameraView, CameraType, FlashMode } from "expo-camera";
import * as FileSystem from "expo-file-system";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CameraComponentProps {
  onPhotoCaptured: (photoPath: string) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  onPhotoCaptured,
  onClose,
}) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  let cameraRef: any = null;

  async function capturePhoto() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const filePath = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;

      // Save the captured image to the file system
      await FileSystem.moveAsync({ from: photo.uri, to: filePath });
      onPhotoCaptured(filePath);
      onClose(); // Close camera view after capture
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlashMode() {
    setFlashMode((current) =>
      current === "off" ? "on" : current === "on" ? "auto" : "off"
    );
  }

  return (
    <CameraView
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
      facing={facing}
      flash={flashMode}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={capturePhoto}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
          <Text style={styles.text}>Flash: {flashMode}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
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
});