# Dev Fit Gym Logistical Tracker

## Description

This is a gym tracker app which allows clients to create accounts, log in with existing accounts, see trainer information, and view and join classes. It also allows trainers to add or remove their own classes. Managers on this app are able to view a list of trainers employed by the gym, pull up an individual trainer's information, terminate a trainer's employment by removing that trainer from the database, or hire a new trainer by adding his/her information into the database. A manager can also view all classes available at the gym for the week, view class rosters, and add/remove members from class rosters.

## Screenshots

![HomePage](./public/assets/images/screenshots/homePage.png)

![RegistrationPage](./public/assets/images/screenshots/registrationPage.png)

![ClientSchedulePage](./public/assets/images/screenshots/clientSchedulePage.png)

![TrainerPage](./public/assets/images/screenshots/trainerPage.png)

![ManagerPageView](./public/assets/images/screenshots/managerPageView.png)

![ManagerPageHire](./public/assets/images/screenshots/managerPageHire.png)

![ManagerPageAdd](./public/assets/images/screenshots/managerPageAdd.png)

## Table of Contents

- [Technologies](#Technologies)
- [Usage](#Usage)
- [Installation](#Installation)
- [Feedback](#Feedback)
- [Challenges](#Challenges)
- [Future Development](#Future_Development)

## Technologies

- node.js
- mysql
- sequelize
- body-parser
- dotenv
- express
- jest
- md5
- mysql2
- nodemon
- server

## Usage

1. Clients
   - Register for account from home page.
   - Log in with registered account from home page.
   - Join or drop classes.
   - View classes they've registered for.
   - View Gym's trainers.
2. Trainers
   - Log in from home page.
   - Add Classes/classtimes for the week to be taught by that trainer.
   - Delete Classes from the week that were added by that trainer.
3. Managers
   - Log in from home page.
   - View list of trainers.
   - View each trainer's demographics information.
   - Terminate a trainer / remove him/her from the database.
   - Hire a new trainer by entering his/her information into the database.
   - View all classes being offered by the gym for the week.
   - View class rosters.
   - Add members to roster or delete members from roster for each class (in case client needs help with this process for some reason).

## Installation

- Install [node.js](https://nodejs.org/en/download/)
- Open server.js in node.js integrated terminal, and install dependencies with `npm install`

## Feedback

Contact us with any feedback or questions through GitHub or by email.

- [Dustin](https://github.com/DustinErwin)
- [Ethan](https://github.com/Ewager1)
- [Jesal](https://github.com/JesalDM)
- [Sarah](https://github.com/smanter82/)

## Challenges

- Keeping project scope small enough to meet the deadline
- Organizing a large amount of API's.
- Deciding proper Sequelize joins.
- Rotating calendar logic based on current date.

## Future_Development

- Expanding the rotating week to be a full calendar.
- Adding a router controller
- Authentication
- Improved user error handling
- Membership pricing and records
