const User = require("../../models/user-model");
const { assert, expect } = require("chai");
const { connectAndDrop, disconnect } = require("../../config/database.js");

describe("user", () => {
  describe("path definition", () => {
    describe("#email", () => {
      it("is a string", () => {
        // Setup
        const user = new User({
          // Exercise
          username: "alpagor",
        });
        // Verify
        assert.strictEqual(user.email, "alpagor");
      });
    });
    // describe("#fullName", () => {
    //   it("is a string", () => {
    //     const user = new User({
    //       fullName: "Iwill Doit",
    //     });
    //     assert.strictEqual(user.fullName, "Iwill Doit");
    //   });
    // });
    // describe("#email", () => {
    //   it("is a string", () => {
    //     const user = new User({
    //       email: "iwildoit@gmail.com",
    //     });
    //     assert.strictEqual(user.email, "iwildoit@gmail.com");
    //   });
    // });
    describe("#password", () => {
      it("is a string", () => {
        const user = new User({
          password: "123456",
        });
        assert.strictEqual(user.password, "123456");
      });
    });
  });
  describe("model validation", () => {
    it("should be invalid if username is empty", () => {
      const user = new User();
      // Before running validators, Mongoose attempts to coerce values to the correct type.
      // This process is called casting the document. If casting fails for a given path,
      // the error.errors object will contain a CastError object.
      user.validate((error) => {
        // In the callback, do an assertion for the error property
        // each error has a .path describing the full path of the
        // property that failed validation
        expect(error.errors.username).to.exist;
      });
    });
    // it("should be invalid if locations is empty", () => {
    //   const user = new User();

    //   user.validate((error) => {
    //     expect(error.errors.fullName).to.exist;
    //   });
    // });
    // it("should be invalid if locations is empty", () => {
    //   const user = new User();

    //   user.validate((error) => {
    //     expect(error.errors.email).to.exist;
    //   });
    // });
    it("should be invalid if password is empty", () => {
      const user = new User();

      user.validate((error) => {
        expect(error.errors.password).to.exist;
      });
    });
  });
});
