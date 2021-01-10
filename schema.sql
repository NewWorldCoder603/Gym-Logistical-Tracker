DROP DATABASE IF EXISTS gym_management_systemdb;

CREATE DATABASE gym_management_systemdb;
USE gym_management_systemdb;

-- this table stores member's personal details
CREATE TABLE member(
	 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 username VARCHAR(30) NOT NULL UNIQUE,
	 password VARCHAR(32) NOT NULL,
	 first_name VARCHAR(30) NOT NULL,
	 last_name VARCHAR(30)NOT NULL,
	 gender VARCHAR(1),
	 date_of_birth DATE,
	 email VARCHAR(30) NOT NULL,
	 phone BIGINT(10)
	 logged_in BOOLEAN DEFAULT 0
);

-- this table stores employee personal details including their roles
CREATE TABLE employee(
	 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 username VARCHAR(30) NOT NULL UNIQUE,
	 password VARCHAR(32) NOT NULL,
	 first_name VARCHAR(30) NOT NULL,
	 last_name VARCHAR(30)NOT NULL,
	 gender VARCHAR(1),
	 email VARCHAR(30) NOT NULL,
	 phone BIGINT(10),
     role VARCHAR(10) NOT NULL,
	 manager_id INT
);

-- this table stores details of all the classes scheduled within the week by all the trainers
CREATE TABLE class(
	 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 name VARCHAR(50) NOT NULL,
	 day VARCHAR(9) NOT NULL,
	 time TIME NOT NULL,
	 duration_min INT(3) DEFAULT 60,
	 max_size INT(2) DEFAULT 10,
	 trainer_id INT NOT NULL,
	 FOREIGN KEY (trainer_id) REFERENCES employee(id) ON DELETE CASCADE
);

-- this table stores details of all the members that have joined a class for a specific date
CREATE TABLE class_members(
    class_id INT NOT NULL,
	member_id INT NOT NULL,
    date DATE NOT NULL,
	FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE,
	FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE
); 
