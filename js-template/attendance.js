import { DateTime } from "luxon";

class Attendance {
      constructor(db) {
            this.db = db;
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
            console.log("this.present", this.present.length);
            console.log("this.absent", this.absent.length);
            this.submitAttendance(this.db, this.present.length, this.absent.length);
      }

      async submitAttendance(db, present, absent) {
            await this.removeAbsent(db);
            let duplicate = await this.getDuplicate(db);
            await this.deleteDuplicate(duplicate);
            await this.addAttendanceFirebase(db);
            await this.setMessage(present, absent);
      }

      async getDuplicate(db) {
            return new Promise((resolve, reject) => {
                  // Check if exist then no write to prevent duplicate data
                  // Get duplicates list (compare local present and in Firebase)
                  let dup = new Array(); // list to delete in present so it will not write to the collection Attendance
                  this.present.forEach(el => {
                        let a = db.collection("Attendance")
                              .where('user_id', '==', el[0].user_id)
                              .where('class_id', '==', parseInt(el[1].class_id))
                              .where('date', '==', el[2].date);
                        a.get().then((querySnapshot) => {
                              querySnapshot.forEach((doc) => {
                                    let tempData = {};
                                    tempData.user_id = doc.data().user_id;
                                    tempData.class_id = doc.data().class_id;
                                    tempData.date = doc.data().date.toMillis();
                                    dup.push(tempData);
                              })
                              return resolve(dup);
                        })
                              .catch(function (error) {
                                    console.error("Error adding document: ", error);
                              });
                  })
            })
      }

      async removeAbsent(db) {
            return new Promise((resolve, reject) => {
                  // Perform deletion on absent in Firebase
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
                  return resolve();

            })
      }

      async setMessage(present, absent) {
            return new Promise((resolve, reject) => {
                  if (present.length !== 0) {
                        document.getElementById("attVal").classList.remove("is-danger");
                        document.getElementById("attVal").classList.add("is-success");
                        document.getElementById("attVal").textContent = "Updated: " + present + "/" + (present + absent);
                  } else if (present.length === 0) {
                        document.getElementById("attVal").classList.add("is-danger");
                        document.getElementById("attVal").textContent = "Attandance not updated";
                  }
                  return resolve();
            })
      }

      async addAttendanceFirebase(db) {
            let self = this;
            let echoMessage = function () {
                  console.log("Line 106 val is " + self.present.length);

            }
            return new Promise((resolve, reject) => {
                  // Perform write  
                  console.log("Line 119 val is " + this.present.length);
                  this.present.forEach(el => {
                        db.collection("Attendance").add({
                              user_id: el[0].user_id,
                              class_id: parseInt(el[1].class_id),
                              date: el[2].date,
                        })
                              .then(function (docRef) {
                                    echoMessage();
                              })
                              .catch(function (error) {
                                    console.error("Error adding document: ", error);
                              });
                  })
                  if (this.present.length === 0)
                        echoMessage();
                  return resolve();
            })
      }

      async deleteDuplicate(dup) {
            return new Promise((resolve, reject) => {
                  // Perform deletion on duplicates (found in dup) on local array (this.present)          
                  dup.forEach(el => {
                        // console.log("duplicates ", el);
                        // console.log("this.present ", this.present);
                        // console.log("this.presentaaa ", this.present[0]);
                        let getIndexToBeDeleted = this.present.findIndex(val => {
                              // console.log("el.user_id "+el.user_id + " val[0].user_id " +val[0].user_id);
                              // console.log("parseInt(el.class_id) "+parseInt(el.class_id) + " val[1].class_id " +val[1].class_id);
                              // console.log(" el.date " +el.date + "val[2].date "+ DateTime.fromJSDate(val[2].date).toMillis());
                              return val[0].user_id === el.user_id &&
                                    val[1].class_id === parseInt(el.class_id) &&
                                    DateTime.fromJSDate(val[2].date).toMillis() === el.date
                              // console.log(val[0].user_id);
                        });
                        // console.log(getIndexToBeDeleted);
                        this.present.splice(getIndexToBeDeleted, 1);
                  });
                  // console.log("this. presesent", this.present);
                  return resolve();
            })
      }

}
export { Attendance as default };