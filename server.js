const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// import Routes

// Initialize the app
const app = express();
const port = process.env.PORT || 8000;