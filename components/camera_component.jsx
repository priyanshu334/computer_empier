import React, { useState } from "react";
import { View, Button, Image, Text, ScrollView, StyleSheet } from "react-native";
import CameraComponent from "@/components/CameraComponent";
import { useCameraStorage } from "@/hooks/useCameraImagesStorage";

export default function CameraScreen() {
  const [showCameraIndex, setShowCameraIndex] = useState<number | null>(null);
  const { photos } = useCameraStorage();

  return (
    <View style={styles.container}>
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
                  <Image source={{ uri: photos[index]! }} style={styles.previewImage} />
                ) : (
                  <Image source={require("../assets/images/c2.png")} style={styles.previewImage} />
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Camera Component */}
      <CameraComponent
        isVisible={showCameraIndex !== null}
        onClose={() => setShowCameraIndex(null)}
        onCapture={(index, photoUrl) => console.log("Captured:", index, photoUrl)}
        cameraIndex={showCameraIndex ?? 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 10 },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 10 },
  gridItem: { width: "48%", marginBottom: 15, backgroundColor: "#fff", borderRadius: 10, padding: 10, elevation: 3 },
  previewContainer: { alignItems: "center", marginTop: 10 },
  previewText: { fontSize: 14, marginBottom: 5, color: "#333" },
  previewImage: { width: "100%", height: 150, borderRadius: 10 },
});
