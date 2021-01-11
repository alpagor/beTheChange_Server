const Business = require("../../models/business-model");
const { assert, expect } = require("chai");
const { connectAndDrop, disconnect } = require("../../config/database.js");
describe("business", () => {
  describe("path definition", () => {
    
    // Testing the paths

    describe("#name", () => {
      it("is a String", () => {
        // Setup
        // construct a new instance of the business model.
        const business = new Business({
          // Exercise
          name: "nae-vegan",
        });
        // Verify
        assert.strictEqual(business.name, "nae-vegan");
      });
    });
    describe("#location", () => {
      it("is a String", () => {
        const business = new Business({
          location: "France",
        });
        assert.strictEqual(business.location, "France");
      });
    });
    describe("#url", () => {
      it("is a String", () => {
        const business = new Business({
          url: "www.nae-vegan.com",
        });
        assert.strictEqual(business.url, "www.nae-vegan.com"); // Verify that path url is a string
      });
    });
    describe("#img", () => {
      it("is a String", () => {
        const business = new Business({
          img:
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.nae-vegan.com%2Fsysimages%2Flogo_face.jpg&imgrefurl=https%3A%2F%2Fwww.nae-vegan.com%2Fen%2F&tbnid=2kPyuubhfl6xRM&vet=12ahUKEwiz_cbJzLTtAhVG3RoKHXWIDyoQMygAegUIARCcAQ..i&docid=wgpNyAgalNISCM&w=600&h=600&q=nae-vegan%20logo&client=safari&ved=2ahUKEwiz_cbJzLTtAhVG3RoKHXWIDyoQMygAegUIARCcAQ",
        });
        assert.strictEqual(
          business.img,
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.nae-vegan.com%2Fsysimages%2Flogo_face.jpg&imgrefurl=https%3A%2F%2Fwww.nae-vegan.com%2Fen%2F&tbnid=2kPyuubhfl6xRM&vet=12ahUKEwiz_cbJzLTtAhVG3RoKHXWIDyoQMygAegUIARCcAQ..i&docid=wgpNyAgalNISCM&w=600&h=600&q=nae-vegan%20logo&client=safari&ved=2ahUKEwiz_cbJzLTtAhVG3RoKHXWIDyoQMygAegUIARCcAQ"
        );
      });
    });
    describe("#description", () => {
      it("is a String", () => {
        const business = new Business({
          description: "es una tienda vegana",
        });
        assert.strictEqual(business.description, "es una tienda vegana");
      });
    });
    describe("#categories", () => {
      it("is an Array of strings", () => {
        const business = new Business({
          categories: ["Cosmetics", "Clothes"],
        });
        assert.deepEqual(business.categories, ["Cosmetics", "Clothes"]); // deepEqual because it's an Array comparision
      });
    });
    describe("#tags", () => {
      it("is an Array of strings", () => {
        const business = new Business({
          tags: ["vegan", "ethic"],
        });
        assert.deepEqual(business.tags, ["vegan", "ethic"]); // deepEqual because it's an Array comparision
      });
    });

    describe("#certifications", () => {
      it("is an array of Strings", () => {
        const business = new Business({
          certifications: ["V-Label", "c2c certified"],
        });
        assert.deepEqual(business.certifications, ["V-Label", "c2c certified"]);
      });
    });
    describe("#shipping", () => {
      it("is an array of Strings", () => {
        const business = new Business({
          shipping: ["Europe", "USA only"],
        });
        assert.deepEqual(business.shipping, ["Europe", "USA only"]);
      });
    });
  });

  describe("model validation", () => {
    // For Testing model validations we'll use validate() to validate object properties
    // (we won't save() because it does require a DB.)
    it("should be invalid if name is empty", () => {
      const business = new Business();
      // run validate with a callback

      // Before running validators, Mongoose attempts to coerce values to the correct type.
      // This process is called casting the document. If casting fails for a given path,
      // the error.errors object will contain a CastError object.
      business.validate((error) => {
        // In the callback, do an assertion for the error property
        // each error has a .path describing the full path of the
        // property that failed validation
        expect(error.errors.name).to.exist;
      });
    });
    it("should be invalid if locations is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.location).to.exist;
      });
    });
    it("should be invalid if url is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.url).to.exist;
      });
    });
    it("should be invalid if img is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.img).to.exist;
      });
    });
    it("should be invalid if description is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.description).to.exist;
      });
    });
    it("should be invalid if certifications is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.certifications).to.exist;
      });
    });
    it("should be invalid if categories is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.categories).to.exist;
      });
    });
    it("should be invalid if shipping is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.shipping).to.exist;
      });
    });

    // este test no pasa, porqué? tiene algo que ver con sea un array de Strings?
    // pero lo que queremos validar es que no esté vacío...
    // respuesta : as arrays in Mongoose implicity have a default value of [] we need to
    // overwrite this default setting default to undefined in the schema.
    it("should be invalid if categories is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.categories).to.exist;
      });
    });
    it("should be invalid if tags is empty", () => {
      const business = new Business();

      business.validate((error) => {
        expect(error.errors.tags).to.exist;
      });
    });
  });
});
