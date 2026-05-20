const fs = require("fs");

const pdfParse = require("pdf-parse");

const Tesseract = require("tesseract.js");

const Schedule = require("./schedule.model");

const {
    extractDetails
} = require("../../services/t5.service");

// =========================
// ANALYZE SCHEDULE
// =========================
exports.analyzeSchedule = async (req, res) => {

    try {

        let extractedText = "";

        // =========================
        // PDF EXTRACTION
        // =========================
        if (
            req.files &&
            req.files.document
        ) {

            const documentPath =
                req.files.document[0].path;

            const fileBuffer =
                fs.readFileSync(
                    documentPath
                );

            const pdfData =
                await pdfParse(fileBuffer);

            extractedText +=
                pdfData.text;

            // DELETE TEMP FILE
            fs.unlinkSync(
                documentPath
            );
        }

        // =========================
        // IMAGE OCR
        // =========================
        if (
            req.files &&
            req.files.image
        ) {

            const imagePath =
                req.files.image[0].path;

            const result =
                await Tesseract.recognize(

                    imagePath,

                    "eng"
                );

            extractedText +=
                result.data.text;

            // DELETE TEMP FILE
            fs.unlinkSync(
                imagePath
            );
        }

        // =========================
        // EVENT TEXT
        // =========================
        extractedText +=
            req.body.event || "";

        console.log(
            "📄 EXTRACTED TEXT:",
            extractedText
        );

        // =========================
        // AI EXTRACTION
        // =========================
        const aiData =
            await extractDetails(

                extractedText,

                "exam"
            );

        return res.status(200).json({

            success: true,

            data: aiData
        });

    } catch (err) {

        console.log(
            "❌ ANALYZE ERROR:",
            err
        );

        return res.status(500).json({

            success: false,

            message:
                "AI schedule generation failed",

            error:
                err.message
        });
    }
};

// =========================
// CREATE SCHEDULE
// =========================
exports.createSchedule = async (req, res) => {

    try {

        console.log(
            "📥 CREATE BODY:",
            req.body
        );

        const schedule =
            new Schedule({

                title:
                    req.body.title,

                desc:
                    req.body.desc,

                event:
                    req.body.event,

                category:
                    req.body.category,

                customCategory:
                    req.body.customCategory,

                priority:
                    req.body.priority,

                startDate:
                    req.body.startDate,

                endDate:
                    req.body.endDate,

                steps:
                    req.body.steps || []
            });

        await schedule.save();

        console.log(
            "✅ SAVED:",
            schedule
        );

        return res.status(201).json({

            success: true,

            message:
                "Schedule created successfully",

            data: schedule
        });

    } catch (err) {

        console.log(
            "❌ CREATE ERROR:",
            err
        );

        return res.status(500).json({

            success: false,

            message:
                "Schedule creation failed",

            error:
                err.message
        });
    }
};

// =========================
// GET ALL SCHEDULES
// =========================
exports.getSchedules = async (req, res) => {

    try {

        const schedules =
            await Schedule.find()
                .sort({
                    createdAt: -1
                });

        console.log(
            "📦 SCHEDULES:",
            schedules.length
        );

        return res.status(200).json({

            success: true,

            data: schedules
        });

    } catch (err) {

        console.log(
            "❌ FETCH ERROR:",
            err
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch schedules",

            error:
                err.message
        });
    }
};

// =========================
// UPDATE SCHEDULE
// =========================
exports.updateSchedule = async (req, res) => {

    try {

        const updated =
            await Schedule.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updated) {

            return res.status(404).json({

                success: false,

                message:
                    "Schedule not found"
            });
        }

        return res.status(200).json({

            success: true,

            message:
                "Schedule updated successfully",

            data: updated
        });

    } catch (err) {

        console.log(
            "❌ UPDATE ERROR:",
            err
        );

        return res.status(500).json({

            success: false,

            message:
                "Schedule update failed",

            error:
                err.message
        });
    }
};

// =========================
// DELETE SCHEDULE
// =========================
exports.deleteSchedule = async (req, res) => {

    try {

        const deleted =
            await Schedule.findByIdAndDelete(
                req.params.id
            );

        if (!deleted) {

            return res.status(404).json({

                success: false,

                message:
                    "Schedule not found"
            });
        }

        return res.status(200).json({

            success: true,

            message:
                "Schedule deleted successfully"
        });

    } catch (err) {

        console.log(
            "❌ DELETE ERROR:",
            err
        );

        return res.status(500).json({

            success: false,

            message:
                "Schedule deletion failed",

            error:
                err.message
        });
    }
};