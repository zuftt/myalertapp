import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { db } from "./../../app/config/FirebaseConfig"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Reports() {
  const [pastReports, setPastReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("No user is logged in.");
        setLoading(false);
        return;
      }

      // Query the user's specific reports
      const reportsRef = collection(db, "Users", currentUser.uid, "Reports");
      const querySnapshot = await getDocs(reportsRef);
      const reportsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPastReports(reportsData);
    } catch (error) {
      console.error("Error fetching reports: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleAddReport = () => {
    router.push("/new_report");
  };

  const handlePressReport = (rpt) => {
    console.log("Selected Report ID:", rpt);

    // Format the createdAt date (assuming rpt.createdAt is a Firebase Timestamp object)
    const formattedDate = rpt.createdAt.toDate().toLocaleString(); // Convert the Firebase timestamp to a readable string

    // Extract latitude and longitude
    const { latitude, longitude } = rpt.location;

    // Log formatted date and location
    console.log("Formatted Date:", formattedDate);
    console.log("Location - Latitude:", latitude, "Longitude:", longitude);

    // Pass the necessary details to the ReportDetail page
    router.push({
      pathname: "/report_details",
      params: {
        ...rpt, // Pass the full report object
        formattedDate, // Pass the formatted date
        latitude, // Pass latitude
        longitude, // Pass longitude
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sliderTitle}>Past Reports</Text>
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          data={pastReports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressReport(item)}>
              <View style={styles.reportItem}>
                <Text style={styles.reportText}>Case Type: {item.caseType}</Text>
                <Text style={styles.reportText}>Created At: {item.createdAt.toDate().toString()}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.noReportsText}>No previous reports</Text>
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddReport}>
        <Text style={styles.addButtonText}>+ Add New Report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    fontFamily: "outfit",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sliderTitle: {
    fontFamily: "outfit",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noReportsText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  reportItem: {
    padding: 15,
    backgroundColor: "#FFF5E4",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFD580",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reportText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});
