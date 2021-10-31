import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgVODi2HBiVctTBbC2z3FD88ZQboBl8wc",
  authDomain: "note-app-react-native.firebaseapp.com",
  projectId: "note-app-react-native",
  storageBucket: "note-app-react-native.appspot.com",
  messagingSenderId: "169225470080",
  appId: "1:169225470080:web:b7c6516cb0d7f6b4902665",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
