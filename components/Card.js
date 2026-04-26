import { View, Text } from "react-native";

export default function Card({ title, children }) {
    return (
        <View style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 15,
            marginBottom: 15,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 3
        }}>
            {title && (
                <Text style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    fontSize: 16
                }}>
                    {title}
                </Text>
            )}
            {children}
        </View>
    );
}