const Business = require("../../models/business");
const { assert, expect } = require("chai");
const { connectAndDrop, disconnect } = require("../../config/database.js");
const request = require('supertest');
const app = require('../../app')

describe("business", () => {
  // HOOKS
  // Before each test, beforeEach hook will connect to the database and drop any old data
  beforeEach(connectAndDrop);
  // After each test, afterEach hook will disconnect from the database
  afterEach(disconnect);
 
    describe("#save", () => {
      it("persists a business", async () => {
        const fields = {
          name: "MATT & NAT",
          location: "France",
          url: "https://mattandnat.com",
          img:
            "https://cdn.shopify.com/s/files/1/0325/6569/0501/files/Matt_Nat_black_tagline_black.png?height=628&pad_color=ffffff&v=1596575740&width=1200",
          description:
            "M&N is a vegan brand therefore there are no animal products used in production.",
          certifications: ["Vegan"],
          shipping: [
            "Canada",
            "United States",
            "UK",
            "Europe",
            "International",
            "Australia",
          ],
          categories: ["Cosmetics", "Bags"],
          tags: ["eco", "vegan"],
        };
        const business = new Business(fields);

        await business.save();

        const stored = await Business.find({
          name: "MATT & NAT",
        });

        assert.strictEqual(stored.length, 1, "1 document saved"); // testa document has been created
        // assert.deepInclude(stored[0], fields);
        expect(stored[0]).to.deep.include(fields);
      });
    });
 
    describe('/business', ()=> {
      it('render list of all businesses', async () => {
        // Exercise
        const response = await request(app)
            .get('/business')
        // Verify
        assert.equal(response.status, 200)
        // assert.equal(response.body.should.be.a('array'))
        expect(response.body).to.be.an('array')
        expect(response.body).to.have.lengthOf(0) // why they ask us to test it? maybe to test th db doesn't contain anything yet?
      })
    })

});
