class Storage{
  static setToken(token){
    localStorage.setItem('token', token);
    localStorage.setItem('lastTime', new Date - 0);
  }
  static getToken(){
    const token = localStorage.getItem('token');
    if(!token){
      Storage.clear();
      return null;
    }
    const lastTime = localStorage.getItem('lastTime');
    const now = new Date;
    if(now - lastTime > 1000 * 60 * 60){
      Storage.clear();
      return null;
    }
    return localStorage.getItem('token');
  }
  static updateTokenTime(){
    localStorage.setItem('lastTime', new Date - 0);
  }
  static setUser(user){
    localStorage.setItem('user', JSON.stringify(user));
  }
  static getUser(){
    const userString = localStorage.getItem('user');
    return JSON.parse(userString);
  }
  static clear(){
    localStorage.removeItem('lastTime');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export default Storage;