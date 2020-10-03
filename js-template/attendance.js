class Attendance {
      constructor() {
            this.user = new Array();
            this.present = new Array();
            this.absent = new Array();
            this.userCounter;
      }

      async init(userCounter, class_id) {
            this.userCounter = userCounter;
            return new Promise(resolve => {
                  document.getElementById('kemaskini').addEventListener("click", (e) => this.addAttendance(class_id));
                  resolve();
            })
      }

      addAttendance(class_id) {
            this.present.splice(0, this.present.length);
            this.absent.splice(0, this.absent.length);
            for (let k = 1; k <= this.userCounter; k++) {
                  if (document.getElementById("attend_" + k).checked === true) {
                        this.present.push([
                              { user_id: document.getElementById("attend_" + k).value },
                              { class_id: parseInt(class_id.get('class')) },
                              { date: $("#datepicker").datepicker("getDate") },
                        ]);
                        // let getIndexToBeDeleted = this.absent.findIndex(obj => obj.user_id === document.getElementById("attend_" + k).value);
                        // this.absent.splice(getIndexToBeDeleted, 1);
                  } else if (document.getElementById("attend_" + k).checked === false) {
                        this.absent.push([
                              { user_id: document.getElementById("attend_" + k).value },
                              { class_id: parseInt(class_id.get('class')) },
                              { date: $("#datepicker").datepicker("getDate") },
                        ]);
                        // let getIndexToBeDeleted = this.present.findIndex(obj => obj.user_id === document.getElementById("attend_" + k).value);
                        // this.present.splice(getIndexToBeDeleted, 1);
                  }
                  // let getIndexToBeDeleted = this.user.findIndex(obj => obj.user_id === e.target.value);
                  // this.user.splice(getIndexToBeDeleted, 1);
            }
            // console.log(this.present);
            this.submitAttendance();
      }

      submitAttendance() {
            // Perform deletion on absent
            this.absent.forEach(element => {
                  let absentt = db.collection('Attendance')
                        .where('user_id', '==', element[0].user_id)
                        .where('class_id', '==', parseInt(element[1].class_id))
                        .where('date', '==', element[2].date);
                  absentt.get().then(function (querySnapshot) {
                        querySnapshot.forEach(function (docRef) {
                              docRef.ref.delete();
                        });
                  });
            });

            // Perform write         
            this.present.forEach(el => {
                  db.collection("Attendance").add({
                        user_id: el[0].user_id,
                        class_id: parseInt(el[1].class_id),
                        date: el[2].date,
                  })
                        .then(function (docRef) {
                              console.log("Document written with ID: ", docRef.id);
                        })
                        .catch(function (error) {
                              console.error("Error adding document: ", error);
                        });
            })
            if (this.present.length !== 0) {
                  document.getElementById("attVal").classList.remove("is-danger");
                  document.getElementById("attVal").classList.add("is-success");
                  document.getElementById("attVal").textContent = "Updated: " + this.present.length + "/" + (this.present.length + this.absent.length);
            } else if (this.present.length === 0) {
                  document.getElementById("attVal").textContent = "Attandance not updated";
            }
      }

}
export { Attendance as default };