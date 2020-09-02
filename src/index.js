import Date from "../utils/date";
import User from "../utils/user";
import Kelas from "../utils/classs";
import Util from "../utils/util";

const date = new Date();
date.init();

const user = new User();
user.getUser();

const classs = new Kelas();
classs.setQs(user.qs);
classs.getClass(user.qs);

const util = new Util();


//setAttribute("onchange", this.getSelectedClass());