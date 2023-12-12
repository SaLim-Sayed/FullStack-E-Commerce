import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  //get cookie
  get(name) {
    return cookies.get(name);
  }

  //set cookie
  set(name, value, options) {
    cookies.set(name, value, options);
  }

  //remove cookie
  remove(name) {
    cookies.remove(name);
  }
}

export default new CookieService();