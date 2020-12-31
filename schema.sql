DROP DATABASE IF EXISTS gym_management_systemdb;
CREATE DATABASE gym_management_systemdb;
USE gym_management_systemdb;
CREATE TABLE member(
	 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 username VARCHAR(30) NOT NULL UNIQUE,
	 password VARCHAR(32) NOT NULL,
	 first_name VARCHAR(30) NOT NULL,
	 last_name VARCHAR(30)NOT NULL,
	 gender VARCHAR(1),
	 date_of_birth DATE,
	 email VARCHAR(30),
	 phone BIGINT(10)
);

CREATE TABLE employee(
	 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 username VARCHAR(30) NOT NULL UNIQUE,
	 password VARCHAR(32) NOT NULL,
	 first_name VARCHAR(30) NOT NULL,
	 last_name VARCHAR(30)NOT NULL,
	 gender VARCHAR(1),
	 email VARCHAR(30),
	 phone BIGINT(10),
     role VARCHAR(10) NOT NULL,
	 manager_id INT
);

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

CREATE TABLE class_members(
    class_id INT NOT NULL,
	member_id INT NOT NULL,
    date DATE NOT NULL,
	FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE,
	FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE
); 
