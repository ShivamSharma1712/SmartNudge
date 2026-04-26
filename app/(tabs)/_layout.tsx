// import { Tabs, usePathname } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
// // import { LinearGradient } from "expo-linear-gradient";
// import HomeScreen from "../screens/HomeScreen";
// import { useRouter } from "expo-router";

// export default function Page() {
//   return <HomeScreen />;
// }
// // ✅ ALL NAV ITEMS (MATCH YOUR UI)
// const NAV_ITEMS = [
//   { name: "Home", route: "/" },
//   { name: "Emails", route: "/emails" },
//   { name: "Tasks", route: "/tasks" },
//   { name: "Schedule", route: "/schedule" },
//   { name: "Notes", route: "/notes" },
//   { name: "Progress", route: "/progress" },
//   { name: "Badges", route: "/badges" },
//   { name: "Assistant", route: "/assistant" },
//   { name: "Profile", route: "/profile" },
//   { name: "About Us", route: "/about" },
// ];

// // ✅ GLOBAL HEADER (FINAL UI)
// function GlobalHeader() {
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <LinearGradient
//       colors={["#4a6cf7", "#6c8cff"]}
//       style={{
//         paddingTop: 50,
//         paddingBottom: 10,
//         paddingHorizontal: 15,
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//       }}
//     >
//       {/* TOP ROW */}
//       <View style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center"
//       }}>
//         <Text style={{
//           color: "#fff",
//           fontSize: 20,
//           fontWeight: "bold"
//         }}>
//           SmartNudge
//         </Text>

//         <View style={{ flexDirection: "row", gap: 12 }}>
//           <Text style={{ fontSize: 18 }}>🔔</Text>
//           <Image
//             source={{ uri: "https://i.pravatar.cc/40" }}
//             style={{ width: 30, height: 30, borderRadius: 15 }}
//           />
//         </View>
//       </View>

//       {/* 🔥 SCROLLABLE NAVBAR */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{ marginTop: 12 }}
//       >
//         <View style={{ flexDirection: "row", gap: 10 }}>
//           {NAV_ITEMS.map((item) => {
//             const active = pathname === item.route;

//             return (
//               <TouchableOpacity
//                 key={item.name}
//                 onPress={() => router.push(item.route)}
//                 style={{
//                   paddingVertical: 6,
//                   paddingHorizontal: 14,
//                   borderRadius: 12,
//                   backgroundColor: active
//                     ? "#ffffff"
//                     : "rgba(255,255,255,0.2)"
//                 }}
//               >
//                 <Text style={{
//                   color: active ? "#4a6cf7" : "#fff",
//                   fontSize: 12,
//                   fontWeight: active ? "bold" : "normal"
//                 }}>
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// // ✅ MAIN LAYOUT
// export default function TabsLayout() {
//   return (
//     <View style={{ flex: 1 }}>

//       {/* HEADER */}
//       <GlobalHeader />

//       {/* TABS */}
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: {
//             height: 60,
//             backgroundColor: "#fff",
//             borderTopWidth: 0,
//             elevation: 10,
//           },
//           tabBarActiveTintColor: "#4a6cf7",
//           tabBarInactiveTintColor: "#888"
//         }}
//       >

//         <Tabs.Screen
//           name="index"
//           options={{
//             title: "Home",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="home" size={22} color={color} />
//             )
//           }}
//         />

//         <Tabs.Screen
//           name="emails"
//           options={{
//             title: "Emails",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="mail" size={22} color={color} />
//             )
//           }}
//         />

//         <Tabs.Screen
//           name="tasks"
//           options={{
//             title: "Tasks",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="checkmark-circle" size={22} color={color} />
//             )
//           }}
//         />

//         <Tabs.Screen
//           name="profile"
//           options={{
//             title: "Profile",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="person" size={22} color={color} />
//             )
//           }}
//         />

//       </Tabs>
//     </View>
//   );
// }

import { Tabs, usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ✅ NAV ITEMS
const NAV_ITEMS = [
  { name: "Home", route: "/(tabs)" },
  { name: "Emails", route: "/emails" },
  { name: "Tasks", route: "/tasks" },
  { name: "Schedule", route: "/schedule" },
  { name: "Notes", route: "/notes" },
  { name: "Progress", route: "/progress" },
  { name: "Badges", route: "/badges" },
  { name: "Assistant", route: "/assistant" },
  { name: "Profile", route: "/profile" },
  { name: "About Us", route: "/about" },
];

// ✅ GLOBAL HEADER
function GlobalHeader() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <LinearGradient
      colors={["#4a6cf7", "#6c8cff"]}
      style={{
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      {/* TOP ROW */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
          SmartNudge
        </Text>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={{ fontSize: 18 }}>🔔</Text>
          <Image
            source={{ uri: "https://i.pravatar.cc/40" }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </View>
      </View>

      {/* 🔥 SCROLLABLE NAV */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12 }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          {NAV_ITEMS.map((item) => {
            const active =
              (item.route === "/(tabs)" && pathname === "/(tabs)") ||
              pathname.startsWith(item.route);

            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => router.push(item.route)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  borderRadius: 12,
                  backgroundColor: active
                    ? "#ffffff"
                    : "rgba(255,255,255,0.2)"
                }}
              >
                <Text
                  style={{
                    color: active ? "#4a6cf7" : "#fff",
                    fontSize: 12,
                    fontWeight: active ? "bold" : "normal"
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// ✅ MAIN LAYOUT
export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <GlobalHeader />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 10,
          },
          tabBarActiveTintColor: "#4a6cf7",
          tabBarInactiveTintColor: "#888"
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={22} color={color} />
            )
          }}
        />

        <Tabs.Screen
          name="emails"
          options={{
            title: "Emails",
            tabBarIcon: ({ color }) => (
              <Ionicons name="mail" size={22} color={color} />
            )
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              <Ionicons name="checkmark-circle" size={22} color={color} />
            )
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={22} color={color} />
            )
          }}
        />
      </Tabs>
    </View>
  );
}