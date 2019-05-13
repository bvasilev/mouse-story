var images = [["Normal Mouse",   "assets/img/mouse.png",       "Mouse: travels to the nearest house. The mice's aim is to eat all the cheese."],
              ["Obstacle Tile",  "assets/img/obstacle.png",    "Obstacle: mice cannot move across this square. Objects cannot be placed here."],
              ["Cheese",         "assets/img/cheese.png",      "Cheese: can be eaten by any mouse."],
              ["Blue Cheese",    "assets/img/blue-cheese.png", "Blue Cheese: can only be eaten by blue mice.]"],
              ["Blue Mouse",     "assets/img/blue-mouse.png",  "Blue Mouse: [description]"],
              ["House",          "assets/img/house.png",       "House: "],
              ["Blue House",     "assets/img/blue-house.png",  "Blue House: [description"]
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
        const column2_x = 350;
        
        var row_y = 80;

        this.add.rectangle(width/2, height/2, width, height, 0, 0.8);
        
        for (var i = 0; i < images.length; i++) {
            var mouse = this.add.image(column1_x, row_y, images[i][0]).setScale(0.2,0.2);
            var t1 = this.add.text(column2_x, row_y, images[i][2]);
            t1.setOrigin(0.5);
            
            row_y += 100;
        }
        
        var optionsCircle = this.add.circle(0, 0, 30, 0x8b4513);
        var exitSymbol = this.add.text(0, 0, "X", {fontFamily: 'Arial'}).setFontSize(38).setOrigin(0.5);
        this.add.container(40, 40, [optionsCircle, exitSymbol]).setSize(80, 80)
            .setInteractive()
            .on('pointerdown', function(ev) {
                $this.scene.resume('optionsMenu');
                $this.scene.stop();
            });
    }
}
