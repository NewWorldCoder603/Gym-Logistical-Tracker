
-- Seed data for member table
INSERT INTO `jevw4i4a0volvz88`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'Sarah@fitpro.com', '9f8e1dc0923dfdc1ee37b3ff8d6735cd', 'Sarah', 'Pilot', '1990-03-12', 'F', '1111111111', '0', '10:00:00', '10:00:00');
INSERT INTO `jevw4i4a0volvz88`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'Dwreck@over9000.com', '70005c927a08ba7a30315d94da248e77', 'Dustin', 'FireFly', '2000-07-01', 'M', '2222222222', '0', '10:00:00', '10:00:00');
INSERT INTO `jevw4i4a0volvz88`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ('JbigInt@yahoo.com', 'a3a9f8174d00d8bf45a1b1cd3b13bc39', 'Jesal', 'Starboard', '1989-02-20', 'F', '3333333333', '0', '10:00:00', '10:00:00');
INSERT INTO `jevw4i4a0volvz88`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'eSwiss@gmail.com', 'b7e4b7182b5e3236c265c0ac8aadd1a7', 'Ethan', 'Array', '1992-03-4', 'M', '4444444444', '0', '10:00:00', '10:00:00 ');


-- Seed data for employee table

INSERT INTO `jevw4i4a0volvz88`.`employees` ( `email`, `password`, `first_name`, `last_name`, `gender`, `phone`, `role`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'arav@gmail.com', '9bcda7bee82732e249c2acdffd1184ed', 'Arav', 'Patel', 'M ', '9744823958', 'Trainer', '0','10:00:00', '10:00:00');
INSERT INTO `jevw4i4a0volvz88`.`employees` ( `email`, `password`, `first_name`, `last_name`, `gender`, `phone`, `role`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'F@yahoo.com', 'be2f194651556abd53c82490d1fc037a', 'Felicia', 'Wager', 'F', '5372982532', 'Trainer', '0', '10:00:00 ', '10:00:00');
INSERT INTO `jevw4i4a0volvz88`.`employees` ( `email`, `password`, `first_name`, `last_name`, `gender`, `phone`, `role`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'abeer@yahoo.com', '5e5bf80b35c0138e2854869de030e40c', 'Abeer', 'Muwat', 'F', '5839583253', 'Trainer', '0', '10:00:00', '10:00:00');


-- Seed data for class table
UPDATE `jevw4i4a0volvz88`.`classes` SET `class_name` = 'Barbell Blast', `day` = 'Monday', `trainer_id` = '2', `roster` = '' WHERE (`id` = '1');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `roster`, `createdAt`, `updatedAt`) VALUES ('2', 'Barbell Blast', 'Wednesday', '09:30:00', '0', '10', '2', '', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `roster`, `createdAt`, `updatedAt`) VALUES ('3 ', 'Barbell Blast', 'Friday', '09:30:00', '0', '10', '2', '', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `roster`, `createdAt`, `updatedAt`) VALUES ('4', 'Spin', 'Monday', '12:00:00', '0', '12', '1', '', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `roster`, `createdAt`, `updatedAt`) VALUES ('5', 'Spin', 'Wednesday', '12:00:00', '0', '12', '1', '', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `roster`, `createdAt`, `updatedAt`) VALUES ('6', 'Spin ', 'Friday ', '12:00:00', '0 ', '12', '1', '', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `roster`, `createdAt`, `updatedAt`) VALUES ('7', 'Zumba', 'Tuesday', '06:00:00 ', '0', '20', '3', '', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `roster`, `createdAt`, `updatedAt`) VALUES ('8', 'Zumba', 'Thursday', '06:00:00', '0', '20', '3', '', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
INSERT INTO `jevw4i4a0volvz88`.`classes` (`id`, `class_name`, `day`, `start_time`, `current_size`, `max_size`, `trainer_id`, `createdAt`, `updatedAt`) VALUES ('9', 'Zumba', 'Saturday', '06:00:00', '0', '20', '3', '2010-00-00 00:00:00', '2010-00-00 00:00:00');



