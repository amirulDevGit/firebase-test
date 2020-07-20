// var docRef = db.collection("User").get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} => ${doc.data().username}`);
//         });
//         console.log(docRef);
//     });

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

function insertData(){
    docRef.add({
        class_id: 1,
        class_name: "1 Ibnu Khaldun",
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}