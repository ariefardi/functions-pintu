const crypto = require('crypto')
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore()

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
            snap.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                data = doc.data()
            });
            if (data)  {

            }
            res.json({
                message: "oke deh",
                data
            })
        })
    return 'something'
};

module.exports = functions.https.onRequest((req, res)=> {
    var corsFn = cors();
    corsFn(req, res, function() {
        login(req, res);
    });
})