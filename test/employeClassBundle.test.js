const employeeClassBundle = require("../utilities/employeeClassBundle.js");

describe("employeeClassBundle", () => {
  it("should return an object that is the trainer schedule", () => {
    const testEmployee = {
      dataValues: {
        id: 2,
        first_name: "Memby",
        last_name: "McMemberston",
      },
    };
    const testTrainer = [
      {
        dataValues: {
          id: 1,
          first_name: "Trainy",
          last_name: "McTrainerston",
        },
      },
      {
        dataValues: {
          id: 2,
          first_name: "Testy",
          last_name: "McTesterston",
        },
      },
      {
        dataValues: {
          id: 3,
          first_name: "Teachy",
          last_name: "McTeacherston",
        },
      },
    ];
    const testClasses = [
      {
        dataValues: {
          id: 1,
          class_name: "Beef Session",
          day: "Monday",
          start_time: "12:00:00",
          current_size: 0,
          max_size: 10,
          roster: "",
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
          roster: ",1,2,3",
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
          roster: ",2,3",
          trainer_id: 2,
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
        trainer_name: "Trainy",
        userName: "Memby",
      },
      {
        id: 1,
        class_name: "Schwarzenegger Sweller",
        day: "Tuesday",
        start_time: "01:00:00",
        current_size: 10,
        max_size: 10,
        trainer_id: 1,
        trainer_name: "Trainy",
        userName: "Memby",
      },
      {
        id: 1,
        class_name: "Captain Crunches",
        day: "Friday",
        start_time: "18:00:00",
        current_size: 3,
        max_size: 12,
        trainer_id: 2,
        trainer_name: "Testy",
        userName: "Memby",
      },
    ];
    expect(result).toEqual(
      employeeClassBundle(testClasses, testEmployee, testTrainer)
    );
  });
});
