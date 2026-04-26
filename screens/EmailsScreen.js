import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import API from "../services/api.service";
import EmailCard from "../components/EmailCard";
import ActionBar from "../components/ActionBar";

export default function EmailsScreen() {
    const [emails, setEmails] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    // =========================
    // 🔥 FETCH FROM DATABASE (NOT GMAIL DIRECTLY)
    // =========================
    const fetchEmails = async () => {
        try {
            console.log("📡 Fetching stored emails from DB...");

            const res = await API.get("/api/emails");

            const data = Array.isArray(res.data)
                ? res.data
                : res.data.emails || [];

            console.log("✅ Emails from DB:", data.length);

            setEmails(data);

        } catch (err) {
            console.log("❌ ERROR:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    // =========================
    // 🔥 OPTIONAL: FETCH NEW EMAILS FROM GMAIL
    // =========================
    const fetchNewEmails = async () => {
        try {
            console.log("🚀 Fetching NEW emails from Gmail...");

            await API.get("/api/auth/google/fetch");

            // After fetching → reload DB data
            fetchEmails();

        } catch (err) {
            console.log("❌ Fetch new error:", err.message);
        }
    };

    // =========================
    // 🔥 SELECT EMAIL
    // =========================
    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    // =========================
    // 🔥 FILTER
    // =========================
    const filtered =
        category === "All"
            ? emails
            : category === "Important"
                ? emails.filter(e => e.isImportant)
                : emails.filter(
                    e => e.category?.toLowerCase() === category.toLowerCase()
                );

    // =========================
    // 🔥 UI
    // =========================
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading emails...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <Text style={styles.heading}>Emails</Text>

            {/* 🔥 FETCH NEW BUTTON */}
            <TouchableOpacity style={styles.fetchBtn} onPress={fetchNewEmails}>
                <Text style={{ color: "#fff" }}>Fetch New Emails</Text>
            </TouchableOpacity>

            {/* FILTER */}
            <View style={styles.tabs}>
                {["All", "Important", "Assignment", "Internship", "Event"].map(cat => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => setCategory(cat)}
                        style={[
                            styles.tab,
                            category === cat && styles.activeTab
                        ]}
                    >
                        <Text style={{
                            color: category === cat ? "#fff" : "#333"
                        }}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* EMAIL LIST */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <EmailCard
                        email={item}
                        selected={selectedIds.includes(item._id)}
                        onSelect={() => toggleSelect(item._id)}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* ACTION BAR */}
            <ActionBar
                onDelete={() => { }}
                onComplete={() => { }}
                onArchive={() => { }}
                count={selectedIds.length}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eef2ff",
        padding: 10
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 10,
        gap: 10
    },
    tab: {
        backgroundColor: "#dbeafe",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    activeTab: {
        backgroundColor: "#4f46e5"
    },
    fetchBtn: {
        backgroundColor: "#4f46e5",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

