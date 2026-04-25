// const axios = require("axios");

// // =========================
// // 🧠 PROMPT BUILDER
// // =========================
// const buildPrompt = (text, category) => {

//     return `
// You are an AI that extracts structured data from emails.

// Rules:
// - STRICT format: Key: Value
// - NO extra text
// - NO explanations
// - If missing → write N/A

// Category: ${category}

// Extract:

// Company:
// Role:
// Title:
// Course:
// Provider:
// Project Title:
// Deadline:
// Date:
// Time:
// Apply Link:
// Registration Link:

// Email:
// ${text}
// `;
// };

// // =========================
// // 🤖 MAIN FUNCTION
// // =========================
// exports.extractDetails = async (text, category) => {
//     try {
//         const prompt = buildPrompt(text, category);

//         const response = await axios.post(
//             process.env.T5_API_URL,
//             { inputs: prompt },
//             { timeout: 15000 }
//         );

//         const output = response.data?.[0]?.generated_text || "";

//         let parsed = parseOutput(output);

//         // 🔥 FALLBACK: extract links manually
//         const links = extractLinks(text);

//         if (!parsed.apply_link && links.length > 0) {
//             parsed.apply_link = links[0];
//         }

//         if (!parsed.registration_link && links.length > 1) {
//             parsed.registration_link = links[1];
//         }

//         // 🔥 CLEAN EMPTY VALUES
//         Object.keys(parsed).forEach(key => {
//             if (!parsed[key] || parsed[key] === "N/A") {
//                 delete parsed[key];
//             }
//         });

//         return parsed;

//     } catch (err) {
//         console.error("❌ T5 ERROR:", err.message);

//         // 🔥 FALLBACK ONLY LINKS
//         return {
//             apply_link: extractLinks(text)[0] || null
//         };
//     }
// };

// // =========================
// // 🔍 ROBUST PARSER
// // =========================
// const parseOutput = (text) => {
//     const data = {};

//     const lines = text
//         .replace(/\r/g, "")
//         .split("\n")
//         .map(l => l.trim())
//         .filter(Boolean);

//     lines.forEach(line => {
//         const idx = line.indexOf(":");
//         if (idx === -1) return;

//         const key = line
//             .slice(0, idx)
//             .trim()
//             .toLowerCase()
//             .replace(/ /g, "_");

//         const value = line.slice(idx + 1).trim();

//         if (key && value) {
//             data[key] = value;
//         }
//     });

//     return data;
// };

// // =========================
// // 🔗 LINK EXTRACTOR
// // =========================
// const extractLinks = (text) => {
//     const regex = /(https?:\/\/[^\s]+)/g;
//     return text.match(regex) || [];
// };

const axios = require("axios");

// =========================
// 🧠 PROMPT BUILDER (CATEGORY AWARE)
// =========================
const buildPrompt = (text, category) => {

    switch (category?.toLowerCase()) {

        case "placement":
        case "internship":
            return `
Extract job/internship details.

Rules:
- STRICT format Key: Value
- NO extra text
- If missing → N/A

Company:
Role:
Deadline:
Apply Link:

Text:
${text}
`;

        case "assignment":
            return `
Extract assignment details.

Title:
Course:
Deadline:

Text:
${text}
`;

        case "exam":
            return `
Extract exam details.

Subject:
Date:
Time:

Text:
${text}
`;

        case "course":
            return `
Extract course details.

Course Name:
Provider:
Start Date:

Text:
${text}
`;

        case "event":
        case "seminar":
            return `
Extract event details.

Title:
Date:
Time:
Registration Link:

Text:
${text}
`;

        case "project":
            return `
Extract project details.

Project Title:
Deadline:

Text:
${text}
`;

        default:
            return `
Extract important info.

Title:
Deadline:

Text:
${text}
`;
    }
};

// =========================
// 🤖 MAIN FUNCTION
// =========================
exports.extractDetails = async (text, category) => {
    try {
        const prompt = buildPrompt(text, category);

        const response = await axios.post(
            process.env.T5_API_URL,
            { inputs: prompt },
            { timeout: 15000 }
        );

        const output = response.data?.[0]?.generated_text || "";

        let parsed = parseOutput(output);

        // =========================
        // 🔥 LINK FALLBACK
        // =========================
        const links = extractLinks(text);

        if (!parsed.apply_link && links[0]) {
            parsed.apply_link = links[0];
        }

        if (!parsed.registration_link && links[1]) {
            parsed.registration_link = links[1];
        }

        // =========================
        // 🔥 NORMALIZE KEYS (UI SAFE)
        // =========================
        parsed = normalizeFields(parsed);

        // =========================
        // 🔥 REMOVE EMPTY
        // =========================
        Object.keys(parsed).forEach(key => {
            if (!parsed[key] || parsed[key] === "N/A") {
                delete parsed[key];
            }
        });

        return parsed;

    } catch (err) {
        console.error("❌ T5 ERROR:", err.message);

        return {
            title: text.slice(0, 80),
            apply_link: extractLinks(text)[0] || null
        };
    }
};

// =========================
// 🔍 PARSER
// =========================
const parseOutput = (text) => {
    const data = {};

    const lines = text
        .replace(/\r/g, "")
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);

    lines.forEach(line => {
        const idx = line.indexOf(":");
        if (idx === -1) return;

        const key = line
            .slice(0, idx)
            .trim()
            .toLowerCase()
            .replace(/ /g, "_");

        const value = line.slice(idx + 1).trim();

        if (key && value) {
            data[key] = value;
        }
    });

    return data;
};

// =========================
// 🔥 NORMALIZE FIELDS (IMPORTANT FOR UI)
// =========================
const normalizeFields = (data) => {
    const map = {
        course_name: "course",
        project_title: "title",
        subject: "subject_name",
        company_name: "company",
    };

    Object.keys(map).forEach(key => {
        if (data[key]) {
            data[map[key]] = data[key];
            delete data[key];
        }
    });

    return data;
};

// =========================
// 🔗 LINK EXTRACTOR
// =========================
const extractLinks = (text) => {
    const regex = /(https?:\/\/[^\s]+)/g;
    return text.match(regex) || [];
};