import { View, Text } from "react-native";
import { SHADOW } from "../constants/theme";

export default function PremiumCard({ title, children }) {
    return (
        <View style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 15,
            marginBottom: 15,
            ...SHADOW
        }}>
            {title && (
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 10
                }}>
                    {title}
                </Text>
            )}
            {children}
        </View>
    );
}