import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useCart } from '../contexts/CartContext';

const { width, height } = Dimensions.get('window');

const QRScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const { setTable } = useCart();

  useEffect(() => {
    getCameraPermissions();
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    
    try {
      // Extract table slug from QR code data
      // Expected format: http://localhost:3000/m/table-slug or just table-slug
      let tableSlug = data;
      
      if (data.includes('/m/')) {
        const parts = data.split('/m/');
        tableSlug = parts[1];
      }
      
      if (tableSlug) {
        // Set the table in cart context
        await setTable(tableSlug);
        
        Alert.alert(
          'QR Code Scanned!',
          `Table: ${tableSlug}\nRedirecting to menu...`,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Menu', { tableSlug });
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Invalid QR Code',
          'This QR code is not valid for our restaurant.',
          [
            {
              text: 'Scan Again',
              onPress: () => setScanned(false),
            },
            {
              text: 'Cancel',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
      Alert.alert(
        'Error',
        'Failed to process QR code. Please try again.',
        [
          {
            text: 'Scan Again',
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  const resetScanner = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={getCameraPermissions}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      >
        <View style={styles.overlay}>
          {/* Top overlay */}
          <View style={styles.overlayTop}>
            <Text style={styles.instructionText}>
              Point your camera at the QR code on your table
            </Text>
          </View>

          {/* Center scanning area */}
          <View style={styles.scanningArea}>
            <View style={styles.scanFrame}>
              {/* Corner indicators */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              
              {scanned && (
                <View style={styles.scannedOverlay}>
                  <Text style={styles.scannedText}>✓ Scanned!</Text>
                </View>
              )}
            </View>
          </View>

          {/* Bottom overlay */}
          <View style={styles.overlayBottom}>
            <View style={styles.controls}>
              {scanned ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={resetScanner}
                >
                  <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Menu', { tableSlug: 'demo-table' })}
                >
                  <Text style={styles.buttonText}>Try Demo Menu</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scanningArea: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#2196f3',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scannedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  scannedText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRScannerScreen;