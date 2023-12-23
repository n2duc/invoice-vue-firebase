import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnZ3QMPFtTeAkFmr2cACPDFR5bspA2O5A",
  authDomain: "invoice-vue-44cba.firebaseapp.com",
  projectId: "invoice-vue-44cba",
  storageBucket: "invoice-vue-44cba.appspot.com",
  messagingSenderId: "1098137541100",
  appId: "1:1098137541100:web:413944313dafe81b0208c9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default getFirestore(firebaseApp);