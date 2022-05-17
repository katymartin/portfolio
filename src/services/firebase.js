import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBXr9BmwEQ2ZDtmRFkKZLuWT2g_cLpGcb0",
  authDomain: "k8y-portfolio.firebaseapp.com",
  databaseURL: "https://k8y-portfolio.firebaseio.com",
  projectId: "k8y-portfolio",
  storageBucket: "k8y-portfolio.appspot.com",
  messagingSenderId: "662893594886"
};

firebase.initializeApp(config);

export default firebase;
