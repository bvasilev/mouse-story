<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js"></script>
</head>
<body>

    <script>
    var width = window.innerWidth/4;
    var height = window.innerHeight/1.5;
    class LevelSelect extends Phaser.Scene {
        constructor ()
        {
            super({ key: 'levelSelect' });
        }
        preload ()
        {
            this.load.image('panel', 'Images/panel.jpg');
        }
        create ()
        {
            
            // "Options Menu" text box
            this.add.text(100, 100, 'Options Menu');
            
            // Button to resume the level
            var p1 = this.add.image(0, 0, 'panel').setScale(0.2,0.05);
            //var r1 = this.add.rectangle(0, 0, 125, 50, 0x0000ff); // blue rectangle as alternative to panel background
            var t1 = this.add.text(0, 0, "Resume");
            t1.setOrigin(0.5);
            var button1 = this.add.container(160, 160);
            button1.add([p1, t1]);
            
            // this doesn't work
            button1.setInteractive();
            p1.setInteractive();
            
            /*button1.on('pointerdown', function (pointer, x, y) {
                    //this.scene.start([current level label]);
                    var x = this.add.text(160, 320, "test");
            });*/
            this.input.on('pointerdown', function (pointer) { this.add.text(160, 320, "test"); });
            
            // Button to go to help page
            var p2 = this.add.image(0, 0, 'panel').setScale(0.2,0.05);
            var t2 = this.add.text(0, 0, "Help");
            t2.setOrigin(0.5);
            var button2 = this.add.container(160, 225);
            button2.add([p2, t2]);
            
            // Button to quit to main menu
            var p3 = this.add.image(0, 0, 'panel').setScale(0.2,0.05);
            var t3 = this.add.text(0, 0, "Quit");
            t3.setOrigin(0.5);
            var button3 = this.add.container(160, 290);
            button3.add([p3, t3]);
        }
    }
    var config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        scene: [LevelSelect,
            {
            preload: preload,
            create: create,
            key: 'main',
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
