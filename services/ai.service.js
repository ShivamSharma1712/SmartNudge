import API from "./api";

export const processEmail = async (text) => {
    try {
        const res = await API.post("/ai/process-email", {
            text: text,
        });

        return res.data;
    } catch (error) {
        console.log("AI SERVICE ERROR:", error.message);
        console.log("RESPONSE:", error.response?.data);
        throw error;
    }
};