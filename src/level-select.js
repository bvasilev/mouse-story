class LevelSelect extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'levelSelect' });
    }

    preload ()
    {
        this.load.image('arrow', 'assets/img/arrow.png');
        this.load.image('star', 'assets/img/star.png');
    }

    create ()
    {
        var $this = this;

        var page = 1;
        var levelCount = Object.keys(levels).filter(function(key) {
            return key.indexOf('level') === 0;
        }).length;
        var pageButtonCount = Math.floor((width - (2*75)) / 200);
        var pageCount = Math.ceil(levelCount/pageButtonCount);

        this.add.text(width / 2, 100, 'Level Select', {fontFamily: 'Arial'}).setFontSize(38).setOrigin(0.5);

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
            
        var instructionsButton = this.add.rectangle(0, 0, 160, 40, 0x8b4513);
        var instructionsText = this.add.text(-53, -8, "Instructions");
        instructionsButton.setInteractive();
        instructionsButton.on("pointerdown", function (ev) {
            $this.scene.start('instructions');
            $this.scene.stop();
        });
        var instructionsContainer = this.add.container(width/2, height - 100, [instructionsButton, instructionsText]);

        var selector = this.add.container(width/2, height/2).setSize(200*pageButtonCount, 200);
        update();

        function update ()
        {
            backButton.setVisible(page>1);
            nextButton.setVisible(page<pageCount);

            var start = (page-1) * pageButtonCount;
            var end = Math.min(page * pageButtonCount, levelCount);

            selector.removeAll();

            for (var i = start + 1; i<=end; i++) {
                var t1 = $this.add.text(0, -40, 'Level ' + i, {fontFamily: 'Arial'}).setFontSize(30).setOrigin(0.5);
                var g1 = $this.add.graphics().fillStyle(0x8b4513, 1).fillRoundedRect(-87, -100, 175, 200, 32);

                var button = $this.add.container((i - start - ((pageButtonCount + 1) / 2)) * 200, 0, [g1, t1])
                    .setSize(175, 200)
                    .setInteractive()
                    .on('pointerdown', function (ev) {
                        model.readLevelFromFile(this.name);
                        $this.scene.start('displayModel');
                    }).setName('level' + i);

                /*var starNumber = Math.floor(Math.random()*3);
                for(var j=0; j<=starNumber; j++){
                    var star = $this.add.image(-45 + (j*40), 60, 'star').setScale(0.2);
                    button.add(star);
                }*/

                console.log(Cookies.get('level'+i));
                if (Cookies.get('level' + i) == 1) {
                    var star = $this.add.image(0, 60, 'star').setScale(0.2);
                    button.add(star);
                }

                selector.add(button);
            }
        }
    }
}
