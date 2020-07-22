let classList = [
      "Please Select",
      "1 IA",
      "1 IK",
      "2 IR",
      "2 IM",
      "3 IU",
      "3 IM",
      "4 IK",
      "4 IQ",
      "5 IS",
      "5 IT",
]

let sel = document.createElement("select");
classList.forEach((element)=>{
      let opt = document.createElement("option");
      let el = document.createTextNode(element);
      opt.appendChild(el);
      opt.setAttribute("value",element);

      if(element === "Please Select"){
            opt.setAttribute("value","");
            opt.setAttribute("disabled","");
            opt.setAttribute("selected","");
      }
      sel.appendChild(opt);
      
})
sel.setAttribute("name", "classList2");
sel.classList.add("input");
document.getElementById("classList").appendChild(sel);

function toggleModal(val) {
      if(val !== undefined){
            document.querySelector("#classList2").appendChild(sel);
            document.querySelector("#newStudent").classList.add("is-active");      
      }
      else{
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
      insertUser(name,kelas)

}
