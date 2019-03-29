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
locations[2] = "deuren";
locations[3] = "docentenkamer";
locations[4] = "gang";
locations[5] = "medialab";
locations[6] = "toiletten";
locations[7] = "klaslokaal";
locations[8] = "examenlokaal";
locations[9] = "einde!";

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
images[9] = "supra.gif";

directions = [];
directions[0] = ["oost"];
directions[1] = ["west", "zuid"];
directions[2] = ["west", "noord-oost"];
directions[3] = ["oost"];
directions[4] = ["noord", "west", "zuid"];
directions[5] = ["zuid"];
directions[6] = ["oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["noord", "west"];
directions[9] = [];

descriptions = [];
descriptions[0] = "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen";
descriptions[1] = "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag";
descriptions[2] = "open de deuren met 'open deur'";
descriptions[3] = "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee";
descriptions[4] = "u staat in een gang. Studenten en leraren lopen richting de klaslokalen";
descriptions[5] = "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen" + "<br>" + "hier zit de kist verstopt, zoek de kist en open het mits je de sleutel hebt gevonden";
descriptions[6] = "u staat bij de toiletten " + "<br>" + " Hier ligt een sleutel verstopt, typ 'zoek sleutel' in en hij verschijnt heel magisch op je scherm";
descriptions[7] = "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard";
descriptions[8] = "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen";
descriptions[9] = "gefeliciteerd! je hebt gewonnen!! geniet van je auto :D";

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
          case "noord-oost":
            currentLocation += 7;
            break;
        }
      } else {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }

    let inventory = [];
    inventory[1] = ["sleutel"];

    if (inputArray[0] == "pak"){
      console.log('pak iets');
      switch(inputArray[1]) {
        case "sleutel" :
          myInventory.innerHTML = "er zit een "  + inventory[1] + " in uw inventory";
          feedback.innerHTML = "geweldig! zoek nu de kist voor een geweldig cadeautje";
          setTimeout(removeFeedback, 5000);
          break;
      }
      myInput.value = "";
    }

    if (inputArray[0] == "open"){
      console.log('open iets');
      switch(inputArray[1]) {
        case "deur" :
          feedback.innerHTML = "Alright! je hebt gewonnen :D";
          break;
      }
      myInput.value = "";
    }

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
        feedback.innerHTML = "alrighty! open nu de kist door 'gebruik sleutel' in te vullen. wie weet zit er wel iets geweldigs in ^-^";
        setTimeout(removeFeedback, 4000);
        break;
        }
        myInput.value = "";
      }

    if (inputArray[0] == "gebruik"){
      console.log('ga wat gebruiken');
      myInput.value = "";
      switch(inputArray[1]) {
        case "sleutel" :
        img_2.style.visibility = 'hidden';
        myInventory.innerHTML = "er zit een <em>autosleutel</em> in uw inventory";
        directions[1].push("oost");
        feedback.innerHTML = "goedzo! hier zat de sleutel voor een 1998 toyota supra! loop snel naar buiten!";
        setTimeout(removeFeedback, 8000);
        break;
    }
  }

    if (inputArray[0] != "ga" && inputArray[0] != "pak" && inputArray[0] != "gebruik" && inputArray[0] != "zoek" && inputArray[0] != "f" && inputArray[0] != "F"){
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
}

function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();
