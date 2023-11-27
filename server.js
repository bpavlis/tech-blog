const express = require("express");
const app = express();

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const path = require("path");

const routes = require("./controllers");
const sequelize = require("./config/connection");

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const sess = {
  secret: 'gary doesnt know',
  cookies: {
    maxAge: 1 * 24 * 60 * 60 * 1000, //expire after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// const okToSync = (process.env.NODE_ENV === "production") ? false : false;
// sequelize.sync({ force: okToSync }).then(() => {
//   app.listen(PORT, () => console.log(`now listening at http://localhost:${PORT}`));
// });
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
