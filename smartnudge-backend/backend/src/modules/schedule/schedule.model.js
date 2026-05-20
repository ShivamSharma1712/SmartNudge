const mongoose =
    require("mongoose");

const stepSchema =
    new mongoose.Schema({

        date: {
            type: String,
            required: true
        },

        startTime: {
            type: String,
            required: true
        },

        startPeriod: {
            type: String,
            required: true
        },

        endTime: {
            type: String,
            required: true
        },

        endPeriod: {
            type: String,
            required: true
        },

        work: {
            type: String,
            required: true
        }
    });

const scheduleSchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true
        },

        desc: {
            type: String
        },

        event: {
            type: String
        },

        category: {
            type: String
        },

        customCategory: {
            type: String
        },

        priority: {
            type: String,
            default: "Medium"
        },

        startDate: {
            type: Date
        },

        endDate: {
            type: Date
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