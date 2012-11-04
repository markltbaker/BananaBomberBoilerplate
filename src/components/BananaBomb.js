Crafty.c('BananaBomb', {

    init: function() {
        this.requires("2D, "+gameContainer.conf.get('renderType')+", SpriteAnimation, Grid, banana, explodable")
            .animate('explode', 4, 0, 5)
            .animate('explode', 50, -1)
            .timeout(function() {
                this.trigger("explode");
            }, 4000)
            .bind('explode', function() {
                this.destroy();

                //Create fire from the explosion
                for(var i = this.col() - 2; i < this.col()+3; i++)
                    Crafty.e("BananaFire").attr({ z:9000 }).col(i).row(this.row())
                for(var i = this.row() - 2; i < this.row()+3; i++)
                    Crafty.e("BananaFire").attr({ z:9000 }).col(this.col()).row(i)
            });
    },

    BananaBomb: function() {
        //Create shadow fire to help the AI
        for(var i = this.col() - 2; i < this.col()+3; i++)
            Crafty.e("ShadowBananaFire").attr({ z:9000 }).col(i).row(this.row())
        for(var i = this.row() - 2; i < this.row()+3; i++)
            Crafty.e("ShadowBananaFire").attr({ z:9000 }).col(this.col()).row(i)
        return this;
    }
});