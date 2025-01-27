import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    // Simulate a delay (e.g., loading resources)
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View className="flex-1 justify-center items-center bg-emerald-900 px-6 py-4">
      <View className="rounded-full bg-white p-6 shadow-lg">
        <Text className="text-6xl font-bold text-emerald-900">🔧</Text>
      </View>
      <Text className="text-white text-4xl font-semibold mt-6">EM Repairing</Text>
      <Text className="text-gray-300 text-xl mt-2 text-center px-4">
        Reliable & Quick Repairs
      </Text>
      <ActivityIndicator size="large" color="#fff" className="mt-6" />
    </View>
  );
};

export default SplashScreen;
