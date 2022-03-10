/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////




  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var prevScor1 = 0;
  var prevScor2 = 0;

  // Game Item Objects
  var KEY = {
    "UP": 38,
    "DOWN": 40,
    
    "S": 83,
    "W": 87,
  }

  var BOARD_WIDTH = $('#board').width();
  var BOARD_HEIGHT = $('#board').height();
 
 

  function GameItem(x, y, speedX, speedY, id) {
    var item = {
      id: id,
      x: x,
      y: y,
      width: $(id).width(),
      height: $(id).height(),
      speedX:speedX,
      speedY: speedY,
    }
    return item; 
  }
  
  var pAFFLeft = GameItem (25, 200, 0, 0, '#paddleA');
  var pAFFRight = GameItem(BOARD_WIDTH - 25, BOARD_HEIGHT / 9, 0, 0, "#paddleB");
  var ball = GameItem(BOARD_WIDTH / 2,  BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball")
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

    $('#winner1').hide();
    $('#button').hide();
    $('#winner2').hide();
 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
 
function newFrame() {
  endGame();
  newScor();
  moveObject(pAFFLeft);
  moveObject(pAFFRight);
  moveObject(ball);
  bounds();
  wallCollision();
  bounce();
  butt();

}
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) { //down
  
     if (event.which === KEY.W){   //paddleA (left)
       pAFFLeft.speedY = -6;
    }  
     if (event.which === KEY.S){
       pAFFLeft.speedY = 6;
    }  
     if (event.which === KEY.UP){  //paddleB (right)
       pAFFRight.speedY = -6;
    }  
     if (event.which === KEY.DOWN){
       pAFFRight.speedY = 6;
    }  

}

  
function handleKeyUp(event) { //up
           
         if (event.which === KEY.W){    //paddleA (left)
           pAFFLeft.speedY = 0;
        }  
         if (event.which === KEY.S){
           pAFFLeft.speedY = 0;
        }  

         if (event.which === KEY.UP){      //paddleB (right)
           pAFFRight.speedY = 0;
        }  
         if (event.which === KEY.DOWN){
           pAFFRight.speedY = 0;
        }  
}



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
newScor();

  function moveObject(obj) {
    obj.y += obj.speedY;
    obj.x += obj.speedX;
    $(obj.id).css('top', obj.y);
    $(obj.id).css('left', obj.x);
  }

  function wallCollision() {
    if(ball.x > BOARD_WIDTH - 20) {      
      console.log("hit");                           //left side goal
        prevScor1++; 
        ball = GameItem(BOARD_WIDTH / 2,  BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball")
    }
     else if (ball.x < 0) {                        //right side goal
      prevScor2++; 
      console.log("hit");
      ball = GameItem(BOARD_WIDTH / 2,  BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball")
     }     
  }

 function bounds() {

  if (pAFFRight.y > BOARD_HEIGHT - pAFFRight.height) {
    pAFFRight.y = BOARD_HEIGHT - pAFFRight.height;
  }
  if (pAFFRight.y < 0) {
    pAFFRight.y = 0
  }


  if (pAFFLeft.y > BOARD_HEIGHT - pAFFLeft.height) { 
    pAFFLeft.y = BOARD_HEIGHT - pAFFLeft.height
  }
  if (pAFFLeft.y < 0) {
    pAFFLeft.y = 0
  }

  
  if (ball.y > BOARD_HEIGHT - 15 ) {
    ball.speedY = -ball.speedY
  }
  if (ball.y < 0) {
    ball.speedY = -ball.speedY 
  }
  if (ball.x < 0 ) {
    ball.speedX = -ball.speedX 
  }
  if (ball.x > BOARD_WIDTH - 20) {
    ball.speedX = -ball.speedX 
  }

  }


  function doCollide(obj1, obj2) {

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
  obj1.rightX = obj1.x + $(obj1.id).width();
  obj1.bottomY = obj1.y + $(obj1.id).height();
    

    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
  obj2.rightX = obj2.x + $(obj2.id).width();
  obj2.bottomY = obj2.y + $(obj2.id).height();
	
  if ((obj1.rightX > obj2.leftX) &&  
      (obj1.leftX < obj2.rightX) && 
      (obj1.bottomY > obj2.topY) &&
      (obj1.topY < obj2.bottomY)
     ) {
    return true;
  } else {
    return false;
  }
		////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
  }
 

  function bounce(){
if (doCollide(pAFFLeft, ball)){
ball.speedX = -ball.speedX;
}
if (doCollide(pAFFRight, ball)){
ball.speedX = -ball.speedX
}
}
  function newScor() {
$('#scoreA').text(prevScor1);
$('#scoreB').text(prevScor2);
}

  function butt(){
$('#button').on("mousedown",function(event){
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var prevScor1 = 0;
  var prevScor2 = 0;
})
  }

  function endGame() {
  // stop the interval timer
    if(prevScor1 == 11){
       clearInterval(interval);

    $('#winner1').show();
    $('#button').show();
    $(document).off();
    }
    else if (prevScor2 == 11){
       clearInterval(interval);

      $('#winner2').show();
     $('#button').show();
    $(document).off();
    }


    // turn off event handlers
   
  }
  
}