// const express = require('express');
// const router = express.Router();
// const oauth2Client = require('../../config/google');
// const { google } = require('googleapis');
// const User = require('../auth/auth.model');
// const jwt = require("jsonwebtoken");
// const { secret } = require("../../config/jwt");
// const googleController = require('./google.controller');

// // ================= LOGIN =================
// router.get('/login', (req, res) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         prompt: 'consent',
//         scope: [
//             'https://www.googleapis.com/auth/gmail.readonly',
//             'https://www.googleapis.com/auth/userinfo.profile',
//             'https://www.googleapis.com/auth/userinfo.email'
//         ],
//     });

//     res.redirect(url);
// });

// // ================= CALLBACK =================
// router.get('/callback', async (req, res) => {
//     try {
//         const { code } = req.query;

//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);

//         const oauth2 = google.oauth2({
//             auth: oauth2Client,
//             version: 'v2'
//         });

//         const { data } = await oauth2.userinfo.get();

//         let user = await User.findOne({ email: data.email });

//         if (!user) {
//             user = new User({
//                 name: data.name,
//                 email: data.email,
//                 profileImage: data.picture
//             });
//         }

//         user.googleAccessToken = tokens.access_token;

//         if (tokens.refresh_token) {
//             user.googleRefreshToken = tokens.refresh_token;
//         }

//         await user.save();

//         console.log("✅ USER SAVED:", user.email);

//         // =========================
//         // 🔥 AUTO FETCH EMAILS HERE
//         // =========================
//         console.log("🚀 AUTO FETCH STARTED");

//         try {
//             await googleController.fetchAndProcessEmails({
//                 user: { id: user._id }
//             }, {
//                 json: () => { } // dummy response
//             });
//         } catch (err) {
//             console.log("⚠️ AUTO FETCH FAILED:", err.message);
//         }

//         // =========================
//         // 🔥 TOKEN GENERATION
//         // =========================
//         const token = jwt.sign(
//             { id: user._id },
//             secret,
//             { expiresIn: "7d" }
//         );

//         console.log("🎯 LOGIN SUCCESS → REDIRECT");

//         res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);

//     } catch (err) {
//         console.error("❌ CALLBACK ERROR:", err);
//         res.status(500).send(err.message);
//     }
// });

// // ================= MANUAL FETCH =================
// router.get('/fetch', async (req, res) => {
//     try {
//         await googleController.fetchAndProcessEmails(req, res);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

// ===============================
// FILE: src/modules/google/google.routes.js
// FULL UPDATED VERSION
// ===============================

const express = require("express");
const router = express.Router();

const oauth2Client = require("../../config/google");
const { google } = require("googleapis");

const User = require("../auth/auth.model");

const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwt");

const googleController = require("./google.controller");

// 🔥 ADD YOUR AUTH MIDDLEWARE
// If your file name differs, adjust path
const authMiddleware =
require("../../middleware/auth.middleware");

// ================= LOGIN =================
router.get("/login", (req, res) => {
    try {
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/gmail.readonly",
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ]
        });

        console.log("🚀 GOOGLE LOGIN URL GENERATED");

        return res.redirect(url);

    } catch (err) {
        console.error("❌ GOOGLE LOGIN ERROR:", err.message);
        return res.status(500).send("Google login failed");
    }
});

// ================= CALLBACK =================
router.get("/callback", async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).send("Authorization code missing");
        }

        // 🔥 GET TOKENS
        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        // 🔥 GET USER INFO
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2"
        });

        const { data } = await oauth2.userinfo.get();

        if (!data?.email) {
            return res.status(400).send("Google user email not found");
        }

        // 🔥 FIND OR CREATE USER
        let user = await User.findOne({
            email: data.email
        });

        if (!user) {
            user = new User({
                name: data.name,
                email: data.email,
                profileImage: data.picture
            });
        }

        // 🔥 SAVE TOKENS
        user.googleAccessToken = tokens.access_token;

        if (tokens.refresh_token) {
            user.googleRefreshToken = tokens.refresh_token;
        }

        await user.save();

        console.log("✅ USER SAVED:", user.email);

        // =========================
        // 🔥 AUTO FETCH EMAILS
        // =========================
        try {
            console.log("🚀 AUTO FETCH STARTED");

            await googleController.fetchAndProcessEmails(
                {
                    user: { id: user._id }
                },
                {
                    json: () => {},
                    status: () => ({
                        json: () => {}
                    })
                }
            );

        } catch (err) {
            console.log("⚠️ AUTO FETCH FAILED:", err.message);
        }

        // =========================
        // 🔥 APP TOKEN
        // =========================
        const token = jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: "7d" }
        );

        console.log("🎯 LOGIN SUCCESS → REDIRECT");

        // 🔥 CRITICAL FIX:
        // NO EXTRA SLASH BEFORE ?token
        return res.redirect(
            `${process.env.CLIENT_URL}?token=${token}`
        );

    } catch (err) {
        console.error("❌ CALLBACK ERROR:", err);
        return res.status(500).send(err.message);
    }
});

// ================= MANUAL FETCH =================
router.get(
    "/fetch",
    authMiddleware,
    async (req, res) => {
        try {
            await googleController.fetchAndProcessEmails(
                req,
                res
            );

        } catch (err) {
            console.error("❌ FETCH ERROR:", err.message);

            return res.status(500).json({
                error: err.message
            });
        }
    }
);

module.exports = router;