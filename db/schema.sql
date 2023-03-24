DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db; 

USE employeetracker_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS position; 
DROP TABLE IF EXISTS employee; 


CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    dpt_name VARCHAR(30) NOT NULL
);

CREATE TABLE position (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    position_id INT,
    manager_id INT
);