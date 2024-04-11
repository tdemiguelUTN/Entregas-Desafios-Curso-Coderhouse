export default class resetUserPasswordDTO {
    constructor(obj) {
      this._id = obj._id;
      this.email = obj.email;
      this.password = obj.password;

    }
  }