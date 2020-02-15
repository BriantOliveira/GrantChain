/* eslint-disable no-console */
/*
 * GrantParty main server
 */
require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const compression = require('compression');
const path = require('path');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const sanitizer = require('sanitize');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');

/** Import Routes */

/** Instantiate the server */
const app = express();
const PORT = process.env.PORT || 3000;

/** Set up static public directory */
app.use(express.static(path.join(__dirname, '..', 'public')));

/** Middlewarez */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(sanitizer.middleware);
app.use(expressSanitizer());

/**  SQL Connection */
const sequelize = new Sequelize(
  `postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
  {
    operatorsAliases: Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  /** Early exit */
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });

/** Set up routes */


/** Protected Routes */
// app.use(verifyAuthentication);



/** Any remaining request with an extension (.js, .css, etc...) send 404 */
app.use((req, _, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  }

  next();
});

app.listen(PORT, () => {
  console.log('GrantParty listening on port', PORT);
});
