import Date from "../utils/date";
import User from "../utils/user";
import Kelas from "../utils/classs";
import Util from "../utils/util";

async function run() {
      const date = new Date();
      await date.init();

      const user = new User();
      await user.getUser();

      const classs = new Kelas();
      await classs.setQs(user.qs);
      await classs.getClass(user.qs);

      const util = new Util();
      await util.setUserCounter(user.userCounter);

}

run();
//setAttribute("onchange", this.getSelectedClass());