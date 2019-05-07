class DisplayModel extends Phaser.Scene {

    constructor() {
        super({key: 'displayModel'});
        this.updating = true;
        this.actors = [];
        this.items = [];
        this.x = 0;
    }

    preload() {
        phaserPreload(this);
    }

    create() {
        var gridX = model.cntCols;
        var gridY = model.cntRows;

        this.x = height / (1200 * gridY);
        var y = width / (1200 * gridX);
        if (y < this.x) this.x = y

        var squaresize = 800 * this.x;

        for (var i = gridX - 1; i >= 0; i--) {
            for (var j = gridY - 1; j >= 0; j--) {
                var squareType = model.queryTile(gridY - j - 1, gridX - i - 1).phaserTextureAlias
                var panel = this.add.image(0, 0, squareType).setScale(this.x, this.x).setOrigin(i - gridX + 1, 1 + j - gridY - (height - 200) / 800);
            }
        }
        var i = 0
        for (var a of model.actors) {
            var actor = this.physics.add.sprite(0, 0, a.name).setScale(this.x, this.x).setOrigin(-a.position.col, -(height - 200) / 800 - a.position.row);
            actor.displayHeight = this.x * 800;
            actor.displayWidth = this.x * 800;
            this.actors[i] = new Actor(actor, -a.position.row, -(height - 200) / 800 - a.position.col, a.name)
            i += 1
        }

        var invwidth = width / 260;
        var invheight = height / 425;
        this.add.image(width - 200, 0, 'Inventory').setScale(invheight, invwidth);
        var i = 0

        var oldX = [];
        var oldY = [];

        for (var item of model.items) {
            this.items[i] = this.add.sprite(width - squaresize, (i + 1 / 2) * squaresize, item).setScale(this.x, this.x);
            this.items[i].displayHeight = this.x * 800;
            this.items[i].displayWidth = this.x * 800;
            this.items[i].setInteractive();
            this.input.setDraggable(this.items[i]);
            console.log(this.items[i]);
            i += 1;
        }
        this.input.dragDistanceThreshold = 16;

        var prevX
        var prevY
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            var gridRow = gameObject.x / squaresize;
            var gridCol = gameObject.y / squaresize;
            if (gridRow <= gridX && gridCol <= gridY) {
                prevX = gridRow;
                prevY = gridCol;
            }
            gameObject.x = dragX;
            gameObject.y = dragY;


        });
        this.input.on('dragend', function(pointer, gameObject) {

            var gridRow = gameObject.x / squaresize;
            var gridCol = gameObject.y / squaresize;

            if (gridRow <= gridX && gridCol <= gridY)
                model.placeItem(gridRow, gridCol, gameObject.texture.key);

            // Suggestion: make code something like
            // If couldn't place item
            /* if(!model.placeItem(gridRow, gridCol, gameBoject.texture.key)){
              // Return item to its original position.
              // Doesn't matter if you call it from outside the level
              // Since placeItem will return false if the location is outside
              // of the grid boundary or there was some other item there.
            } */

            else
            if (gameObject.x >= width - 300)
            // Find a way to
                model.removeItem(prevX, prevY, gameObject.texture.key);


        });
    }

    update() {
        var $this = this;

        if (this.updating) {
            this.updating = false
            model.runStep();
            var i = 0
            for (var a of this.actors) {
                try {
                    var mactor = model.getByName(a.name)
                    if (a.x > -mactor.position.row) {
                        a.actor.setVelocityY(800 * this.x);
                    } else if (a.x < -mactor.position.row) {
                        a.actor.setVelocityY(-800 * this.x);
                    } else if (a.y > -(height - 200) / 800 - mactor.position.col) {
                        a.actor.setVelocityX(800 * this.x);
                    } else if (a.y < -(height - 200) / 800 - mactor.position.col) {
                        a.actor.setVelocityX(-800 * this.x);
                    }
                } catch (err) {
                }
            }
            setTimeout(function () {
                $this.updating = true;
                for (var a of $this.actors) {
                    if (!a.destroyed) {
                        try {
                            var mactor = model.getByName(a.name)
                            a.actor.setOrigin(-mactor.position.col, -(height - 200) / 800 - mactor.position.row);
                            a.actor.x = 0
                            a.actor.y = 0
                            a.actor.setVelocityX(0)
                            a.actor.setVelocityY(0)
                            a.x = -mactor.position.row
                            a.y = -(height - 200) / 800 - mactor.position.col
                        } catch (err) {
                            a.actor.destroy()
                            a.destroyed = true
                        }
                    }
                }
            }, 1000);


        }
    }
}
