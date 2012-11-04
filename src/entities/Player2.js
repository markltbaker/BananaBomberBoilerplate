Player2 = BaseEntity.extend({
    defaults: {
    },
    initialize: function(){
        var model = this;
        var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Ape, player, RightControls, SpriteAnimation, Collision, BombDropper, Grid");

        entity
            .attr({ x: 368, y: 16, z: 1 })
            .rightControls(1)
            .bombDropper(Crafty.keys.ENTER)
            .Ape();

        model.set({'entity' : entity });
    }
});