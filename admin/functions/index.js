var admin = require("firebase-admin");

var serviceAccount = require("./private-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-app-auth-78a32.firebaseio.com"
});