import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");
let loginBtn = document.querySelector("#loginBtn");

let auth = getAuth();

const adminLogin = () => {
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      location = "classDetail.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
loginBtn.addEventListener("click", adminLogin);
