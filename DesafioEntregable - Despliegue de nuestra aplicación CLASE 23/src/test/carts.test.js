import supertest from "supertest";
import { expect } from "chai";
import config from "../config.js";
  
const requester = supertest(`http://localhost:${config.port}`);

describe("Find all carts", () => {
    it("should return 200 status", async () => {
        const response = await requester.get("/api/carts");
        expect(response.status).to.be.equal(200);
    });

    it("should return an object", async () => {
        const response = await requester.get("/api/carts");
        expect(response.body).to.be.an("object");
    });

    it("should return a carts array", async () => {
        const response = await requester.get("/api/carts");
        expect(response.body).to.be.an("object").that.have.property("carts").that.is.an("array");
    });

    it("should return a cart", async () => {
        const response = await requester.get("/api/carts");
        expect(response.body.carts[0]).to.be.an("object").that.have.property("_id");
        expect(response.body.carts[0]).to.be.an("object").that.have.property("products");
    });
});

describe("Create cart", () => {
    it("should return 200 status", async () => {
        const response = await requester.post("/api/carts");
        expect(response.status).to.be.equal(200);
    });

    it("should return a cart", async () => {
        const response = await requester.post("/api/carts");

        expect(response.body).to.be.an("object").that.have.property("cart");
        expect(response.body.cart).to.be.an("object").that.have.property("_id");
        expect(response.body.cart).to.be.an("object").that.have.property("products").that.is.an("array").that.is.empty;
    });

    it("should return message succesfull", async () => {
        const response = await requester.post("/api/carts");
        expect(response.body).to.be.an("object").that.have.property("message").that.is.equal("Cart created");
    });
});

