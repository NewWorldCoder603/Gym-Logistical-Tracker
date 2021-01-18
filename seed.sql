
-- Seed data for member table
INSERT INTO `gym_management_systemdb`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'Sarah@fitpro.com', 'sara1', 'Sarah', 'Pilot', '1990-03-12', 'F', '1111111111', '0', '10:00:00', '10:00:00');
INSERT INTO `gym_management_systemdb`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'Dwreck@over9000.com', 'dustin1', 'Dustin', 'FireFly', '2000-07-01', 'M', '2222222222', '0', '10:00:00', '10:00:00');
INSERT INTO `gym_management_systemdb`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ('JbigInt@yahoo.com', 'jesal1', 'Jesal', 'Starboard', '1989-02-20', 'F', '3333333333', '0', '10:00:00', '10:00:00');
INSERT INTO `gym_management_systemdb`.`members` ( `email`, `password`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'eSwiss@gmail.com', 'ethan1', 'Ethan', 'Array', '1992-03-4', 'M', '4444444444', '0', '10:00:00', '10:00:00 ');


-- Seed data for employee table

INSERT INTO `gym_management_systemdb`.`employees` ( `email`, `password`, `first_name`, `last_name`, `gender`, `phone`, `role`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'arav@gmail.com', 'avar1', 'Arav', 'Patel', 'M ', '9744823958', 'Trainer', '0','10:00:00', '10:00:00');
INSERT INTO `gym_management_systemdb`.`employees` ( `email`, `password`, `first_name`, `last_name`, `gender`, `phone`, `role`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'F@yahoo.com', 'felicia1', 'Felicia', 'Wager', 'F', '5372982532', 'Trainer', '0', '10:00:00 ', '10:00:00');
INSERT INTO `gym_management_systemdb`.`employees` ( `email`, `password`, `first_name`, `last_name`, `gender`, `phone`, `role`, `is_logged_in`, `createdAt`, `updatedAt`) VALUES ( 'abeer@yahoo.com', 'abeer1', 'Abeer', 'Muwat', 'F', '5839583253', 'Trainer', '0', '10:00:00', '10:00:00');


-- Seed data for class table
INSERT INTO `gym_management_systemdb`.`classes` ( `class_name`, `day`, `start_time`,`current_size`, `max_size`, `trainer_id`, `createdAt`, `updatedAt`) VALUES ( 'Kettle Bells', 'Friday', '9:30:00', '60', '0', '10', '2', '2010-00-00 00:00:00', '2010-00-00 00:00:00');
UPDATE `gym_management_systemdb`.`classes` SET `start_time` = '12:00:00', `roster` = '' WHERE (`id` = '1');
INSERT INTO `gym_management_systemdb`.`classes` ( `class_name`, `day`, `start_time`,`current_size`, `max_size`, `trainer_id`, `createdAt`, `updatedAt`) VALUES ( 'Zumba', 'Monday', '15:00:00', '60', '0', '8', '3', '2010-00-00 00:00:00', '2010-00-00 00:00:00');



