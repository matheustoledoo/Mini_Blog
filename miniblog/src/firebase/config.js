// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" // adicionado a fora
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp-4BJShEPWwxIf_2MUfQ0tvFuysMrt5w",
  authDomain: "miniblog-cd361.firebaseapp.com",
  projectId: "miniblog-cd361",
  storageBucket: "miniblog-cd361.appspot.com",
  messagingSenderId: "994748708663",
  appId: "1:994748708663:web:1beee6d8931a2ebdcb8cb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app) //essa aqui nao vem junto no firebase e vai ser muito utilizado no banco de dados

export {db}