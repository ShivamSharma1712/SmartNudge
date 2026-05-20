require("dotenv").config();

const mongoose =
    require("mongoose");

const app =
    require("./app");

// =========================
// CONNECT DATABASE
// =========================
const connectDB =
    async () => {

        try {

            await mongoose.connect(
                process.env.MONGO_URI
            );

            console.log(
                "✅ MongoDB Connected"
            );

        } catch (error) {

            console.error(
                "❌ MongoDB Connection Error:",
                error.message
            );

            process.exit(1);
        }
    };

// =========================
// PORT
// =========================
const PORT =
    process.env.PORT || 5001;

// =========================
// START SERVER
// =========================
const startServer =
    async () => {

        try {

            // CONNECT DATABASE
            await connectDB();

            // START EXPRESS
            app.listen(
                PORT,
                "0.0.0.0",
                () => {

                    console.log(
                        `🚀 Server running on port ${PORT}`
                    );
                }
            );

        } catch (error) {

            console.error(
                "❌ Server Start Error:",
                error.message
            );
        }
    };

startServer();