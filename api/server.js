require('dotenv').config();
const http = require('http');
const app = require('./app/app');

const server = http.createServer(app);

server.listen(5000, () => {
  console.log('Server Running on Port http://localhost:5000');
});
