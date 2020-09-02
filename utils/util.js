class Util {
      constructor() {
            let classSelectChanged = document.getElementById("classList");
            classSelectChanged.addEventListener("change", () => window.open("firebase.html" + "?class=" + document.getElementById("classList").childNodes[1].value, "_self"));

            let addStudentModal = document.getElementById("addStudentToggler"),
                  bgStudentModal = document.getElementById("bgStudentModal"),
                  ariaCloseStudentModal = document.getElementById("ariaCloseStudentModal"),
                  cancelStudentModal = document.getElementById("cancelStudentModal");

            addStudentModal.addEventListener("click", () => document.querySelector("#newStudent").classList.add("is-active"));

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
            // this.sel = document.createElement("select");
            // this.sel2 = document.createElement("select");
            // this.attandanceList = [];
      }
      toggleModal(val) {
            if (val !== undefined) {
                  // document.querySelector("#classList2").appendChild(sel);
                  document.querySelector("#newStudent").classList.add("is-active");
            }
            else {
                  document.getElementsByClassName("input")
                  document.getElementsByName("classList4")[0].value = "";
                  document.querySelector("#classList").appendChild(sel);
                  document.querySelector("#newStudent").classList.remove("is-active");
            }

      }
      submitForm(e) {
            e.preventDefault();
            let El = document.forms.newStnd;
            let formData = new FormData(El);
            let name = formData.get('name');
            let kelas = parseInt(formData.get('classList4'));
            insertUser(name, kelas)

      }
      selectClass(val) {
            window.open("firebase.html" + "?class=" + document.getElementById("classList").childNodes[1].value, "_self")
      }
      checkAllAttandance() {
            for (let count = 1; count < i + 1; count++) {
                  if (document.getElementById("attend_" + count) !== null && document.getElementById("attend_" + count).checked == false) {
                        document.getElementById("attend_" + count).checked = true;
                  }
                  else if (document.getElementById("attend_" + count) !== null && document.getElementById("attend_" + count).checked == true) {
                        document.getElementById("attend_" + count).checked = false;
                  }
            }
      }
}
export { Util as default };
// kelas.where("class_id","==",6).orderBy("class_name").get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//             console.log(doc.data().class_name)
//       })})
// user.where("user_id","==",1).orderBy("class_id").get()