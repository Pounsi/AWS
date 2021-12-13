//preparation de l'application
var express = require('express'),
    helmet = require('helmet'),
    session = require('express-session');
var bodyP = require('body-parser');
var nunjucks = require('nunjucks');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var handler = require('./handler.js');

var app = express();
app.use(bodyP.urlencoded({ extended: false }))

app.use(helmet());

nunjucks.configure('views', { express: app, noCache: true });

app.use(session( { secret : '12345', resave: false, saveUninitialized: false, cookie:{maxAge : 600000} } ));


var knex = require('knex')({
    client: 'sqlite3',
    connection: {filename: ".data/db.sqlite3"},
    useNullAsDefault: true,
    debug: true,
});

app.use(express.static('public'))

app.use('/p', express.static('private'))

//configuration des handlers

app.get('/', handler.index);
app.post('/',handler.connexion);
app.all('/signup',handler.inscription);
app.get('/logout', handler.deconnexion);

app.get('/:login/home',handler.acceuilGet);
app.post('/:login/home',handler.acceuilPost);
app.get('/:login/favoris',handler.favoris);
app.all('/calendar/:login/:calendar',handler.calendrier);

app.post('/ajouterevent',handler.ajouterEvent);
app.post('/supprimerevent',handler.supprimerEvent);
app.post('/modifierevent',handler.modifierEvent);

app.post('/ajouterfavoris',handler.ajouterFavoris);
app.post('/supprimerfavoris',handler.supprimerFavoris);

app.post('/modifierdroit',handler.modifierDroit);

app.post('/naviguer',handler.naviguer);

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})



