import { View, Text, TouchableOpacity } from "react-native";
export default function ActionBar({ onDelete, onComplete, onArchive, count }) {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10
        }}>
            <Btn text={`Archive (${count})`} color="#60a5fa" onPress={onArchive} />
            <Btn text={`Complete (${count})`} color="#4ade80" onPress={onComplete} />
            <Btn text={`Delete (${count})`} color="#f87171" onPress={onDelete} />
        </View>
    );
}

function Btn({ text, color, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: color,
            padding: 10,
            borderRadius: 10
        }}>
            <Text style={{ color: "#fff", fontSize: 12 }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}