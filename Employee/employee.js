// Dependencies
// md5 Copyright details:
// Copyright © 2011-2015, Paul Vorbach.
// Copyright © 2009, Jeff Mott.
var md5 = require("md5");

// creates class Member with its own properties and methods
class Employee {
  constructor(
    username,
    password,
    first_name,
    last_name,
    gender,
    email,
    phone,
    role,
    manager_id
  ) {
    this.username = username;
    this.password = md5(password); // needs to be tested if it works when sign-up page is ready
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.manager_id = manager_id;
  }
}

module.exports = Employee;
