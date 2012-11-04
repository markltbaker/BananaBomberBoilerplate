
Crafty.scene("main", function() {

    var elements = [
        "src/entities/Player1.js",
        "src/entities/Player2.js",
    ];

    // utility for map generator -- create 2D entities on a grid
    function gridEntity(i, j, z, components) {
        return Crafty.e("2D, " + gameContainer.conf.get('renderType') + ", " + components)
            .attr({ x: i * 16, y: j * 16, z:z });
    }

    //method to generate the map
    function generateWorld() {
        //loop through all tiles
        for (var i = 0; i < 25; i++) {
            for (var j = 0; j < 21; j++) {

                //place grass on all tiles
                grassType = Crafty.math.randomInt(1, 4);
                gridEntity(i, j, 1, "grass" + grassType);

                //grid of bushes
                if((i % 2 === 0) && (j % 2 === 0)) {
                    gridEntity(i,j, 2000, "solid, bush1");
                }

                //create a fence of bushes
                if(i === 0 || i === 24 || j === 0 || j === 20) {
                    gridEntity(i,j,2, "solid, bush" + Crafty.math.randomInt(1, 2))
                }

                //generate some nice flowers within the boundaries of the outer bushes
                if (i > 0 && i < 24 && j > 0 && j < 20
                        && Crafty.math.randomInt(0, 50) > 30
                        && !(i === 1 && j >= 16)
                        && !(i === 23 && j <= 4)) {
                    var f = gridEntity(i,j,1000, "flower, Collision, solid, SpriteAnimation, explodable")
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
