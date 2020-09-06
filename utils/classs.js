class Kelas {
      constructor() {
            this.kelass = db.collection("Class");
            this.qsUser;
      }
      insertClass(name, kelas) {
            //Math.round(new Date().getTime()/1000*Math.random(2))
            kelas.add({
                  class_id: Number(new Date()),
                  class_name: kelas,
            })
                  .then(function (docRef) {
                        toggleModal();
                        console.log("Document written with ID: ", docRef.id);
                  })
                  .catch(function (error) {
                        console.error("Error adding document: ", error);
                  });
      }
      async getClass(args) {
            return new Promise((resolve, reject) => {
            let sel = document.createElement("select");
            let sel2 = document.createElement("select");
            this.kelass.orderBy("class_id", "asc").get()
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
                              if (args.has('class') && parseInt(args.get('class')) === doc.data().class_id) {
                                    opt.setAttribute("selected", "");
                              }
                              sel.appendChild(opt);

                        })
                        sel.setAttribute("name", "classList2");
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
                              if (this.qs.has('class') && parseInt(this.qs.get('class')) === doc.data().class_id) {
                                    opt.setAttribute("selected", "");
                              }
                              sel2.appendChild(opt);

                        })
                        sel2.setAttribute("name", "classList4");
                        sel2.classList.add("input");
                        document.getElementById("classList3").appendChild(sel2);
                        resolve();
                  })
                  .catch((error) => {
                        console.log(error);
                  });
            });
      }
      async setQs(qs){
            return new Promise((resolve, reject) => {
                  this.qs = qs;
                  resolve();
            });
      }
}
export { Kelas as default };