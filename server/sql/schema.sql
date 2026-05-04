CREATE TABLE users(
 id INT PRIMARY KEY AUTO_INCREMENT,

 name VARCHAR(100) NOT NULL,

 email VARCHAR(100)
 UNIQUE NOT NULL,

 role ENUM(
 'employee',
 'manager',
 'admin'
 ) NOT NULL,

 manager_id INT NULL,

 FOREIGN KEY(manager_id)
 REFERENCES users(id)
);


CREATE TABLE leave_types(

 id INT PRIMARY KEY AUTO_INCREMENT,

 name VARCHAR(50) NOT NULL,

 yearly_quota INT NOT NULL

);


CREATE TABLE leave_requests(

 id INT PRIMARY KEY AUTO_INCREMENT,

 user_id INT NOT NULL,

 manager_id INT NOT NULL,

 leave_type_id INT NOT NULL,

 start_date DATE NOT NULL,

 end_date DATE NOT NULL,

 working_days INT NOT NULL,

 reason TEXT NOT NULL,

 status ENUM(
 'Pending',
 'Approved',
 'Rejected'
 ) DEFAULT 'Pending',

 manager_comment TEXT,

 acted_by INT NULL,

 acted_at DATETIME NULL,

 created_at DATETIME
 DEFAULT CURRENT_TIMESTAMP,

 FOREIGN KEY(user_id)
 REFERENCES users(id),

 FOREIGN KEY(manager_id)
 REFERENCES users(id),

 FOREIGN KEY(leave_type_id)
 REFERENCES leave_types(id)

);