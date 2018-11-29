const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const Pool = pg.Pool;

const Registration = require('./routes/registration');
const RegistrationService = require('./services/registration-service');

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://lorenzo:123@localhost:5432/registration_numbers_app';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const registrationService = RegistrationService(pool);
const registrationRoutes = Registration(registrationService);

app.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', registrationRoutes.show);
app.post('/registration/add', registrationRoutes.regAdd);
app.post('/registration/filter', registrationRoutes.regFilter);
app.post('/registration/delete', registrationRoutes.regDelete);
app.post('/registration/reset', registrationRoutes.regReset);
app.post('/town/edit', registrationRoutes.townEdit);
app.post('/town/delete', registrationRoutes.townDelete);

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
