var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
       
        //loop the saws and the hallewall, make more halles
           

    


        
function drawBlades(x, y) {  //saw blades
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;

    game.addGameItem(sawBladeHitZone);  

    var obstacleImage = draw.bitmap('img/sawblade.png', -25, -25);
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
}  

function createWall(x, y) {  //wall
    var hitZoneSize = 25;
    var damageFromObstacle = 25;
    var wallHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

    wallHitZone.x = x + 125;
    wallHitZone.y = y;

    game.addGameItem(wallHitZone);

    var obstacleImage = draw.bitmap('img/op-spark-logo.png');

    wallHitZone.addChild(obstacleImage);
    obstacleImage.x = -44;
    obstacleImage.y = -35;
    obstacleImage.scaleX = 0.25;
    obstacleImage.scaleY = 0.25;
}



drawBlades(1790, groundY - 40); //set 1 (do not change)
drawBlades(1750, groundY - 89); //y can be no larger than 400 but no smaller than 50
drawBlades(954, groundY - 428);

drawBlades(2960, groundY - 65); //SET2
drawBlades(646, groundY - 99);
drawBlades(2080, groundY - 18);

drawBlades(850, groundY - 50); //SET3
drawBlades(1590, groundY - 89);
drawBlades(750, groundY + 30); 

drawBlades(1999, groundY - 86); //SET4
drawBlades(1443, groundY - 89);
drawBlades(1880, groundY - 190);

drawBlades(1300, groundY - 50); //SET5
drawBlades(1690, groundY - 89);
drawBlades(750, groundY - 130); 


drawBlades.x = drawBlades - 1;
    if(drawBlades.x < -200) {
        drawBlades.x = canvasWidth;
    }

createWall(300, groundY + 5);
createWall(1760, groundY + 5);
createWall(1360, groundY + 5);
createWall(3400, groundY + 5);


//squares
var enemy = game.createGameItem('enemy', 25);
var greenSquare = draw.rect(50,50, 'ForestGreen');
enemy.rotationVelocity = 10;
greenSquare.x = -25;
greenSquare.y = -25;
enemy.addChild(greenSquare);

enemy.x = 1400;
enemy.y = groundY-50;
enemy.velocityX = -2.25;

game.addGameItem(enemy); 




        enemy.onPlayerCollision = function() {
    console.log('The enemy has hit Halle');
};

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
