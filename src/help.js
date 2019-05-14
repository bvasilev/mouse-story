// each list has: [image name, file location, text description, scale for image to display at]
var images = [["Normal Mouse",   "assets/img/mouse.png",       "Alice: travels to the nearest house.\nAlice's aim is to eat all the yellow cheese.", 0.2],
              ["Obstacle Tile",  "assets/img/obstacle.png",    "Obstacle: mice cannot move across this square.\nObjects cannot be placed here.", 0.1],
              ["Cheese",         "assets/img/cheese.png",      "Yellow Cheese: can be eaten by Alice.", 0.15],
              ["House",          "assets/img/house.png",       "Yellow House: Alice travels to the nearest yellow house.", 0.15],
              ["Blue Mouse",     "assets/img/blue-mouse.png",  "Bob: travels to the nearest blue house.\nBob's aim is to eat all the blue cheese.\nHe cannot eat yellow cheese.", 0.2],
              ["Blue Cheese",    "assets/img/blue-cheese.png", "Blue Cheese: can be eaten by Bob.", 0.15],
              ["Blue House",     "assets/img/blue-house.png",  "Blue House: Bob travels to the nearest blue house.", 0.15]
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
    init (data)
    {
        this.returnScene = data.returnScene;
    }
    create ()
    {
        var $this = this;
        
        this.add.rectangle(width/2, height/2, width, height, 0, 0.8);
        
        var exitCircle = this.add.circle(0, 0, 30, 0x8b4513);
        var exitSymbol = this.add.text(0, 0, "X", {fontFamily: 'Arial'}).setFontSize(38).setOrigin(0.5);
        this.add.container(40, 40, [exitCircle, exitSymbol]).setSize(80, 80)
            .setInteractive()
            .on('pointerdown', function(ev) {
                $this.scene.start($this.returnScene);
                $this.scene.stop();
            });
            
            
        var page = 1;
        var imageCount = images.length;
        var pageButtonCount = Math.floor((height - (2*75)) / 150);
        var pageCount = Math.ceil(imageCount/pageButtonCount);    
            
        var backButton = this.add.image(50, height / 2, 'arrow').setScale(0.3)
            .setInteractive()
            .on('pointerdown', function(ev) {
                page = Math.max(1, page-1);
                update();
            });

        var nextButton = this.add.image(width - 50, height / 2, 'arrow').setScale(0.3).toggleFlipX()
            .setInteractive()
            .on('pointerdown', function(ev) {
                page = Math.min(pageCount, page+1);
                update();
            });

        var selector = this.add.container(width/2, height/2).setSize(200*pageButtonCount, 200);
        update();

        function update ()
        {
            backButton.setVisible(page>1);
            nextButton.setVisible(page<pageCount);

            var start = (page-1) * pageButtonCount;
            var end = Math.min(page * pageButtonCount, imageCount);

            selector.removeAll();

            for (var i = start; i<end; i++) {
                var g1 = $this.add.image(-(height/2), 0, images[i][0]).setScale(images[i][3], images[i][3]);
                var t1 = $this.add.text(-(height/2)+100, 0, images[i][2]);

                var button = $this.add.container(0, 150 + ((i - start - ((pageButtonCount + 1) / 2)) * 150), [g1, t1])
                    .setSize(175, 200)

                selector.add(button);
            }
        }
    }
}
