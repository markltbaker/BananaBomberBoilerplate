// Helps the AI avoid unsafe tiles. Created when a bomb is dropped and removed after fire is gone
Crafty.c('ShadowBananaFire', {

    init: function() {
        this.requires("2D, Grid, empty, Collision, ShadowFire")
            .collision()
            .timeout(function() {
                this.destroy();
            }, 6100);
    }
});