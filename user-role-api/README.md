# User Role API

RESTful API for managing Users and Roles with soft delete functionality.

## Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)

## Installation

```bash
cd user-role-api
npm install
```

## Configuration

Create `.env` file in the root directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-role-db
```

## Running the Server

```bash
npm start
```

## API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users | Create new user |
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Soft delete user |
| POST | /api/users/enable | Enable user (status = true) |
| POST | /api/users/disable | Disable user (status = false) |

### Role Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/roles | Create new role |
| GET | /api/roles | Get all roles |
| GET | /api/roles/:id | Get role by ID |
| PUT | /api/roles/:id | Update role |
| DELETE | /api/roles/:id | Soft delete role |

## Request/Response Examples

### Create User
```json
POST /api/users
{
  "username": "johndoe",
  "password": "password123",
  "email": "john@example.com",
  "fullName": "John Doe"
}
```

### Enable User
```json
POST /api/users/enable
{
  "email": "john@example.com",
  "username": "johndoe"
}
```

### Disable User
```json
POST /api/users/disable
{
  "email": "john@example.com",
  "username": "johndoe"
}
```

## User Schema

| Field | Type | Required | Unique | Default |
|-------|------|----------|--------|---------|
| username | String | Yes | Yes | - |
| password | String | Yes | - | - |
| email | String | Yes | Yes | - |
| fullName | String | - | - | "" |
| avatarUrl | String | - | - | "https://i.sstatic.net/l60Hf.png" |
| status | Boolean | - | - | false |
| role | ObjectId | - | - | - |
| loginCount | Number | - | - | 0 |

## Role Schema

| Field | Type | Required | Unique | Default |
|-------|------|----------|--------|---------|
| name | String | Yes | Yes | - |
| description | String | - | - | "" |

