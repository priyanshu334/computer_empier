import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface PhotoPreviewSectionProps {
  photo: string;
  handleRetakePhoto: () => void;
}

const PhotoPreviewSection: React.FC<PhotoPreviewSectionProps> = ({ photo, handleRetakePhoto }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.previewContainer}>
        <Image style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + photo }} />
      </View>
      <TouchableOpacity style={styles.retakeButton} onPress={handleRetakePhoto}>
        <Text style={styles.buttonText}>Retake Photo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PhotoPreviewSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  previewContainer: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  preview: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  retakeButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
