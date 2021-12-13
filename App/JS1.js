
const myName = `Alexander`;
const salutation = `Bienvenue sur mon site ${myName}!`;
console.log(salutation);   //retournera “Bienvenue sur mon site Alexander!” 

let myBook = {
       title: "L'Histoire de Tao",
       author: "Will Alexander",
       numberOfPages: 250,
       isAvailable: true
    };
    let propertyToAccess = "title";
    let bookTitle = myBook[propertyToAccess];  // "L'Histoire de Tao"

class Book {
    constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    }
    }

let artistProfile = {
    name: "Tao Perkington",
    age: 27,
    available: true
    };
    let allProfiles = [artistProfile]; // nouveau tableau contenant l'objet ci-dessus
    artistProfile.available = false; // modification de l'objet
    console.log(allProfiles) // affiche { nom: "Tao Perkington", âge: 27, disponible: false }

let guests = ["Will Alexander", "Sarah Kate", "Audrey Simon"];
let howManyGuests = guests.length; // 3

guests.push("Tao Perkington"); // ajoute "Tao Perkington" à la fin de notre tableau guests

guests.unshift("Tao Perkington"); // "Tao Perkington" est ajouté au début du tableau guests

guests.pop(); // supprimer le dernier élément du tableau

let userLoggedIn = true;
let welcomeMessage = ''; // déclarer la variable ici

if (userLoggedIn) {
    welcomeMessage = 'Welcome back!'; // modifier la variable extérieure
} else {
    welcomeMessage = 'Welcome new user!'; // modifier la variable extérieure
}

console.log(welcomeMessage); // imprime 'Welcome back!' 


if (firstUser.accountLevel === 'normal' ) {
      console.log('You have a normal account!');
} else if (firstUser.accountLevel === 'premium' ) {
      console.log('You have a premium account!');
} else if (firstUser.accountLevel === 'mega-premium' ) {
      console.log('You have a mega premium account!');
}  else {
      console.log('Unknown account type!');
}


const numberOfPassengers = 10;
for (let i = 0; i < numberOfPassengers; i++) {
   console.log("Passager embarqué !");
}

console.log("Tous les passagers sont embarqués !");


const passengers = [
    "Will Alexander",
    "Sarah Kate'",
    "Audrey Simon",
    "Tao Perkington"
    ]
    
for (let i in passengers) {
    console.log("Embarquement du passager " + passengers[i]);
}


const passengers = [
    "Will Alexander",
    "Sarah Kate",
    "Audrey Simon",
    "Tao Perkington"
    ]
    
for (let passenger of passengers) {
    console.log("Embarquement du passager " + passenger);
}


let seatsLeft = 10;
let passengersStillToBoard = 8;
let passengersBoarded = 0;

while (seatsLeft > 0 && passengersStillToBoard > 0) {
    passengersBoarded++; // un passager embarque
    passengersStillToBoard--; // donc il y a un passager de moins à embarquer
    seatsLeft--; // et un siège de moins
}

console.log(passengersBoarded); // imprime 8, car il y a 8 passagers pour 10 sièges


try {
    // code susceptible à l'erreur ici
} catch (error) {
    // réaction aux erreurs ici
}


// On définit la fonction

function afficherDeuxValeurs(valeur1, valeur2) {
      console.log('Première valeur:' + valeur1);
      console.log('Deuxième valeur:' + valeur2);
}

// On exécute la fonction
afficherDeuxValeurs(12, 'Bonjour');

// On obtient dans la console
// > Première valeur:12 
// > Deuxième valeur:Bonjour 


class BankAccount {
    constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
    }

    showBalance() {
            console.log("Solde: " + this.balance + " EUR");
    }

    deposit(amount) {
            console.log("Dépôt de " + amount + " EUR");
    this.balance += amount;
    this.showBalance();
    }

    static sayHello() { // fonction static
        console.log("Hello!");
    }
  

    withdraw(amount) {
    if (amount > this.balance) {
                console.log("Retrait refusé !");
    } else {
                console.log("Retrait de " + amount + " EUR");
    this.balance -= amount;
    this.showBalance();
    }
    }
}


const sendWelcomeMessageToUser = (user) => {
    if (user.online) {
    if (user.accountType === "normal") {
           console.log("Hello " + user.name + "!");
    } else {
          console.log("Welcome back premium user " + user.name + "!");
    }
    }
}

sendWelcomeMessageToUser(firstUser);

sendWelcomeMessageToUser(secondUser);

sendWelcomeMessageToUser(thirdUser);



const binarySearch = (array, thingToFind, start, end) => {
    if (start > end) {
    return false;
    }
    
       let mid = Math.floor((start + end) / 2);
    if (array[mid] === thingToFind) {
    return true;
    }
    
    if (thingToFind < array[mid]) {
    return binarySearch(array, thingToFind, start, mid - 1);
    
    } else {
    
    return binarySearch(array, thingToFind, mid + 1, end);
    }
}


export class Book {
    constructor(title, author, description,pages,currentPage) {
      this.title = title;
      this.author = author;
      this.description = description;
      this.pages = pages;
      this.currentPage = currentPage;
      this.read = false;
      }
  
      readBook(page) {
        if((page<1)||(page>this.pages)){
          return 0;
        }
        else if (page == this.pages){
          this.read = true;
          this.currentPage = page;
          return 1;
        }
        else{
          this.currentPage = page;
          return 1;
        }
      }
  }
  
  export const books = [];
  let book1 = new Book("BG","younes","beau livre",10,0);
  let book2 = new Book("BG2","younes2","beau livre2",10,2);
  let book3 = new Book("BG3","younes3","beau livre3",10,5);
  books.push(book1);
  books.push(book2);
  books.push(book3);
  