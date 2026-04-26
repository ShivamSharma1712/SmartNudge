// import { View, Text, Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function HeaderBar() {
//     return (
//         <LinearGradient
//             colors={["#5c7cff", "#7c9cff"]}
//             style={{
//                 paddingTop: 50,
//                 paddingBottom: 15,
//                 paddingHorizontal: 15,
//                 borderBottomLeftRadius: 25,
//                 borderBottomRightRadius: 25,
//             }}
//         >
//             {/* TOP ROW */}
//             <View style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center"
//             }}>
//                 <Text style={{
//                     color: "#fff",
//                     fontSize: 20,
//                     fontWeight: "bold"
//                 }}>
//                     SmartNudge
//                 </Text>

//                 {/* RIGHT ICONS */}
//                 <View style={{ flexDirection: "row", gap: 12 }}>
//                     <Text style={{ fontSize: 18 }}>🔔</Text>
//                     <Image
//                         source={{ uri: "https://i.pravatar.cc/40" }}
//                         style={{
//                             width: 30,
//                             height: 30,
//                             borderRadius: 15
//                         }}
//                     />
//                 </View>
//             </View>

//             {/* NAVBAR */}
//             <View style={{
//                 flexDirection: "row",
//                 marginTop: 15,
//                 justifyContent: "space-between"
//             }}>
//                 {["Home", "Emails", "Tasks", "Schedule", "Notes"].map((item) => (
//                     <Text
//                         key={item}
//                         style={{
//                             color: item === "Emails" ? "#fff" : "#c7d2fe",
//                             fontWeight: item === "Emails" ? "bold" : "normal"
//                         }}
//                     >
//                         {item}
//                     </Text>
//                 ))}
//             </View>
//         </LinearGradient>
//     );
// }