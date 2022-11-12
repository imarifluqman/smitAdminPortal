import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  addDoc,
  collection,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {
  uploadBytes,
  getDownloadURL,
  ref,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { db, storage } from "./firbaseConfig.js";

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

let classTime = document.querySelector("#classTime");
let scheduleOfClass = document.querySelector("#scheduleOfClass");
let teacherName = document.querySelector("#teacherName");
let sectionName = document.querySelector("#sectionName");
let courseName = document.querySelector("#courseName");
let batch = document.querySelector("#batch");

let dataSave = document.querySelector("#classDataSave");
let stdDataSave = document.querySelector("#stdDataSave");

async function saveDataClass() {
  console.log("clicked");
  try {
    const docRef = await addDoc(collection(db, "classDetails"), {
      classTime: classTime.value,
      scheduleOfClass: scheduleOfClass.value,
      teacherName: teacherName.value,
      sectionName: sectionName.value,
      courseName: courseName.value,
      batch: batch.value,
      date: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

dataSave.addEventListener("click", saveDataClass);

let stdName = document.querySelector("#stdName");
let stdFname = document.querySelector("#stdFname");
let stdroll = document.querySelector("#stdroll");
let stdContact = document.querySelector("#stdContact");
let stdCnic = document.querySelector("#stdCnic");
let stdCourse = document.querySelector("#stdCourse");
let stdImage = document.querySelector("#stdImage");

async function stdData() {
  let file = stdImage.files[0];
  let imageRef = ref(storage, `images/${file.name}`);
  try {
    let uploaded = await uploadBytes(imageRef, file);
    let url = await getDownloadURL(imageRef);

    const docRef = await addDoc(collection(db, "studentDetails"), {
      name: stdName.value,
      fatherName: stdFname.value,
      rollNumber: stdroll.value,
      contactNumber: stdContact.value,
      cnicNumber: stdCnic.value,
      course: stdCourse.value,
      image: url,
      date: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

stdDataSave.addEventListener("click", stdData);
