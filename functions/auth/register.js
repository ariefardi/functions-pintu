const crypto = require('crypto')
const secretKey = require(__dirname + "/../config/default.json").secret_key;
// ini asli
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore()

module.exports = functions.firestore
    .document('admin/{id}')
    .onCreate((snap, context) => {
        const temp = snap.data()
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

// ini change Change {
//     before:
//         QueryDocumentSnapshot {
//         _ref:
//             DocumentReference {
//             _firestore: [Object],
//                 _validator: [Object],
//                 _referencePath: [Object] },
//         _fieldsProto: { password: [Object], username: [Object] },
//         _serializer:
//             Serializer {
//             timestampsInSnapshotsEnabled: true,
//                 createReference: [Function] },
//         _validator:
//             Validator {
//             isFunction: [Function],
//                 isOptionalFunction: [Function],
//                 isInteger: [Function],
//                 isOptionalInteger: [Function],
//                 isNumber: [Function],
//                 isOptionalNumber: [Function],
//                 isObject: [Function],
//                 isOptionalObject: [Function],
//                 isString: [Function],
//                 isOptionalString: [Function],
//                 isBoolean: [Function],
//                 isOptionalBoolean: [Function],
//                 isArrayElement: [Function],
//                 isOptionalArrayElement: [Function],
//                 isDeletePrecondition: [Function],
//                 isOptionalDeletePrecondition: [Function],
//                 isDocument: [Function],
//                 isOptionalDocument: [Function],
//                 isDocumentReference: [Function],
//                 isOptionalDocumentReference: [Function],
//                 isFieldPath: [Function],
//                 isOptionalFieldPath: [Function],
//                 isFieldValue: [Function],
//                 isOptionalFieldValue: [Function],
//                 isFieldOrder: [Function],
//                 isOptionalFieldOrder: [Function],
//                 isQueryComparison: [Function],
//                 isOptionalQueryComparison: [Function],
//                 isQueryValue: [Function],
//                 isOptionalQueryValue: [Function],
//                 isResourcePath: [Function],
//                 isOptionalResourcePath: [Function],
//                 isSetOptions: [Function],
//                 isOptionalSetOptions: [Function],
//                 isUpdateMap: [Function],
//                 isOptionalUpdateMap: [Function],
//                 isUpdatePrecondition: [Function],
//                 isOptionalUpdatePrecondition: [Function] },
//         _readTime: undefined,
//             _createTime: Timestamp { _seconds: 1542788365, _nanoseconds: 850173000 },
//         _updateTime: Timestamp { _seconds: 1542790641, _nanoseconds: 628687000 } },
//     after:
//         QueryDocumentSnapshot {
//         _ref:
//             DocumentReference {
//             _firestore: [Object],
//                 _validator: [Object],
//                 _referencePath: [Object] },
//         _fieldsProto: { password: [Object], username: [Object] },
//         _serializer:
//             Serializer {
//             timestampsInSnapshotsEnabled: true,
//                 createReference: [Function] },
//         _validator:
//             Validator {
//             isFunction: [Function],
//                 isOptionalFunction: [Function],
//                 isInteger: [Function],
//                 isOptionalInteger: [Function],
//                 isNumber: [Function],
//                 isOptionalNumber: [Function],
//                 isObject: [Function],
//                 isOptionalObject: [Function],
//                 isString: [Function],
//                 isOptionalString: [Function],
//                 isBoolean: [Function],
//                 isOptionalBoolean: [Function],
//                 isArrayElement: [Function],
//                 isOptionalArrayElement: [Function],
//                 isDeletePrecondition: [Function],
//                 isOptionalDeletePrecondition: [Function],
//                 isDocument: [Function],
//                 isOptionalDocument: [Function],
//                 isDocumentReference: [Function],
//                 isOptionalDocumentReference: [Function],
//                 isFieldPath: [Function],
//                 isOptionalFieldPath: [Function],
//                 isFieldValue: [Function],
//                 isOptionalFieldValue: [Function],
//                 isFieldOrder: [Function],
//                 isOptionalFieldOrder: [Function],
//                 isQueryComparison: [Function],
//                 isOptionalQueryComparison: [Function],
//                 isQueryValue: [Function],
//                 isOptionalQueryValue: [Function],
//                 isResourcePath: [Function],
//                 isOptionalResourcePath: [Function],
//                 isSetOptions: [Function],
//                 isOptionalSetOptions: [Function],
//                 isUpdateMap: [Function],
//                 isOptionalUpdateMap: [Function],
//                 isUpdatePrecondition: [Function],
//                 isOptionalUpdatePrecondition: [Function] },
//         _readTime: undefined,
//             _createTime: Timestamp { _seconds: 1542788365, _nanoseconds: 850173000 },
//         _updateTime: Timestamp { _seconds: 1542790641, _nanoseconds: 628687000 } } }
