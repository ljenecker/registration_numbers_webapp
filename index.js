const express = require('express');
// const flash = require('express-flash');
// const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const Pool = pg.Pool;

// const Users = require('./routes/users');
// const UsersService = require('./services/users-service');

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://lorenzo:123@localhost:5432/registration_numbers_app_tests';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

// const usersService = UsersService(pool);
// const usersRoutes = Users(usersService);

// app.use(session({
//     secret: 'abc123',
//     resave: false,
//     saveUninitialized: true
// }));

// initialise the flash middleware
// app.use(flash());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// app.get('/', usersRoutes.counter);
// app.post('/greetme/add', usersRoutes.add);
// app.post('/greetme/reset', usersRoutes.reset);
// app.post('/greetme/showAll', usersRoutes.showAll);
// app.get('/greetme/:id', usersRoutes.showById);

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
