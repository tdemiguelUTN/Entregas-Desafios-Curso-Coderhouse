export default class CustomeError extends Error{
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.message = message;
    }
}

