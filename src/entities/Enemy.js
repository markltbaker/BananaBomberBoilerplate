Enemy = BaseEntity.extend({
    defaults: {
    },
    initialize: function(){
        var model = this;
        var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Ape, enemy, AIControls, SpriteAnimation, Collision, BombDropper, Grid");

        entity
            .attr({ x: 368, y: 16, z: 2 })
            .AIControls(1)
            .Ape();

        model.set({'entity' : entity });
    }
});

