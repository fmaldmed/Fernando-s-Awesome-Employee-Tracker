const mysql = require ('mysql2');
const inquirer = require ('inquirer');


require("dotenv").config();


const mysqlConnection = mysql.createConnection(
    {
        host: 'localhost',
        user: "root",
        database: "employeetracker_db",
        password: "root",
    },   
);


    console.log('Connected to the employee tracker database'),
    console.log ("------------------------"),
    console.log ("------------------------"),
    console.log ("  EMPLOYEE TRACKER APP  "),
    console.log ("------------------------"),
    console.log ("------------------------"),
    chooseoption();


function chooseoption() {
    inquirer.prompt ([
        {
        message: 'Please select an option from below to get started:',
        name: 'menu',
        type: 'list',
        choices: [
            
            'View all departments',
            'View all jobs',
            'View all employees',
            'Add a department',
            'Add a job',
            'Add an employee',
            'Update employee job',
            'Cancel',
        ],
    }])
    .then (response => {
        switch (response.menu) {
            case 'View all departments': 
                viewDepartment ();
                break;
            case 'Add a department':
                addDepartment ();
                break; 
            case 'View all jobs':
                viewPosition ();
                break; 
            case 'Add a job': 
                addPosition ();
                break;
            case 'View all employees': 
                viewEmployees ();
                break;
            case 'Add an employee':
                addEmployee ();
                break; 
            case 'Update employee job': 
                updateEmployee ();
                break;
            case 'Cancel':
                mysqlConnection.end ();
                break; 
            default: 
                mysqlConnection.end ();
        }
    });
};



function viewDepartment() {
    const depssql = "SELECT id, dpt_name AS department FROM department ORDER BY id"
    mysqlConnection.query(depssql, function (error, results) {
        if (error) throw error;
        chooseoption();
    })
    };

function addDepartment() {
    inquirer.prompt( [ 
        {
        name: 'department',
        type: 'input',
        message: 'Which department?',
        },
    ])
    .then(answer => {
        mysqlConnection.query(
            'INSERT INTO department (dpt_name) VALUES (?)',
            [answer.department],
            function (err, res) {
                if (err) throw err;
                console.log('Department added!');
                chooseoption();
            }
        );
    });
};

function viewPosition() {
    mysqlConnection.query('SELECT * FROM position', function (err,res) {
        if (err) throw err;
        console.table(res);
        chooseoption();
    });
};

function addPosition() {
    inquirer.prompt( [ 
        {
        name: 'add_title',
        type: 'input',
        message: 'What is the the job title?',
        },
        {
        name: 'add_salary',
        type: 'input',
        message: 'What is their job salary?',
        },
        {
        name: 'add_dpt_id',
        type: 'input',
        message: 'What is their deptartment ID?',
        },
    ])
    .then(answer => {
        mysqlConnection.query(
            'INSERT INTO position (title, salary, dpt_id) VALUES (?,?,?)',
            [answer.add_title, answer.add_salary, answer.add_dpt_id],
            function (err, res) {
                if (err) throw err;
                console.log('Job added!');
                start();
            }
        );
    });
};


function viewEmployees () {
    mysqlConnection.query('SELECT employee.id, first_name, last_name, title, salary, dpt_name, manager_id FROM ((department JOIN position ON department.id = position.dpt_id) JOIN employee ON position.id = employee.position_id);', 
        function (err,res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function addEmployee() {
    inquirer.prompt( [ 
        {
        name: 'f_name',
        type: 'input',
        message: 'What is the employees first name?',
        },
        {
        name: 'l_name',
        type: 'input',
        message: 'What is the employees last name?',
        },
        {
        name: 'position_id',
        type: 'input',
        message: 'What is the employees job id?',
        },
        {
        name: 'mgr_id',
        type: 'input',
        message: 'What is their managers ID?',
        },
    ])
    .then(answer => {
        mysqlConnection.query(
            'INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?,?,?,?)',
            [answer.f_name, answer.l_name, answer.position_id, answer.mgr_id],
            function (err, res) {
                if (err) throw err;
                console.log('Employee added!');
                start();
            }
        );
    });
};

function updateEmployee() {
    inquirer.prompt( [ 
        {
        name: 'id',
        type: 'input',
        message: 'What is the employee ID number?',
        },
        {
        name: 'positionID',
        type: 'input',
        message: 'What is the new job ID?',
        },
    ])
    .then(answer => {
        mysqlConnection.query(
            'UPDATE employee SET position_id=? WHERE id=?',
            [answer.positionID, answer.id],
            function (err, res) {
                if (err) throw err;
                console.log('Employee position updated!');
                start();
            }
        );
    });
};