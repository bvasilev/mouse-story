class EmailPage extends Phaser.Scene {
        constructor() {
            super({ key: 'emailPage' });
            this.emails = [];
        }
        preload() {
            this.load.image('panel', 'assets/img/panel.jpg');
            this.load.image('mouse', 'assets/img/mouse.png');
            this.load.image('button', 'assets/img/levelSelect.png');
        }

        create() {

            var $this = this;
            var x = width / 2000;
            var y = height / 2000;
            if (y < x) x = y

            this.add.image(width / 2, height / 2, 'panel');
            this.add.text(width / 2, 250, 'Well done for finishing the Mouse Story!', { fontFamily: 'Arial' }).setFontSize(38).setOrigin(0.5);
            this.add.text(width / 2, 400, 'Enter your email in the box if you would like ', { fontFamily: 'Arial' }).setFontSize(28).setOrigin(0.5);
            this.add.text(width / 2, 450, '    to hear more from Metaswitch ', { fontFamily: 'Arial' }).setFontSize(28).setOrigin(0.5);
            var mouse = this.add.sprite(width / 2, 600, 'mouse').setScale(x, x);
            var button = this.add.sprite(width / 2, 350, 'button').setScale(x * 2.5, x * 2.5);
            button.setInteractive()
            button.on('pointerdown', function(ev) {
                //x.text = "restart pressed";
                $this.scene.start('levelSelect');
            });

            setTimeout(function() {
                var email = window.prompt("Please enter your email", "Email Address");
                if (email == null || email == "") {
                    txt = "User cancelled the prompt.";
                } else {
                    $this.emails.push(email);
                    console.log($this.emails);
                }
            }, 1000);
        }
    }
    // var width = window.innerWidth - 20;
    // var height = window.innerHeight - 20;

// var config = {
//     type: Phaser.AUTO,
//     width: width,
//     height: height,
//     scene: [EmailPage,
//         {
//             preload: preload,
//             create: create,
//             key: 'emailPage',
//         }
//     ]
// };
// var game = new Phaser.Game(config);
// function preload(){

// }
// function create(){

// }
