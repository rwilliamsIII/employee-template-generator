const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let team = [];


function teamBuilder(){
    inquirer.prompt([
        {
            type: "list",
            choice: ["Add Employee", "Finish Team"],
            message: "What would you like to do?",
            name: "userChoice"
        }
    ]).then(function(response){
        const userChoice = response.userChoice;
        switch(userChoice){
            case "Add Employee":
                inquirer.prompt([
                    {
                        type: "list",
                        choices: ["Manager", "Engineer", "Intern"],
                        message: "Select the employee role:",
                        name: "role"
                    }
                ]).then(function(response){
                    const role = response.role;
                    switch(role){
                        case "Manager":
                            createManager();
                            break;
                        case "Engineer":
                            createEngineer();
                            break;
                        case "Intern":
                            createIntern();
                            break;
                        default:
                            break;
                    }
                })
                break;
            case "Finish Team":
                if(team.length > 0){
                    render(team);
                    console.log(team);
                    console.log("Success!")
                }else{
                    console.log("You need to add team members!")
                    teamBuilder();
                }
                break;
            default:
                break;
        }
    })
}
teamBuilder();

function createManager(){
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter manager's name:",
            name: "managerName"
        },
        {
            type: "input",
            message: "Please enter manager's email address:",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Please enter manager's employee id:",
            name: "managerId"
        },
        {
            type: "input",
            message: "Please enter manager's office number:",
            name: "managerOffice"
        }
    ]).then(function(response){
        let newManager = new Manager(response.managerName, response.managerEmail, response.managerId, response.managerOffice);
        team.push(newManager)
        teamBuilder();
    })
}

function createEngineer(){
    
}

