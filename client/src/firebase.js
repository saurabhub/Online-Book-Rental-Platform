import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// markshark002@gmail.com
const firebaseConfig = {
  apiKey: "AIzaSyAEjJPl0eASVeLNJ51b6vB2iH2K61FJLQw",
  authDomain: "ecommercethree-d6684.firebaseapp.com",
  projectId: "ecommercethree-d6684",
  storageBucket: "ecommercethree-d6684.appspot.com",
  messagingSenderId: "720891011758",
  appId: "1:720891011758:web:89a97e57be3a7aed43c33f",
  measurementId: "G-XYQCT4JGQN"
};

// ! saurav999bsr@gmail.com
// const firebaseConfig = {
//   apiKey: "AIzaSyAu_FgcyfMhpMp3-XUU3f0aZDog9AV4m18",
//   authDomain: "ecommerce-9bc48.firebaseapp.com",
//   projectId: "ecommerce-9bc48",
//   storageBucket: "ecommerce-9bc48.appspot.com",
//   messagingSenderId: "875902714320",
//   appId: "1:875902714320:web:05052581882358e1d079d5",
//   measurementId: "G-ER0PE2JBSG"
// };

// ! saurabh.2024csit1161@kiet.edu
// const firebaseConfig = {
//   apiKey: "AIzaSyBey6O_ptBjQDn0tdQJtMVDM3qpabCGPLc",
//   authDomain: "ecommercetwo-6d255.firebaseapp.com",
//   projectId: "ecommercetwo-6d255",
//   storageBucket: "ecommercetwo-6d255.appspot.com",
//   messagingSenderId: "864408390293",
//   appId: "1:864408390293:web:ef9e6d086c0b7dfdb9699c",
//   measurementId: "G-XHT7R8E7TT"
// };

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
