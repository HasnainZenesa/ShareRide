import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useLocation() {
  const [loc, setLoc] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | asking | granted | denied | error
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setStatus("asking");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setStatus("denied");
          return;
        }
        setStatus("granted");
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setLoc({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      } catch (e) {
        setStatus("error");
        setError(e?.message || String(e));
      }
    })();
  }, []);

  return { loc, status, error };
}
