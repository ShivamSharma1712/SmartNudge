const express =
    require("express");

const router =
    express.Router();

const Schedule =
    require("./schedule.model");

// =========================
// CREATE SCHEDULE
// =========================
router.post(
    "/create",
    async (req, res) => {

        try {

            const {
                priority,
                title,
                steps
            } = req.body;

            const schedule =
                new Schedule({
                    priority,
                    title,
                    steps
                });

            await schedule.save();

            res.status(201).json({
                success: true,
                message:
                    "Schedule Created",
                data: schedule
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    "Failed To Create Schedule"
            });
        }
    }
);

// =========================
// GET ALL SCHEDULES
// =========================
router.get(
    "/all",
    async (req, res) => {

        try {

            const schedules =
                await Schedule.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({
                success: true,
                data: schedules
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    "Failed To Fetch Schedules"
            });
        }
    }
);

// =========================
// UPDATE SCHEDULE
// =========================
router.put(
    "/update/:id",
    async (req, res) => {

        try {

            const updated =
                await Schedule.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true
                    }
                );

            res.status(200).json({
                success: true,
                message:
                    "Schedule Updated",
                data: updated
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    "Update Failed"
            });
        }
    }
);

// =========================
// DELETE SCHEDULE
// =========================
router.delete(
    "/delete/:id",
    async (req, res) => {

        try {

            await Schedule.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Schedule Deleted"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message:
                    "Delete Failed"
            });
        }
    }
);

module.exports = router;