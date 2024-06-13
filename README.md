# Distributed Task Scheduler

This project is a distributed task scheduler application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using TypeScript. It supports scheduling and executing both one-time and recurring tasks. The application includes a user-friendly interface to manage tasks and view execution logs.

## Features

- Schedule one-time and recurring tasks
- Tasks executed within 10 seconds of their scheduled time
- View list of scheduled tasks
- Edit and delete tasks
- View logs of executed tasks

## Requirements

- Node.js
- Docker (for running MongoDB and optionally for the application)

## Installation

### Backend

1. **Clone the repository**

   ```bash
   git clone https://github.com/mark-abraham-dev/task-scheduler.git
   cd task-scheduler/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   Create a `.env` file in the root of the backend directory and add the following content:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/taskScheduler
   TIME_INTERVAL=10000
   ```

4. **Run MongoDB with Docker**

   ```bash
   docker run -d -p 27017:27017 --name mongo mongo
   ```

5. **Run the backend server**

   ```bash
   npm run dev
   ```

### Frontend

1. **Navigate to the frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   Create a `.env` file in the root of the frontend directory and add the following content:

   ```bash
   REACT_APP_SERVER_URL=http://localhost:5000/api
   ```

4. **Run the frontend application**

   ```bash
   npm start
   ```

## Running the Application

- The backend server will run on `http://localhost:5000`.
- The frontend application will run on `http://localhost:3000`.

## Deploying the Application

### Docker Setup

1. **Dockerfile for Frontend**

   ```bash
   # Dockerfile for React Frontend
   FROM node:18
   WORKDIR /app
   COPY package.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Dockerfile for Backend**

   ```bash
   # Dockerfile for Node.js Backend
   FROM node:18
   WORKDIR /app
   COPY package.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["npm", "run", "dev"]
   ```

3. **docker-compose.yml**

   ```bash
   version: '3'
   services:
   frontend:
    build: ./frontend
    ports:
      - "3000:3000"
   backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/taskScheduler
   mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
   volumes:
   mongo-data:
   ```

4. **Build and Run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

### Deploying to Production

1. **Frontend Deployment**

   - Use a service like Vercel, Netlify, or any static site hosting provider to deploy the React frontend.

2. **Backend Deployment**
   - Deploy the backend to a cloud provider like Heroku, AWS, or DigitalOcean.
   - Ensure MongoDB connection string is properly set in the environment variables.

## Usage

1. **Create a Task**

   - Fill in the task title.
   - Set the execution time or cron expression.
   - Submit the form to schedule the task.

2. **View Scheduled Tasks**

   - View the list of scheduled tasks in the Task List column.
   - Edit or delete tasks using the buttons provided.

3. **View Execution Logs**
   - View the logs of executed tasks in the Execution Logs column.

## Development

### Backend

- **Task Model (`models/Task.ts`)**
  - Represents a task with `title`, `time`, and `cron` fields.
- **Log Model (`models/Log.ts`)**

  - Represents a log entry with `taskId` and `executionTime` fields.

- **Task Routes (`routes/task.ts`)**

  - CRUD operations for managing tasks.

- **Log Routes (`routes/log.ts`)**

  - Fetch logs of executed tasks.

- **Scheduler (`scheduler.ts`)**
  - Schedules and executes tasks using `cron`.

### Frontend

- **TaskForm Component (`components/TaskForm.tsx`)**
  - Form for creating and updating tasks.
- **TaskList Component (`components/TaskList.tsx`)**

  - Displays the list of scheduled tasks with options to edit and delete.

- **LogList Component (`components/LogList.tsx`)**
  - Displays the logs of executed tasks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
