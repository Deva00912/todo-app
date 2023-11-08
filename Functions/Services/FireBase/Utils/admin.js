const admin = require("firebase-admin");

const serviceAccount = require("../../../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const uId = "ecoMOsUnYY40G8MoJh4ZT0MUlMZ6TJw0Ud6NpKr";

admin.auth().createCustomToken(uId);

module.exports = {
  admin,
  db,
};
