// import { useEffect } from "react";
// import { useLocalSearchParams, router } from "expo-router";
// import api from "../../services/api";
// import { View, ActivityIndicator } from "react-native";

// export default function Success() {

//     const { userId } = useLocalSearchParams();

//     useEffect(() => {
//         if (!userId) return;

//         // 🔥 fetch emails in background
//         api.get(`/api/auth/google/fetch/${userId}`)
//             .catch(() => {});

//         // 🔥 redirect to dashboard (IMPORTANT FIX)
//         const timer = setTimeout(() => {
//             router.replace(`/(tabs)?userId=${userId}`);
//         }, 300);

//         return () => clearTimeout(timer);

//     }, [userId]);

//     return (
//         <View style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#0f172a"
//         }}>
//             <ActivityIndicator size="large" color="white" />
//         </View>
//     );
// }

import { useEffect } from "react";
import { router } from "expo-router";
import API from "../../services/api";
import { View, ActivityIndicator } from "react-native";

export default function Success() {

    useEffect(() => {

        // 🔥 trigger email fetch (no userId)
        API.get(`/api/auth/google/fetch`)
            .catch(() => { });

        setTimeout(() => {
            router.replace("/(tabs)");
        }, 300);

    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0f172a"
        }}>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
}