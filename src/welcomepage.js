class WelcomePage extends Phaser.Scene {
        constructor() {
            super({ key: 'welcomePage' });
        }
        preload() {
            this.load.image('panel', 'assets/img/panel.jpg');
            this.load.image('mouse', 'assets/img/mouse.png');
            this.load.image('blue_mouse', 'assets/img/blue-mouse.png');
            this.load.image('house', 'assets/img/house.png');
        }
        create() {


            var $this = this;
            var x = width / 2000;
            var y = height / 2000;
            if (y < x) x = y

            this.add.image(width / 2, height / 2, 'panel');
            this.add.text(width / 2, height /6, 'The Mouse Story', { fontFamily: 'Arial' }).setFontSize(38).setOrigin(0.5);
            var mouse = this.add.sprite(width / 2, height / 2, 'mouse').setScale(x, x);
            this.add.text(width / 2, height - height / 6, 'Click the mouse to play the game', { fontFamily: 'Arial' }).setFontSize(28).setOrigin(0.5);
            mouse.setInteractive()
            mouse.on('pointerdown', function(ev) {
                //x.text = "restart pressed";
                $this.scene.start('levelSelect');
            });
        }
    }
    // var width = window.innerWidth - 20;
    // var height = window.innerHeight - 20;
    // var config = {
    //     type: Phaser.AUTO,
    //     width: width,
    //     height: height,
    //     scene: [WelcomePage,
    //         {
    //             preload: preload,
    //             create: create,
    //             key: 'welcomePage',
    //         }
    //     ]
    // };
    // var game = new Phaser.Game(config);

// function preload() {
// }

// function create() {

// }
