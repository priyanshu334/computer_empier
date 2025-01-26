import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ModalDatePickerExample = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate:any) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Button title="Pick a Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text className="mt-4 text-lg font-semibold text-gray-800">
        Selected Date: {date.toDateString()}
      </Text>
    </View>
  );
};

export default ModalDatePickerExample;
