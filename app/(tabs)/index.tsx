// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from "react-native";

// import { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import api from "../../services/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LineChart } from "react-native-chart-kit";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// const screenWidth = Dimensions.get("window").width;

// export default function Home() {
//   const router = useRouter();

//   const [tasks, setTasks] = useState<any[]>([]);
//   const [emails, setEmails] = useState<any[]>([]);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     loadUser();
//     fetchData();
//   }, []);

//   // ================= LOAD USER =================
//   const loadUser = async () => {
//     const storedUser = await AsyncStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   };

//   // ================= FETCH DATA (FIXED) =================
//   const fetchData = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");

//       const t = await api.get("/tasks", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const e = await api.get("/emails", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setTasks(t.data || []);
//       setEmails(e.data || []);

//     } catch (err: any) {
//       console.log("Error:", err.message);
//     }
//   };

//   // ================= STATS =================
//   const completed = tasks.filter(t => t.status === "done").length;
//   const overdue = tasks.filter(t => t.status === "overdue").length;

//   // ================= GRAPH =================
//   const weeklyData = [0, 0, 0, 0, 0, 0, 0];

//   tasks.forEach(task => {
//     if (task.createdAt) {
//       const day = new Date(task.createdAt).getDay();
//       weeklyData[day] += 1;
//     }
//   });

//   return (
//     <ScrollView style={styles.container}>

//       {/* 🔥 HEADER */}
//       <LinearGradient colors={["#3b5998", "#4a6cf7"]} style={styles.header}>

//         <View style={styles.headerTop}>
//           <Text style={styles.logo}>SmartNudge</Text>

//           <View style={styles.icons}>
//             <TouchableOpacity onPress={() => Alert.alert("Notifications Clicked")}>
//               <Ionicons name="notifications-outline" size={22} color="#fff" />
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => router.push("/emails")}>
//               <Ionicons name="mail-outline" size={22} color="#fff" />
//             </TouchableOpacity>

//             {/* ✅ REAL USER IMAGE */}
//             <TouchableOpacity onPress={() => router.push("/profile")}>
//               <Image
//                 source={{
//                   uri:
//                     user?.profileImage ||
//                     "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                 }}
//                 style={styles.avatar}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* 🔥 NAVBAR */}
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View style={styles.navbar}>
//             {[
//               { name: "Home", path: "/(tabs)" },
//               { name: "Emails", path: "/emails" },
//               { name: "Tasks", path: "/tasks" },
//               { name: "Schedule", path: "/schedule" },
//               { name: "Notes", path: "/notes" },
//               { name: "Progress", path: "/progress" },
//               { name: "Badges", path: "/badges" },
//               { name: "Assistant", path: "/assistant" },
//               { name: "Profile", path: "/profile" },
//               { name: "About Us", path: "/about" }
//             ].map((item, i) => (
//               <TouchableOpacity key={i} onPress={() => router.push(item.path)}>
//                 <Text
//                   style={[
//                     styles.navItem,
//                     item.name === "Home" && styles.activeNav,
//                   ]}
//                 >
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>

//       </LinearGradient>

//       {/* 🔥 WELCOME */}
//       <Text style={styles.welcome}>
//         Welcome Back {user?.name || ""} 👋
//       </Text>

//       {/* 🔥 GRID */}
//       <View style={styles.grid}>

//         {/* TASKS */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Today's Tasks</Text>
//           {tasks.length === 0 ? (
//             <Text style={styles.empty}>No tasks</Text>
//           ) : (
//             tasks.slice(0, 3).map((t, i) => (
//               <Text key={i}>✔ {t.title}</Text>
//             ))
//           )}
//         </View>

//         {/* ALERTS */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Risk Alerts</Text>
//           {overdue === 0 ? (
//             <Text style={styles.empty}>No alerts</Text>
//           ) : (
//             tasks
//               .filter(t => t.status === "overdue")
//               .slice(0, 3)
//               .map((t, i) => (
//                 <Text key={i} style={{ color: "red" }}>
//                   ⚠ {t.title}
//                 </Text>
//               ))
//           )}
//         </View>

//         {/* EMAILS */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Important Emails</Text>
//           {emails.length === 0 ? (
//             <Text style={styles.empty}>No emails</Text>
//           ) : (
//             emails.slice(0, 3).map((e, i) => (
//               <Text key={i}>📧 {e.subject}</Text>
//             ))
//           )}
//         </View>

//         {/* STATS */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Productivity Stats</Text>
//           <Text>Completed: {completed}</Text>
//           <Text>Total: {tasks.length}</Text>
//           <Text style={{ color: "red" }}>Overdue: {overdue}</Text>
//         </View>

//       </View>

//       {/* 🔥 GRAPH */}
//       <View style={styles.chartCard}>
//         <Text style={styles.cardTitle}>Weekly Analysis</Text>

//         <LineChart
//           data={{
//             labels: ["S", "M", "T", "W", "T", "F", "S"],
//             datasets: [{ data: weeklyData }],
//           }}
//           width={screenWidth - 30}
//           height={180}
//           chartConfig={{
//             backgroundGradientFrom: "#fff",
//             backgroundGradientTo: "#fff",
//             color: () => "#4a6cf7",
//             labelColor: () => "#777",
//           }}
//           bezier
//         />
//       </View>

//       {/* 🔥 NOTIFICATIONS */}
//       <View style={styles.notificationBar}>
//         <Text style={styles.notificationText}>
//           🔔 Assignment Deadline Tomorrow
//         </Text>

//         <Text style={styles.notificationText}>
//           🔔 Team Meeting at 3 PM
//         </Text>
//       </View>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eef2f7",
//   },

//   header: {
//     padding: 15,
//     paddingTop: 40,
//   },

//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   logo: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "bold",
//   },

//   icons: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 15,
//   },

//   avatar: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//   },

//   navbar: {
//     flexDirection: "row",
//     marginTop: 15,
//   },

//   navItem: {
//     color: "#fff",
//     marginRight: 20,
//     paddingVertical: 5,
//     opacity: 0.7,
//   },

//   activeNav: {
//     backgroundColor: "#ffffff30",
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     opacity: 1,
//   },

//   welcome: {
//     fontSize: 20,
//     fontWeight: "bold",
//     padding: 15,
//   },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//   },

//   card: {
//     width: "48%",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//   },

//   cardTitle: {
//     fontWeight: "bold",
//     marginBottom: 10,
//   },

//   empty: {
//     color: "#999",
//   },

//   chartCard: {
//     backgroundColor: "#fff",
//     margin: 15,
//     padding: 15,
//     borderRadius: 12,
//   },

//   notificationBar: {
//     backgroundColor: "#fff",
//     margin: 15,
//     padding: 15,
//     borderRadius: 12,
//   },

//   notificationText: {
//     marginBottom: 5,
//   },
// });

import HomeScreen from "../../screens/HomeScreen";

export default function Page() {
  return <HomeScreen />;
}