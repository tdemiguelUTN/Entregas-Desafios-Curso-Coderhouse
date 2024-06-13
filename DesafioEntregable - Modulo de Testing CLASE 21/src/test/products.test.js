import supertest from "supertest";
import { expect } from "chai";
import config from "../config.js";

const requester = supertest(`http://localhost:${config.port}`);

describe("Find all products", () => {
    it("should return 200 status", async () => {
        const response = await requester.get("/api/products");
        expect(response.status).to.be.equal(200);
    });

    it("should return an object", async () => {
        const response = await requester.get("/api/products");
        expect(response.body).to.be.an("object");
    });

    it("should return an array of products", async () => {
        const response = await requester.get("/api/products");
        expect(response._body.products.payload).to.have.an("array").that.is.not.empty;
    });
});