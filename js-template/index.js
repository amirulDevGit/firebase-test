import Date from "./date";
import User from "./user";
import Kelas from "./classs";
import Attendance from "./attendance";
import Util from "./util";

async function run() {
      const date = new Date();
      await date.init();

      const user = new User(date.dateNow);
      await user.getUser();

      const classs = new Kelas();
      await classs.setQs(user.qs);
      await classs.getClass(user.qs);

      const util = new Util(date.dateNow);
      await util.setUserCounter(user.userCounter);

      const attendance = new Attendance();
      await attendance.init(user.userCounter, user.qs);

}

run();


//setAttribute("onchange", this.getSelectedClass());