import { nanoid } from 'nanoid';
import Util from "./util";
import { DateTime } from "luxon";

class User {
    constructor(dt) {
        this.user = db.collection("User");
        this.attendance = db.collection("Attendance");
        this.qs;
        this.userCounter = 0;
        this.dt = dt;
    }
    async getUser() {

        this.qs = new URLSearchParams(window.location.search);

        let datas = await this.getSDE();
        await this.renderUserList(datas, this.dt);

    }

    getSDE() {
        let temp;
        let arg;
        return new Promise(resolve => {
            if (this.qs.has('class')) {
                arg = this.qs.get('class');
                temp = this.user.where("class_id", "==", parseInt(arg)).get();
            }
            else {
                temp = this.user.get();
            }
            temp.then((querySnapshot) => {
                this.userCounter = querySnapshot.size;
                return resolve(querySnapshot);
            })
                .catch((error) => {
                    console.log(error);
                })
        });
    }
    insertUser(name, kelas) {
        let self = this;
        db.collection("User").add({
            user_id: nanoid(), // Math.round(new Date().getTime() / 1000 * Math.random(2)),
            class_id: kelas,
            username: name,
        })
            .then(function (docRef) {
                self.getUser();
                Util.toggleModal();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    insertAttendance(name, kelas) {
        attendance.add({
            class_id: "",
            user_id: "",
            date: firebase.firestore.Timestamp.fromDate(new Date()),
        })
            .then(function (docRef) {
                toggleModal();
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    async renderUserList(querySnapshot, dt) {
        // return new Promise(resolve => {  console.log(1);
        // resolve()});
        let att = await this.getAttandance();
        return new Promise(resolve => {
            let i = 1;
            let attVal = 0;
            querySnapshot.forEach((doc) => {
                let username = doc.data().username;
                let user_id = doc.data().user_id;
                let class_id = doc.data().class_id;
                let ntr = document.createElement("tr");

                // Counter
                let td0 = document.createElement("td");
                let td0_counter = document.createTextNode(i);
                td0.classList.add("has-text-centered");
                td0.appendChild(td0_counter);

                // Username
                let td1 = document.createElement("td");
                let td1_usrname = document.createTextNode(username);
                td1.appendChild(td1_usrname);

                // //ID
                // var td2 = document.createElement("td");
                // var td2_user_id = document.createTextNode(user_id);
                // td2.appendChild(td2_user_id);

                // Checkbox attendance
                let td3 = document.createElement("td");
                let td1_cb = document.createElement("input");
                td1_cb.setAttribute("type", "checkbox");
                att.forEach(el => {
                    // DateTime.fromFormat('13-07-2020','dd-LL-yyyy').toFormat('dd-LL-yyyy')
                    if (el.class_id === class_id && el.user_id === user_id && el.date === this.dt) {
                        attVal++;
                        td1_cb.setAttribute("checked", "false");
                    }
                });

                // Data attribute
                td1_cb.setAttribute("id", "attend_" + i);
                td1_cb.setAttribute("value", user_id);
                // td1_cb.setAttribute("onclick", "addAttendance(" + user_id + "," + class_id + ")");
                td3.classList.add("has-text-centered");
                td3.appendChild(td1_cb);

                // Append all td to tr
                ntr.appendChild(td0);
                ntr.appendChild(td1);
                // ntr.appendChild(td2);
                ntr.appendChild(td3);

                // Append all to single outside loop
                // listNodes += ntr;
                i++;
                document.getElementById("list").append(ntr);
            });
            if (attVal !== 0) {
                document.getElementById("attVal").classList.remove("is-danger");
                document.getElementById("attVal").classList.add("is-success");
                document.getElementById("attVal").textContent = attVal + "/" + querySnapshot.size;
            } else if (attVal === 0) {
                document.getElementById("attVal").textContent = "Attandance not updated";
            }
            resolve();
        })
    }
    getAttandance(date) {
        return new Promise(resolve => {
            let attandance = new Array();
            let getAttandancce = this.attendance.get();
            getAttandancce.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let tempData = {};
                    tempData.user_id = doc.data().user_id;
                    tempData.class_id = doc.data().class_id;
                    tempData.date = DateTime.fromSeconds(doc.data().date.seconds).toFormat('dd-LL-yyyy');
                    attandance.push(tempData);
                });
                return resolve(attandance);
            })
                .catch((error) => {
                    console.log(error);
                })
        });
    }
}

export { User as default };


// let i = 1;
// getUser();
// docRef.doc("class0").get().then(function(doc) {
//     if (doc.exists) {
//         console.log( doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });