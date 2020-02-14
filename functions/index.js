const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create-user');
const serviceAccount = require('./service-account.json');
const requestOneTimePassword = require('./request-one-time-password');
const verifyPassword = require('./verify-password');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-b1f2e.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser)
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword)
exports.verifyPassword = functions.https.onRequest(verifyPassword)