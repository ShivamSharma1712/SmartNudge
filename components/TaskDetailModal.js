import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";

export default function TaskDetailModal({ visible, task, onClose }) {

    if (!task) return null;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center"
            }}>
                <View style={{
                    backgroundColor: "#fff",
                    margin: 20,
                    borderRadius: 16,
                    padding: 20,
                    maxHeight: "80%"
                }}>

                    <ScrollView>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10
                        }}>
                            {task.title}
                        </Text>

                        <Text style={{ marginBottom: 10 }}>
                            {task.description || "No description provided"}
                        </Text>

                        <Text style={label}>Category:</Text>
                        <Text style={value}>{task.category || "N/A"}</Text>

                        <Text style={label}>Priority:</Text>
                        <Text style={value}>{task.priority}</Text>

                        <Text style={label}>Deadline:</Text>
                        <Text style={value}>
                            {task.deadline
                                ? new Date(task.deadline).toDateString()
                                : "No deadline"}
                        </Text>

                        <Text style={label}>Status:</Text>
                        <Text style={value}>{task.status}</Text>

                    </ScrollView>

                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            marginTop: 20,
                            backgroundColor: "#4f6ef7",
                            padding: 12,
                            borderRadius: 10
                        }}
                    >
                        <Text style={{
                            color: "#fff",
                            textAlign: "center",
                            fontWeight: "600"
                        }}>
                            Close
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const label = {
    fontWeight: "600",
    marginTop: 10
};

const value = {
    color: "#555"
};