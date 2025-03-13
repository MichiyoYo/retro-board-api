const express = require('express');
const connectDB = require('./config/db');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const boardRoutes = require('./routes/boardRoutes');
const { setupWebSocket } = require('./utils/websocket');
const cors = require('cors');
const http = require('http');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Create HTTP server and setup WebSocket
const server = http.createServer(app);
setupWebSocket(server);

const PORT = config.port;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
