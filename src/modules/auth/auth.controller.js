const authService = require("./auth.service");
const User = require("./auth.model");

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const data = await authService.signup(req.body);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const data = await authService.login(req.body.email, req.body.password);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 🔥 GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔥 UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};