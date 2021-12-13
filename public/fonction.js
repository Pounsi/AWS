//variables globales:
  //pour mettre a jour l'affichage sans recharger
    var malistetitre = [];
    var malisteduree = [];
    var malistehd = [];
    var malistedescription = [];
    var malistedate = [];
    var malisteid = [];
  //pour conserver l'heure et la date 
    var date;
    var time;
    var droit;

//Fonction permettant de rechercher un calendrier
function rechercher(){
   var recherche = document.getElementById("recherche"); 
   window.location = "https://projet-aws.glitch.me/calendar/" + recherche.value;
   return false;
}


//fonction qui renvoie la date en francais (vendredi 03 mars 2018)
function dateFr(time)
{
   // les noms de jours / mois
   var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
   var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
   // on recupere la date
   var date = new Date(time);
   // on construit le message
   var message = jours[date.getDay()] + " ";   // nom du jour
   message += date.getDate() + " ";   // numero du jour
   message += mois[date.getMonth()] + " ";   // mois
   message += date.getFullYear();
   return message;
  
}

//fonction qui renvoie la date en format Date Sql (2018-03-03)
function dateFormatsql(time){
  
  var date = new Date(time);
  var mois = date.getMonth()+1;
  var jour = date.getDate();
  if(mois < 10) mois = "0"+mois;
  if(jour < 10) jour = "0"+jour;
  var message = date.getFullYear()+"-"+mois+"-"+jour;
  return message;
  
}

//Gere l'affichage de la date courante
function DateCourante(date_courante){  
  
  date = new Date(date_courante);
  time = date.getTime();
  var div = document.querySelector('#Date'); 
  var p = document.createElement('p');
  var date_input = document.querySelector('#date-input'); 
  date_input.value = dateFormatsql(time);
  p.setAttribute("id", "Mydate");
  div.appendChild(p);
  p.innerHTML="<h2>"+dateFr(time)+"</h2>"; 
  
}

function chargerEvents(malistetitre,malisteduree,malistehd) {
    
    var login = document.querySelector("#login").value;
    var createur = document.querySelector("#createur0").value;
    var div = document.querySelector('#DIV'); 
    div.innerHTML = '';
  
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    table.className="table"   

    var tr = document.createElement('tr');
    thead.appendChild(tr);
    tr.innerHTML="<th scope='col'>Heure</th> <th scope='col'>Evenement</th>";

    var dateAujourdhui = new Date();
    var timeAujourdhui = dateAujourdhui.getTime();
    var timestampJour = 24*60*60*1000;
    timeAujourdhui = timeAujourdhui - timestampJour;
    if((createur == login) && ( time > timeAujourdhui ) ){
      tr.innerHTML += "<th scope='col'>Ajouter/modifier</th>";
    }

    var i =0;
    var debut = -1;
    var fin = -1;
    var titre = "";

    for (var i = 0; i < 48; i++) {

      var duree = i*30;
      var minutes = duree % 60;
      var heures = (duree - minutes)/60;
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      var td = document.createElement('td');
      if((createur == login) && ( time > timeAujourdhui ) ){
        var td_ajouter = document.createElement('td');
      }

      if(i > debut && i<fin){
       tr.className="table-danger";
      }
      else{
        td.innerHTML="Aucun Evenement";
        if((createur == login) && ( time > timeAujourdhui ) ){
          td_ajouter.innerHTML='<div class="text-center" data-toggle="modal" data-target="#exampleModal'+i+'"><button type="button" class="btn btn-success btn-sm">Ajouter</button></div>';
        }
      }

      th.setAttribute("scope","row");
      if(heures <10)  th.innerHTML="0";
      else  th.innerHTML='';
      if(minutes == 0) th.innerHTML+=heures+"h"+minutes+"0";
      else th.innerHTML+=heures+"h"+minutes;

       for (var j = 0; j < malistetitre.length; j++) {
          if(i == parseInt(malistehd[j],10)){
            td.innerHTML="<div data-toggle='modal' data-target='#exampleModal'>"+malistetitre[j]+"</div>";
            if((createur == login) && ( time > timeAujourdhui ) ){
              td_ajouter.innerHTML='<div class="text-center" data-toggle="modal" data-target="#exampleModal'+i+'"><button type="button" class="btn btn-warning btn-sm">Voir</button></div>';
            }
            tr.className="table-danger";
            debut = i;
            fin = i + parseInt(malisteduree[j],10);
            titre = malistetitre[j];;

          }
      }

      td.dataset.ligne = i;
      tr.appendChild(th);
      tr.appendChild(td);
      if((createur == login) && ( time > timeAujourdhui ) ){
        tr.appendChild(td_ajouter);
      }
      tbody.appendChild(tr);

      //crée les modals
      afficheModalVide(i);
      afficheModal(i);

    }
    //ajoute les listener
    listener();
  
    div.appendChild(table);
    table.appendChild(tbody);
    table.appendChild(thead);
}




//Verifie si les 2 mot de passe sont indentique a l'enregistrement
function verif()
{
  var val1   = document.getElementById("pass").value,
      val2   = document.getElementById("pass2").value,
      id = document.getElementById("valider"),
      result = document.getElementById("result"),
      result2 = document.getElementById("result2");

  if(val1!=val2)
  {
    document.getElementById("result2").style.display = "none";
    document.getElementById("result").style.display = "inline";
    id.disabled = "disabled";
  }
  else 
  {
    document.getElementById("result").style.display = "none";
    document.getElementById("result2").style.display = "inline";
    id.disabled = "";
  }
}
     


//fonction qui rajoute/enleve un calendrier dans les favoris (ajax )
function addfavoris() 
{
  var bouton = document.querySelector('#boutonfavoris'); 
  var img = document.querySelector('#fav1');
  //ajouter un calendrier au favoris
  if(img)
  {
    //changer l'image
    bouton.innerHTML="<img id='fav2' src='https://cdn.glitch.com/daada4c4-0d06-4980-9c23-29b284fa7e28%2FfavorisOFF.jpg?1524500623946' height='80' width='auto' class='rounded2'>"

    //preparer les information pour la requette
    var calendrier = document.getElementById("calendrier0").value;
    var createur = document.getElementById("login").value;//a remplacer par le createur
    var login = document.getElementById("createur0").value;
    var data= 'calendrier='+calendrier+'&createur='+login+'&personne='+createur;
    alert(data);

    //demarer la requette et afficher le resultat
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.responseText);
        }
    }
    xhr.open('POST', '/ajouterfavoris', true);//pour ajouter un enevenement 
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data); 
  }
  
  //enlever un calendrier des favoris
  else
  {
    //changer l'image
    bouton.innerHTML="<img id='fav1' src='https://cdn.glitch.com/daada4c4-0d06-4980-9c23-29b284fa7e28%2FfavorisON.jpg?1524500621594' height='80' width='auto' class='rounded'>"
    
    //preparer les information pour la requette
    var calendrier = document.getElementById("calendrier0").value;
    var login = document.getElementById("login").value;
    var createur = document.getElementById("createur0").value;
    var data= 'calendrier='+calendrier+'&createur='+createur+'&personne='+login;

    //demarer la requette et afficher le resultat
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.responseText);
        }
    }
    xhr.open('POST', '/supprimerfavoris', true);//pour ajouter un enevenement 
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data); 
  }
}


function changerdroit(calendrier,prive,login) {
  var data= 'calendrier='+calendrier+'&login='+login+'&prive='+prive;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          alert(xhr.responseText);
          if (droit == "true") droit = "false";
          else droit = "true";
      }
  }
  xhr.open('POST', '/modifierdroit', true);//pour ajouter un enevenement 
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}


//Passe au jour identiquer dans l'input date
function ModifDate(){ 
  var form = document.querySelector('#FormInput');
  var date_input = document.querySelector('#date-input'); 
  date = new Date(date_input.value);
  time=date.getTime();
  var p = document.querySelector('#Mydate'); 

  date_input.value = dateFormatsql(time);
  p.innerHTML="<h2>"+dateFr(time)+"</h2>"; 
  
  var calendrier = document.getElementById("calendrier0").value;
  var createur = document.getElementById("createur0").value;
  var data= 'calendrier='+calendrier+'&createur='+createur+'&ladate='+date_input.value;
    var count;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var list = JSON.stringify(xhr.response);
          count = Object.keys(xhr.response).length;
          malistetitre = [];
          malisteduree = [];
          malistehd = []; 
          malistedescription = [];
          malistedate = [];
          malisteid = []; 

          for (var i=0 ; i< count ; i++){ 
              malistetitre.push(xhr.response[i].titre);
              malisteduree.push(xhr.response[i].duree);
              malistehd.push(xhr.response[i].heuredebut);
              malistedescription.push(xhr.response[i].description);
              malistedate.push(xhr.response[i].datedebut);
              malisteid.push(xhr.response[i].id);

          }
          chargerEvents(malistetitre,malisteduree,malistehd);
      }
    }
    xhr.open('POST', '/naviguer', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data); 
      
}



//Passe au jour précedent 
function JourPrec(){  
  
  var p = document.querySelector('#Mydate'); 
  var date_input = document.querySelector('#date-input'); 
  var timestampJour = 24*60*60*1000;
  time = time - timestampJour;
  var datePrec = dateFormatsql(time);
  date_input.value = dateFormatsql(time);
  p.innerHTML="<h2>"+dateFr(time)+"</h2>"; 
  if(document.getElementById("calendrier0"))
    var calendrier = document.getElementById("calendrier0").value;
  else
        var calendrier = document.getElementById("mcalendrier0").value;
  var createur = document.getElementById("createur0").value;
  var data= 'calendrier='+calendrier+'&createur='+createur+'&ladate='+datePrec;
    var count;
    var xhr = new XMLHttpRequest();
    malistetitre = [];
    malisteduree = [];
    malistehd = []; 
    malistedescription = [];
    malistedate = [];
    malisteid = []; 

    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var list = JSON.stringify(xhr.response);
          count = Object.keys(xhr.response).length;
          for (var i=0 ; i< count ; i++){ 
              malistetitre.push(xhr.response[i].titre);
              malisteduree.push(xhr.response[i].duree);
              malistehd.push(xhr.response[i].heuredebut);
              malistedescription.push(xhr.response[i].description);
              malistedate.push(xhr.response[i].datedebut);
              malisteid.push(xhr.response[i].id);

          }
       chargerEvents(malistetitre,malisteduree,malistehd);
        }
    }
    xhr.open('POST', '/naviguer', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data); 
      
          
}

//Passe au jour suivant
function JourSuivant(){ 
  var p = document.querySelector('#Mydate'); 
  var date_input = document.querySelector('#date-input'); 
  var timestampJour = 24*60*60*1000;
  time = time + timestampJour;
  var dateSuiv = dateFormatsql(time);
  date_input.value = dateFormatsql(time);
  p.innerHTML="<h2>"+dateFr(time)+"</h2>"; 
  
  if(document.getElementById("calendrier0"))
    var calendrier = document.getElementById("calendrier0").value;
  else
        var calendrier = document.getElementById("mcalendrier0").value;  var createur = document.getElementById("createur0").value;
  var data= 'calendrier='+calendrier+'&createur='+createur+'&ladate='+dateSuiv;
    var count;
    malistetitre = [];
    malisteduree = [];
    malistehd = []; 
    malistedescription = [];
    malistedate = [];
    malisteid = []; 

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var list = JSON.stringify(xhr.response);
          count = Object.keys(xhr.response).length;
          for (var i=0 ; i< count ; i++){ 
              malistetitre.push(xhr.response[i].titre);
              malisteduree.push(xhr.response[i].duree);
              malistehd.push(xhr.response[i].heuredebut);
              malistedescription.push(xhr.response[i].description);
              malistedate.push(xhr.response[i].datedebut);
              malisteid.push(xhr.response[i].id);

          }
       chargerEvents(malistetitre,malisteduree,malistehd);
       
        }
    }
    xhr.open('POST', '/naviguer', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data); 
      
}

//gerer les clics sur les boutons ajouter , supprimer et modifier (pour les 48 cases)
function listener(){			
for(var k=0;k<48;k++)
{
    $('.ajouter'+k).click(function(e){
      
        var x = $(this).attr("ligne");
        var HD = parseInt(document.getElementById("HD"+x).value,10);
        var duree = parseInt(document.getElementById("duree"+x).value,10);
        var ok=0;
        for(var k = HD+1 ; k < HD+duree; k++){
          for (var i=0;i<malistehd.length;i++){
            if(k == parseInt(malistehd[i],10) ){
                ok = 1;
            }
          }
        }
      
        
        var regex = /^[0-9]+$/;

        if((ok == 0) && (HD+duree<48) && regex.test(duree) ){
          
        var dateglobale = dateFormatsql(time);
        //preparer les information pour la requette
        var titre = document.getElementById("titre"+x).value;
        var description = document.getElementById("description"+x).value;
        var calendrier = document.getElementById("calendrier"+x).value;
        var ladate = dateglobale;
        var data= 'title='+titre+'&desc='+description+'&calendrier='+calendrier+'&Heuredebut='+HD+'&ladate='+ladate+'&duree='+duree;

        //demarer la requette et afficher le resultat
        e.preventDefault();
        var xhr = new XMLHttpRequest();
          xhr.responseType = 'json';

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var list = JSON.stringify(xhr.response);
                var count = Object.keys(xhr.response).length;
                malistetitre = [];
                malisteduree = [];
                malistehd = []; 
                malistedescription = [];
                malistedate = [];
                malisteid = []; 

                for (var i=0 ; i< count ; i++){ 
                    malistetitre.push(xhr.response[i].titre);
                    malisteduree.push(xhr.response[i].duree);
                    malistehd.push(xhr.response[i].heuredebut);
                    malistedescription.push(xhr.response[i].description);
                    malistedate.push(xhr.response[i].datedebut);
                    malisteid.push(xhr.response[i].id);

                }
                chargerEvents(malistetitre,malisteduree,malistehd);
            }
        }
        xhr.open('POST', '/ajouterevent', true);//pour ajouter un enevenement 
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data); 
      
        //faire disparaitre le modal
        $('#exampleModal'+x).modal('hide');
        }
        else if(HD+duree>=48) alert("La durée de l'evenement depasse la fin de journée !");
        else if(ok == 1) alert("les evenements se chevauchent !");
        else if(!regex.test(duree)) alert("La duree doit être un entier positif!");
        else alert("Vérifiez que tous les champs sont bien remplis !");
    });	

   $('.supprimer'+k).click(function(e){
        
      if (confirm("etes vous sur de vouloir supprimer l'evenement ?")) {   
        
        //preparer les information pour la requette
        var x = $(this).attr("ligne");
        var id = document.getElementById("ID"+x).value; 
        var calendrier = document.getElementById("mcalendrier"+x).value;
        var ladate = dateFormatsql(time);
        var data= 'id='+id+'&calendrier='+calendrier+'&ladate='+ladate;
        //demarer la requette et afficher le resultat
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var list = JSON.stringify(xhr.response);   
                var count = Object.keys(xhr.response).length;
                malistetitre = [];
                malisteduree = [];
                malistehd = []; 
                malistedescription = [];
                malistedate = [];
                malisteid = []; 

                for (var i=0 ; i< count ; i++){ 
                    malistetitre.push(xhr.response[i].titre);
                    malisteduree.push(xhr.response[i].duree);
                    malistehd.push(xhr.response[i].heuredebut);
                    malistedescription.push(xhr.response[i].description);
                    malistedate.push(xhr.response[i].datedebut);
                    malisteid.push(xhr.response[i].id);

                }
                chargerEvents(malistetitre,malisteduree,malistehd);
            }
        }
        xhr.open('POST', '/supprimerevent', true);//pour supprimer un enevenement 
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data); 
     
        //faire disparaitre le modal
        $('#exampleModal'+x).modal('hide');
      }
    });
      
  $('.modifier'+k).click(function(e){
     if (confirm("etes vous sur de vouloir modifier l'evenement ?")) {    
        var x = $(this).attr("ligne");
        var HD = parseInt(document.getElementById("mHD"+x).value,10);
        var duree = parseInt(document.getElementById("mduree"+x).value,10);
        var id = parseInt(document.getElementById("ID"+x).value); 
        var ok=0;
        for(var k = HD ; k < HD+duree; k++){
          for (var i=0;i<malistehd.length;i++){
            if(k == parseInt(malistehd[i],10) && (id != parseInt(malisteid[i],10))){
                ok = 1;
            }
          }
        }
    
        var regex = /^[0-9]+$/;

        if((ok == 0) && (HD+duree<48) && regex.test(duree) ){
        //preparer les information pour la requette
        var titre = document.getElementById("mtitre"+x).value;
        var mdate = document.getElementById("mdate"+x).value;
        var desc = document.getElementById("description"+x).value; 
        var calendrier = document.getElementById("mcalendrier"+x).value;
        var ladate = dateFormatsql(time);
        var data= 'id='+id+'&title='+titre+'&description='+desc+'&duree='+duree+'&HD='+HD+'&date='+mdate+'&calendrier='+calendrier+'&ladate='+ladate;
        
        //demarer la requette et afficher le resultat
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
             if((xhr.response != null)  && (xhr.response != undefined)){
                var list = JSON.stringify(xhr.response);
                var count = Object.keys(xhr.response).length;
                malistetitre = [];
                malisteduree = [];
                malistehd = []; 
                malistedescription = [];
                malistedate = [];
                malisteid = []; 

                for (var i=0 ; i< count ; i++){ 
                    malistetitre.push(xhr.response[i].titre);
                    malisteduree.push(xhr.response[i].duree);
                    malistehd.push(xhr.response[i].heuredebut);
                    malistedescription.push(xhr.response[i].description);
                    malistedate.push(xhr.response[i].datedebut);
                    malisteid.push(xhr.response[i].id);
                }
                chargerEvents(malistetitre,malisteduree,malistehd);
             }
              else alert("La date doit être supérieur ou égale à celle d'aujourd'hui !\nLes champs ne doivent pas être vide ou du mauvais format !");
            }
        }
        xhr.open('POST', '/modifierevent', true);//pour modifier un enevenement 
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data); 
    
        //faire disparaitre le modal
        $('#exampleModal'+x).modal('hide');
        }
        else if(HD+duree>=48) alert("La durée de l'evenement depasse la fin de journée !");
        else if(ok == 1) alert("les evenements se chevauchent !");
        else if(!regex.test(duree)) alert("La duree doit être un entier positif!");
        else alert("Vérifiez que tous les champs sont bien remplis !");
     }
       e.preventDefault();
     
    });
}
}


//affiche les modals
function afficheModal(i){ 
    var d = new Date();
    var datejour = dateFormatsql(d.getTime());
    
  for (var j = 0; j < malistetitre.length; j++) {
      if( i == parseInt(malistehd[j],10)){
     
        var titre = document.querySelector("#titre"+i);
        if (titre == null) titre = document.querySelector("#mtitre"+i);
        titre.id="mtitre"+i;
        titre.value = malistetitre[j];

        var cal = document.querySelector('#calendrier'+i);
        if (cal == null) cal = document.querySelector("#mcalendrier"+i);
        cal.id = 'mcalendrier'+i;

        var modalfooter = document.querySelector('#modalfooter'+i);
        var montext = '<input type="hidden"  name="id" id="ID'+i+'" value="'+malisteid[j]+'"><button type="button" class="btn btn-danger supprimer'+i+'" ligne="'+i+'" >Supprimer evenement</button><button type="submit" class="btn btn-warning modifier'+i+'" ligne="'+i+'">Modifier evenement</button>';
        modalfooter.innerHTML=montext;

        var date = document.querySelector('#date'+i);
        if (date == null) date = document.querySelector("#mdate"+i);
        date.id = 'mdate'+i;
        date.value = malistedate[j]; 

        var dateevent = document.querySelector('#datemodifier'+i);
        dateevent.innerHTML='<label for="inputEmail3" class="col-sm-2 col-form-label">Date</label><div class="col-sm-10"><input type="date" class="form-control" name="datedebut" id="mdate'+i+'" min="'+datejour+'" placeholder="date debut" value="'+malistedate[j]+'"></div>';
        dateevent.className = "form-group row";

        var desc = document.querySelector('#madivision'+i);
        desc.innerHTML ='<textarea type="textarea" rows="4" cols="50" class="form-control" name="description" id="description'+i+'" placeholder="Description" required>'+malistedescription[j]+'</textarea>';

        var heurecacher = document.querySelector('#heure'+i);
        heurecacher.innerHTML ='';

        var duree = document.querySelector('#duree'+i);
        if (duree == null) duree = document.querySelector("#mduree"+i);
        duree.id = 'mduree'+i;
        duree.value = malisteduree[j];

        var heure = document.querySelector('#madivision2'+i);
        heure.className = "form-group row";
        var j = i;
        var duree = j*30;
        var minutes = duree % 60;
        var heures = (duree - minutes)/60;
        if(heures<10) heures = '0'+heures;
        if(minutes<10) minutes+='0';
        var montexte =' <label for="inputEmail3" class="col-sm-2 col-form-label">Heure</label><div class="col-sm-10"><select class="custom-select" id="mHD'+i+'" required><option value="'+i+'" selected>'+heures+'h'+minutes+'</option>';
        for(var i=0;i<48;i++){
          var duree = i*30;
          var minutes = duree % 60;
          var heures = (duree - minutes)/60;
          if(minutes<10) minutes+='0';
          if(heures<10) heures = '0'+heures;
          if(i!=j) montexte+='<option value="'+i+'">'+heures+'h'+minutes+'</option>'; 
        }
        heure.innerHTML= montexte+'</select></div>';

    }
  }
}

//affiche les boutons ajouter
function afficheModalVide(i){ 
  
      var titre = document.querySelector("#mtitre"+i);
      if (titre == null) titre = document.querySelector("#titre"+i);
      titre.id="titre"+i;
      titre.value = "";

      var cal = document.querySelector('#mcalendrier'+i);
      if (cal == null) cal = document.querySelector("#calendrier"+i);
      cal.id = 'calendrier'+i;

      var modalfooter = document.querySelector('#modalfooter'+i);
      var montext = '<button type="button" class="btn btn-danger" data-dismiss="modal">Fermer</button><button type="button" class="btn btn-success ajouter'+i+'" ligne="'+i+'" >Ajouter evenement</button>';
      modalfooter.innerHTML=montext;

      var dateevent = document.querySelector('#datemodifier'+i);
      dateevent.innerHTML='<input type="hidden"  name="heuredebut" id="HD'+i+'"  value="'+i+'">';
      dateevent.className = "";

      var desc = document.querySelector('#description'+i);
      desc.value = "";

      var heurecacher = document.querySelector('#heure'+i);
      heurecacher.innerHTML ='';

      var duree = document.querySelector('#mduree'+i);
      if (duree == null) duree = document.querySelector("#duree"+i);
      duree.id = 'duree'+i;
      duree.value = "";

      var heure2 = document.querySelector('#madivision2'+i);
      heure2.className = "";
      heure2.innerHTML = "";

      var heure = document.querySelector('#heure'+i);
      var j = i;
      var duree = j*30;
      var minutes = duree % 60;
      var heures = (duree - minutes)/60;
      if(heures<10) heures = '0'+heures;
      if(minutes<10) minutes+='0';

      var montexte ='<label for="inputEmail3" class="col-sm-2 col-form-label" required>Heure</label><div  class="col-sm-10"><input type="text" class="form-control"  value="'+heures+"h"+minutes+'" readonly></div>'
      heure.innerHTML= montexte;

}

