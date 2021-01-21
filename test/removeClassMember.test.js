const removeClassMember = require("../utilities/removeClassMember.js");

describe("removeClassMember", () => {
  it("should return an object to update the class table", () => {
    const testClass = {
      dataValues: {
        roster: "1,2,3,4",
      },
    };
    const memberid = 3;
    const result = {
      roster: "1,2,4",
      current_size: 3,
    };

    expect(result).toEqual(removeClassMember(testClass, memberid));
  });
});
