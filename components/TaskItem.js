import { View, Text, TouchableOpacity } from "react-native";

export default function TaskItem({
    task,
    onToggle,
    onDelete,
    onRestore,
    onFavorite,
    onArchive,
    onUnarchive,
    onOpen,
    onEdit
}) {

    return (
        <TouchableOpacity
            onPress={() => onOpen(task)}
            style={{
                backgroundColor: "#fff",
                padding: 14,
                marginBottom: 10,
                borderRadius: 12,
                elevation: 2
            }}
        >

            {/* HEADER */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>

                {/* CHECKBOX */}
                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        onToggle(task);
                    }}
                    style={{
                        width: 22,
                        height: 22,
                        borderWidth: 2,
                        borderColor: "#4f6ef7",
                        marginRight: 10,
                        borderRadius: 4,
                        backgroundColor:
                            task.status === "completed" ? "#4f6ef7" : "#fff"
                    }}
                />

                {/* TITLE */}
                <Text style={{
                    flex: 1,
                    fontSize: 15,
                    textDecorationLine:
                        task.status === "completed" ? "line-through" : "none"
                }}>
                    {task.title}
                </Text>

                {/* FAVORITE */}
                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        onFavorite(task);
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        color: task.isFavorite ? "gold" : "#bbb"
                    }}>
                        ★
                    </Text>
                </TouchableOpacity>

            </View>

            {/* DEADLINE */}
            {task.deadline && (
                <Text style={{ color: "#888", marginTop: 5 }}>
                    Due: {new Date(task.deadline).toDateString()}
                </Text>
            )}

            {/* ACTIONS */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10
            }}>

                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        onEdit(task);
                    }}
                >
                    <Text style={{ color: "#4f6ef7" }}>✏️ Edit</Text>
                </TouchableOpacity>

                {/* ARCHIVE / RESTORE */}
                {task.isArchived ? (
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            onUnarchive(task._id);
                        }}
                    >
                        <Text style={{ color: "green" }}>↩ Undo</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            onArchive(task._id);
                        }}
                    >
                        <Text>📦</Text>
                    </TouchableOpacity>
                )}

                {/* DELETE / RESTORE */}
                {task.isDeleted ? (
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            onRestore(task._id);
                        }}
                    >
                        <Text style={{ color: "green" }}>↩ Restore</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            onDelete(task._id);
                        }}
                    >
                        <Text style={{ color: "red", fontSize: 18 }}>🗑</Text>
                    </TouchableOpacity>
                )}

            </View>

        </TouchableOpacity>
    );
}