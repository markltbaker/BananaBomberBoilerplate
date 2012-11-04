Crafty.c('BananaFire', {

    init: function() {
        this.requires("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, banana, Grid, Collision, fire")
            .animate('fire', 4, 0, 5)
            .animate('fire', 10, -1)
            .collision()
            .onHit('explodable', function(o) {
                for(var i = 0; i < o.length; i++) {
                    o[i].obj.trigger("explode");
                }
            })
            .timeout(function() {
                this.destroy();
            }, 2000);
    }
});