# Learning Management System

## Overview

This project is a Learning Management System (LMS) built with React.js for the frontend, Spring Boot for the backend, and MySQL as the database. It provides a comprehensive platform for managing online courses, user profiles, assessments, progress tracking, and more.

---

## Features

### User Management
- User registration and login functionality.
- User profiles with the ability to update information.

### Course Management
- Admin can add, edit, and manage courses.
- Course details include name, instructor, description, and more.

### Assessment
- Users can take assessments related to courses.
- Admin can create and manage assessment questions.

### Progress Tracking
- Monitor user progress and completion status.
- Visual representation of user progress.

### Certificate Generation
- Automatic certificate generation upon course completion.
- Personalized certificates with user details.

### Discussion Forum
- Course-specific discussion forums for users.
- Interaction between users and instructors.

### Authentication & Security
- JWT token-based authentication.
- Role-based access control (**ADMIN**, **USER**).
- Secure password encryption.
- Default admin account for initial setup.
- *Note: INSTRUCTOR role will be implemented soon.*

### Admin Dashboard
- Manage courses and assessment questions.
- Track students, courses, and enrollments.

--- 

## Technologies Used

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

## Backend

- Open the backend folder in IntelliJ IDEA or Spring Tool Suite (STS).
- Update the database credentials in backend/application.properties.
- Build and run the project from the IDE.

## Frontend

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

<img width="1512" height="861" alt="image" src="https://github.com/user-attachments/assets/42b6bf7b-b974-45b4-98d1-54b09de79ec1" />



**Register:**
<img width="1512" height="858" alt="image" src="https://github.com/user-attachments/assets/3e033d24-5a75-4169-bbbc-4f1506b30b80" />



**Courses:**
<img width="1512" height="863" alt="image" src="https://github.com/user-attachments/assets/d9b5bf85-da92-47de-af60-dd038619bd46" />



**Profile:**
<img width="1504" height="857" alt="image" src="https://github.com/user-attachments/assets/16d6d7af-b24f-43a9-87e7-cb2b4877a708" />
<img width="1512" height="858" alt="image" src="https://github.com/user-attachments/assets/946ac434-6511-4edf-922f-c44bdd8ec510" />



**Learnings:**
<img width="1512" height="862" alt="image" src="https://github.com/user-attachments/assets/73e52319-8e91-49ff-aa0b-3f92c9fad7c4" />



**Course learning:**
<img width="1512" height="860" alt="image" src="https://github.com/user-attachments/assets/ba9f6d1a-c1ce-4850-adba-059f84a57130" />



**Assessment:**
<img width="1512" height="861" alt="image" src="https://github.com/user-attachments/assets/669a7fe6-f6c9-4be7-93a6-a65daf971c43" />



**Certificate:**
<img width="1512" height="863" alt="image" src="https://github.com/user-attachments/assets/10f71d60-adbd-43b4-bde4-f9a793930811" />



**Dashboard:**
<img width="1512" height="864" alt="2025-10-23_15-57-52" src="https://github.com/user-attachments/assets/3f2101fa-fec2-409c-94cc-8720b90da1f2" />
<img width="1512" height="865" alt="2025-10-23_15-58-03" src="https://github.com/user-attachments/assets/8f2c1f15-067d-4f81-abc3-9cb5730075c1" />
<img width="1512" height="862" alt="2025-10-23_15-58-10" src="https://github.com/user-attachments/assets/edd2ac8b-7e7f-4a55-9517-e5e75eac337d" />
<img width="1512" height="862" alt="image" src="https://github.com/user-attachments/assets/68cfeccf-b30b-44dc-80fa-e738ea976399" />



**Course Management:**
<img width="1512" height="861" alt="image" src="https://github.com/user-attachments/assets/2903c72c-029e-4ec3-a271-ecbe370db64b" />
<img width="1512" height="861" alt="image" src="https://github.com/user-attachments/assets/c3ef2b07-1b13-4ba8-ab55-3c68ebf9ec78" />



**Assessment Management:**
<img width="1511" height="863" alt="image" src="https://github.com/user-attachments/assets/0cca862b-b7bc-4e5d-8483-286e9d3a6cad" />
<img width="1512" height="862" alt="image" src="https://github.com/user-attachments/assets/925426e7-0183-49fc-8cbf-00c91b67092a" />



**Home page:**
<img width="1512" height="859" alt="image" src="https://github.com/user-attachments/assets/d7d5cd46-8981-48cf-bf0a-5efe43b7e58c" />
<img width="1512" height="851" alt="image" src="https://github.com/user-attachments/assets/ee1fcd65-4c35-45ae-9ead-2eeabdad3042" />
<img width="1512" height="856" alt="image" src="https://github.com/user-attachments/assets/3a1d890d-e597-40fb-9fba-481a903818ea" />

