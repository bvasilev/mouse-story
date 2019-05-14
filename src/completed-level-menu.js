class CompletedLevelMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'completedLevelMenu' });
    }
    preload() {
        this.load.image('panel', 'assets/img/panel.jpg');
    }
    create() {
        var $this = this;

        const button_x = width / 2;
        const button1_y = 160;
        const button2_y = 225;
        const button3_y = 290;
        const button_image = 'panel';

        this.add.rectangle(width / 2, height / 2, width, height, 0, 0.8);

        this.add.text(width / 2, 100, 'You have completed this level!').setFontSize(38).setOrigin(0.5);

        function nextLevel() {
            var thisLevel = parseInt(model.name.match(/\d+/g));
            console.log(thisLevel);
            var next = thisLevel+1;
            console.log(next);
            var levelCount = Object.keys(levels).filter(function(key) {
                return key.indexOf('level') === 0;
            }).length;
            console.log(levelCount);
            if (next<=levelCount){
                return('level'+next);
            }
            else{
                return '';
            }
        }

        if (nextLevel() !== '') {
            var p1 = this.add.image(button_x, button1_y, button_image).setScale(0.2, 0.05)
                .setInteractive()
                .on('pointerdown', function (ev1) {
                    var next = nextLevel();
                    model.readLevelFromFile(next);
                    $this.scene.start('displayModel');
                    $this.scene.stop();
                });

            var t1 = this.add.text(button_x, button1_y, "Next level");
            t1.setOrigin(0.5);
        }

        var p2 = this.add.image(button_x, button2_y, button_image).setScale(0.2,0.05)
            .setInteractive()
            .on('pointerdown', function (ev2) {
                model.resetLevel();
                $this.scene.start('displayModel');
                $this.scene.stop();
            });
        var t2 = this.add.text(button_x, button2_y, "Retry level");
        t2.setOrigin(0.5);

        var p3 = this.add.image(button_x, button3_y, button_image).setScale(0.2,0.05)
            .setInteractive()
            .on('pointerdown', function (ev2) {
                $this.scene.start('levelSelect');
                $this.scene.stop('displayModel');
                $this.scene.stop();
            });
        var t3 = this.add.text(button_x, button3_y, "Level Select");
        t3.setOrigin(0.5);
    }
}