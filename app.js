let sel = document.createElement("select");
kelas.orderBy("class_id").get()
      .then((querySnapshot) => {
            let elSel = document.createTextNode("Please Select");
            let optSel = document.createElement("option");
            optSel.setAttribute("value", "");
            optSel.setAttribute("disabled", "");
            optSel.setAttribute("selected", "");
            optSel.appendChild(elSel);
            sel.appendChild(optSel);
            querySnapshot.forEach((doc) => {
                  let opt = document.createElement("option");
                  let el = document.createTextNode(doc.data().class_name);
                  opt.appendChild(el);
                  opt.setAttribute("value", doc.data().class_id);
                  sel.appendChild(opt);

            })
            sel.setAttribute("name", "classList2");
            sel.classList.add("input");
            document.getElementById("classList").appendChild(sel);
      })
      .catch((error) => {
            console.log(error);
      });
let classList = [
      "Please Select",
]



function toggleModal(val) {
      if (val !== undefined) {
            document.querySelector("#classList2").appendChild(sel);
            document.querySelector("#newStudent").classList.add("is-active");
      }
      else {
            document.getElementsByName("name")[0].value = "";
            document.getElementsByName("classList2")[0].value = "";
            document.querySelector("#classList").appendChild(sel);
            document.querySelector("#newStudent").classList.remove("is-active");
      }

}


function submitForm(e) {
      e.preventDefault();
      let El = document.forms.newStnd;
      let formData = new FormData(El);
      let name = formData.get('name');
      let kelas = formData.get('classList2');
      insertUser(name, kelas)

}
