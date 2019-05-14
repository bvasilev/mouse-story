class DisplayModel extends Phaser.Scene {

    constructor() {
        super({key: 'displayModel'});
        this.updating = false;
        this.actors = [];
        this.items = [];
        this.x = 0;
    }

    preload() {
        phaserPreload(this);
        this.ready=false;
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
            this.actors[i] = new Actor(actor, a.position.row, a.position.col, a.name)
            i += 1
        }

        var invwidth = width / 260;
        var invheight = height / 425;
        this.add.image(width - squaresize / 2, 0, 'Inventory').setScale(invheight / 2, invwidth);
        var i = 0;
        var prevX;
        var prevY;
        for (var item of model.items) {
            var newItem = this.add.sprite(width - squaresize / 2, (i + 1 / 2) * squaresize, item).setScale(this.x, this.x);
            newItem.displayHeight = this.x * 800;
            newItem.displayWidth = this.x * 800;
            newItem.setInteractive();
            this.input.setDraggable(newItem);
            this.items[i]=new Actor(newItem,-1,-1,item)
            i += 1;
        }
        this.input.dragDistanceThreshold = 16;

        var startDrag=true
        var dragItem

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

            if(startDrag){
                dragItem = $this.items.filter(i => i.actor==gameObject)[0]
                var gridRow = Math.floor(gameObject.y / squaresize) - 1;
                var gridCol = Math.floor(gameObject.x / squaresize);
                model.removeItem(gridRow, gridCol);
                startDrag=false;
            }


        });
        var j = i - 1;
        this.input.on('dragend', function(pointer, gameObject) {

            var gridRow = Math.floor(gameObject.y / squaresize) - 1;
            var gridCol = Math.floor(gameObject.x / squaresize);
            console.log("add"+" "+gridRow+" "+gridCol)
            var isPlaced = model.placeItem(gridRow, gridCol, gameObject.texture.key)
            startDrag=true

            if (!isPlaced) {
                gameObject.x = width - squaresize / 2;
                gameObject.y = (j + 1 / 2) * squaresize;
                j = (j + 1) % i;

            } else{
                dragItem.y=gridCol
                dragItem.x=gridRow
            }


        });

        var $this = this;

        // Options menu button
        var optionsCircle = this.add.circle(0, 0, 30, 0x8b4513);
        var questionMark = this.add.text(0, 0, "?", {fontFamily: 'Arial'}).setFontSize(38).setOrigin(0.5);
        this.add.container(40, 40, [optionsCircle, questionMark]).setSize(80, 80)
            .setInteractive()
            .on('pointerdown', function(ev) {
                $this.scene.launch('optionsMenu');
                $this.scene.pause();
            });
        
        var startText = this.add.text(width/3, 30, "Level "+model.name.match(/\d+/g)).setFontSize(20);
        
        
        // Button to start playing the level
        var startButton = this.add.rectangle(width/3 + 30, height - 95, 120,40,0x8b4513);
        var startText = this.add.text(width/3, height - 100, "Start");
        startButton.setInteractive();
        startButton.on("pointerdown", function (ev) {
            $this.updating = true;
            $this.ready=true;
            startText.destroy();

            $this.actors = $this.actors.concat($this.items.filter(i=>i.x!=-1&&i.y!=-1))

            model.startGame();

            console.log(model)  
            this.destroy();
        });
    }

    update() {
        var $this = this;

        if (this.updating&&this.ready) {
            this.updating = false
            model.runStep();
            var i = 0
            for (var a of this.actors) {
                try {
                    var mactor = model.getByName(a.name)
                    if(a.name.includes("Mouse") || a.name.includes("Cat")){
                        if (a.x < mactor.position.row) {
                            a.actor.setVelocityY(800 * this.x);
                        } else if (a.x > mactor.position.row) {
                            a.actor.setVelocityY(-800 * this.x);
                        } else if (a.y < mactor.position.col) {
                            a.actor.setVelocityX(800 * this.x);
                        } else if (a.y > mactor.position.col) {
                            a.actor.setVelocityX(-800 * this.x);
                        }
                    }
                } catch (err) {
                }
            }
            setTimeout(function () {
                $this.updating = true;
                for (var a of $this.actors) {
                    if (!a.destroyed && a.name!="#") {
                        try {
                            var mactor = model.getByName(a.name)
                            if(!a.name.includes("Mouse") && !a.name.includes("Cat")){
                                mactor=model.getActorByNameAndPosition(a.x,a.y,a.name)
                            }else{
                                a.actor.x = 0
                                a.actor.y = 0
                                a.actor.setVelocityX(0)
                                a.actor.setVelocityY(0)
                                a.x = mactor.position.row
                                a.y = mactor.position.col
                                a.actor.setOrigin(-mactor.position.col, -(height - 200) / 800 - mactor.position.row);
                            }
                        } catch (err) {
                            a.actor.destroy()
                            a.destroyed = true
                        }
                    }
                }

               var st = model.isGameDone
               if (st) {
                    $this.updating = false;
                    if (model.playerWins) {
                        Cookies.set(model.name, 1);
                        completedLevels = completedLevels + 1;
                        if (completedLevels > 3)
                            $this.scene.start('emailPage');
                        else
                            $this.scene.start('completedLevelMenu');
                    } else {
                        $this.scene.start('failedLevelMenu');
                    }
                }
            }, 1000);


        }
    }
}
