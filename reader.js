let user = db.collection("User");
let kelas = db.collection("Class");
let attendance = db.collection("Attendance");
function getUser(){
    user.get()
    .then((querySnapshot) => {
        renderList(querySnapshot);
    })
    .catch((error) => {
        console.log(error);
    });
}

function insertUser(name,kelas) {
    user.add({
        user_id: Math.round(new Date().getTime()/1000*Math.random(2)),
        class_name: kelas,
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

function insertClass(name,kelas) {
    kelas.add({
        class_id: Math.round(new Date().getTime()/1000*Math.random(2)),
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

function insertAttendance(name,kelas) {
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

function renderList(querySnapshot) {
    document.getElementById("list").innerHTML="";
    let i = 1;
    let listNodes;
    querySnapshot.forEach((doc) => {

        let username = doc.data().username;
        let user_id = doc.data().user_id;
        var ntr = document.createElement("tr");

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
}
getUser();
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