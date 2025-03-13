# Retro Board API

A RESTful API for managing retrospective boards, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for handling routes and middleware
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **WebSockets**: Real-time communication for collaborative features
- **bcrypt.js**: Password hashing

## API Documentation

### Authentication

All authenticated endpoints require a JWT token in the Authorization header:
`Authorization: Bearer <token>`

#### Register a User

```
POST /api/users/register
```

**Request Body:**

```json
{
  "username": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:** User object (password and tokens omitted)

#### Login

```
POST /api/users/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:** User object with authentication token

#### Logout

```
POST /api/users/logout
```

_Authentication required_

**Response:** Success message

#### Update User

```
PATCH /api/users/update/:id
```

_Authentication required_

**Request Body:** Fields to update
**Response:** Updated user object

### Boards

#### Create a Board

```
POST /api/boards
```

_Authentication required_

**Request Body:**

```json
{
  "name": "Sprint Retrospective",
  "columns": [
    { "name": "What went well" },
    { "name": "What could be improved" },
    { "name": "Action items" }
  ]
}
```

**Response:** Created board object

#### Get All Boards

```
GET /api/boards
```

_Authentication required_

**Response:** Array of board objects

#### Get a Specific Board

```
GET /api/boards/:id
```

_Authentication required_

**Response:** Board object

#### Get a Shared Board

```
GET /api/boards/shared/:link
```

**Response:** Board object

#### Update a Board

```
PATCH /api/boards/:id
```

_Authentication required_

**Request Body:** Fields to update
**Response:** Updated board object

#### Add a Card to a Column

```
POST /api/boards/:boardId/columns/:columnId/cards
```

_Authentication required_

**Request Body:**

```json
{
  "content": "Team collaboration improved",
  "author": "John"
}
```

**Response:** Updated board object

#### Delete a Board

```
DELETE /api/boards/:id
```

_Authentication required_

**Response:** Success message

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/retro-board
   JWT_SECRET=your_secret_key
   ```
4. Start the development server: `npm run dev`

## WebSockets

The API includes WebSocket support for real-time collaboration on boards. Clients can connect to:

```
ws://localhost:3000
```

Events:

- `board-update`: Sent when a board is modified
- `new-card`: Sent when a new card is added

## Health Check

```
GET /health
```

**Response:** `{ "status": "ok" }`
