# Online Learning Management System

## Overview

This project is a Learning Management System (LMS) built with React.js for the frontend, Spring Boot for the backend, and MySQL as the database. It provides a comprehensive platform for managing online courses, user profiles, assessments, progress tracking, and more.

---

## Features

### 🧑‍💻 User Management
- User registration and login functionality.
- User profiles with the ability to update information.

### 📚 Course Management
- Admin can add, edit, and manage courses.
- Course details include name, instructor, description, and more.

### 🧾 Assessment
- Users can take assessments related to courses.
- Admin can create and manage assessment questions.

### 📊 Progress Tracking
- Monitor user progress and completion status.
- Visual representation of user progress.

### 🏆 Certificate Generation
- Automatic certificate generation upon course completion.
- Personalized certificates with user details.

### 💬 Discussion Forum
- Course-specific discussion forums for users.
- Interaction between users and instructors.

### 🛡️ Authentication & Security
- JWT token-based authentication.
- Role-based access control (**ADMIN**, **USER**).
- Secure password encryption.
- Default admin account for initial setup.
- *Note: INSTRUCTOR role will be implemented soon.*

### 🖥️ Admin Dashboard
- Manage courses and assessment questions.
- Track students, courses, and enrollments.

--- 

## 🧠 Technologies Used

### Frontend
- **Core Framework:** React, React DOM, React Router  
- **UI Components:** Ant Design, Lucide Icons, FontAwesome
- **Styling:** Tailwind CSS  
- **API Communication:** Axios
- **Additional Libraries:** React Player, jsPDF, html2canvas, Moment.js, React DOM Confetti

### Backend
- **Framework:** Spring Boot  
- **Language:** Java  
- **Security:** Spring Security with JWT
- **Authentication:** Role-Based Access Control
- **Database Integration:** Spring Data JPA
- **Architecture:** RESTful API
- **Build Tool:** Maven

### Database
- **MySQL**
- **Tables:** course, learning, progress, discussion, feedback, question, user, assessment

---

## Setup


### Prerequisites
- Java 17 or higher  
- Maven 3.6+  
- MySQL 8.0+  
- Node.js and npm


1. Clone the repository:

    ```bash
    git clone https://github.com/PATMESH/Learning-Management-System.git
    ```

2. Navigate to the frontend and backend folders and follow their respective setup instructions.

#Backend

- Open the backend folder in IntelliJ IDEA or Spring Tool Suite (STS).
- Update the database credentials in backend/application.properties.
- Build and run the project from the IDE.

#Frontend

- Open the frontend folder in Visual Studio Code (VS Code).
- Then the terminal, run:

```bash
    npm install
    npm start
```  

## Usage

- Visit the application on http://localhost:3000.

- As an admin, you can manage courses, create assessments, and monitor user progress. To access the admin dashboard, if your application is running locally, you can navigate to http://localhost:3000/admin.

## Default Admin Credentials
- Email: admin@gmail.com
- Password: admin123

- Users can register, log in, view courses, take assessments, and receive certificates.

## API Documentation

- Access interactive API docs at:
  http://localhost:8080/swagger-ui/index.html

## Contributing

- Open issues to report bugs or suggest features
- Submit pull requests to improve the project
- Feedback and contributions are highly appreciated

## Site Images
**Login:**

![Screenshot (84)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/5287bb3e-32b3-4d07-b430-30d9f0f8c511)



**Register:**
![Screenshot (85)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/7af66295-bac6-4af2-a415-d666ffc9fb00)



**Courses:**
![Screenshot (86)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/b466f521-29f6-4af3-a8dc-2449708b60c0)



**Profile:**
![Screenshot (87)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/707d3fa8-0462-4048-a740-c3f3e225c504)
![Screenshot (88)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/0d4b22fe-01b0-4176-b03f-8ba780eb0589)



**Learnings:**
![Screenshot (89)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/7179e9bd-648d-4534-8495-6403a07e9482)



**Course learning:**
![Screenshot (90)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/c79f58d5-d5e0-4899-85cc-fe126fdc09c5)
![Screenshot (91)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/79641a32-f261-433c-a183-7f262a121c9b)



**Assessment:**
![Screenshot (92)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/c6c2cd14-e3c3-4906-bfec-85054325542e)



**Certificate:**
![Screenshot (94)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/602071e3-f74c-4026-9d7c-fc1cc9aa4f58)



**Dashboard:**
![Screenshot (95)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/ba3a9695-cde5-437d-b05c-2c1babb1eedc)
![Screenshot (96)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/5383d0f6-edba-4cd3-8fb0-53ba2ca76b5c)
![Screenshot (97)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/d02a3ed9-40a2-403e-ad4c-743986d3bb1a)



**Add Course:**
![Screenshot (98)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/a57c4b2b-d8ca-4035-8153-2626298474e6)



**Edit Course:**
![Screenshot (99)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/4dddc1b2-435b-4a07-864d-eeb4a4d6b233)



**Add Assessment Questions:**
![Screenshot (100)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/91fd1e0a-b613-4814-a1b4-69827352919f)



**Home page:**
![Screenshot (80)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/8d67282c-0043-4ed6-ae9d-956489b27e55)
![Screenshot (81)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/956f27e9-3552-4411-8ff5-d2cdc640c240)
![Screenshot (82)](https://github.com/PATMESH/Learning-Management-System/assets/101879714/a6550a77-605c-46e9-b038-fd2b1949575b)
