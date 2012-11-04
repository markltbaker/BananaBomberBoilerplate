Crafty.c('BombDropper', {
    _dropped: 0,
    maxBombs: 2,
    _key: Crafty.keys.SPACE,

    init: function() {
        var dropper = this;
        this.requires('Grid')

        //Create the bomb
        .bind('KeyDown', function(e) {
            if (e.key !== this._key) {
                return;
            }
            
            if(this._dropped < this.maxBombs) {
                Crafty.e('BananaBomb')
                    .attr({z:100})
                    .col(this.col())
                    .row(this.row())
                    .BananaBomb()
                    .bind('explode', function() {
                        dropper._dropped--;
                    });

                this._dropped++;
            }
        });
    },
    bombDropper: function(key) {
        this._key = key;
        return this;
    }
});