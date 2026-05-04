
---

## 🧑‍💻 Frontend (React)

### Responsibilities:
- UI rendering
- Form handling (apply leave)
- Display leave status
- Manager dashboard
- API calls via Axios

### Pages:
- EmployeeDashboard
- ApplyLeave
- ManagerDashboard
- Login / Signup

---

## ⚙️ Backend (Node.js + Express)

### Responsibilities:
- Business logic
- API handling
- Leave calculation logic
- Authentication (future enhancement)

### Modules:
- authController
- leaveController
- holidayController
- leaveTypeController

---

## 🗄️ Database Design (MySQL)

### users
- id
- name
- email
- password
- role (employee/manager)
- manager_id

### leave_requests
- id
- user_id
- manager_id
- leave_type_id
- start_date
- end_date
- working_days
- status
- reason
- created_at
- acted_at

### leave_types
- id
- name
- total_days

### holidays
- id
- holiday_date
- name

---

## 🔄 Workflow

### Employee Flow
1. Login
2. Apply Leave
3. System checks:
   - weekends
   - holidays
4. Leave stored as "Pending"

---

### Manager Flow
1. Login
2. View pending requests
3. Approve / Reject
4. Status updated in DB



---

# 👤 1. USERS TABLE

Stores employees and managers.

```sql id="db3"
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('employee', 'manager', 'admin') DEFAULT 'employee',
  manager_id INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE leave_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  total_days INT
);

CREATE TABLE holidays (
  id INT PRIMARY KEY AUTO_INCREMENT,
  holiday_date DATE,
  name VARCHAR(100)
);
CREATE TABLE leave_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,

  user_id INT,
  manager_id INT,
  leave_type_id INT,

  start_date DATE,
  end_date DATE,

  working_days INT,

  reason TEXT,

  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',

  manager_comment TEXT,

  acted_by INT,
  acted_at DATETIME,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (manager_id) REFERENCES users(id),
  FOREIGN KEY (leave_type_id) REFERENCES leave_types(id)
);