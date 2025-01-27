import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PatternLock = () => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [savedPattern, setSavedPattern] = useState<number[] | null>([7, 3, 5, 8, 4, 1]);

  const handlePress = (num: number) => {
    if (!pattern.includes(num)) {
      setPattern((prev) => [...prev, num]);
    }
  };

  const handleSubmit = () => {
    if (savedPattern && pattern.toString() === savedPattern.toString()) {
      alert("Pattern Matched!");
    } else {
      alert("Incorrect Pattern!");
    }
    setPattern([]);
  };

  return (
    <View className="flex-1 bg-green-50 justify-center items-center">
      {/* Header */}
      <View className="w-full flex-row items-center p-4 bg-green-600">
        <Text className="text-white text-lg font-bold flex-1 text-center">
          🔒 Pattern Lock
        </Text>
      </View>

      {/* Grid */}
      <View className="grid grid-cols-3 gap-4 m-6">
        {Array.from({ length: 9 }, (_, i) => (
          <TouchableOpacity
            key={i}
            className={`w-16 h-16 bg-gray-200 rounded-lg justify-center items-center ${
              pattern.includes(i) ? "bg-green-400" : ""
            }`}
            onPress={() => handlePress(i)}
          >
            <Text className="text-lg font-bold">{i}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-green-500 px-6 py-2 rounded-lg shadow-md active:opacity-75"
        onPress={handleSubmit}
      >
        <Text className="text-white text-lg font-semibold">Submit Pattern</Text>
      </TouchableOpacity>

      {/* Saved Pattern Display */}
      <Text className="mt-4 text-green-700 text-base font-medium">
        Saved Pattern: {savedPattern?.join(",")}
      </Text>
    </View>
  );
};

export default PatternLock;
