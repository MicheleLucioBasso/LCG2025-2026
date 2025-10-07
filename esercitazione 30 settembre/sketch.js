let xMax = 400;
let yMax = 600;

let xRocket = xMax/2; //così dico già che il razzo partirà da metà del foglio
let yRocket = yMax*0.6;

let table;
let star_img;

function preload() { //carica le risorse, prima del setup, es. dati, immagini ecc.
  table = loadTable("stars.csv", "csv", "header"); //tabella dati csv
  star_img = loadImage("star.png"); //immagine stella
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(10);
}

function drawSingleStarFromFile(index, posX, posY) { //vogliamo tracciare tante stelle quante sono le righe della tabella, ogni stella deve avere grandeza corrispondete a numero nella riga
  let starSize = table.getNum(index, "starSize") //usiamo nome starSize, poiché è quello che sta scritto nell'header della tabella
  image(star_img, posX, posY, starSize, starSize);
}

function drawStarsFromFile () { //questo ciclo dice vai avanti fintanto che k (il numero della riga corrente) è minore del numero di righe totali della tabella
  for (let k = 0; k < table.getRowCount(); k++) {//getRowCount restituisce il numero di righe della tabella, escluso l'header
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);

    drawSingleStarFromFile(k, starX, starY);
  }
}

function drawSingleStar(i, starX, starY, random_transparency, random_size) {
  //operatore modulo %
    //stella a quando i è pari
    if( i % 2 == 0){
      //stella a
    fill(255,255,150);
    ellipse(starX, starY, random_size);
    } else if ( i % 3 == 0){
      //stella b
      //ci saranno per ogni i che è divisibile per 3
      fill(200, 100, 255, random_transparency);
      ellipse(starX, starY, random_size);
    }else{
      //stella c
      fill(255, 255, 100);
      ellipse(starX, starY, random_size);
    }
    return;
}

function drawStars(num_stars=120) {
  for(let i=0; i < num_stars; i++) { //i=0 è l'inizializzazione, quindi parte da 0, i<40 fa arrivare variabile fino a 39 poi riparte, i++ aggiugne ogni volta 1 stella
    let starX = (i*37) % width + (i%3) * 5;
    let starY = (i*73) % height + (i%7);

    let random_transparency = random(150, 255);
    let random_size = random(6.8, 15.0);

    drawSingleStar(i, starX, starY, random_transparency, random_size);
  }
}

function drawRocketFromFile(xRocket, yRocket) {
  image(rocket_img, xRocket, yRocket);
}

function drawRocket (xRocket, yRocket) {
  push(); //inizia contesto di disegno
  //rettangolo
  fill(220);
  stroke(40);
  rectMode(CENTER); //alternativa di disegno, mi fa basare coordinate rettangolo dal centro
  rect(xRocket,yRocket+30,80,180,20); //ultimo valore smussa gli angoli del rettangolo
  
  //triangolo
  fill(200,40,40);
  triangle(xRocket-40, yRocket-60, xRocket+40, yRocket-60, xRocket, yRocket-120);
  
  //cerchio
  fill(40,150,220);
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket,yRocket+30,48,48);

  //finire contesto di disegno
  pop();
}

function moveRocket(yRocket, step=1) {
  yRocket = yRocket - step;
  let soglia = -(yMax * 0.6);
  if (yRocket < soglia) {
    yRocket = yMax;
  }
  return yRocket;
}

function draw() {
  background("#191970");
  //mostrare un testo bianco che dice le coordinate del mouse sul foglio da disegno
  fill(255); //bianco
  //stringa x, y
  text("mouseX: " + mouseX + ",  mouseY: " + mouseY,20,20); //mi dice la posizione del mouse sul foglio

  //120 stelle, di 3 tipi a, b, c, formate da ellipse
  push();
  
  //1 unico ciclo che crea una sequenza a, b, c
  noStroke();

  //drawStars(100); //in base a che parametro scrivo come argomento, avrò quel numero di stelle es. 100

  drawStarsFromFile();

  //drawRocket(xRocket, yRocket);

  drawRocketFromFile(xRocket, yRocket);

  yRocket = moveRocket(yRocket, 1);

  pop();
  /*
    //contesto di disegno serve a isolare pezzo di disegno tra una push e una pop per non far influenzare gli attributi che diamo a un certo disegno anche agli altri
  push(); //in questo contesto di disegno ci sono le righe id codice che disegnano il razzo

  //rettangolo
  fill(220);
  stroke(40);
  rectMode(CENTER); //alternativa di disegno, mi fa basare coordinate rettangolo dal centro
  rect(xRocket,yRocket+30,80,180,20); //ultimo valore smussa gli angoli del rettangolo
  
  //triangolo
  fill(200,40,40);
  triangle(xRocket-40, yRocket-60, xRocket+40, yRocket-60, xRocket, yRocket-120);
  
  //cerchio
  fill(40,150,220);
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket,yRocket+30,48,48);

  //finire contesto di disegno
  pop();
  */
  
  /*
  xRocket = (xRocket +1) % xMax;
  yRocket = (yRocket -1); //quando la yRocket sarà oltre una certa soglia, allora dobbiamo resettare la yRocket
  let soglia = yMax*0.6;
  if(yRocket < soglia){
    yRocket = yMax;
  }
  */
}