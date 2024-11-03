// Import the functions you need from the SDKs you need
import { initializeApp, getApps  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUbHsFkFAA3cxKZh0oLNk0qrKu-IbK0q4",
  authDomain: "koi-fengshui.firebaseapp.com",
  projectId: "koi-fengshui",
  storageBucket: "koi-fengshui.appspot.com",
  messagingSenderId: "127460409250",
  appId: "1:127460409250:web:db111b8e3f9723e1647cfb",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
// const firestore = getFirestore(app);
export { storage };
