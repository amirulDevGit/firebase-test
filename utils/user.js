import { nanoid } from 'nanoid';

class User {
    constructor() {
        this.user = db.collection("User");
        this.attendance = db.collection("Attendance");
        this.qs;
        this.userCounter = 0;
    }
    async getUser() {
            let self = this;
            this.qs = new URLSearchParams(window.location.search);

            let datas = await this.getSDE();
            await this.renderUserList(datas);
            
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
        user.add({
            user_id: nanoid(), // Math.round(new Date().getTime() / 1000 * Math.random(2)),
            class_id: kelas,
            username: name,
        })
            .then(function (docRef) {
                getUser();
                toggleModal();
                console.log("Document written with ID: ", docRef.id);
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
    renderUserList(querySnapshot) {
        let self = this;
        // return new Promise(resolve => {  console.log(1);
        // resolve()});

        return new Promise(resolve => {
            let i = 1;
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
                td1_cb.setAttribute("checked", "false");
                td1_cb.setAttribute("id", "attend_" + i);
                td1_cb.setAttribute("onclick", "addAttendance(" + user_id + "," + class_id + ")");
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
            resolve();
        })
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