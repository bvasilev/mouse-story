// each list has: [image name, file location, text description, scale for image to display at]
var images = [["Normal Mouse",   "assets/img/mouse.png",       "Mouse: travels to the nearest house.\nThe mice's aim is to eat all the cheese.", 0.2],
              ["Obstacle Tile",  "assets/img/obstacle.png",    "Obstacle: mice cannot move across this square.\nObjects cannot be placed here.", 0.1],
              ["Cheese",         "assets/img/cheese.png",      "Cheese: can be eaten by any mouse.", 0.15],
              ["House",          "assets/img/house.png",       "House: the mouse travels to the nearest house.", 0.15],
              ["Blue Mouse",     "assets/img/blue-mouse.png",  "Blue Mouse: travels to the nearest blue house.\nCan only eat blue cheese.", 0.2],
              ["Blue Cheese",    "assets/img/blue-cheese.png", "Blue Cheese: can only be eaten by blue mice.", 0.15],
              ["Blue House",     "assets/img/blue-house.png",  "Blue House: the blue mouse travels to the nearest blue house.", 0.15]
              ];
class HelpPage extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'help' });
    }
    preload ()
    {
        for (var i = 0; i < images.length; i++) {
            this.load.image(images[i][0], images[i][1]);
        }
    }
    create ()
    {
        var $this = this;

        const column1_x = 180;
        const column2_x = 450;
        
        var row_y = 80;

        this.add.rectangle(width/2, height/2, width, height, 0, 0.8);
        
        for (var i = 0; i < images.length; i++) {
            var mouse = this.add.image(column1_x, row_y, images[i][0]).setScale(images[i][3], images[i][3]);
            var t1 = this.add.text(column2_x, row_y, images[i][2], {align: 'left'});
            t1.setOrigin(0.5);
            
            row_y += 100;
        }
        
        var optionsCircle = this.add.circle(0, 0, 30, 0x8b4513);
        var exitSymbol = this.add.text(0, 0, "X", {fontFamily: 'Arial'}).setFontSize(38).setOrigin(0.5);
        this.add.container(40, 40, [optionsCircle, exitSymbol]).setSize(80, 80)
            .setInteractive()
            .on('pointerdown', function(ev) {
                $this.scene.start('optionsMenu');
                $this.scene.stop();
            });
    }
}
