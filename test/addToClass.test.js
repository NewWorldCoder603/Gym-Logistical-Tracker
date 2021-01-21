const addToClass = require("../utilities/addToClass.js");

describe("addToClass", () => {
  it("should return an object to update the class table", () => {
    const testClass = {
      dataValues: {
        roster: "1,2,3,4",
      },
    };
    const memberid = 5;
    const result = {
      roster: "1,2,3,4,5",
      current_size: 5,
    };

    expect(result).toEqual(addToClass(testClass, memberid));
  });
});
