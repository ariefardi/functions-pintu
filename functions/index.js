const functions = require('firebase-functions');
const admin = require('firebase-admin');
const CONFIG = require("./config/default").admin;
const settings = {/* your settings... */ timestampsInSnapshots: true};
admin.initializeApp({
    credential: admin.credential.cert(require(CONFIG.credential)),
    databaseURL: CONFIG.database_url,
    storageBucket: CONFIG.storage,
    serviceAccountId: CONFIG.serviceAccountId,
    settings
});



// exports.signup =
//     require(__dirname + "/auth/register.js")

exports.register =
    require(__dirname + "/auth/register.js")

exports.login =
    require(__dirname + "/auth/login.js")


exports.add_blog =
    require(__dirname + "/blog/add_blog")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
