import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform
} from "react-native";
import { useState } from "react";

// =========================
// SAFE IMPORT (NO CRASH ON WEB)
// =========================
let DateTimePicker = null;

if (Platform.OS !== "web") {
    DateTimePicker =
        require("@react-native-community/datetimepicker").default;
}

// =========================
// CATEGORY LIST
// =========================
const categoriesList = [
    "Placement",
    "Internship",
    "Assignment",
    "Exam",
    "Course",
    "Seminar",
    "Project",
    "Events"
];

export default function TaskFormModal({
    visible,
    onClose,
    onSave
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("Assignment");
    const [customCategory, setCustomCategory] = useState("");

    const [priority, setPriority] = useState("medium");

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    // =========================
    // SAVE FUNCTION
    // =========================
    const handleSave = () => {
        const finalCategory = customCategory || category;

        onSave({
            title,
            description,
            category: finalCategory,
            priority,
            deadline: date
        });

        // reset (optional but clean UX)
        setTitle("");
        setDescription("");
        setCustomCategory("");
        setPriority("medium");
        setDate(new Date());

        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        margin: 15,
                        borderRadius: 20,
                        padding: 20
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* HEADER */}
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 15
                            }}
                        >
                            ✨ Create Task
                        </Text>

                        {/* TITLE */}
                        <Text style={{ marginBottom: 5 }}>Title</Text>
                        <TextInput
                            placeholder="Enter task title..."
                            value={title}
                            onChangeText={setTitle}
                            style={inputStyle}
                        />

                        {/* DESCRIPTION */}
                        <Text style={{ marginBottom: 5 }}>Description</Text>
                        <TextInput
                            placeholder="Add details..."
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            style={[inputStyle, { height: 80 }]}
                        />

                        {/* CATEGORY */}
                        <Text style={{ marginBottom: 5 }}>Category</Text>

                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {categoriesList.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => {
                                        setCategory(cat);
                                        setCustomCategory("");
                                    }}
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 10,
                                        margin: 4,
                                        backgroundColor:
                                            category === cat && !customCategory
                                                ? "#4f6ef7"
                                                : "#eef2ff"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                category === cat && !customCategory
                                                    ? "#fff"
                                                    : "#333",
                                            fontSize: 12
                                        }}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* CUSTOM CATEGORY */}
                        <Text style={{ marginTop: 10 }}>
                            Or create your own category
                        </Text>
                        <TextInput
                            placeholder="Custom category..."
                            value={customCategory}
                            onChangeText={setCustomCategory}
                            style={inputStyle}
                        />

                        {/* PRIORITY */}
                        <Text style={{ marginBottom: 5 }}>Priority</Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            {["low", "medium", "high"].map((p) => (
                                <TouchableOpacity
                                    key={p}
                                    onPress={() => setPriority(p)}
                                    style={{
                                        flex: 1,
                                        margin: 4,
                                        padding: 10,
                                        borderRadius: 12,
                                        backgroundColor:
                                            priority === p
                                                ? p === "high"
                                                    ? "#ff4d4f"
                                                    : p === "medium"
                                                        ? "#faad14"
                                                        : "#52c41a"
                                                : "#f1f5f9"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: priority === p ? "#fff" : "#333",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {p.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* DATE PICKER */}
                        <Text style={{ marginTop: 10 }}>Deadline</Text>

                        {
                            Platform.OS === "web" ? (
                                <input
                                    type="date"
                                    value={
                                        date && !isNaN(date)
                                            ? date.toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const selected = new Date(e.target.value);

                                        if (!isNaN(selected)) {
                                            setDate(selected);
                                        }
                                    }}
                                    style={{
                                        padding: 10,
                                        borderRadius: 10,
                                        border: "1px solid #ddd",
                                        marginBottom: 10
                                    }}
                                />
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={() => setShowPicker(true)}
                                        style={inputStyle}
                                    >
                                        <Text>{date.toDateString()}</Text>
                                    </TouchableOpacity>

                                    {DateTimePicker && showPicker && (
                                        <DateTimePicker
                                            value={date || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShowPicker(false);
                                                if (selectedDate) setDate(selectedDate);
                                            }}
                                        />
                                    )}
                                </>
                            )
                        }
                        {/* BUTTONS */}
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 20
                            }}
                        >
                            <TouchableOpacity
                                onPress={onClose}
                                style={{
                                    flex: 1,
                                    padding: 12,
                                    backgroundColor: "#eee",
                                    borderRadius: 10,
                                    marginRight: 5
                                }}
                            >
                                <Text style={{ textAlign: "center" }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSave}
                                style={{
                                    flex: 1,
                                    padding: 12,
                                    backgroundColor: "#4f6ef7",
                                    borderRadius: 10,
                                    marginLeft: 5
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Save Task
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

// =========================
// INPUT STYLE
// =========================
const inputStyle = {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0"
};