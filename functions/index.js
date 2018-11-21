const functions = require('firebase-functions');
const admin = require('firebase-admin');
const CONFIG = require("./config/default").admin;
admin.initializeApp({
    credential: admin.credential.cert(require(CONFIG.credential)),
    databaseURL: CONFIG.database_url,
    storageBucket: CONFIG.storage
});

// exports.signup =
//     require(__dirname + "/auth/register.js")

exports.register =
    require(__dirname + "/auth/register.js")

exports.login =
    require(__dirname + "/auth/login.js")


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
