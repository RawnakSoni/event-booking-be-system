# Event Booking System - Backend

A robust, scalable event booking system built with Node.js, Express, MongoDB, and BullMQ. This project demonstrates a strictly layered architecture designed for maintainability and scalability.

## 🚀 Architecture: Strict Layered Approach

The system adheres to a strict layered structure to ensure a clear separation of concerns:

`Routes -> Controller -> AppModule -> Module -> Repository -> Model`

- **Routes**: Define the API endpoints and apply middleware (Authentication, Authorization).
- **Controllers**: Thin wrappers that handle HTTP request parsing and response formatting.
- **AppModules**: Orchestrate high-level business flows, combining logic from multiple modules and triggering background notifications.
- **Modules**: Contain the core business logic and validation rules. **Only the Module layer is permitted to call the Repository layer.**
- **Repositories**: Encapsulate all direct data access logic (Mongoose/MongoDB) and interactions with external utilities (like BullMQ Queue definitions).
- **Models**: Mongoose schemas defining the data structure.

## 🏗️ Design Decisions

### 1. Process Separation (API vs. Worker)
To improve performance and scalability, the application is divided into two separate processes:
- **API Server**: Handles all HTTP traffic and management tasks.
- **Background Worker**: Dedicated process for consuming and executing heavy background tasks (emails, notifications).
*Both share a common Redis instance for BullMQ coordination and MongoDB for persistence.*

### 2. Email Fan-out Pattern
For high-volume event update notifications, we implemented a **Producer-Consumer Fan-out** pattern:
1. An `eventUpdate` job is created when an organizer modifies an event.
2. The worker processes this job and creates **individual** `sendIndividualEmail` jobs for every customer who booked the event.
3. This ensures that a single failed email doesn't block the entire batch and allows for granular retries.

### 3. Strict Repository Encapsulation
By restricting Repository access only to the Module layer, we ensure that:
- Database implementation details are never leaked into the AppModule or Controller layers.
- Business logic is centralized in Modules, making the system easier to test and modify.

### 4. Background Processing with BullMQ
All non-critical tasks (like sending emails) are handled asynchronously using BullMQ. This provides:
- **Resilience**: Automatic retries for failed jobs.
- **Observability**: Integrated Bull Board dashboard at `/admin/queues` for real-time monitoring.

## 📁 Project Structure

```text
src/
├── appModules/     # Workflow orchestration & coordination
├── controllers/    # Request handlers & response formatting
├── middleware/     # Authentication & Authorization (JWT)
├── modules/        # Core business logic (calls Repos)
├── models/         # Mongoose Schemas (User, Event, Booking)
├── repositories/   # Data access logic (Database/Queue)
├── routes/         # Express API route definitions
├── workers/        
│   ├── index.js    # Background Worker entry point
│   ├── emailQueue.js # Shared Queue & Redis connection
│   └── emailWorker.js # Job handlers & worker logic
└── index.js        # API Server entry point
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Redis

### Installation
```bash
npm install
```

### Running with PM2 (Production/Process Management)
To run both the server and worker as managed processes:
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```
To monitor processes:
```bash
pm2 list
pm2 logs
pm2 monit
```

### Testing
We provide a comprehensive test script that clears the DB and runs an end-to-end flow:
```bash
./test-api.sh
```

## 📊 Monitoring
Visualize background jobs by visiting: `http://localhost:3000/admin/queues`
