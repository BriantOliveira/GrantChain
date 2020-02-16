/* eslint-disable no-console */
/*
 * GrantParty main server
 */
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const path = require('path');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');


const { Op } = Sequelize;
const sanitizer = require('sanitize');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');

/** Instantiate the server */
const app = express();
const PORT = process.env.PORT || 3000;

/** Wallet */
// const ost = require('./services/ost.js');


/** Import Routes */
const { verifyAuthentication } = require('./utils/middleware');
const routes = require('./routes');
const indexRouter = require('./controllers/index');
const authRouter = require('./controllers/auth');
const profileRouter = require('./controllers/organization');

app.use(cookieParser());
app.use(methodOverride('_method'))

/** Set up static public directory */
app.engine('.hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static('public'));


/** Middlewarez */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(compression());
app.use(sanitizer.middleware);
app.use(expressSanitizer());




/**  SQL Connection */
const sequelize = new Sequelize(
  `postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
  {
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
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/organization', profileRouter);


/** Protected Routes */
// app.use(verifyAuthentication);
app.use('/api', routes);

// wallets
// app.use(ost);

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
  console.log('GrantChain listening on port', PORT);
});
