import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function AuthScreen() {

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    college: "",
    rollNo: "",
    branch: "",
    semester: "",
    dob: ""
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  // ================= GOOGLE CALLBACK HANDLER =================
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;

      if (url.includes("token=")) {
        const token = url.split("token=")[1].split("&")[0];

        console.log("✅ TOKEN RECEIVED:", token);

        AsyncStorage.setItem("token", token);
        localStorage.setItem("token", token);

        // clean URL
        window.history.replaceState({}, document.title, "/");

        // 🔥 GO TO HOME
        router.replace("/(tabs)");
      }
    }
  }, []);

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://smartnudge-k4rg.onrender.com/api/auth/login",
        {
          email: form.email.trim().toLowerCase(),
          password: form.password
        }
      );

      const token = res.data.token;

      await AsyncStorage.setItem("token", token);
      localStorage.setItem("token", token);

      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ✅");

      // 🔥 GOOGLE FLOW
      if (typeof window !== "undefined") {
        window.open(
        
            "https://smartnudge-k4rg.onrender.com/api/auth/google/login",
            "_self"
          );
      } else {
        router.replace("/(tabs)");
      }

    } catch (err: any) {
      console.log("❌ LOGIN ERROR:", err?.response?.data);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= SIGNUP =================
  const handleSignup = async () => {
    try {
      setLoading(true);

      if (!form.name.trim()) {
        alert("Name is required");
        return;
      }

      const res = await axios.post(
        "https://smartnudge-k4rg.onrender.com/api/auth/signup",
        form
      );

      await AsyncStorage.setItem("token", res.data.token);
      localStorage.setItem("token", res.data.token);

      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signup successful, please login");

      router.replace("/auth/login");

    } catch (err: any) {
      console.log("❌ SIGNUP ERROR:", err?.response?.data);
      alert(err?.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>SmartNudge</Text>

      <View style={styles.card}>

        {/* TOGGLE */}
        <View style={styles.toggle}>
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={isLogin ? styles.activeTab : styles.tab}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={!isLogin ? styles.activeTab : styles.tab}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* LOGIN */}
        {isLogin ? (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              value={form.password}
              onChangeText={(v) => handleChange("password", v)}
            />

            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnText}>Login</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput placeholder="Name" style={styles.input}
              value={form.name}
              onChangeText={(v) => handleChange("name", v)} />

            <TextInput placeholder="Email" style={styles.input}
              value={form.email}
              onChangeText={(v) => handleChange("email", v)} />

            <TextInput placeholder="Password" secureTextEntry style={styles.input}
              value={form.password}
              onChangeText={(v) => handleChange("password", v)} />

            <TextInput placeholder="Phone" style={styles.input}
              value={form.phone}
              onChangeText={(v) => handleChange("phone", v)} />

            <TextInput placeholder="College" style={styles.input}
              value={form.college}
              onChangeText={(v) => handleChange("college", v)} />

            <TextInput placeholder="Roll No" style={styles.input}
              value={form.rollNo}
              onChangeText={(v) => handleChange("rollNo", v)} />

            <TextInput placeholder="Branch" style={styles.input}
              value={form.branch}
              onChangeText={(v) => handleChange("branch", v)} />

            <TextInput placeholder="Semester" style={styles.input}
              value={form.semester}
              onChangeText={(v) => handleChange("semester", v)} />

            <TextInput placeholder="DOB" style={styles.input}
              value={form.dob}
              onChangeText={(v) => handleChange("dob", v)} />

            <TouchableOpacity style={styles.btn} onPress={handleSignup}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnText}>Signup</Text>}
            </TouchableOpacity>
          </>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#5c7cff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  logo: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
  },
  tab: { color: "#999" },
  activeTab: { color: "#5c7cff", fontWeight: "bold" },
  input: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12
  },
  btn: {
    backgroundColor: "#5c7cff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center"
  },
  btnText: { color: "#fff", fontWeight: "bold" }
});