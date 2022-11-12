import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  onSnapshot,
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

  logoutBtn.addEventListener("click", signOutFun);
}

let classDataSave = document.querySelector("#classDataSave");

let classTime = document.querySelector("#classTime");
let scheduleOfClass = document.querySelector("#scheduleOfClass");
let teacherName = document.querySelector("#teacherName");
let sectionName = document.querySelector("#sectionName");
let courseName = document.querySelector("#courseName");
let batch = document.querySelector("#batch");

let stdDataSave = document.querySelector("#stdDataSave");

async function saveDataClass() {
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
    document.querySelector("#saveMsg").innerHTML = "Updated Data";
  } catch (e) {
    console.error("Error adding document: ", e);
    document.querySelector("#saveMsg").innerHTML = e;
  }
  classTime.value = "";
  scheduleOfClass.value = "";
  teacherName.value = "";
  sectionName.value = "";
  courseName.value = "";
  batch.value = "";
}

classDataSave.addEventListener("click", saveDataClass);

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
    document.querySelector("#saveMsg2").innerHTML = "updated Data";
  } catch (e) {
    console.error("Error adding document: ", e);
    document.querySelector("#saveMsg2").innerHTML = e;
  }

  stdName.value = "";
  stdFname.value = "";
  stdroll.value = "";
  stdContact.value = "";
  stdCnic.value = "";
  stdCourse.value = "";
  stdImage.value = "";
}

stdDataSave.addEventListener("click", stdData);

let searchData = document.querySelector("#searchData");
let searchBtn = document.querySelector("#searchBtn");

async function getStdData() {
  const q = query(
    collection(db, "studentDetails"),
    where("cnicNumber", "==", searchData.value)  
  );
  await onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      addClassData.innerHTML = ` <div class="row  d-flex justify-content-center">
      <div class="mb-3 col-sm-5 col-md-6">
          <div class="card" style="width: 28rem;">
              <img src="${doc.data().image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title text-center">${doc.data().name}</h5>
                  <h6 class="card-text text-center">${
                    doc.data().fatherName
                  }</h6>
                  <p class="card-text text-center" text-center>${
                    doc.data().course
                  }</p>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Roll No ${
                    doc.data().rollNumber
                  }</li>
                  <li class="list-group-item">Contact No ${
                    doc.data().contactNumber
                  }</li>
                  <li class="list-group-item">CNIC No ${
                    doc.data().cnicNumber
                  }</li>
              </ul>
              <div class="card-body">
              <div class="mb-3 col-sm-5 col-md-6">
              <label for="attendence" class="form-label">Mark Attendence</label>
              <select class="form-select" id="attendence" aria-label="Default select example">
                  <option selected value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="leave">Leave</option>
              </select>
          </div>
                  <button class="btn btn-outline-success p-1">Attendence</button>
              </div>
          </div>
  
      </div>
  </div>`;
    });
  });
}

searchBtn.addEventListener("click", getStdData);

function editfun(arr) {
  console.log(arr);
}

window.editfun = editfun;
