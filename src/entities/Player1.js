Player1 = BaseEntity.extend({
    defaults: {
    },
    initialize: function(){
        var model = this;
        var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Ape, player, LeftControls, BombDropper");

        entity
            .attr({ x: 16, y: 304, z: 1 })
            .leftControls(1)
            .Ape();           

        model.set({'entity' : entity });
    }
});