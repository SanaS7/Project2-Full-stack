const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const compression = require('compression');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ /* handlebars configuration */ });

// Set up the MongoDB connection
mongoose.connect('mongodb+srv://boybrown552:zXgo9cMzbRgxnJ4P@cluster0.zsze6ft.mongodb.net/lightCville_db=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const store = new MongoDBStore({
  uri: 'mongodb+srv://boybrown552:zXgo9cMzbRgxnJ4P@cluster0.zsze6ft.mongodb.net/lightCville_db=true&w=majority',
  collection: 'sessions',
});

store.on('error', function (error) {
  console.error(error);
});

const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

app.use(compression());
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// server
app.use(routes);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
