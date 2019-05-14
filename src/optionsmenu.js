class OptionsMenu extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'optionsMenu' });
    }
    preload ()
    {
        this.load.image('panel', 'assets/img/panel.jpg');
    }
    create ()
    {
        var $this = this;

        const option_x = 160;
        const option1_y = 160;
        const option2_y = 225;
        const option3_y = 290;
        const option4_y = 355;
        const button_image = 'panel';

        this.add.rectangle(width/2, height/2, width, height, 0, 0.8);
        
        //var x = this.add.text(160, 500, "nothing pressed"); // for testing
        
        // "Options Menu" text box
        this.add.text(100, 100, 'Options Menu');
        
        // Button to resume current level
        var p1 = this.add.image(option_x, option1_y, button_image).setScale(0.2,0.05)
                     .setInteractive()
                     .on('pointerdown', function (ev1) {
                         //x.text = "resume pressed";
                         $this.scene.resume('displayModel');
                         $this.scene.stop();
                     });
        var t1 = this.add.text(option_x, option1_y, "Resume");
        t1.setOrigin(0.5);
            
        // Button to go to restart current level
        var p2 = this.add.image(option_x, option2_y, button_image).setScale(0.2,0.05)
                     .setInteractive()
                     .on('pointerdown', function (ev2) {
                         //x.text = "restart pressed";
                         model.resetLevel();
                         $this.scene.start('displayModel');
                         $this.scene.stop();
                     });
        var t2 = this.add.text(option_x, option2_y, "Restart");
        t2.setOrigin(0.5);
        
        // Button to go to help page
        var p3 = this.add.image(option_x, option3_y, button_image).setScale(0.2,0.05)
                     .setInteractive()
                     .on('pointerdown', function (ev3) {
                         //x.text = "help pressed";
                         $this.scene.stop();
                         $this.scene.start('help', {returnScene: 'optionsMenu'});
                     });
        var t3 = this.add.text(option_x, option3_y, "Help");
        t3.setOrigin(0.5);
        
        // Button to quit to main menu
        var p4 = this.add.image(option_x, option4_y, button_image).setScale(0.2,0.05)
                     .setInteractive()
                     .on('pointerdown', function (ev4) {
                         //x.text = "quit pressed";
                         $this.scene.start('levelSelect');
                         $this.scene.stop('displayModel');
                     });
        var t4 = this.add.text(option_x, option4_y, "Quit");
        t4.setOrigin(0.5);
        
        /*var p5 = this.add.image(option_x, 420, button_image).setScale(0.2,0.05)
                     .setInteractive()
                     .on('pointerdown', function (ev4) {
                         $this.scene.launch('completedLevelMenu');
                         $this.scene.stop();
                     });
        var t5 = this.add.text(option_x, 420, "Test completed level menu");
        t5.setOrigin(0.5);*/
    }
}
