const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./app/routes/apiRoutes');
const authRoutes = require('./app/routes/authRoutes');
const schedule = require('node-schedule');
require('dotenv').config();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const app = express();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Handle client-side routing by returning index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Create HTTPS server
const options = {
  cert: fs.readFileSync('D:/final srgold/newserver/cert/cert.pem'),
  key: fs.readFileSync('D:/final srgold/newserver/cert/key.pem'),
  passphrase: 'Vinsup@123.!@#', // Replace 'your-passphrase' with your actual passphrase
};

const server = https.createServer(options, app);
const db = require('./db');
// Start server
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at https://${HOSTNAME}:${PORT}`);
});
