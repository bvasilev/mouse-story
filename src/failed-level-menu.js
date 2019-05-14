class FailedLevelMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'failedLevelMenu' });
    }
    preload() {
        this.load.image('panel', 'assets/img/panel.jpg');
    }
    create() {
        var $this = this;

        const button_x = width / 2;
        const button1_y = 220;
        const button2_y = 285;

        const button_image = 'panel';

        this.add.rectangle(width / 2, height / 2, width, height, 0, 0.8);

        this.add.text(width / 2, 100, 'You unfortunately failed this level!').setFontSize(38).setOrigin(0.5);
        this.add.text(width / 2, 150, 'Would you like to try again?').setFontSize(38).setOrigin(0.5);

        var p1 = this.add.image(button_x, button1_y, button_image).setScale(0.2, 0.05)
            .setInteractive()
            .on('pointerdown', function(ev1) {
                model.resetLevel();
                $this.scene.start('displayModel');
                $this.scene.stop();
            });
        var t1 = this.add.text(button_x, button1_y, "Retry level");
        t1.setOrigin(0.5);
        
        var p2 = this.add.image(button_x, button2_y, button_image).setScale(0.2, 0.05)
            .setInteractive()
            .on('pointerdown', function(ev2) {
                $this.scene.start('levelSelect');
                $this.scene.stop('displayModel');
                $this.scene.stop();
            });
        var t2 = this.add.text(button_x, button2_y, "Level Select");
        t2.setOrigin(0.5);


    }
}
