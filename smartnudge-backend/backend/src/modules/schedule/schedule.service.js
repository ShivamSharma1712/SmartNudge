const Schedule = require("./schedule.model");

exports.create = async (data) => {

    return await Schedule.create(data);
};

exports.getAll = async () => {

    return await Schedule.find()
        .sort({ createdAt: -1 });
};

exports.update = async (id, data) => {

    return await Schedule.findByIdAndUpdate(

        id,

        data,

        {
            new: true
        }
    );
};

exports.delete = async (id) => {

    return await Schedule.findByIdAndDelete(id);
};