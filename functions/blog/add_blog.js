
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore()
const jwt = require('jsonwebtoken')
const CONFIG = require('../config/default.json')

module.exports = functions.firestore
.document('blogs/{id}')
.onCreate((snap, context)=> {
    const temp = snap.data()
    const id = context.params.id
    let tempToken = temp.author
    tempToken = tempToken.split('/')
    let token = tempToken[2]
    console.log("ini token", token)
    let decoded = jwt.verify(token, CONFIG.secret_key)
    console.log("ini decoded",decoded)
    db.collection('blogs').doc(id)
        .update({
            author: `/admin/${decoded.id}`
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    return "something"
})