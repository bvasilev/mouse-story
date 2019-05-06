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
        var levelCount = 18; //levels.length - 1
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
                var g1 = $this.add.graphics().fillStyle(0x109900, 1).fillRoundedRect(-87, -100, 175, 200, 32);

                var button = $this.add.container((i - start - ((pageButtonCount + 1) / 2)) * 200, 0, [g1, t1])
                    .setSize(175, 200)
                    .setInteractive()
                    .on('pointerdown', function (ev) {
                        model.readLevelFromFile(this.name);
                        $this.scene.start('display');
                    }).setName('level' + i);

                selector.add(button);
            }
        }
    }
}