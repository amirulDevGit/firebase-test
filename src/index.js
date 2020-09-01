import Date from "../utils/date";
import User from "../utils/user";
import Kelas from "../utils/classs";
import Util from "../utils/util";

const date = new Date();
date.init();

const user = new User();
user.getUser();

const classs = new Kelas();
classs.setQs(user.qs);
classs.getClass(user.qs);



let classSelectChanged = document.getElementById("classList");
classSelectChanged.addEventListener("change", () => window.open("firebase.html" + "?class=" + document.getElementById("classList").childNodes[1].value, "_self"));

let addStudentModal = document.getElementById("addStudentToggler"), 
bgStudentModal = document.getElementById("bgStudentModal"), 
ariaCloseStudentModal = document.getElementById("ariaCloseStudentModal"), 
cancelStudentModal = document.getElementById("cancelStudentModal");

addStudentModal.addEventListener("click", () =>  document.querySelector("#newStudent").classList.add("is-active") );

bgStudentModal.addEventListener("click", () => { 
      document.getElementsByClassName("input");
      document.getElementsByName("classList4")[0].value = "";
      document.querySelector("#newStudent").classList.remove("is-active");
});
ariaCloseStudentModal.addEventListener("click", () => { 
      document.getElementsByClassName("input");
      document.getElementsByName("classList4")[0].value = "";
      document.querySelector("#newStudent").classList.remove("is-active");
});

cancelStudentModal.addEventListener("click", () => { 
      document.getElementsByClassName("input");
      document.getElementsByName("classList4")[0].value = "";
      document.querySelector("#newStudent").classList.remove("is-active");
});
//setAttribute("onchange", this.getSelectedClass());