
-- Seed data for member table
INSERT INTO member(username, password, first_name, last_name, gender, phone, email)
VALUES("member1", MD5("johnpwd"), "John", "Pollock", "M", 6032341637, "john123@outlook.com");

INSERT INTO member(username, password, first_name, last_name, gender, email)
VALUES("member2", MD5("joepwd"), "Joe", "Colt", "F", "joecolt@gmail.com");

-- Seed data for employee table
INSERT INTO employee(username, password, first_name, last_name, gender, phone, email, role)
VALUES("trainer1", MD5("trainer1pwd"), "Carl", "Rocher", "M", 6032367637, "carltrainer1@gmail.com", "trainer");

INSERT INTO employee(username, password, first_name, last_name, gender, email, role)
VALUES("trainer2", MD5("trainer2pwd"), "Ana", "Coleman", "F", "trainer2ana@outlook.com", "trainer");

INSERT INTO employee(username, password, first_name, last_name, gender, phone, email, role)
VALUES("bobmorley", MD5("manager1pwd"), "Robert", "Morley", "M", 6039867039, "managermorley@outlook.com", "manager");

-- Seed data for class table
INSERT INTO class (name, day, time, max_size, trainer_id)
VALUES("Spin", "Monday", "08:00", 8, 1);

INSERT INTO class (name, day, time, trainer_id)
VALUES("Zumba", "Thursday", "18:00", 1);

-- Seed data for class_members table
INSERT INTO class_members (class_id, member_id, date)
VALUES("2", "1", "2020-12-31");

INSERT INTO class_members (class_id, member_id, date)
VALUES("1", "1", "2021-01-04");