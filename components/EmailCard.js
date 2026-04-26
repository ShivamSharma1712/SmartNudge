import { View, Text, TouchableOpacity, Linking } from "react-native";

export default function EmailCard({
  email,
  selected,
  onSelect,
}) {
  const data = email.raw || {};

  // =========================
  // 🎨 CATEGORY COLOR
  // =========================
  const getTagColor = (category) => {
    switch (category?.toLowerCase()) {
      case "internship": return "#fde68a";
      case "assignment": return "#fca5a5";
      case "event":
      case "seminar": return "#c4b5fd";
      case "placement": return "#93c5fd";
      case "exam": return "#fcd34d";
      case "course": return "#6ee7b7";
      case "project": return "#a5b4fc";
      default: return "#d1fae5";
    }
  };

  // =========================
  // 🎨 PRIORITY COLOR
  // =========================
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      default: return "#10b981";
    }
  };

  // =========================
  // ⏱ TIME FORMAT (LIKE IMAGE)
  // =========================
  const formatTime = (date) => {
    if (!date) return "";

    const d = new Date(date);
    const now = new Date();

    const diff = (now - d) / (1000 * 60);

    if (diff < 60) return `${Math.floor(diff)} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;

    return d.toDateString();
  };

  return (
    <View style={[
      styles.card,
      selected && { borderWidth: 2, borderColor: "#5c7cff" }
    ]}>

      {/* 🔥 TOP ROW */}
      <View style={styles.topRow}>

        {/* CHECKBOX */}
        <TouchableOpacity onPress={onSelect}>
          <Text style={{ fontSize: 18 }}>
            {selected ? "☑️" : "⬜"}
          </Text>
        </TouchableOpacity>

        {/* MAIN CONTENT */}
        <View style={{ flex: 1, marginLeft: 10 }}>

          <View style={styles.rowBetween}>
            <Text style={styles.title} numberOfLines={1}>
              {data.company || data.title || email.subject}
            </Text>

            <Text style={styles.time}>
              {formatTime(email.createdAt)}
            </Text>
          </View>

          <Text style={styles.subtitle} numberOfLines={1}>
            {data.role || data.description || email.summary}
          </Text>

          {/* DEADLINE */}
          {email.deadline && (
            <Text style={styles.deadline}>
              Deadline: {new Date(email.deadline).toDateString()}
            </Text>
          )}
        </View>

        {/* IMPORTANT STAR */}
        {email.isImportant && (
          <Text style={{ marginLeft: 5 }}>⭐</Text>
        )}
      </View>

      {/* 🔥 FOOTER */}
      <View style={styles.footer}>

        <Text style={styles.sender}>
          {data.company || "SmartNudge"}
        </Text>

        <View style={{ flexDirection: "row", gap: 6 }}>

          {/* CATEGORY */}
          <View style={[
            styles.tag,
            { backgroundColor: getTagColor(email.category) }
          ]}>
            <Text style={styles.tagText}>
              {email.category}
            </Text>
          </View>

          {/* PRIORITY */}
          <View style={[
            styles.tag,
            { backgroundColor: getPriorityColor(email.priority) }
          ]}>
            <Text style={{ color: "#fff", fontSize: 10 }}>
              {email.priority}
            </Text>
          </View>

        </View>
      </View>

      {/* STATUS */}
      <Text style={{
        marginTop: 5,
        fontSize: 11,
        color:
          email.status === "completed"
            ? "#10b981"
            : email.status === "overdue"
              ? "#ef4444"
              : "#64748b"
      }}>
        {email.status || "pending"}
      </Text>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        {data.apply_link && <Btn text="Apply" url={data.apply_link} />}
        {data.registration_link && <Btn text="Register" url={data.registration_link} />}
      </View>

    </View>
  );
}

function Btn({ text, url }) {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(url)}
      style={styles.btn}
    >
      <Text style={{ color: "#fff", fontSize: 10 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

// =========================
// 🎨 STYLES
// =========================
const styles = {
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#0f172a",
    flex: 1,
    marginRight: 8
  },

  subtitle: {
    fontSize: 12,
    color: "#475569",
    marginTop: 2,
  },

  deadline: {
    fontSize: 11,
    color: "#ef4444",
    marginTop: 2,
  },

  sender: {
    fontSize: 11,
    color: "#64748b",
  },

  time: {
    fontSize: 10,
    color: "#94a3b8",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6
  },

  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  tagText: {
    fontSize: 10,
  },

  actions: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },

  btn: {
    backgroundColor: "#5c7cff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
};