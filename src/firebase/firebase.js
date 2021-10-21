import app from 'firebase/app';
import 'firebase/auth';
import 'firebse/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAlOOWa5sjtZVTsTZY2LNp1seUS39PAolg",
    authDomain: "jezishoreke.firebaseapp.com",
    projectId: "jezishoreke",
    storageBucket: "jezishoreke.appspot.com",
    messagingSenderId: "907960119787",
    appId: "1:907960119787:web:22672108d80b98cbb229ae"
  };

  class Firebase {
    constructor(){
      app.initializeApp(firebaseConfig);
      this.storage = app.storage();
      this.db = app.firestore();
      this.auth = app.auth();
    }

    createAccount = (email, password) => this.auth.createUserWithEmailandPassword(email, password);
    signIn = (email, password) => this.auth.signInWithEmailandPassword(email, password);
    signInWithGoogle = () => this.auth.signInWithGoogle(new app.auth.GoogleAuthProvider());
    signOut = () => this.auth.signOut();
  }