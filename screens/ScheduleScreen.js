import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const categories = [
    "Placement",
    "Internship",
    "Assignment",
    "Exam",
    "Course",
    "Seminar",
    "Project",
    "Events"
];

export default function ScheduleScreen() {
    const navigation = useNavigation();

    const [mode, setMode] = useState("manual");

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [event, setEvent] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [category, setCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [steps, setSteps] = useState([
        { date: "", sh: "04", sm: "00", sap: "AM", eh: "05", em: "00", eap: "AM", work: "" }
    ]);

    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);

    // ---------- PICKERS ----------
    const pickDoc = async () => {
        const res = await DocumentPicker.getDocumentAsync({});
        console.log(res);
    };

    const pickImage = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({});
        console.log(res);
    };

    // ---------- APP DATA ----------
    const openTasks = () => {
        navigation.navigate("Tasks", {
            selectMode: true,
            onSelect: (task) => {
                setSelectedTasks(prev => [...prev, task]);
            }
        });
    };

    const openNotes = () => {
        navigation.navigate("Notes", {
            selectMode: true,
            onSelect: (note) => {
                setSelectedNotes(prev => [...prev, note]);
            }
        });
    };

    // ---------- STEP ----------
    const addStep = () => {
        setSteps([...steps, { date: "", sh: "04", sm: "00", sap: "AM", eh: "05", em: "00", eap: "AM", work: "" }]);
    };

    // ---------- UI ----------
    return (
        <ScrollView style={{ padding: 20, backgroundColor: "#f5f7fb" }}>

            <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
                Create Schedule
            </Text>

            {/* TOGGLE */}
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <TouchableOpacity
                    style={[styles.tab, mode === "manual" && styles.activeTab]}
                    onPress={() => setMode("manual")}
                >
                    <Text>Manual</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, mode === "smart" && styles.activeTab]}
                    onPress={() => setMode("smart")}
                >
                    <Text>Smart</Text>
                </TouchableOpacity>
            </View>

            {/* SMART MODE */}
            {mode === "smart" && (
                <View style={styles.card}>
                    <Text style={styles.heading}>Smart Scheduling</Text>

                    <TouchableOpacity style={styles.upload} onPress={pickDoc}>
                        <Text>📄 Upload Document</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upload} onPress={pickImage}>
                        <Text>🖼 Upload Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upload} onPress={openTasks}>
                        <Text>📌 Upload Tasks from App</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.upload} onPress={openNotes}>
                        <Text>📝 Upload Notes from App</Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Any Event / Function"
                        style={styles.input}
                        value={event}
                        onChangeText={setEvent}
                    />

                    {selectedTasks.length > 0 && (
                        <Text style={styles.info}>📌 {selectedTasks.length} tasks selected</Text>
                    )}
                    {selectedNotes.length > 0 && (
                        <Text style={styles.info}>📝 {selectedNotes.length} notes selected</Text>
                    )}

                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "#fff" }}>⚡ Analyze & Fill Form</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* MANUAL FORM */}
            {mode === "manual" && (
                <View style={styles.card}>

                    <TextInput placeholder="Schedule Title" style={styles.input} onChangeText={setTitle} />
                    <TextInput placeholder="Description" style={styles.input} onChangeText={setDesc} />

                    <Text style={styles.label}>Start Date</Text>
                    <TextInput style={styles.input} placeholder="dd-mm-yyyy" onChangeText={setStartDate} />

                    <Text style={styles.label}>End Date</Text>
                    <TextInput style={styles.input} placeholder="dd-mm-yyyy" onChangeText={setEndDate} />

                    <Text style={styles.label}>Category</Text>
                    <View style={styles.row}>
                        {categories.map(c => (
                            <TouchableOpacity
                                key={c}
                                style={[styles.chip, category === c && styles.activeChip]}
                                onPress={() => setCategory(c)}
                            >
                                <Text>{c}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput
                        placeholder="Custom Category"
                        style={styles.input}
                        onChangeText={setCustomCategory}
                    />

                    <Text style={styles.label}>Priority</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.pill, { backgroundColor: "#c8f7c5" }]} onPress={() => setPriority("Low")}><Text>Low</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.pill, { backgroundColor: "#ffe4a3" }]} onPress={() => setPriority("Medium")}><Text>Medium</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.pill, { backgroundColor: "#ffb3b3" }]} onPress={() => setPriority("High")}><Text>High</Text></TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Event / Function</Text>
                    <TextInput style={styles.input} onChangeText={setEvent} />

                    <Text style={styles.label}>Task Breakdown</Text>

                    {steps.map((s, i) => (
                        <View key={i} style={styles.stepBox}>
                            <TextInput placeholder="dd-mm-yyyy" style={styles.date} />
                            <View style={styles.row}>
                                <TextInput style={styles.time} placeholder="04" />
                                <TextInput style={styles.time} placeholder="00" />
                                <TextInput style={styles.ampm} placeholder="AM" />

                                <Text> → </Text>

                                <TextInput style={styles.time} placeholder="05" />
                                <TextInput style={styles.time} placeholder="00" />
                                <TextInput style={styles.ampm} placeholder="PM" />
                            </View>

                            <TextInput placeholder="Work to do" style={styles.input} />
                        </View>
                    ))}

                    <TouchableOpacity onPress={addStep}>
                        <Text style={{ marginVertical: 10 }}>+ Add Step</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "#fff" }}>Save Schedule</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = {
    tab: {
        flex: 1,
        padding: 12,
        backgroundColor: "#e0e4f5",
        borderRadius: 12,
        alignItems: "center",
        marginRight: 10
    },
    activeTab: {
        backgroundColor: "#5b6cff",
        color: "#fff"
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15
    },
    upload: {
        padding: 15,
        backgroundColor: "#f0f3ff",
        borderRadius: 12,
        marginBottom: 10
    },
    input: {
        padding: 12,
        backgroundColor: "#f2f2f2",
        borderRadius: 12,
        marginBottom: 10
    },
    label: {
        marginTop: 10,
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginVertical: 10
    },
    chip: {
        padding: 10,
        backgroundColor: "#eee",
        borderRadius: 20,
        margin: 5
    },
    activeChip: {
        backgroundColor: "#5b6cff"
    },
    pill: {
        padding: 12,
        borderRadius: 20,
        marginRight: 10
    },
    stepBox: {
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 12,
        marginBottom: 10
    },
    date: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 5
    },
    time: {
        width: 50,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginRight: 5
    },
    ampm: {
        width: 60,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10
    },
    button: {
        backgroundColor: "#5b6cff",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10
    },
    info: {
        marginVertical: 5
    }
};