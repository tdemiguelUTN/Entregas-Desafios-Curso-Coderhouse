export default class UserDTO {
    constructor(obj) {
      this.full_name = `${obj.first_name} ${obj.last_name}`;
      this.email = obj.email;
      this.role = obj.role;
      this.from_github = obj.from_github;
      this.from_google = obj.from_google;
      this.cart = obj.cart._id;
    }
  }