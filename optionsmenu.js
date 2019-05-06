<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js"></script>
</head>
<body>

    <script>
    var width = window.innerWidth/4;
    var height = window.innerHeight/1.5;
    class OptionsMenu extends Phaser.Scene {
        constructor ()
        {
            super({ key: 'optionsMenu', active: true });
        }
        preload ()
        {
            this.load.image('panel', 'Images/panel.jpg');
        }
        create ()
        {
            const option_x = 160;
            const option1_y = 160;
            const option2_y = 225;
            const option3_y = 290;
            const button_colour = 0x8B4513;
            
            var x = this.add.text(160, 320, "nothing pressed"); // for testing
            
            // "Options Menu" text box
            this.add.text(100, 100, 'Options Menu');
            
            // Button to resume the level
            var p1 = this.add.image(0, 0, 'panel').setScale(0.2,0.05);
            //var r1 = this.add.rectangle(0, 0, 125, 50, 0x0000ff); // blue rectangle as alternative to panel background
            var t1 = this.add.text(10, 0, "Resume");
            t1.setOrigin(0.5);
            var button1 = this.add.container(option_x, option1_y, [p1, t1]);
            var c1 = this.add.circle(option_x-60, option1_y, 15, button_colour);
            c1.setInteractive();
            c1.on("pointerdown", function (ev) {
                    x.text = "resume pressed";
                })
            
            // Button to go to help page
            var p2 = this.add.image(0, 0, 'panel').setScale(0.2,0.05);
            var t2 = this.add.text(10, 0, "Help");
            t2.setOrigin(0.5);
            var button2 = this.add.container(option_x, option2_y, [p2, t2]);
            
            var c2 = this.add.circle(option_x-60, option2_y, 15, button_colour);
            c2.setInteractive();
            c2.on("pointerdown", function (ev) {
                    x.text = "help pressed";
                });
            
            // Button to quit to main menu
            var p3 = this.add.image(0, 0, 'panel').setScale(0.2,0.05);
            var t3 = this.add.text(10, 0, "Quit");
            t3.setOrigin(0.5);
            var button3 = this.add.container(option_x, option3_y, [p3, t3]);
            
            var c3 = this.add.circle(option_x-60, option3_y, 15, button_colour);
            c3.setInteractive();
            c3.on("pointerdown", function (ev) {
                    x.text = "quit pressed";
                });
        }
    }
    var config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        scene: [OptionsMenu,
            {
            preload: preload,
            create: create,
            key: 'optionsMenu',
        }]
    };
    var game = new Phaser.Game(config);
    function preload ()
    {
    }
    function create ()
    {
    }
    
    
    </script>

</body>
</html>
