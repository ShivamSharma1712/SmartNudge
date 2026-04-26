import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Email {
    _id: string;
    subject: string;
    category: string;
    summary?: string;
    isImportant?: boolean;
}

export default function EmailsScreen() {

    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [token, setToken] = useState<string | null>(null);
    const [googleConnected, setGoogleConnected] = useState(true);

    // ================= TOKEN =================
    useEffect(() => {
        const loadToken = async () => {
            let t = await AsyncStorage.getItem("token");

            if (!t && typeof window !== "undefined") {
                t = localStorage.getItem("token");
            }

            setToken(t);
        };

        loadToken();
    }, []);

    // ================= FETCH =================
    useEffect(() => {
        if (token) fetchEmails();
    }, [token]);

    const fetchEmails = async () => {
        try {
            console.log("🚀 START FETCH");

            const res = await axios.get("https://smartnudge-k4rg.onrender.com/api/emails", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = Array.isArray(res.data)
                ? res.data
                : res.data.emails || [];

            console.log("📩 Emails received:", data.length);

            setEmails(data);
            setGoogleConnected(true);

        } catch (err: any) {
            console.log("❌ Error:", err?.response?.data || err.message);

            if (err?.response?.status === 500) {
                setGoogleConnected(false);
            }

            setEmails([]);
        } finally {
            setLoading(false);
        }
    };

    // ================= GOOGLE =================
    const handleGoogleConnect = () => {
        if (typeof window !== "undefined") {
            window.open(
                "https://smartnudge-k4rg.onrender.com/api/auth/google/login",
                "_self"
            );
        }
    };

    // ================= FILTER =================
    const filtered =
        filter === "All"
            ? emails
            : filter === "Important"
                ? emails.filter(e => e.isImportant)
                : emails.filter(
                    e => e.category?.toLowerCase() === filter.toLowerCase()
                );

    // ================= UI =================

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Fetching emails...</Text>
            </View>
        );
    }

    // 🔥 IF GOOGLE NOT CONNECTED
    if (!googleConnected) {
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 10 }}>
                    Connect Google to fetch emails
                </Text>

                <TouchableOpacity style={styles.connectBtn} onPress={handleGoogleConnect}>
                    <Text style={{ color: "#fff" }}>Connect Google</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <Text style={styles.header}>Emails</Text>

            {/* FILTERS */}
            <View style={styles.filterBar}>
                {["All", "Important", "Assignment", "Internship", "Event"].map(cat => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => setFilter(cat)}
                        style={[
                            styles.filterBtn,
                            filter === cat && styles.activeFilter
                        ]}
                    >
                        <Text style={{
                            color: filter === cat ? "#fff" : "#333"
                        }}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* LIST */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>

                        <View style={styles.rowBetween}>
                            <Text style={styles.title}>{item.subject}</Text>
                            <Text style={styles.time}>Now</Text>
                        </View>

                        <Text style={styles.subtitle}>
                            {item.summary || "No summary"}
                        </Text>

                        <View style={styles.rowBetween}>
                            <Text style={styles.sender}>SmartNudge AI</Text>

                            <View style={styles.tag(item.category)}>
                                <Text style={styles.tagText}>{item.category}</Text>
                            </View>
                        </View>

                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {/* BOTTOM BAR */}
            <View style={styles.bottomBar}>
                <Text>📦 Archive</Text>
                <Text>✅ Complete</Text>
                <Text>🗑 Delete</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eef2ff",
        padding: 15
    },

    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },

    filterBar: {
        flexDirection: "row",
        marginBottom: 10
    },

    filterBtn: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#dbeafe",
        marginRight: 8
    },

    activeFilter: {
        backgroundColor: "#4f6ef7"
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 15,
        marginBottom: 12
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    title: {
        fontWeight: "bold",
        fontSize: 16
    },

    subtitle: {
        color: "#666",
        marginVertical: 6
    },

    sender: {
        fontSize: 12,
        color: "#888"
    },

    time: {
        fontSize: 12,
        color: "#888"
    },

    tag: (cat: string) => ({
        backgroundColor:
            cat === "Assignment"
                ? "#fca5a5"
                : cat === "Internship"
                    ? "#fde68a"
                    : cat === "Event"
                        ? "#c4b5fd"
                        : "#d1fae5",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10
    }),

    tagText: {
        fontSize: 12
    },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        padding: 12
    },

    connectBtn: {
        backgroundColor: "#5c7cff",
        padding: 12,
        borderRadius: 10
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});