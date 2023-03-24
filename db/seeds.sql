INSERT INTO  department (dpt_name) -- department name
VALUES

('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO position (title, salary, dpt_id)
VALUES
('CEO', 250000, 5),
('Salesperson', 75000, 1),
('Lead Engineer', 175000, 2),
('Design Engineer', 145000, 2),
('Account Manager', 1250000, 3),
('Accountant', 95000, 3),
('Legal Team Lead', 210000, 4),
('Lawyer', 185000, 4);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES
('Jacob', 'Masters', 1, Null),
('Bill', 'Howard', 2, 1),
('Daryl', 'Johnson', 3, Null),
('Ryan', 'Coogler', 4, 3),
('Ana', 'Hewitt', 5, Null),
('Tim', 'Allen', 6, 5),
('Teresa', 'Thompson', 7, Null),
('Jamie', 'Foxx', 8, 7),
('Megan', 'Traynor', 4, 3);