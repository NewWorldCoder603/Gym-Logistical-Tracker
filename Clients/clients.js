// creates class Member with its own properties and methods
class Member{
    constructor(username, password, first_name, last_name, gender, date_of_birth, email, phone){
        this.username = username;
        this.password = MD5(password);
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.date_of_birth = date_of_birth;
        this.email = email;
        this.phone = phone
    };
};

module.exports = Member;