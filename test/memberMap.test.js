const memberMap = require("../utilities/memberMap.js");

describe("addToClass", () => {
  it("should return an object that is the class roster", () => {
    const members = [
      {
        dataValues: {
          id: 1,
          first_name: "Testy",
          last_name: "McTesterson",
        },
      },
      {
        dataValues: {
          id: 2,
          first_name: "Betsy",
          last_name: "McTesterson",
        },
      },
      {
        dataValues: {
          id: 3,
          first_name: "Westy",
          last_name: "McTesterson",
        },
      },
    ];
    const result = [
      { id: 1, fullName: "Testy McTesterson" },
      { id: 2, fullName: "Betsy McTesterson" },
      { id: 3, fullName: "Westy McTesterson" },
    ];
    expect(result).toEqual(memberMap(members));
  });
});
