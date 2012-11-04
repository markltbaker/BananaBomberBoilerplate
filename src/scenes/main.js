
Crafty.scene("main", function() {

    var elements = [
        "src/entities/Player1.js",
        "src/entities/Player2.js",
    ];

    //method to generate the map
    function generateWorld() {
        //loop through all tiles
        for (var i = 0; i < 25; i++) {
            for (var j = 0; j < 21; j++) {

                //place grass on all tiles
                grassType = Crafty.math.randomInt(1, 4);
                Crafty.e("2D, "+gameContainer.conf.get('renderType')+", grass" + grassType)
                    .attr({ x: i * 16, y: j * 16, z:1 });
                //grid of bushes
                if((i % 2 === 0) && (j % 2 === 0)) {
                    Crafty.e("2D, "+gameContainer.conf.get('renderType')+", solid, bush1")
                        .attr({x: i * 16, y: j * 16, z: 2000})
                }

                //create a fence of bushes
                if(i === 0 || i === 24 || j === 0 || j === 20)
                    Crafty.e("2D, "+gameContainer.conf.get('renderType')+", solid, bush" + Crafty.math.randomInt(1, 2))
                    .attr({ x: i * 16, y: j * 16, z: 2 });

                //generate some nice flowers within the boundaries of the outer bushes
                if (i > 0 && i < 24 && j > 0 && j < 20
                        && Crafty.math.randomInt(0, 50) > 30
                        && !(i === 1 && j >= 16)
                        && !(i === 23 && j <= 4)) {
                    var f = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", flower, Collision, solid, SpriteAnimation, explodable")
                            .attr({ x: i * 16, y: j * 16, z: 1000 })
                            .animate("wind", 0, 1, 3)
                            .animate('wind', 80, -1)
                            .bind('explode', function() {
                                this.destroy();
                            })
                            .collision();
                    if(f.hit('solid')) {
                        f.destroy();
                    }
                }
            }
        }
    }

	
	//when everything is loaded, run the main scene
	require(elements, function() {	  

		generateWorld();

		sc['player1'] = new Player1();
        sc['player2'] = new Player2();
		// infc['info'] = new Info();
	});

});
