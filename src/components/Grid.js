Crafty.c('Grid', {
    _cellSize: 16,
    Grid: function(cellSize) {
        if(cellSize) this._cellSize = cellSize;
        return this;
    },
    col: function(col) {
        if(arguments.length === 1) {
            this.x = this._cellSize * col;
            return this;
        } else {
            return Math.round(this.x / this._cellSize);
        }
    },
    row: function(row) {
        if(arguments.length === 1) {
            this.y = this._cellSize * row;
            return this;
        } else {
            return Math.round(this.y / this._cellSize);
        }
    },      
    snap: function(){
        this.x = Math.round(this.x/this._cellSize) * this._cellSize;
        this.y = Math.round(this.y/this._cellSize) * this._cellSize;
    }
});