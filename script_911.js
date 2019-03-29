const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');

var img = document.getElementById('key');
var img_2 = document.getElementById('chest');

    img.style.visibility = 'hidden';
    img_2.style.visibility = 'hidden';

let currentLocation = 4;

let locations = [];
locations[0] = "kantine";
locations[1] = "trap";
locations[2] = "eind";
locations[3] = "docentenkamer";
locations[4] = "gang";
locations[5] = "medialab";
locations[6] = "toiletten";
locations[7] = "klaslokaal";
locations[8] = "examenlokaal";

images = [];
images[0] = "room0.jpg";
images[1] = "room1.jpg";
images[2] = "room2.jpg";
images[3] = "room3.jpg";
images[4] = "room4.jpg";
images[5] = "room5.jpg";
images[6] = "room6.jpg";
images[7] = "room7.jpg";
images[8] = "room8.jpg";
images[9] = "key.jpg";
images[10] = "chest.png";

directions = [];
directions[0] = ["oost"];
directions[1] = ["west", "zuid"];
directions[2] = ["zuid"];
directions[3] = ["oost"];
directions[4] = ["noord", "west", "zuid"];
directions[5] = ["zuid"];
directions[6] = ["oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["noord", "west"];

descriptions = [];
descriptions[0] = "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen";
descriptions[1] = "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag";
descriptions[2] = "gefeliciteerd u heeft gewonnen";
descriptions[3] = "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee";
descriptions[4] = "u staat in een gang. Studenten en leraren lopen richting de klaslokalen";
descriptions[5] = "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen" + "<br>" + "hier zit de kist verstopt, zoek de kist en open het mits je de sleutel hebt gevonden";
descriptions[6] = "u staat bij de toiletten " + "<br>" + " Hier ligt een sleutel verstopt, typ 'zoek sleutel' in en hij verschijnt heel magisch op je scherm";
descriptions[7] = "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard";
descriptions[8] = "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen";
descriptions[9] = "welkom bij mijn spel, druk op help voor wat uitleg";
descriptions[10] = "vul uw naam in door 'ik ben' en dan uw naam in te vullen";

inventory = [];
inventory[0] = "key.jpg";

myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            currentLocation -= 3;
            break;
          case "zuid":
            currentLocation += 3;
            break;
          case "oost":
            currentLocation += 1;
            break;
          case "west":
            currentLocation -= 1;
            break;
        }
      } else {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);
      }
      giveLocation();
      myInput.value = "";
    }

    if (directions[currentLocation].indexOf(inputArray[6]) != -1) {
      switch(inputArray[0]) {
        case "sleutel" :
        myInventory.innerHTML = "Sleutel";
        break;
      }

    if (inputArray[0] == "gebruik"){
      console.log('ga wat gebruiken');
      myInput.value = "";
    }
  }

    if (inputArray[0] == "pak"){
      console.log('zoek iets');
      switch(inputArray[1]) {
        case "sleutel" :
          img.style.visibility = 'hidden';
          myInventory.innerHTML = "er zit een <em>sleutel</em> in uw inventory";
          feedback.innerHTML = "geweldig! zoek nu de kist voor een geweldig cadeautje";
          setTimeout(removeFeedback, 5000);
          break;
          case "kist" :
          img_2.style.visibility = "visible";
      }
      myInput.value = "";
    }

    if (directions[currentLocation].indexOf(inputArray[6]) != -1) {
    if (inputArray[0] == "zoek"){
      console.log('zoek iets');
      switch(inputArray[1]) {
        case "sleutel" :
          img.style.visibility = 'visible';
          feedback.innerHTML = "geweldig! pak nu de sleutel";
          setTimeout(removeFeedback, 2000);
          break;
        case "kist" :
        img_2.style.visibility = 'visible';
        feedback.innerHTML = "goedzo! hier zat de sleutel voor een 1998 toyota supra! loop snel naar buiten!";
        setTimeout(removeFeedback, 8000);
      }
      myInput.value = "";

    if (inputArray[0] != "ga" && inputArray[0] != "pak" && inputArray[0] != "gebruik" && inputArray[0] != "zoek"){
      feedback.innerHTML = "mogelijke commando's zijn: ga, pak, zoek, gebruik en help";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }
  }
}

function giveLocation() {
  divLocation.innerHTML = locations[currentLocation];
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myPossibilities.innerHTML = myDirections;
  myInventory.innerHTML = "uw inventory is leeg";
}

function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();
