var admin = require("firebase-admin");

var serviceAccount = require("../config/ecommercethree-d6684-firebase-adminsdk-34c3u-949148d110.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin
