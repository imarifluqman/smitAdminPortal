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
}

let addClassData = document.querySelector("#addClassData");
let addStdData = document.querySelector("#addStdData");

let stdboxShow = document.querySelector("#stdboxShow");

let classboxShow = document.querySelector("#classboxShow");

function showClassBox() {
  addClassData.innerHTML = `<form class="row">
  <div class="mb-3">
      <h2 class="form-label text-center"> Add Class Details</h2>
  </div>

  <div class="mb-3 col-sm-5 col-md-6">
      <label for="classTime" class="form-label">Select Time</label>
      <select class="form-select" id="classTime" aria-label="Default select example">
          <option selected>select Class Time</option>
          <option value="morning">Morning</option>
          <option value="afterNoon">After Noon</option>
          <option value="evening">Evening</option>
      </select>
  </div>
  <div class="mb-3 col-sm-5 col-md-6">
      <label for="scheduleOfClass" class="form-label">Schedule of class</label>
      <select class="form-select" id="scheduleOfClass" aria-label="Default select example">
          <option selected>Schedule of class</option>
          <option value="mwf">Mon Wed Fri</option>
          <option value="tts">Tue Thu Sat</option>
          <option value="sunday">Sunday</option>
      </select>
  </div>
  <div class="mb-3 col-sm-5 col-md-6">
      <label for="teacherName" class="form-label">Teacher's Name</label>
      <select class="form-select" id="teacherName" aria-label="Default select example">
          <option selected>select Teacher Name</option>
          <option value="haiderAli">Sir Haider Ali</option>
          <option value="ghouseAhmed">Sir Ghouse Ahmed</option>
          <option value="inzamamMalik">Sir Inzamam Malik</option>
      </select>
  </div>
  <div class="mb-3 col-sm-5 col-md-6">
      <label for="sectionName" class="form-label">Section Name</label>
      <select class="form-select" id="sectionName" aria-label="Default select example">
          <option selected>select Section</option>
          <option value="morning">A (9am to 11am)</option>
          <option value="afterNoon">B (12pm to 2pm)</option>
          <option value="evening">C (4pm to 6pm)</option>
      </select>
  </div>
  <div class="mb-3 col-sm-5 col-md-6">
      <label for="courseName" class="form-label">Course Name</label>
      <select class="form-select" id="courseName" aria-label="Default select example">
          <option selected>select Course</option>
          <option value="webAndApp">Web and App Development</option>
          <option value="graphicDesign">Graphic Design</option>
          <option value="cco">CCo</option>
      </select>
  </div>
  <div class="mb-3 col-sm-5 col-md-6">
      <label for="batch" class="form-label">Batch Number</label>
      <select class="form-select" id="batch" aria-label="Default select example">
          <option selected>select Batch</option>
          <option value="9">9</option>
          <option value="10">10</option>
      </select>
  </div>
  <div class="mt-3 col-sm-12 col-md-12 d-flex justify-content-center">
      <button type="button" class="btn btn-primary" id="classDataSave">Submit</button>
  </div>
  <div class="mt-3 col-sm-12 col-md-12 d-flex justify-content-center" id="saveMsg"></div>
</form>`;
}
classboxShow.addEventListener("click", showClassBox);

function showstudentbox() {
  addClassData.innerHTML = `  <form class="row">
    <div class="mb-3">
        <h2 class="form-label text-center"> Add Student Details</h2>
    </div>

    <div class="mb-3 col-sm-5 col-md-6">
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="stdName" placeholder="Name">
            <label for="floatingInput">Name</label>
        </div>
    </div>
    <div class="mb-3 col-sm-5 col-md-6">
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="stdFname" placeholder="Father Name">
            <label for="floatingInput">Father Name</label>
        </div>
    </div>
    <div class="mb-3 col-sm-5 col-md-6">
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="stdroll" placeholder="Roll number">
            <label for="floatingInput">Roll Number</label>
        </div>
    </div>

    <div class="mb-3 col-sm-5 col-md-6">
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="stdContact" placeholder="Contact number">
            <label for="floatingInput">Contact Number</label>
        </div>
    </div>
    <div class="mb-3 col-sm-5 col-md-6">
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="stdCnic" placeholder="CNIC number">
            <label for="floatingInput">CNIC Number</label>
        </div>
    </div>
    <div class="form-floating mb-3 col-sm-5 col-md-6">
        <select class="form-select" id="stdCourse" aria-label="Floating label select example">
            <option selected>select Course</option>
            <option value="Web and App Development">Web and App Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="CCO">CCO</option>
        </select>
        <label for="floatingSelect">Course Name</label>
    </div>
    <div class="col-sm-5 col-md-6 mb-3">
        <label for="formFileLg" class="form-label">Picture</label>
        <input class="form-control form-control-lg" id="stdImage" type="file">
    </div>
    <div class="form-floating mb-3 col-sm-5 col-md-6">
        <select class="form-select" id="teacherAssign" aria-label="Floating label select example">
            <option selected>select Teacher Name</option>
            <option value="haiderAli">Sir Haider Ali</option>
            <option value="ghouseAhmed">Sir Ghouse Ahmed</option>
            <option value="inzamamMalik">Sir Inzamam Malik</option>
        </select>
        <label for="floatingSelect">Teacher Assign</label>
    </div>


    <div class="mt-3 col-sm-12 col-md-12 d-flex justify-content-center">
        <button type="button" class="btn btn-primary" id="stdDataSave">Submit</button>
    </div>
    <div class="mt-3 col-sm-12 col-md-12 d-flex justify-content-center" id="saveMsg2"></div>

</form>`;
}

stdboxShow.addEventListener("click", showstudentbox);

logoutBtn.addEventListener("click", signOutFun);

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

let dataSave = document.querySelector("#addClassData");
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

dataSave.addEventListener("click", stdData);

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
                  <button class="btn btn-outline-success p-1" onClick="editfun('${
                    doc.id
                  }')">Edit</button>
                  <button class="btn btn-outline-success p-1">Delete</button>
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
