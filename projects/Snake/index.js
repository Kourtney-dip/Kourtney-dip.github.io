/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
  function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var BOARD_WIDTH = $('#board').width();
  var BOARD_HEIGHT = $('#board').height();
  var score = 0;
  
   var KEY = {
    "UP": 38,
    "DOWN": 40,

    "LEFT": 37,
    "RIGHT": 39,
  }


  // Game Item Objects
  function snek(id, x, y, speedX, speedY) {
    var item = {
      id: id,
      x: x,
      y: y,
      width: $(id).width(),
      height: $(id).height(),
      speedX:speedX,
      speedY: speedY
    }
    return item;
  }
/*factory funciton that gives the item all its attributes and we can later assign this function to avariable to br used for the rest of the code
Both aple and snek are used to assign my objects with its id, x, y, and speed for both x and y */

  function aple(id, x, y){
    var item = {
      id: id,
      x: x,
      y: y,
      width: $(id).width(),
      height: $(id).height()
    }

    function unfinished(id, x, y){
      var item = {
        id: id,
        x: x,
        y: y,
        width: $(id).width(),
        height: $(id).height()
      }
    return item;
  }
      var snakeH = snek('#gameItem', 200, 200, 0, 0);

      var app = aple('#apple', Math.random, Math.random);

      var uNfin = unfinished('#UNFINSHED', 0, 0);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

        ////////////////////////////////////////////////////////////////////////////////
        ///////////////////////// CORE LOGIC ///////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    un(uNfin);
    bord(snakeH);
    drawScor();
   moveObject(snakeH);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
      if(event.which === KEY.UP) {
          snakeH.speedY = -20;
          snakeH.speedX = 0;
      }
      if (event.which === KEY.DOWN){
          snakeH.speedY = 20;
          snakeH.speedX = 0;
      }
      if (event.which === KEY.RIGHT){
          snakeH.speedX = 20;
          snakeH.speedY = 0;
      }
      if (event.which === KEY.LEFT){
          snakeH.speedX = -20;
          snakeH.speedY = 0;
      }
  }

 

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function un(obj) {
     $("#UNFINISHED");
  }


  function bord(obj) {
    if ( obj.y < snakeH.height)
     {  obj.y = snakeH.height;
     // endGame();
    }
    if (obj.y > BOARD_HEIGHT - snakeH.height) {
          obj.y = BOARD_HEIGHT - snakeH.height;
         // endGame();
    }

    if (obj.x < snakeH.width) {
      obj.x = 0;
      //endGame();
    }
    if (obj.x > BOARD_WIDTH - snakeH.width) {
      obj.x = BOARD_WIDTH - snakeH.width / 0.5;
     // endGame();
    }
  }
  

  function addBod(){
    
  }
  
  
  function moveObject(obj) {
    obj.y += obj.speedY;
    obj.x += obj.speedX;
    drawObj(snakeH);
  }
   function drawObj(obj){
    $(obj.id).css('top', obj.y);
    $(obj.id).css('left', obj.x);
   }

  function drawScor () {
    $('#score').text("points: " + score);

  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
  }
