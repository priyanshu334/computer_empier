import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "expo-router";
import tailwind from "tailwind-rn"; // Using Tailwind CSS for styling

const BarcodeScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  // Request permission for camera access
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Handle the scanned barcode
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Redirect to a different screen (optional)
    navigation.navigate("./some-other-screen", { barcodeData: data });
  };

  if (hasPermission === null) {
    return <Text style={tailwind("text-center mt-4 text-lg")}>Requesting camera permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text style={tailwind("text-center mt-4 text-lg")}>No access to camera</Text>;
  }

  return (
    <View style={tailwind("flex-1 justify-center items-center bg-black")}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={tailwind("w-full h-full")}
      />
      {scanned && (
        <TouchableOpacity
          style={tailwind("absolute bottom-10 bg-white p-3 rounded-full")}
          onPress={() => setScanned(false)}
        >
          <Text style={tailwind("text-black font-bold")}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BarcodeScanner;
