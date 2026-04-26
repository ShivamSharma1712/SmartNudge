import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from "react-native";

export default function About() {
    return (
        <ScrollView style={styles.container}>

            {/* TITLE */}
            <Text style={styles.title}>About Us</Text>

            {/* HERO */}
            <View style={styles.hero}>
                <Image
                    source={require("../../assets/rocket-bg.png")}
                    style={styles.heroImg}
                />
            </View>

            {/* DESCRIPTION */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>App Description</Text>

                <Text style={styles.desc}>
                    SmartNudge is an AI-powered productivity platform designed for students and professionals.

                    {"\n\n"}
                    It helps manage emails, tasks, schedules, and academic workload efficiently.
                    Using AI insights, it improves productivity and reduces stress.
                </Text>
            </View>

            {/* FEATURES */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Features</Text>

                <Text style={styles.item}>📧 Email Classification</Text>
                <Text style={styles.item}>🧠 Intelligent Notes</Text>
                <Text style={styles.item}>📅 Smart Scheduling</Text>
                <Text style={styles.item}>📊 AI Analytics</Text>
            </View>

            {/* TECH STACK */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Tech Stack</Text>

                <Text style={styles.item}>⚡ Node.js Backend</Text>
                <Text style={styles.item}>🍃 MongoDB</Text>
                <Text style={styles.item}>📧 Gmail API</Text>
                <Text style={styles.item}>🤖 Machine Learning</Text>
            </View>

            {/* FOOTER */}
            <Text style={styles.footer}>
                Developed by Shivam Sharma 🚀
            </Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eef2ff"
    },

    title: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 12
    },

    hero: {
        margin: 12,
        borderRadius: 20,
        overflow: "hidden"
    },

    heroImg: {
        width: "100%",
        height: 180,
        resizeMode: "contain"
    },

    card: {
        backgroundColor: "#fff",
        margin: 12,
        padding: 16,
        borderRadius: 20,
        elevation: 5
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },

    desc: {
        color: "#555",
        lineHeight: 20
    },

    item: {
        marginTop: 8,
        fontSize: 14
    },

    footer: {
        textAlign: "center",
        marginVertical: 20,
        color: "#777"
    }
});