const mongoose =
    require("mongoose");

const stepSchema =
    new mongoose.Schema({

        date: {
            type: String,
            required: true
        },

        fromTime: {
            type: String,
            required: true
        },

        fromPeriod: {
            type: String,
            enum: ["AM", "PM"],
            required: true
        },

        toTime: {
            type: String,
            required: true
        },

        toPeriod: {
            type: String,
            enum: ["AM", "PM"],
            required: true
        },

        description: {
            type: String,
            required: true
        }
    });

const scheduleSchema =
    new mongoose.Schema({

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High"
            ],
            default: "Low"
        },

        title: {
            type: String,
            required: true
        },

        steps: [stepSchema]

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Schedule",
        scheduleSchema
    );