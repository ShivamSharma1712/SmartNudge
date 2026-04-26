import { TouchableOpacity, Image } from "react-native";

export default function ProfileButton({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
            <Image
                source={{ uri: "https://i.pravatar.cc/100" }}
                style={{ width: 35, height: 35, borderRadius: 50 }}
            />
        </TouchableOpacity>
    );
}