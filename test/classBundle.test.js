const trainerSchedule = require("../utilities/trainerSchedule.js");

describe("trainerSchedule", () => {
  it("should return an object that is the trainer schedule", () => {
    const testTrainer = {
      dataValues: {
        first_name: "Trainy",
        last_name: "McTrainerston",
      },
    };
    const testClasses = [
      {
        dataValues: {
          id: 1,
          class_name: "Beef Session",
          day: "Monday",
          start_time: "12:00:00",
          current_size: 0,
          max_size: 10,
          trainer_id: 1,
        },
      },
      {
        dataValues: {
          id: 1,
          class_name: "Schwarzenegger Sweller",
          day: "Tuesday",
          start_time: "01:00:00",
          current_size: 10,
          max_size: 10,
          trainer_id: 1,
        },
      },
      {
        dataValues: {
          id: 1,
          class_name: "Captain Crunches",
          day: "Friday",
          start_time: "18:00:00",
          current_size: 3,
          max_size: 12,
          trainer_id: 1,
        },
      },
    ];
    const result = [
      {
        id: 1,
        class_name: "Beef Session",
        day: "Monday",
        start_time: "12:00:00",
        current_size: 0,
        max_size: 10,
        trainer_id: 1,
      },
      {
        id: 1,
        class_name: "Schwarzenegger Sweller",
        day: "Tuesday",
        start_time: "01:00:00",
        current_size: 10,
        max_size: 10,
        trainer_id: 1,
      },
      {
        id: 1,
        class_name: "Captain Crunches",
        day: "Friday",
        start_time: "18:00:00",
        current_size: 3,
        max_size: 12,
        trainer_id: 1,
      },
      "Trainy McTrainerston",
    ];
    expect(result).toEqual(trainerSchedule(testTrainer, testClasses));
  });
});
