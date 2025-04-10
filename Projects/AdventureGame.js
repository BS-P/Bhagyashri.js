const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function Scene(name, playfunction) {
  this.name = name;
  this.play = playfunction;
}

let scenes = {};
let currentScene = "start";
let inventory = [];
let playerName = "";

function addItem(item) {
  inventory.push(item);
  console.log(" You picked up: " + item);
}

function intro(callback) {
  rl.question("Welcome adventurer! What is your name? ", function (name) {
    playerName = name ? name : "Hero";

    if (playerName.toLowerCase() === "neo") {
      console.log(" You feel a glitch in the matrix... Welcome back, Mr. Patil.");
    }

    console.log("Hello, " + playerName + "! Your adventure begins now...");
    callback("start");
  });
}

scenes.start = new Scene("Start", function (callback) {
  console.log("You stand at a forest crossroads. A left path looks eerie... A right path sparkles with light.");
  rl.question("Do you go left or right? (left/right/none) ", function (answer) {
    const choice = answer.trim().toLowerCase();
    if (choice === "left") {
      callback("leftPath");
    } else if (choice === "right") {
      callback("rightPath");
    } else {
      console.log("You stay still. Nothing happens.");
      callback("start");
    }
  });
});

scenes.leftPath = new Scene("Left Path", function (callback) {
  console.log("You take the left path and encounter a strange glowing door...");
  callback("riddle");
});

scenes.rightPath = new Scene("Right Path", function (callback) {
  console.log("You walk the sparkling path and find a calm river with a boat and a note.");
  console.log("The note reads: 'Bravery is rewarded. Take the boat or go back.'");
  rl.question("Do you take the boat? (yes/no) ", function (answer) {
    if (answer.trim().toLowerCase() === "yes") {
      console.log("You sail across safely and discover a hidden elixir. It grants you +5 wisdom!");
      addItem("Elixir of Wisdom");
      callback("start");
    } else {
      console.log("You return to the crossroads.");
      callback("start");
    }
  });
});

scenes.riddle = new Scene("Riddle Door", function (callback) {
  console.log("The glowing door speaks:");
  console.log("'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?'");

  rl.question("> ", function (answer) {
    if (answer.trim().toLowerCase() === "echo") {
      console.log("The door glows brighter and opens slowly...");
      callback("keyRoom");
    } else {
      console.log("The door stays shut. Maybe try again.");
      callback("riddle");
    }
  });
});

scenes.keyRoom = new Scene("Key Room", function (callback) {
  let sequence = [];
  for (let i = 0; i < 3; i++) {
    sequence.push(Math.floor(Math.random() * 10));
  }

  console.log(" To grab the Silver Key, a glowing orb flashes a sequence:");
  console.log(sequence.join(" "));

  for (let i = 0; i < 30; i++) {
    process.stdout.write("-");
  }
  console.log("\nNow, enter the sequence:");

  rl.question("> ", function (answer) {
    let input = answer.trim().split(" ").map(Number);
    let correct = true;

    for (let i = 0; i < 3; i++) {
      if (input[i] !== sequence[i]) {
        correct = false;
        break;
      }
    }

    if (correct) {
      console.log(" Impressive! You remembered the code.");
      addItem("Silver Key");
      callback("lockedDoor");
    } else {
      console.log(" The orb resets... Try again.");
      callback("keyRoom");
    }
  });
});

scenes.lockedDoor = new Scene("Locked Door", function (callback) {
  console.log("You arrive at a massive ancient door...");
  if (inventory.includes("Silver Key")) {
    console.log(" You insert the Silver Key. The door unlocks!");
    callback("treasureRoom");
  } else {
    console.log("The door won't budge. You need a Silver Key.");
    callback("leftPath");
  }
});

scenes.treasureRoom = new Scene("Treasure Room", function (callback) {
  console.log("GOLD, JEWELS, MAGIC ITEMS! You're now rich not need to gamble any more!");
  rl.close();
});

function runScene(name) {
  currentScene = name;
  scenes[name].play(runScene);
}






intro(runScene);

