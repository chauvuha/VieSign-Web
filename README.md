# VieSign - The first Vietnamese Sign Language (VSL) online learning platform

I co-founded, designed, and built the first and only Vietnamese Sign Language (VSL) learning platform to address the shortage of sign language interpreters and improve sign language education within the Vietnamese healthcare system. This platform was created in collaboration with CED (The Center of Research & Education for the Deaf) and received support from Oxfam and EU grants.

This repository is the demo page version of VieSign, with our backend running on **MongoDB** and **Node.js**, and frontend running on **ReactJS**. The website is currently being used by thousands of deaf people, their families, VSL enthusiasts, nurses, or doctors. 


## Prerequisites

Ensure that the following software is installed on your system:

- **MongoDB**: Version 5.0.4
- **NPM**: Version 8.1.0
- **Node.js**: Version 16.13.0
- **MongoDB Compass**: (Optional, for database management)

## Backend Setup

To run the backend of the application, follow these steps:

1. **Install Dependencies**
   
   Navigate to the backend directory (if applicable) and install the necessary dependencies:
   ```bash
   npm install
   ```

2. **Start the Backend Server**
   
   Use `nodemon` to start the backend server:
   ```bash
   nodemon server
   ```

### Important Notes

- **MongoDB Connection**
  
  Ensure that MongoDB is running before starting the backend server. You can start MongoDB using the `mongod` command. A successful connection will be indicated by the message: `"Successfully connected to MongoDB Atlas"` in the terminal.

- **Handling bcrypt Issues**
  
  If you encounter issues related to `bcrypt`, execute the following commands sequentially to resolve them:
  ```bash
  npm install --save bcryptjs
  npm uninstall bcrypt
  npm install bcrypt
  ```

## Frontend Setup

To run the frontend of the application, follow these steps:

1. **Install Dependencies**
   
   Navigate to the frontend directory (if applicable) and install the necessary dependencies:
   ```bash
   npm install
   ```

2. **Start the Frontend Server**
   
   Start the frontend server using:
   ```bash
   npm start
   ```


## License

This project is licensed under the [MIT License](LICENSE).

```
