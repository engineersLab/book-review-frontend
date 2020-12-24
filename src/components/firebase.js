import firebase from 'firebase/app'
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyDfnHkBH1W7UNJ33zqGqs6DTIjbJHnh4aA",
    authDomain: "book-review-application.firebaseapp.com",
    projectId: "book-review-application",
    storageBucket: "book-review-application.appspot.com",
    messagingSenderId: "1082583756104",
    appId: "1:1082583756104:web:2faf269eb328129499177d"

  };
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage()

export {storage, firebase as default}