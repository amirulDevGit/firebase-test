import Date from "./date";
import User from "./user";
import Kelas from "./classs";
import Util from "./util";

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