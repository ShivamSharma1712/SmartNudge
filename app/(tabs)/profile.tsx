import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch,
    ScrollView,
    TextInput
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const u = await AsyncStorage.getItem("user");
        const dark = await AsyncStorage.getItem("darkMode");

        if (u) setUser(JSON.parse(u));
        if (dark) setDarkMode(JSON.parse(dark));
    };

    // ===== IMAGE PICK =====
    const pickImage = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!res.canceled) {
            setImage(res.assets[0].uri);
        }
    };

    // ===== DARK MODE =====
    const toggleDark = async () => {
        const val = !darkMode;
        setDarkMode(val);
        await AsyncStorage.setItem("darkMode", JSON.stringify(val));
    };

    if (!user) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
            <Text style={{ color: "#fff" }}>Loading...</Text>
        </View>
    );
}

    const bg = darkMode ? "#121212" : "#eef2ff";
    const card = darkMode ? "#1e1e1e" : "#ffffff";
    const text = darkMode ? "#fff" : "#000";

    return (
        <ScrollView style={{ backgroundColor: bg }}>

            {/* PROFILE TOP */}
            <View style={styles.profileTop}>

                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{
                            uri: image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>

                {/* NAME */}
                {editing ? (
                    <TextInput
                        value={user.name}
                        onChangeText={(t) => setUser({ ...user, name: t })}
                        style={styles.inputBig}
                    />
                ) : (
                    <Text style={[styles.name, { color: text }]}>
                        {user.name}
                    </Text>
                )}

                {/* EMAIL */}
                {editing ? (
                    <TextInput
                        value={user.email}
                        onChangeText={(t) => setUser({ ...user, email: t })}
                        style={styles.inputSmall}
                    />
                ) : (
                    <Text style={{ color: "#777" }}>{user.email}</Text>
                )}

                <TouchableOpacity onPress={() => setEditing(!editing)}>
                    <Text style={styles.editBtn}>
                        {editing ? "Save ✔" : "Edit Profile ✏️"}
                    </Text>
                </TouchableOpacity>

            </View>

            {/* PERSONAL INFO */}
            <View style={[styles.card, { backgroundColor: card }]}>
                <Text style={[styles.title, { color: text }]}>Personal Info</Text>

                {renderField("Phone", "phone")}
                {renderField("DOB", "dob")}
            </View>

            {/* ACADEMIC INFO */}
            <View style={[styles.card, { backgroundColor: card }]}>
                <Text style={[styles.title, { color: text }]}>Academic Info</Text>

                {renderField("College", "college")}
                {renderField("Roll No", "rollNo")}
                {renderField("Branch", "branch")}
                {renderField("Semester", "semester")}
            </View>

            {/* SETTINGS */}
            <View style={[styles.card, { backgroundColor: card }]}>
                <Text style={[styles.title, { color: text }]}>Settings</Text>

                <View style={styles.row}>
                    <Text style={{ color: text }}>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={toggleDark} />
                </View>
            </View>

            {/* ABOUT */}
            <View style={[styles.card, { backgroundColor: card }]}>
                <Text style={[styles.title, { color: text }]}>
                    About SmartNudge
                </Text>

                <Text style={[styles.aboutIntro, { color: text }]}>
                    SmartNudge is your AI-powered academic assistant designed to help
                    you stay productive, organized, and stress-free.
                </Text>

                <View style={{ marginTop: 10 }}>
                    <Text style={[styles.point, { color: text }]}>
                        📌 Smart task scheduling & prioritization
                    </Text>
                    <Text style={[styles.point, { color: text }]}>
                        ⚠️ AI-based risk alerts for deadlines
                    </Text>
                    <Text style={[styles.point, { color: text }]}>
                        📊 Productivity tracking & insights
                    </Text>
                    <Text style={[styles.point, { color: text }]}>
                        🤖 Intelligent assistant for planning
                    </Text>
                    <Text style={[styles.point, { color: text }]}>
                        🎯 Helps reduce stress & improve performance
                    </Text>
                </View>
            </View>

            {/* ⭐ RATING */}
            <View style={[styles.card, { backgroundColor: card }]}>
                <Text style={[styles.title, { color: text }]}>Rate This App</Text>

                <View style={{ flexDirection: "row" }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <TouchableOpacity key={i} onPress={() => setRating(i)}>
                            <Text style={{
                                fontSize: 32,
                                marginRight: 5,
                                color: i <= rating ? "gold" : "#ccc"
                            }}>
                                ★
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

        </ScrollView>
    );

    // ===== FIELD FUNCTION
    function renderField(label, key) {
        return (
            <View style={styles.field}>
                <Text style={{ color: "#888" }}>{label}</Text>

                {editing ? (
                    <TextInput
                        value={user[key]}
                        onChangeText={(t) => setUser({ ...user, [key]: t })}
                        style={styles.input}
                    />
                ) : (
                    <Text style={{ color: text }}>{user[key]}</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    profileTop: {
        alignItems: "center",
        marginVertical: 20
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55
    },

    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10
    },

    editBtn: {
        color: "#4a6cf7",
        marginTop: 10
    },

    card: {
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 15,
        borderRadius: 12
    },

    title: {
        fontWeight: "bold",
        marginBottom: 10
    },

    field: {
        marginVertical: 8
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    input: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        marginTop: 5
    },

    inputBig: {
        borderWidth: 1,
        width: "80%",
        marginTop: 10,
        padding: 8,
        borderRadius: 8
    },

    inputSmall: {
        borderWidth: 1,
        width: "80%",
        marginTop: 5,
        padding: 6,
        borderRadius: 8
    },

    aboutIntro: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 5
    },

    point: {
        fontSize: 14,
        marginBottom: 6
    }

});