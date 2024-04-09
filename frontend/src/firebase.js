import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDaj61pLgHdWpMB5WfPlhpoFxc8oUCPFQ4",
    authDomain: "takwirtiimages.firebaseapp.com",
    projectId: "takwirtiimages",
    storageBucket: "takwirtiimages.appspot.com",
    messagingSenderId: "340014841187",
    appId: "1:340014841187:web:66a76d6c287a091448e756"
  };

  //yekmel lupdate terrain / user , nraka7 limage upload

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);