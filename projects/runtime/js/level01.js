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
                { "type": "obstacle", "x": 300, "y": groundY +5},                                
                { "type": "obstacle", "x": 1860, "y": groundY +5},                                
                { "type": "obstacle", "x": 2360, "y": groundY +5},
                { "type": "obstacle", "x": 3400, "y": groundY +5},
                { "type": "obstacle", "x": 3679, "y": groundY +5},
                { "type": "obstacle", "x": 5500, "y": groundY +5},                
                { "type": "enemy", "x": 800, "y": groundY},

            ]
        };

        for (var i = 0; i < levelData.gameItems.length; i++){
            var obj = levelData.gameItems[i];
            if (obj.type === "sawblade"){
                drawBlade(obj.x, obj.y);
            } if (obj.type === "obstacle"){
                 createWall(obj.x, obj.y);
            } else {
               createEnemy(obj.x, obj.y);
            }
        }


        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
       
        //loop the saws and the hallewall, make more halles
           

    


        
        function drawBlade(x, y) {  //saw blades
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

                /* obstacleImage.x = obstacleImage.x - 1;
                        if (obstacleImage.x < -200) {
                            obstacleImage.x = canvasWidth; 
                        } */
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

       /* drawBlades(1790, groundY - 40); //set 1 (do not change)
        drawBlades(1750, groundY - 89); //y can be no larger than 400 but no smaller than 50
        drawBlades(954, groundY - 400);

        drawBlades(2960, groundY - 65); //SET2
        drawBlades(646, groundY - 99);
        drawBlades(2580, groundY - 18);

        drawBlades(850, groundY - 50); //SET3
        drawBlades(2040, groundY - 99);
        drawBlades(986, groundY + 30); 

        drawBlades(2999, groundY - 86); //SET4
        drawBlades(3475, groundY - 9);
        drawBlades(2899, groundY - 190);

        drawBlades(4789, groundY - 50); //SET5
        drawBlades(1678, groundY - 99);
        drawBlades(1905, groundY - 130); */


                

       




        function createEnemy(x,y) {
                // all code from TODO 11 and 12
                //squares
            var enemy = game.createGameItem('enemy', 25);
            var greenSquare = draw.rect(50,50, 'ForestGreen');
            enemy.rotationVelocity = 10;
            greenSquare.x = -25;
            greenSquare.y = -25;
            enemy.addChild(greenSquare);

            enemy.x = x;
            enemy.y = groundY - y ;
            enemy.velocityX = -2.25;

            game.addGameItem(enemy); 

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
            }
        }
        createEnemy(1400,groundY-100);
        createEnemy(1850,groundY-5000);
        createEnemy(1900,groundY-5000);


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
