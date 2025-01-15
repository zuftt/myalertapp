import app from "../firebase";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("USER IS STILL LOGGED IN: ", user);
      if (user) {
        setUser(user);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  }, [user]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!user) {
    return <Redirect href={"/login"} />;
  }

  return <Redirect href={"/(tabs)/home"} />;
}
