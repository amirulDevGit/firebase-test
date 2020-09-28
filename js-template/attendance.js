class Attendance {
      constructor() {
            this.user = new Array();
            this.present = new Array();
            this.absent = new Array();
      }

      async init(userCounter, class_id) {
            return new Promise(resolve => {
                  for (let i = 1; i <= userCounter; i++) {

                        let sel = document.getElementById("attend_" + i);
                        sel.addEventListener("click", (e) => this.addAttendance(e, class_id));
                  }
                  document.getElementById('kemaskini').addEventListener("click", (e) => this.submitAttendance());
                  resolve();
            })
      }

      addAttendance(e, class_id) {
            if (document.getElementById(e.target.id).checked === true) {
                  this.present.push([
                        { user_id: parseInt(e.target.value) },
                        { class_id: parseInt(class_id.get('class')) },
                        { date: $("#datepicker").datepicker("getDate") },
                  ]);
                  let getIndexToBeDeleted = this.absent.findIndex(obj => obj.user_id === e.target.value);
                  this.absent.splice(getIndexToBeDeleted, 1);
                  // this.user.push([
                  //       { user_id: parseInt(e.target.value) },
                  //       { class_id: parseInt(class_id.get('class')) },
                  //       { date: $("#datepicker").datepicker("getDate") },
                  // ]);
                  console.log('CHECKED');
                  console.log('present');
                  console.log(this.present);
                  console.log('absent');
                  console.log(this.absent);
            } else if (document.getElementById(e.target.id).checked === false) {
                  this.absent.push([
                        { user_id: parseInt(e.target.value) },
                        { class_id: parseInt(class_id.get('class')) },
                        { date: $("#datepicker").datepicker("getDate") },
                  ]);
                  let getIndexToBeDeleted = this.present.findIndex(obj => obj.user_id === e.target.value);
                  this.present.splice(getIndexToBeDeleted, 1);
                  // let getIndexToBeDeleted = this.user.findIndex(obj => obj.user_id === e.target.value);
                  // this.user.splice(getIndexToBeDeleted, 1);
                  // console.log(this.user);
                  console.log('NOTT');
                  console.log('present');
                  console.log(this.present);
                  console.log('absent');
                  console.log(this.absent);
            }
      }

      deleteAttendance(e) {
            let getIndexToBeDeleted = this.user.findIndex(obj => obj.user_id === e.target.value);
            this.user.splice(getIndexToBeDeleted, 1);

      }
      submitAttendance() {
            db.collection('Attendance').where('job_id', '==', post.job_id); // idk. just left here
            this.user.forEach(el => {
                  db.collection("Attendance").add({
                        user_id: parseInt(el[0].user_id),
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
      }

}
export { Attendance as default };