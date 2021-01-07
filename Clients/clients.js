// Dependencies 
// md5 Copyright details: 
// Copyright © 2011-2015, Paul Vorbach.
// Copyright © 2009, Jeff Mott.
var md5 = require('md5');

// creates class Member with its own properties and methods
class Member{
    constructor(username, password, first_name, last_name, gender, date_of_birth, email, phone){
        this.username = username;
        this.password = md5(password); // needs to be tested if it works when sign-up page is ready
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.date_of_birth = date_of_birth;
        this.email = email;
        this.phone = phone
    };
};

module.exports = Member;