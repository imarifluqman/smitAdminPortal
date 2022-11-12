import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
const auth = getAuth();

let logoutBtn = document.querySelector("#logoutBtn");

function signOutFun() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      location = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}

logoutBtn.addEventListener("click", signOutFun);


let 

