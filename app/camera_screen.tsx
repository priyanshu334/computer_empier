import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useRouter, useLocalSearchParams } from "expo-router";

type CameraScreenParams = {
  containerIndex: string;
};

const CameraScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.Back); // Corrected value
  const cameraRef = useRef<Camera | null>(null);
  const router = useRouter();
  const { containerIndex } = useLocalSearchParams<CameraScreenParams>();

  React.useEffect(() => {
    (async (): Promise<void> => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async (): Promise<void> => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      router.replace({ pathname: "/", params: { uri: photo.uri, containerIndex } });
    }
  };

  if (hasPermission === null) {
    return <Text className="text-center text-lg mt-4">Requesting camera permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text className="text-center text-lg mt-4">No access to camera</Text>;
  }

  return (
    <View className="flex-1 bg-black">
      <Camera className="flex-1 justify-end" type={cameraType} ref={cameraRef}>
        <View className="flex-row justify-between mb-5 px-5">
          <TouchableOpacity
            className="bg-white p-3 rounded-lg"
            onPress={() => setCameraType((prev) => (prev === CameraType.Back ? CameraType.Front : CameraType.Back))} // Corrected value
          >
            <Text className="text-black font-bold">Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-600 p-3 rounded-lg" onPress={takePicture}>
            <Text className="text-white font-bold">Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
