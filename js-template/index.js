// import Date from "./date";
import User from "./user";
import Kelas from "./classs";
import Attendance from "./attendance";
import Util from "./util";
import { DateTime } from "luxon";

let dt = DateTime.local().toFormat('dd-LL-yyyy');
// document.getElementById('bulCal').value = "2020-12-12"; // way to display on init
async function run() {
      // const date = new Date();
      // await date.init();

      const user = new User();
      await user.getUser(dt);

      const classs = new Kelas();
      await classs.setQs(user.qs);
      await classs.getClass(user.qs);

      const util = new Util();
      await util.setUserCounter(user.userCounter);

      const attendance = new Attendance();
      await attendance.init(user.userCounter, user.qs);

}
const opt ={
      dateFormat: "dd-mm-yy",
      onSelect : function(){
            alert('hi!');
      },
}
$( function() {
      $( "#datepicker" ).datepicker(opt);
      $( "#datepicker" ).datepicker( "setDate", dt);
      $( "#datepicker" ).datepicker("option", "showAnim", "slideDown");
    } );
run();


//setAttribute("onchange", this.getSelectedClass());