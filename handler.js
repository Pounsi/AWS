var knex = require('knex')({
    client: 'sqlite3',
    connection: {filename: ".data/db.sqlite3"},
    useNullAsDefault: true,
    debug: true,
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

function dateFr(t){
  var date = new Date(t);
  var mois=date.getMonth()+1;
  var jour = date.getDate();
  if(mois < 10) mois = "0"+mois;
  if(jour < 10) jour = "0"+jour;
  var message = date.getFullYear()+"-"+mois+"-"+jour;
  return message;
}

exports.inscription = async function(req, res) {
  
  
  if ((req.body.pass) && (req.body.login) && (req.body.login !='') && (req.body.pass !=''))
  {
  var Slash = new RegExp('[/{}:;]', 'gi');
  req.body.login = req.body.login.replace(Slash,"");
    try{    
      var rows = await knex.select().from('users').where('login',req.body.login);
      if(!rows[0]){
        var hash = bcrypt.hashSync(req.body.pass, saltRounds);
        await knex.raw('INSERT INTO users VALUES (?, ?)',
                 [ req.body.login, hash]);
        req.session.loged = 'true';
        req.session.login = req.body.login;
        res.redirect('/'+req.session.login+'/home');
      }
      else{
       res.render('enregistrement.html'); 
      }
    }
    catch(e){
      res.send(e);
    }
  }
  else
  {
    res.render('enregistrement.html');
  }
}

exports.connexion = async function(req, res) {
  var login = req.body.login;                
  var pass = req.body.pass;
  
  var Slash = new RegExp('[/{}:;]', 'gi');
  login = login.replace(Slash,"");
  try {
    var users = await knex('users').where({  'login'   : login,  });

    if ((users.length == 1) && (bcrypt.compareSync(pass, users[0].pass))) 
    {                  
      req.session.loged = 'true';
      req.session.login = login;
      res.redirect('/'+req.session.login+'/home');
    }
    else
    {
      res.render('connexion.html');
    }
  } 
  catch (err) {                       
    console.error('Database error:', err);     
    res.send(err);
  } 
    
}

exports.index = function(req, res) {
  if((req.session.loged) && (req.session.loged == 'true'))
  {
      res.redirect('/'+req.session.login+'/home');
  }
  else
      res.sendFile(__dirname + '/views/connexion.html');
}

exports.acceuilPost = async function(req, res) {
  
  var Slash = new RegExp('[/{}:;]', 'gi');
  req.body.titre = req.body.titre.replace(Slash,"");
  
  var titre = req.body.titre;                
  var createur = req.session.login;
  var droit = req.body.droit;
  var rows = await knex.select().from('calendrier').where('titre',req.body.titre).andWhere('createur',req.session.login);
  
  if(rows[0]){
     res.redirect('/'+req.session.login+'/home');
  }
  if(req.body.supprimer && req.body.supprimer == "ok"){
    try { 
       await knex('calendrier').where('titre',req.body.titre).andWhere('createur',req.session.login).del();
       await knex('favoris').where('calendrier',req.body.titre).andWhere('createur',req.session.login).del();
       await knex('event').where('titrecal',req.body.titre).andWhere('createur',req.session.login).del();
      } 
      catch (err) {                       
        console.error('Database error:', err);     
        res.send(err);
      }
    }
    else{
      try { 
        await knex.raw('INSERT INTO calendrier VALUES (?, ?, ?)',
                   [ titre, createur, droit]);
      } 
      catch (err) {                       
        console.error('Database error:', err);     
        res.send(err);
      }
    } 
    res.redirect('/'+req.session.login+'/home');  
}

exports.favoris = async function(req, res) {
  if(!(req.session.loged) || !(req.session.loged == 'true'))
  {
      res.redirect('/');
  }
  else if( !(req.session.login == req.params.login))
  {
    res.redirect('/'+req.session.login+'/favoris');
  }
  else
  {
    try{
      var rows = await knex.select().from('favoris').where('personne',req.session.login);
      res.render('favoris.html', { 'list' : rows,
                                   'login' : req.session.login});
    }
    catch(e){
      res.send(e);
    }
  } 
}

exports.calendrier = async function(req, res) {
  var fav = false;
  if(req.body.date_event ){
    var dateevent = req.body.date_event;
  }
  else{
    var d = new Date();
    var dateevent = dateFr(d.getTime());
  }
  try{ 
    var rows2 = await knex.select().from('calendrier').where('createur',req.params.login).andWhere('titre',req.params.calendar);
    if(rows2[0].droit != 'public' &&  rows2[0].createur != req.session.login){
        res.redirect('/'+req.session.login+'/home');
    }
    else if( (!(req.session.loged) || (req.session.loged == "false")) && (rows2[0].droit != 'public')) res.redirect('/');
    else{
      if( (!(req.session.loged) || (req.session.loged == 'false'))) req.session.login = 'invite';
      var prive = true;
      if(rows2[0].droit == 'public'){
         prive = false; 
      }
      var rows = await knex.select().from('event').where('createur',req.params.login).andWhere('titrecal',req.params.calendar).andWhere('datedebut',dateevent);  
      var rows3 = await knex.select().from('favoris').where('createur',req.params.login).andWhere('calendrier',req.params.calendar).andWhere('personne',req.session.login);
      if(rows3.length == 1 ){
        fav = true;
      }

      res.render('calendrier.html', { 'list' : rows,
                                     'date' : dateevent,
                                     'prive' : prive,
                                    'favoris' : fav,
                                   'login' : req.session.login,
                                   'calendrier' : req.params.calendar,
                                   'createur' : req.params.login,
                                   'entier' : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]});
  }
}
  catch(e){
    res.redirect("/");
  }
}

exports.deconnexion = function(req, res) {
  req.session.loged = 'false';
  req.session.login = '';
  res.redirect('/');
}

exports.supprimerEvent = async function(req, res) {
  if(req.body.id && req.body.id !="")
  {
    await knex('event')
      .where('id',req.body.id ).andWhere('createur',req.session.login).del();
    var rows = await knex.select().from('event').where('createur',req.session.login).andWhere('titrecal',req.body.calendrier).andWhere('datedebut',req.body.ladate);  
    res.send(rows);
  }
  else 
    res.send({});
}
exports.ajouterEvent = async function(req, res) {
  if(req.body.title && req.body.desc && req.body.duree && req.body.title!="" && req.body.desc!="" && req.body.duree!="")
  {
    var Slash = new RegExp('[/{}><:;]', 'gi');
  req.body.title = req.body.title.replace(Slash,"");
  req.body.desc = req.body.desc.replace(Slash,"");
    
      await knex('event').insert({titre: req.body.title,createur:req.session.login,description:req.body.desc,titrecal:req.body.calendrier,datedebut:req.body.ladate,heuredebut:req.body.Heuredebut,duree:req.body.duree})
      var rows = await knex.select().from('event').where('createur',req.session.login).andWhere('titrecal',req.body.calendrier).andWhere('datedebut',req.body.ladate);  
    res.send(rows);
  }
  else 
     res.send({});
}
exports.modifierEvent = async function(req, res) {
  var d1 = new Date();
  var datejour = dateFr(d1.getTime());
  var d = new Date(req.body.date);
  var dateNew = dateFr(d.getTime());
  if(req.body.title && req.body.HD && req.body.description && req.body.duree && req.body.date && req.body.title!="" && req.body.HD!="" && req.body.description!="" && req.body.duree!="" && req.body.date!="" && dateNew >= datejour)
  {
    var Slash = new RegExp('[/{}><:;]', 'gi');
  req.body.title = req.body.title.replace(Slash,"");
  req.body.description = req.body.description.replace(Slash,"");
    
    await knex('event').where('id', req.body.id).andWhere('createur',req.session.login).update( {
        titre: req.body.title,
        description: req.body.description,
        duree:req.body.duree,
        heuredebut:req.body.HD,
        datedebut:req.body.date
    })
    var rows = await knex.select().from('event').where('createur',req.session.login).andWhere('titrecal',req.body.calendrier).andWhere('datedebut',req.body.ladate);  
    res.send(rows);
  }
  else 
    res.send({});
}

exports.ajouterFavoris = async function(req, res) {
  if(req.body.calendrier && req.body.createur && req.body.personne && req.body.calendrier!="" && req.body.createur!="" && req.body.personne!="")
  {
      await knex('favoris').insert({calendrier: req.body.calendrier,createur:req.body.createur,personne:req.session.login})
      res.send("le calendrier a bien été inseré dans vos favoris");
  }
  else 
    res.send("insertion dans vos favoris impossible");
}

exports.supprimerFavoris = async function(req, res) {
  if(req.body.calendrier && req.body.createur && req.body.personne && req.body.calendrier!="" && req.body.createur!="" && req.body.personne!="")
  {
    await knex('favoris')
      .where('calendrier',req.body.calendrier ).andWhere('createur',req.body.createur).andWhere('personne',req.session.login).del();
    res.send("Le Calendrier a bien été supprimé de vos Favoris");
  }
  else 
    res.send("suppression impossible");
}

exports.modifierDroit = async function(req, res) {
  if(req.body.calendrier && req.body.login && req.body.prive && req.body.calendrier!="" && req.body.login!="" && req.body.login == req.session.login)
  {
      if(req.body.prive == "true"){
        await knex('calendrier').where('titre', req.body.calendrier).andWhere('createur',req.body.login).update( { droit : 'public' });
        res.send("Votre Calendrier est en Public");
      }else{
        await knex('calendrier').where('titre', req.body.calendrier).andWhere('createur',req.body.login).update( { droit : 'prive' });
        res.send("Votre Calendrier est en Privé");
      }
    
  }
  else 
    res.send("modification de droit impossible");
}

exports.naviguer = async function(req, res) {
  if(req.body.calendrier && req.body.createur && req.body.ladate)
  { 
    var rows = await knex.select().from('event').where('createur',req.body.createur).andWhere('titrecal',req.body.calendrier).andWhere('datedebut',req.body.ladate);  
    var rows2 = await knex.select().from('calendrier').where('createur',req.body.createur).andWhere('titre',req.body.calendrier);
    if(req.session.login == req.body.createur || rows2[0].droit == 'public'){
      res.send(rows);
    }
    else
       res.send({});
  }
  else  
     res.send({});
}

exports.acceuilGet = async function(req, res) {
  if(!(req.session.loged) || !(req.session.loged == 'true'))
  {
      res.redirect('/');
  }
  else if( !(req.session.login == req.params.login))
  {
    res.redirect('/'+req.session.login+'/home');
  }
  else
  {
    try{
      var rows = await knex.select().from('calendrier').where('createur',req.session.login);
      res.render('acceuil.html', { 'list' : rows,
                                   'login' : req.session.login});
    }
    catch(e){
      res.send(e);
    }
  } 
}