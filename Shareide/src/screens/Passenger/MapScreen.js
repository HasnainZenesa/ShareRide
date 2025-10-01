import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, Animated } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../../theme/ThemeProvider';
import { mockRiders } from '../../data/mockRiders';

export default function MapScreen() {
  const { colors } = useTheme();
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [riders, setRiders] = useState(mockRiders);

  const riderAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Location permission denied');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const initial = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setRegion(initial);
      setLoading(false);
    })();
  }, []);

  const animateRiderMarker = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(riderAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(riderAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateRiderMarker();
  }, [riders]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
        <Text style={{ color: colors.text }}>Finding your location...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {region && (
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={region}
          showsUserLocation
          provider={Platform.OS === 'android' ? undefined : undefined}
        >
          {riders.map((r) => (
            <Marker
              key={r.id}
              coordinate={{ latitude: r.lat, longitude: r.lng }}
              title={`${r.name} - ${r.rating}★`}
            >
              <Animated.View
                style={[
                  styles.riderMarker,
                  { transform: [{ scale: riderAnimation }] },
                ]}
              >
                <Text style={{ color: colors.text }}>{r.name}</Text>
              </Animated.View>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  riderMarker: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#FFD400', // Brand color
    alignItems: 'center',
  },
});
