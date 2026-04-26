import { ScrollView, Text, View, StyleSheet } from "react-native";
import Card from "../components/Card";

export default function HomeScreen() {

    return (
        <ScrollView style={styles.container}>

            {/* HEADER TEXT */}
            <Text style={styles.heading}>
                Welcome Back Shivam 👋
            </Text>

            {/* TASKS */}
            <Card title="Today's Tasks">
                <Text style={styles.item}>✔ Finish ML Assignment</Text>
                <Text style={styles.item}>✔ Internship Preparation</Text>
            </Card>

            {/* ALERTS */}
            <Card title="Risk Alerts">
                <Text style={[styles.item, { color: "red" }]}>
                    Deadline Missed
                </Text>
                <Text style={[styles.item, { color: "orange" }]}>
                    Exam Pending
                </Text>
            </Card>

            {/* EMAILS */}
            <Card title="Important Emails">
                <Text style={styles.item}>Google Internship Offer</Text>
                <Text style={styles.item}>AI Workshop Reminder</Text>
            </Card>

            {/* STATS */}
            <Card title="Productivity Stats">
                <Text style={styles.item}>Completed Tasks: 8</Text>
                <Text style={styles.item}>Study Time: 4h</Text>

                <View style={styles.graphBox}>
                    <Text>📊 Graph Placeholder</Text>
                </View>
            </Card>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#eef2ff"
    },

    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },

    item: {
        marginBottom: 5,
        fontSize: 14
    },

    graphBox: {
        height: 120,
        backgroundColor: "#f1f5f9",
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});