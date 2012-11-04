
Crafty.c('AIControls', {
    _move: 'down',
    _directions: {0: 'left', 1:'right', 2: 'up', 3: 'down'},
    _speed: 3,
    _inShadow: false,

    AIControls: function (speed) {
        if (speed) this._speed = speed;

        //functions to determine if there is a free path in some direction
        var AIScope = this;
        var pathTester = Crafty.e('2D, empty, Collision').attr({z:30000}).collision();
        var PathTest = {
            left: function() { pathTester.attr({x: AIScope.x-AIScope._speed, y: AIScope.y});
                return !(pathTester.hit('solid') || (!AIScope._inShadow && pathTester.hit('ShadowBananaFire')));},
            right: function() { pathTester.attr({x: AIScope.x+AIScope._speed, y: AIScope.y});
                return !(pathTester.hit('solid') || (!AIScope._inShadow && pathTester.hit('ShadowBananaFire')));},
            up: function() { pathTester.attr({x: AIScope.x, y: AIScope.y-AIScope._speed});
                return !(pathTester.hit('solid') || (!AIScope._inShadow && pathTester.hit('ShadowBananaFire')));},
            down: function() { pathTester.attr({x: AIScope.x, y: AIScope.y+AIScope._speed});
                return !(pathTester.hit('solid') || (!AIScope._inShadow && pathTester.hit('ShadowBananaFire')));},
            none: function() { return false; }
        };

        function bombWillHit() {
            pathTester.attr({x: AIScope.x-1, y: AIScope.y});
            if(pathTester.hit('flower')) { return true; }
            pathTester.attr({x: AIScope.x+1, y: AIScope.y});
            if(pathTester.hit('flower')) { return true; }
            pathTester.attr({x: AIScope.x, y: AIScope.y-1});
            if(pathTester.hit('flower')) { return true; }
            pathTester.attr({x: AIScope.x, y: AIScope.y+1});
            if(pathTester.hit('flower')) { return true; }
            return false;
        }

        this.bind('enterframe', function() {
            var nextDirection = '';
            if(PathTest[this._move]())
            {
                nextDirection = this._move;

                //when we are at a crossroad interesting things can happen
                if(this.x % 16 < this._speed && this.y % 16 < this._speed) {
                    //change direction
                    if(Crafty.math.randomInt(0, 2) === 0) {
                        if(nextDirection === 'down' || nextDirection === 'up') {
                            if(PathTest.left()) { nextDirection = 'left' }
                            else if(PathTest.right()) { nextDirection = 'right' }
                        }else{
                            if(PathTest.up()) { nextDirection = 'up' }
                            else if(PathTest.down()) { nextDirection = 'down' }
                        }
                    }
                    if(bombWillHit() &&
                            !this._inShadow) {
                        this.trigger('Dropped');
                    }
                }
            }else{
                this.snap();
                nextDirection = this._directions[Crafty.math.randomInt(0,3)];
                if(nextDirection === this._move) {
                    nextDirection = "none"; //we need to think
                }

            }
            this._move = nextDirection;

            if(PathTest[this._move]()) {
                if (this._move == "right") this.x += this._speed;
                else if (this._move == "left") this.x -= this._speed;
                else if (this._move == "up") this.y -= this._speed;
                else if (this._move == "down") this.y += this._speed;
            }
        })
        .onHit("ShadowBananaFire", function () {
            this._inShadow = true;
        }, function() {
            this._inShadow = false;
        });

        return this;
    }
});