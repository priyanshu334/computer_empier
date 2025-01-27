import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CameraDialog: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [capturedImages, setCapturedImages] = useState<(string | null)[]>([null, null, null, null]);
  const [currentContainer, setCurrentContainer] = useState<number | null>(null);
  const router = useRouter();

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
  };

  const openCamera = async (index: number) => {
    setCurrentContainer(index);
    await requestCameraPermission();
    if (cameraPermission) {
      router.push({
        pathname: "./app/camera_screen",
        params: { containerIndex: index },
      });
    } else {
      alert("Camera permission is required.");
    }
  };

  const handleCapture = (uri: string, index: number) => {
    const updatedImages = [...capturedImages];
    updatedImages[index] = uri;
    setCapturedImages(updatedImages);
    setCurrentContainer(null);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <TouchableOpacity className="bg-purple-600 p-3 rounded-lg" onPress={() => setModalVisible(true)}>
        <Text className="text-white text-lg font-bold">Open Dialog</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <Text className="text-white text-xl mb-5">Capture Images</Text>
          <View className="flex-row justify-between mx-5 mb-5">
            {capturedImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                className="w-20 h-20 bg-white justify-center items-center rounded-lg mx-2 border border-gray-300"
                onPress={() => openCamera(index)}
              >
                {image ? (
                  <Image source={{ uri: image }} className="w-full h-full rounded-lg" />
                ) : (
                  <Ionicons name="camera" size={30} color="#888" />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity className="bg-red-600 p-3 rounded-lg mt-5" onPress={closeModal}>
            <Text className="text-white text-lg font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CameraDialog;
