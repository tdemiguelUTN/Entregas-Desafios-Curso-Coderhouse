export default class UserDTO {
    constructor(obj) {
      this._id = obj._id;
      this.full_name = `${obj.first_name} ${obj.last_name}`;
      this.email = obj.email;
      this.role = obj.role;
      this.cart = obj.cart;
      this.from_github = obj.from_github;
      this.from_google = obj.from_google;
    }
  }