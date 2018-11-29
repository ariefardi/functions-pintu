const crypto = require('crypto')
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore()

module.exports = functions.firestore
.document('admin{/id}')
.onUpdate((change, context)=> {
    const newValue = change.after.data()
    const temp = newValue
    let id = context.params.id
    let salt = createRandomSalt()
    let password = createPassword(temp.password,salt)
    let editDb = db.collection("admin").doc(id)
        .update({
            username: temp.username,
            password: password
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    return editDb
})


const createRandomSalt = function() {
    return crypto.randomBytes(20).toString('hex');
};
const createPassword = function(plainText, salt) {
    return crypto.createHmac('sha256', salt)
        .update(plainText)
        .digest('hex') + "." + salt;
};