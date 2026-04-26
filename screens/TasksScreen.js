import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput
} from "react-native";
import { useEffect, useState } from "react";

import API from "../services/api";

import TaskItem from "../components/TaskItem";
import TaskFormModal from "../components/TaskFormModal";
import TaskDetailModal from "../components/TaskDetailModal";

export default function TasksScreen() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const tabs = ["all", "completed", "overdue", "favorite", "archived", "deleted"];

    // ================= FETCH =================
    const fetchTasks = async () => {
        try {
            const res = await API.get("/api/tasks");
            setTasks(res.data.tasks || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // ================= CREATE / EDIT =================
    const handleSaveTask = async (data) => {
        try {
            if (selectedTask) {
                await API.put(`/api/tasks/${selectedTask._id}`, data);
            } else {
                await API.post("/api/tasks", data);
            }

            setShowForm(false);
            setSelectedTask(null);
            fetchTasks();

        } catch (err) {
            console.log("SAVE ERROR:", err);
        }
    };

    // ================= ACTIONS =================

    const toggleComplete = async (task) => {
        await API.put(`/api/tasks/${task._id}`, {
            status: task.status === "completed" ? "pending" : "completed"
        });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await API.put(`/api/tasks/${id}`, { isDeleted: true });
        fetchTasks();
    };

    const restoreTask = async (id) => {
        await API.put(`/api/tasks/${id}`, { isDeleted: false });
        fetchTasks();
    };

    const archiveTask = async (id) => {
        await API.put(`/api/tasks/${id}`, { isArchived: true });
        fetchTasks();
    };

    const unarchiveTask = async (id) => {
        await API.put(`/api/tasks/${id}`, { isArchived: false });
        fetchTasks();
    };

    const toggleFavorite = async (task) => {
        await API.put(`/api/tasks/${task._id}`, {
            isFavorite: !task.isFavorite
        });
        fetchTasks();
    };

    const openTask = (task) => {
        setSelectedTask(task);
        setShowDetail(true);
    };

    const editTask = (task) => {
        setSelectedTask(task);
        setShowForm(true);
    };

    // ================= FILTER =================

    const filteredTasks = tasks
        .filter(task => {

            if (activeTab === "completed") return task.status === "completed";

            if (activeTab === "overdue") {
                return task.deadline &&
                    new Date(task.deadline) < new Date() &&
                    task.status !== "completed";
            }

            if (activeTab === "favorite") return task.isFavorite;

            if (activeTab === "archived") return task.isArchived;

            if (activeTab === "deleted") return task.isDeleted;

            return !task.isDeleted && !task.isArchived;
        })
        .filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase())
        );

    // ================= COUNTS =================

    const counts = {
        archived: tasks.filter(t => t.isArchived).length,
        completed: tasks.filter(t => t.status === "completed").length,
        deleted: tasks.filter(t => t.isDeleted).length
    };

    // ================= UI =================

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 12, backgroundColor: "#f5f7fb" }}>

            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Your Tasks
            </Text>

            {/* SEARCH */}
            <TextInput
                placeholder="Search tasks..."
                value={search}
                onChangeText={setSearch}
                style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10
                }}
            />

            {/* TABS */}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={{
                            padding: 8,
                            margin: 4,
                            borderRadius: 10,
                            backgroundColor:
                                activeTab === tab ? "#4f6ef7" : "#eee"
                        }}
                    >
                        <Text style={{
                            color: activeTab === tab ? "#fff" : "#000",
                            fontSize: 12
                        }}>
                            {tab.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* LIST */}
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={toggleComplete}
                        onDelete={deleteTask}
                        onRestore={restoreTask}
                        onFavorite={toggleFavorite}
                        onArchive={archiveTask}
                        onUnarchive={unarchiveTask}
                        onOpen={openTask}
                        onEdit={editTask}
                    />
                )}
            />

            {/* BOTTOM BAR */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 12,
                backgroundColor: "#fff",
                borderRadius: 12,
                marginTop: 10
            }}>
                <Text>📦 {counts.archived}</Text>
                <Text>✔ {counts.completed}</Text>
                <Text>🗑 {counts.deleted}</Text>
            </View>

            {/* ADD BUTTON */}
            <TouchableOpacity
                onPress={() => {
                    setSelectedTask(null);
                    setShowForm(true);
                }}
                style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#4f6ef7",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
            </TouchableOpacity>

            {/* MODALS */}
            <TaskFormModal
                visible={showForm}
                onClose={() => setShowForm(false)}
                onSave={handleSaveTask}
                task={selectedTask}
            />

            <TaskDetailModal
                visible={showDetail}
                task={selectedTask}
                onClose={() => setShowDetail(false)}
            />

        </View>
    );
}