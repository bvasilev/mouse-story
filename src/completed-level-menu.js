class CompletedLevelMenu extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'completedLevelMenu' });
    }
    preload ()
    {
        this.load.image('panel', 'assets/img/panel.jpg');
    }
    create ()
    {
        var $this = this;

        const button_x = 230;
        const button1_y = 160;
        const button2_y = 225;
        const button_image = 'panel';

        this.add.rectangle(width/2, height/2, width, height, 0, 0.8);
        
        this.add.text(100, 100, 'You have completed this level!');
        
        var p1 = this.add.image(button_x, button1_y, button_image).setScale(0.2,0.05)
                     .setInteractive()
                     .on('pointerdown', function (ev1) {
                         //$this.scene.launch('');
                     });
        var t1 = this.add.text(button_x, button1_y, "Next level");
        t1.setOrigin(0.5);
        
        var p2 = this.add.image(button_x, button2_y, button_image).setScale(0.2,0.05)
                     .setInteractive()
                     .on('pointerdown', function (ev2) {
                         $this.scene.start('levelSelect');
                         $this.scene.stop();
                     });
        var t2 = this.add.text(button_x, button2_y, "Main menu");
        t2.setOrigin(0.5);
    }
}
