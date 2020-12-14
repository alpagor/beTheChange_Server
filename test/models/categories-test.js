const Categories = require("../../models/categories");
const { assert, expect } = require("chai");

describe("categories", () => {
  describe("path defintion", () => {
    describe("#name", () => {
      it("is a String", () => {
        // Setup
        const categories = new Categories({
          // Exercise
          name: "shoes",
        });
        // Verify
        assert.strictEqual(categories.name, "shoes");
      });
    });
    describe("#img", () => {
      it("is a String", () => {
        const categories = new Categories({
          img: "data:image/jpeg;base64",
        });
        assert.strictEqual(categories.img, "data:image/jpeg;base64");
      });
    });
    describe("#tags", () => {
      it("is an Array of strings", () => {
        const categories = new Categories({
          tags: ["shoes", "accessories"],
        });
        assert.deepEqual(categories.tags, ["shoes", "accessories"]); // deepEqual because it's an Array comparision
      });
    });
  });
  describe("model validation", () => {
    it("should be invalid if name is empty", () => {
      const categories = new Categories();

      categories.validate((error) => {
        expect(error.errors.name).to.exist;
      });
    });
    it("should be invalid if img is empty", () => {
        const categories = new Categories();
  
        categories.validate((error) => {
          expect(error.errors.img).to.exist;
        });
      });
      it("should be invalid if tags is empty", () => {
        const categories = new Categories();
  
        categories.validate((error) => {
          expect(error.errors.tags).to.exist;
        });
      });
  });
});
