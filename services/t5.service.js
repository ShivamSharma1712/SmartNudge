const axios = require("axios");

// 🧠 PROMPT BUILDER (MULTI-CATEGORY)
const buildPrompt = (text, category) => {

    switch (category?.toLowerCase()) {

        case "placement":
        case "internship":
            return `
Extract job/internship details from the email.

Important:
- Company may be organization, firm
- Deadline may be apply before, last date
- Skills may be requirements, eligibility

Return:

Company:
Role:
Apply Link:
Skills:
Rounds:
Deadline:

Text:
${text}
`;

        case "assignment":
            return `
Extract assignment details.

Important:
- Course may be subject, paper
- Deadline may be due date, submission date
- Instructions may be task, work

Return:

Title:
Course:
Task Type:
Deadline:
Instructions:
Submission Link:
Faculty:

Text:
${text}
`;

        case "exam":
            return `
Extract exam/date sheet details.

Return:

Subject:
Exam Date:
Time:
Syllabus:
Instructions:

Text:
${text}
`;

        case "course":
            return `
Extract course details.

Return:

Course Name:
Provider:
Start Date:
Duration:
Link:

Text:
${text}
`;

        case "seminar":
        case "event":
            return `
Extract event/seminar details.

Return:

Title:
Date:
Time:
Location:
Description:
Registration Link:

Text:
${text}
`;

        case "project":
            return `
Extract project details.

Return:

Project Title:
Description:
Deadline:
Team Size:
Requirements:

Text:
${text}
`;

        default:
            return `
Extract important information.

Return key useful fields.

Text:
${text}
`;
    }
};

// 🔥 MAIN FUNCTION
exports.extractDetails = async (text, category) => {
    try {
        const prompt = buildPrompt(text, category);

        const response = await axios.post(
            process.env.T5_API_URL,
            { inputs: prompt }
        );

        const output = response.data[0]?.generated_text || "";

        return parseOutput(output);

    } catch (err) {
        console.error("T5 ERROR:", err.message);
        return {};
    }
};

// 🧠 PARSER (GENERIC)
const parseOutput = (text) => {
    const lines = text.split("\n");

    const data = {};

    lines.forEach(line => {
        const parts = line.split(":");
        if (parts.length >= 2) {
            const key = parts[0].trim().toLowerCase().replace(/ /g, "_");
            const value = parts.slice(1).join(":").trim();
            data[key] = value;
        }
    });

    return data;
};