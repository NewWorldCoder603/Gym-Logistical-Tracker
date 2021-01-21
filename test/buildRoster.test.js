const buildRoster = require("../utilities/buildRoster.js");

describe("buildRoster", () => {
  it("should return an object that is the class roster", () => {
    const testClass = {
      dataValues: {
        roster: "1,2,3",
      },
    };
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
      "Testy McTesterson",
      "Betsy McTesterson",
      "Westy McTesterson",
      ["1", "2", "3"],
    ];
    expect(result).toEqual(buildRoster(members, testClass));
  });
});
