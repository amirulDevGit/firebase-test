let sel = document.createElement("select");
let sel2 = document.createElement("select");
let gg = db.collection("Test");
// kelas.where("class_id","==",6).orderBy("class_name").get().then((querySnapshot) => {   
//       querySnapshot.forEach((doc) => {
//             console.log(doc.data().class_name)
//       })})
// user.where("user_id","==",1).orderBy("class_id").get()
kelas.orderBy("class_id", "asc").get()
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
                  if(qs.has('class') && parseInt(qs.get('class')) === doc.data().class_id){
                        opt.setAttribute("selected", "");
                  }
                  sel.appendChild(opt);
                  
            })
            sel.setAttribute("name", "classList2");
            sel.setAttribute("onchange", "selectClass()");
            sel.classList.add("input");
            document.getElementById("classList").appendChild(sel);


            let elSel2 = document.createTextNode("Please Select");
            let optSel2 = document.createElement("option");
            optSel2.setAttribute("value", "");
            optSel2.setAttribute("disabled", "");
            optSel2.setAttribute("selected", "");
            optSel2.appendChild(elSel2);
            sel2.appendChild(optSel2);
            querySnapshot.forEach((doc) => {
                  let opt = document.createElement("option");
                  let el = document.createTextNode(doc.data().class_name);
                  opt.appendChild(el);
                  opt.setAttribute("value", doc.data().class_id);
                  if(qs.has('class') && parseInt(qs.get('class')) === doc.data().class_id){
                        opt.setAttribute("selected", "");
                  }
                  sel2.appendChild(opt);
                  
            })
            sel2.setAttribute("name", "classList4");
            sel2.classList.add("input");
            document.getElementById("classList3").appendChild(sel2);
      })
      .catch((error) => {
            console.log(error);
      });


function toggleModal(val) {
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


function submitForm(e) {
      e.preventDefault();
      let El = document.forms.newStnd;
      let formData = new FormData(El);
      let name = formData.get('name');
      let kelas = parseInt(formData.get('classList4'));
      insertUser(name, kelas)

}

function selectClass(val) {
      window.open("firebase.html" + "?class=" + document.getElementById("classList").childNodes[1].value, "_self")
}

function addAttendance (){

}