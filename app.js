let classList = [
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
      
      sel.appendChild(opt);
      
})
document.querySelector("#classList").appendChild(sel);
document.querySelector("#classList2").appendChild(sel);