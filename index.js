const express = require('express');
const server = express();

server.use(json());

server.listen(3000);