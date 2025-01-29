// // BarcodeScanner.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// const BarcodeScanner = ({ onScan, onClose }) => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanning, setScanning] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     onScan(data); // Return only the scanned data
//     setScanning(false); // Stop scanning after scanning a code
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {scanning ? (
//         <View style={styles.scannerWrapper}>
//           <BarCodeScanner
//             onBarCodeScanned={handleBarCodeScanned}
//             style={StyleSheet.absoluteFillObject}
//           />
//         </View>
//       ) : (
//         <View style={styles.scannerButtonContainer}>
//           <Button title="Start Scanning" onPress={() => setScanning(true)} />
//         </View>
//       )}
//       <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//         <Text style={styles.closeButtonText}>Close</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000', // Ensures the background fills the whole screen
//   },
//   scannerWrapper: {
//     flex: 1,
//     width: '100%', // Ensures the scanner takes the full width
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scannerButtonContainer: {
//     margin: 20,
//   },
//   closeButton: {
//     position: 'absolute',
//     bottom: 40,
//     right: 20,
//     backgroundColor: '#FF3B30', // Red background color for the button
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default BarcodeScanner;