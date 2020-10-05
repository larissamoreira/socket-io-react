const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyB4XR1PAXgajnXoiAMmpvapKrIq8PCGQsY",
    authDomain: "project-collab-test.firebaseapp.com",
    databaseURL: "https://project-collab-test.firebaseio.com",
    projectId: "project-collab-test",
    storageBucket: "project-collab-test.appspot.com",
    messagingSenderId: "645472201950",
    appId: "1:645472201950:web:1b693c806b2e39e180e64f",
    measurementId: "G-8HLEPGHLVJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
// export default db;

module.exports = {
    auth,
    provider,
    db
}