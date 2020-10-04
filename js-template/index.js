  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyDaGW2AlJNbHKXEiA3OP_uxTUDbHkTWLL0",
      authDomain: "testproject-3754e.firebaseapp.com",
      databaseURL: "https://testproject-3754e.firebaseio.com",
      projectId: "testproject-3754e",
      storageBucket: "testproject-3754e.appspot.com",
      messagingSenderId: "1044700701990",
      appId: "1:1044700701990:web:cdfbd9b4b9fbdbdf698de7",
      measurementId: "G-RQ44SV6XVE"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

import Date from "./date";
import User from "./user";
import Kelas from "./classs";
import Attendance from "./attendance";
import Util from "./util";

async function run() {
      const date = new Date();
      await date.init();

      const user = new User(db,date.dateNow);
      await user.getUser(db);

      const classs = new Kelas(db);
      await classs.setQs(user.qs);
      await classs.getClass(user.qs);

      const util = new Util(date.dateNow);
      await util.setUserCounter(user.userCounter);

      const attendance = new Attendance(db);
      await attendance.init(user.userCounter, user.qs);

}

run();


//setAttribute("onchange", this.getSelectedClass());