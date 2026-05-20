const express =
    require("express");

const cors =
    require("cors");

const app =
    express();

// =========================
// ROUTES
// =========================
const notesRoutes =
    require("./modules/notes/notes.routes");

const taskRoutes =
    require("./modules/tasks/tasks.routes");

const aiRoutes =
    require("./modules/ai/ai.routes");

const googleRoutes =
    require("./modules/google/google.routes");

const emailRoutes =
    require("./modules/email/email.routes");

const authRoutes =
    require("./modules/auth/auth.routes");

const ratingRoutes =
    require("./modules/rating/rating.routes");

const scheduleRoutes =
    require("./modules/schedule/schedule.routes");

// =========================
// MIDDLEWARE
// =========================
app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// =========================
// STATIC FOLDER
// =========================
app.use(
    "/uploads",
    express.static("uploads")
);

// =========================
// HOME ROUTE
// =========================
app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "SmartNudge API Running"
    });
});

// =========================
// API ROUTES
// =========================
app.use(
    "/api/notes",
    notesRoutes
);

app.use(
    "/api/tasks",
    taskRoutes
);

app.use(
    "/api/ai",
    aiRoutes
);

app.use(
    "/api/auth/google",
    googleRoutes
);

app.use(
    "/api/emails",
    emailRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/rating",
    ratingRoutes
);

app.use(
    "/api/schedule",
    scheduleRoutes
);

// =========================
// 404 HANDLER
// =========================
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// =========================
// GLOBAL ERROR HANDLER
// =========================
app.use((
    err,
    req,
    res,
    next
) => {

    console.error(
        "❌ SERVER ERROR:",
        err.stack
    );

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

module.exports = app;