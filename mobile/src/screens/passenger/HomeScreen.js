import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Dimensions, Modal, Pressable, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { colors } from "../../theme/colors";
import SuggestionCard from "../../components/SuggestionCard";
import FiltersBar from "../../components/FiltersBar";
import { riderSuggestions as baseData } from "../../data/mock";
import { useLocation } from "../../hooks/useLocation";
import { useUser } from "../../state/useUser";

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9e7ff" }] },
];

export default function HomeScreen({ navigation }) {
  const { active } = useUser();
  const { loc, status } = useLocation();
  const [region, setRegion] = useState({ latitude:24.8607, longitude:67.0011, latitudeDelta:0.04, longitudeDelta:0.04 });
  const [vehicle, setVehicle] = useState("all");
  const [detour, setDetour] = useState(5);
  const [timeModal, setTimeModal] = useState(false);

  // mock Home/Office (agar location mil jaye to uske around)
  const home = useMemo(() => loc ? { lat: loc.latitude, lng: loc.longitude } : { lat:24.8607, lng:67.0011 }, [loc]);
  const office = useMemo(() => ({ lat: home.lat + 0.03, lng: home.lng - 0.04 }), [home]);

  useEffect(() => { if (loc) setRegion(r => ({ ...r, latitude:loc.latitude, longitude:loc.longitude })); }, [loc]);

  const data = useMemo(()=>{
    const copy = baseData.map(x => x.id==="me" ? { ...x, active } : x);
    return copy.filter(r => (vehicle==="all" || r.vehicleType===vehicle) && r.detourPct <= detour);
  }, [active, vehicle, detour]);

  return (
    <View style={{ flex:1 }}>
      <MapView
        style={{ flex:1 }}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={setRegion}
        customMapStyle={mapStyle}
        showsUserLocation
        showsMyLocationButton
      >
        {/* Home & Office markers */}
        <Marker coordinate={{ latitude: home.lat, longitude: home.lng }} title="Home" />
        <Marker coordinate={{ latitude: office.lat, longitude: office.lng }} title="Office" />
        {/* Route polyline */}
        <Polyline
          coordinates={[
            { latitude: home.lat, longitude: home.lng },
            { latitude: (home.lat+office.lat)/2 + 0.005, longitude: (home.lng+office.lng)/2 },
            { latitude: office.lat, longitude: office.lng },
          ]}
          strokeWidth={4}
          strokeColor="#2563EB"
        />
      </MapView>

      {/* Top: route chip + filters */}
      <View style={{ position:"absolute", top:16, left:16, right:16, gap:10 }}>
        {/* Route chip */}
        <View style={{
          backgroundColor:"#fff", borderRadius:12, padding:12, borderWidth:1, borderColor:colors.border,
          flexDirection:"row", alignItems:"center", justifyContent:"space-between"
        }}>
          <View style={{ flexDirection:"row", alignItems:"center", gap:8 }}>
            <View style={{ width:8, height:8, borderRadius:4, backgroundColor:"#16a34a" }} />
            <Text style={{ fontWeight:"800", color:"#111" }}>Your Route</Text>
          </View>
          <Text style={{ color:"#555" }}>Home → Office • AM</Text>
        </View>

        <FiltersBar
          vehicle={vehicle} setVehicle={setVehicle}
          detour={detour} setDetour={setDetour}
          onOpenTime={()=>setTimeModal(true)}
        />
      </View>

      {/* Bottom: suggestions rail */}
      <View style={{ position:"absolute", bottom:16, left:0, right:0 }}>
        {status==="asking" ? (
          <View style={{ alignItems:"center" }}><ActivityIndicator/></View>
        ) : (
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal:16 }}
            ItemSeparatorComponent={()=> <View style={{ width:12 }} /> }
            data={data}
            keyExtractor={it=>it.id}
            renderItem={({ item })=>(
              <View style={{ width:Dimensions.get("window").width*0.85 }}>
                <SuggestionCard item={item} onPress={()=> navigation.navigate("RiderProfile", { id:item.id })} />
              </View>
            )}
          />
        )}
      </View>

      {/* Time modal */}
      <Modal visible={timeModal} transparent animationType="fade" onRequestClose={()=>setTimeModal(false)}>
        <Pressable onPress={()=>setTimeModal(false)} style={{ flex:1, backgroundColor:"rgba(0,0,0,0.25)", justifyContent:"center", padding:24 }}>
          <View style={{ backgroundColor:"#fff", borderRadius:16, padding:16 }}>
            <Text style={{ fontWeight:"800", fontSize:16 }}>Select window</Text>
            <View style={{ flexDirection:"row", gap:8, marginTop:12 }}>
              {["AM","PM","Both"].map(t=>(
                <Pressable key={t} style={{ paddingHorizontal:14, paddingVertical:10, borderRadius:999, borderWidth:1, borderColor:colors.border, backgroundColor:"#fff" }}>
                  <Text style={{ fontWeight:"700" }}>{t}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
