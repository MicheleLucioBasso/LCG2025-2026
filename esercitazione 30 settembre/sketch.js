let xMax = 400;
let yMax = 600;

let xRocket = xMax/2; //così dico già che il razzo partirà da metà del foglio
let yRocket = yMax*0.6;

function setup() {
  createCanvas(xMax, yMax);
  frameRate(5);
}

function draw() {
  background("#191970");
  //mostrare un testo bianco
  //che dice le coordinate del mouse
  //sul foglio da disegno
  fill(255); //bianco
  //stringa x, y
  text("mouseX: " + mouseX + ",  mouseY: " + mouseY,20,20); //mi dice la posizione del mouse sul foglio

  //120 stelle, di 3 tipi a, b, c, formate da ellipse
  push();
  
  //1 unico ciclo che crea una sequenza a, b, c
  noStroke();

  for(let i=0; i < 120; i++){ //i=0 è l'inizializzazione, quindi parte da 0, i<40 fa arrivare variabile fino a 39 poi riparte, i++ aggiugne ogni volta 1 stella
    let starX = (i*37) % width + (i%3) * 5; //width è una variabile primitiva di p5 che prende in automatico l'ampiezza del foglio
    let starY = ((i*73) % height) + (1%7);
    //operatore modulo %
    //stella a quando i è pari
    if( i % 2 == 0){
      //stella a
    fill(255,255,150);
    ellipse(starX,starY,1);
    }else if ( i % 3 == 0){
      //stella b
      //ci saranno per ogni i che è divisibile per 3
      fill(200, 100, 255);
      ellipse(starX, starY, 1.5);
    }else{
      //stella c
      fill(255, 255, 100);
      ellipse(starX, starY, 2.8);
    }
  }
  pop();

    //contesto di disegno serve a isolare pezzo di disegno tra una push e una pop per non far influenzare gli attributi che diamo a un certo disegno anche agli altri
  push();

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

  xRocket = (xRocket +1) % xMax;
  yRocket = (yRocket -1); //quando la yRocket sarà oltre una certa soglia, allora dobbiamo resettare la yRocket
  let soglia = yMax*0.6;
  if(yRocket < soglia){
    yRocket = yMax;
  }
}
