let mgr, cam;
let feetGUI, flashGUI, coffeeGUI;
let feetButton, flashButton, coffeeButton, bezoldButton;
let sideViewButton, defaultViewButton, topviewButton; // buttons for flash lag scene

function setup() {
  createCanvas(800, 600, WEBGL);

  mgr = new SceneManager();
  //add all the scenes
  mgr.addScene(SteppingFeet);
  mgr.addScene(FlashLag);
  mgr.addScene(Coffeebean);
  mgr.addScene(Bezold);

  mgr.showNextScene();

  //add the camera for the 3D
  cam = createCamera();
  ortho(-width / 2, width / 2, height / 2, -height / 2, -1000, 5000);

  createElements(); //create all the buttons/titles/GUIs

  //hide the info sections expect the first one by default
  let info = document.getElementsByClassName('infoCont');
  info[0].style.visibility = 'visible';
  info[1].style.visibility = 'hidden';
  info[2].style.visibility = 'hidden';
  info[3].style.visibility = 'hidden';
}

function draw() {
  mgr.draw();
}

//Switching between scenes functions
function showFeet(){
  resetTo2D();
  mgr.showScene(SteppingFeet);

  //highlighting
  feetButton.addClass('activeScene');
  flashButton.removeClass('activeScene');
  coffeeButton.removeClass('activeScene');
  bezoldButton.removeClass('activeScene');

  //hide other GUIS
  flashGUI.hide();
  coffeeGUI.hide();
  sideViewButton.hide();
  defaultViewButton.hide();
  topviewButton.hide();
  //show correct GUI
  feetGUI.show();

  //show correct info
  let info = document.getElementsByClassName('infoCont');
  info[0].style.visibility = 'visible';
  info[1].style.visibility = 'hidden';
  info[2].style.visibility = 'hidden';
  info[3].style.visibility = 'hidden';
}
function showFlash(){
  to3D();
  mgr.showScene(FlashLag);

  //highlighzing
  flashButton.addClass('activeScene');
  feetButton.removeClass('activeScene');
  coffeeButton.removeClass('activeScene');
  bezoldButton.removeClass('activeScene');

  //hide other GUIS
  feetGUI.hide();
  coffeeGUI.hide();
  //show correct GUI
  flashGUI.show();
  sideViewButton.show();
  defaultViewButton.show();
  topviewButton.show();

  //show correct info
  let info = document.getElementsByClassName('infoCont');
  info[1].style.visibility = 'visible';
  info[0].style.visibility = 'hidden';
  info[2].style.visibility = 'hidden';
  info[3].style.visibility = 'hidden';
}
function showCoffee(){
  resetTo2D();
  mgr.showScene(Coffeebean);

  //highlighting
  coffeeButton.addClass('activeScene');
  feetButton.removeClass('activeScene');
  flashButton.removeClass('activeScene');
  bezoldButton.removeClass('activeScene');

  //hide other GUIS
  feetGUI.hide();
  flashGUI.hide();
  sideViewButton.hide();
  defaultViewButton.hide();
  topviewButton.hide();
  //show correct GUI
  coffeeGUI.show();

  //show correct info
  let info = document.getElementsByClassName('infoCont');
  info[2].style.visibility = 'visible';
  info[0].style.visibility = 'hidden';
  info[1].style.visibility = 'hidden';
  info[3].style.visibility = 'hidden';
}
function showBezold(){
  resetTo2D();
  mgr.showScene(Bezold);

  //button highlighting
  bezoldButton.addClass('activeScene');
  feetButton.removeClass('activeScene');
  coffeeButton.removeClass('activeScene');
  flashButton.removeClass('activeScene');
  
  //hide GUIS
  feetGUI.hide();
  flashGUI.hide();
  coffeeGUI.hide();
  sideViewButton.hide();
  defaultViewButton.hide();
  topviewButton.hide();

  //show correct info
  let info = document.getElementsByClassName('infoCont');
  info[3].style.visibility = 'visible';
  info[0].style.visibility = 'hidden';
  info[2].style.visibility = 'hidden';
  info[1].style.visibility = 'hidden';
}

function resetTo2D(){ //modify scene for 2D
  resetMatrix();
  cam.setPosition(0, 0, 80);
  cam.lookAt(0, 0, 0);
}

function to3D(){ //alter scene for 3D
  resetMatrix();
  resetMatrix();
  cam.setPosition(18, 42, 50);
  cam.lookAt(0, 0, 0);

  translate(-width/2, height/2);
}

function mousePressed()
{
    mgr.handleEvent("mousePressed");
}

function createElements() { //create all the buttons/titles/GUIs
  let titleY = 15;
  let titleCont = createDiv();
  titleCont.id('titleCont');
  titleCont.position(width, titleY);
  let title = createElement('h3', 'Press the buttons below to switch between different scenes');
  title.id('title');
  title.parent('titleCont');

  let buttonCont = createDiv();
  buttonCont.position(width + 150 - 100, titleY + 100);
  buttonCont.id('buttonCont');

  //Create the buttons to switch between scenes
  feetButton = createButton('Stepping feet illusion');
  feetButton.class('button');
  feetButton.parent('buttonCont');
  feetButton.mousePressed(showFeet);
  feetButton.addClass('activeScene');
  
  flashButton = createButton('Flash lag illusion');
  flashButton.class('button');
  flashButton.parent('buttonCont');
  flashButton.mousePressed(showFlash);
  //buttons for different views in the scene
  sideViewButton = createButton('Side View');
  sideViewButton.hide(); //hide by default
  defaultViewButton = createButton('Default View');
  defaultViewButton.hide();
  topviewButton = createButton('Top View');
  topviewButton.hide();

  coffeeButton = createButton('Coffee bean motion illusion');
  coffeeButton.class('button');
  coffeeButton.parent('buttonCont');
  coffeeButton.mousePressed(showCoffee);

  bezoldButton = createButton('Bezold effect');
  bezoldButton.class('button');
  bezoldButton.parent('buttonCont');
  bezoldButton.mousePressed(showBezold);

  //Create all the GUIs
  feetGUI = createGui('Control');
  feetGUI.setPosition(15, 615);
  flashGUI = createGui('Control');
  flashGUI.setPosition(15, 615);
  flashGUI.hide(); //hide on init
  coffeeGUI = createGui('Control');
  coffeeGUI.setPosition(15, 615);
  coffeeGUI.hide(); //hide on init
}