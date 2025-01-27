import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraType, BarCodeScanningResult } from "expo-camera";
import { useNavigation } from "expo-router";

const BarcodeScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  // Request permission for camera access
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Handle the scanned barcode
  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Optionally navigate to another screen or process the data
  };

  if (hasPermission === null) {
    return <Text className="text-center mt-4 text-lg">Requesting camera permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text className="text-center mt-4 text-lg">No access to camera</Text>;
  }

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Camera
        style={{ flex: 1, width: "100%" }}
        type={CameraType.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [
            Camera.Constants.BarCodeType.qr, // Add the barcode types you want to scan
            Camera.Constants.BarCodeType.code128,
          ],
        }}
      />
      {scanned && (
        <TouchableOpacity
          className="absolute bottom-10 bg-white p-3 rounded-full"
          onPress={() => setScanned(false)}
        >
          <Text className="text-black font-bold">Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BarcodeScanner;
