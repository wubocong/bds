const database = sessionStorage;

class Storage {
  static setToken(token) {
    database.setItem('token', token);
    database.setItem('lastTime', new Date - 0);
  }
  static getToken() {
    const token = database.getItem('token');
    if (!token) {
      Storage.clear();
      return null;
    }
    const lastTime = database.getItem('lastTime');
    const now = new Date;
    if (now - lastTime > 1000 * 60 * 120) {
      Storage.clear();
      return null;
    }
    return database.getItem('token');
  }
  static updateTokenTime() {
    database.setItem('lastTime', new Date - 0);
  }
  static setUser(user) {
    database.setItem('user', JSON.stringify(user));
  }
  static getUser() {
    const userString = database.getItem('user');
    return JSON.parse(userString);
  }
  static clear() {
    database.removeItem('lastTime');
    database.removeItem('token');
    database.removeItem('user');
  }
}

export default Storage;