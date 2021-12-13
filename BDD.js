//preparation
var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: ".data/db.sqlite3" },
    useNullAsDefault: true,
    debug: true,
});

//fonctions de creation
    async function creation_table_users() {
      try{
        var table = "users";
        await knex.raw("CREATE TABLE IF NOT EXISTS users (login VARCHAR(255) PRIMARY KEY, pass VARCHAR(255) NOT NULL)");
        await knex('users').insert({login: 'pounsi',pass: 'motdepasse'})
        await knex('users').insert({login: 'toure',pass: 'motdepasse2'})

      } catch (err) {               
        console.error('error:', err);    
      } 
    }

    async function creation_table_event() {
      try{
        var table = "event";
        await knex.raw("CREATE TABLE IF NOT EXISTS event (id INTEGER PRIMARY KEY AUTOINCREMENT ,titre VARCHAR(255), createur VARCHAR(255), description VARCHAR(255), titrecal VARCHAR(255),datedebut date,heuredebut integer, duree integer)");

      } catch (err) {                           
        console.error('error:', err); 
      } 
    }

    async function creation_table_calendrier() {
      try{
        var table = "calendrier";
        await knex.raw("CREATE TABLE IF NOT EXISTS calendrier (titre VARCHAR(255) , createur VARCHAR(255),droit VARCHAR(255),PRIMARY KEY(titre,createur))");

      } catch (err) {                           
        console.error('error:', err); 
      } 
    }

    async function creation_table_favoris() {
      try{
        var table = "favoris";
        await knex.raw("CREATE TABLE IF NOT EXISTS favoris (calendrier VARCHAR(255) , personne VARCHAR(255), createur VARCHAR(255),PRIMARY KEY(calendrier,personne,createur))");

      } catch (err) {                           
        console.error('error:', err); 
      } 
    }

//fonction de suppression
    async function suppression_des_tables() {
      try{
        //await knex.raw("DROP TABLE IF EXISTS event");
        //await knex.raw("DROP TABLE IF EXISTS users");
        //await knex.raw("DROP TABLE IF EXISTS calendrier");
        await knex.raw("DROP TABLE IF EXISTS favoris");

      } catch (err) {                     
        console.error('error:', err);    
      } 
    }

//fonction d'affichage
    async function affichage_des_tables() {
      try{
        var rows = await knex.select().from('users');
        console.log(rows);
        var rows = await knex.select().from('event');
        console.log(rows);
        var rows = await knex.select().from('calendrier');
        console.log(rows);
        var rows = await knex.select().from('favoris');
        console.log(rows);

      } catch (err) {                     
        console.error('error:', err);    
      } 
    }

//fonction d'insertion
    async function insertion_calendrier() {
      try{
        await knex('calendrier').insert({titre: "younes",createur:"abio",droit:"R"})

      } catch (err) {               
        console.error('error:', err);    
      } 
    }

    async function insertion_evenement() {
      try{
        await knex('event').insert({titre: "La salle",createur:"a",description:"Faire 10 muscle up et 600 tractions",titrecal:"Vacance",datedebut:"2018-04-19",heuredebut:"2",duree:"3"})
        await knex('event').insert({titre: "Projet",createur:"a",description:"Faire le projet AWS",titrecal:"Vacance",datedebut:"2018-04-19",heuredebut:"7",duree:"4"})

      } catch (err) {               
        console.error('error:', err);    
      } 
    }

    async function insertion_favoris() {
      try{
        await knex('favoris').insert({calendrier: "travail",personne:"a",createur:"abio"})
        await knex('favoris').insert({calendrier: "école",personne:"a",createur:"abii"})

      } catch (err) {               
        console.error('error:', err);    
      } 
    }

//le Main
    async function Main() {
      //await suppression_des_tables();
      //await creation_table_users();
      //await creation_table_event();
      //await creation_table_calendrier();
      await creation_table_favoris();
      //await affichage_des_tables();
      //await insertion_calendrier();
      //await insertion_favoris();
      //await insertion_evenement();
      await knex.destroy();

    }

Main();