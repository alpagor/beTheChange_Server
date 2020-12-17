const { assert, expect } = require("chai");
const request = require("supertest");

const app = require("../../app");

describe("root page", () => {
  describe("GET request", () => {
    it("returns a 200 stats", async () => {
      const response = await request(app).get("/");
      assert.equal(response.status, 200);
    });
  });
});

// este test funciona también si en index.js falta res.send('')!!!??? Why?