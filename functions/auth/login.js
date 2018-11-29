const crypto = require('crypto')
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore()
const jwt = require('jsonwebtoken')
const CONFIG = require('../config/default.json')

const cors = require("cors");
login = (req, res) => {
    // Debug
    console.log(req);
    console.log('ini cloud functions',req.body);
    const username = req.body.username
    const password = req.body.password
    var query = db.collection('admin').where("username", "==", username)
        .get()
        .then((snap)=> {
            let data = ""
            let uid = ""
            snap.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                data = doc.data()
                uid = doc.id
            });
            if (data)  {
                let decipherHash = data.password.split('.')
                let saltHash = decipherHash[1]
                let isPassword = createPassword(password, saltHash)
                let passUser = data.password

                if (isPassword === passUser) {
                    const token = jwt.sign({
                        id: uid,
                        username: username,
                    }, CONFIG.secret_key)
                    res.json({
                        message: "oke deh masuk",
                        data,
                        token: token
                    })
                }
                else {
                    res.json({
                        message: "password salah"
                    })
                }
            }
            else {
                res.json({
                    message: "username salah"
                })
            }
        })
    return 'something'
};

module.exports = functions.https.onRequest((req, res)=> {
    var corsFn = cors();
    corsFn(req, res, function() {
        login(req, res);
    });
})
const createPassword = function(plainText, salt) {
    return crypto.createHmac('sha256', salt)
        .update(plainText)
        .digest('hex') + "." + salt;
};