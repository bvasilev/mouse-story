class EmailPage extends Phaser.Scene {
        constructor() {
            super({ key: 'emailPage' });
            this.emails = [];
        }
        preload() {
            this.load.image('panel', 'assets/img/panel.jpg');
            this.load.image('mouse', 'assets/img/mouse.png');

        }

        create() {

            var $this = this;
            var x = width / 2000;
            var y = height / 2000;
            if (y < x) x = y

            const button_x = width / 2;
            const button1_y = 300;
            const button2_y = 350;
            const button_image = 'panel';

            this.add.image(width / 2, height / 2, 'panel');
            this.add.text(width / 2, 170, 'Well done for finishing some of the Mouse Story!', { fontFamily: 'Arial' }).setFontSize(38).setOrigin(0.5);
            this.add.text(width / 2, 400, 'Enter your email in the box if you would like ', { fontFamily: 'Arial' }).setFontSize(28).setOrigin(0.5);
            this.add.text(width / 2, 450, '    to hear more from Metaswitch ', { fontFamily: 'Arial' }).setFontSize(28).setOrigin(0.5);
            var mouse = this.add.sprite(width / 2, 600, 'mouse').setScale(x, x);
            this.add.text(width / 2, 250, 'Press one of the buttons if you want to keep playing!', { fontFamily: 'Arial' }).setFontSize(28).setOrigin(0.5);

            function nextLevel() {
                var thisLevel = parseInt(model.name.match(/\d+/g));
                console.log(thisLevel);
                var next = thisLevel + 1;
                console.log(next);
                var levelCount = Object.keys(levels).filter(function(key) {
                    return key.indexOf('level') === 0;
                }).length;
                console.log(levelCount);
                if (next <= levelCount) {
                    return ('level' + next);
                } else {
                    return '0';
                }
            }

            var p1 = this.add.image(button_x, button1_y, button_image).setScale(0.2, 0.05)
                .setInteractive()
                .on('pointerdown', function(ev1) {
                    var next = nextLevel();
                    if (next === '0') {
                        $this.scene.start('levelSelect');
                        $this.scene.stop();
                    } else {
                        model.readLevelFromFile(next);
                        $this.scene.start('displayModel');
                        $this.scene.stop();
                    }
                });
            var t1 = this.add.text(button_x, button1_y, "Next level");
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
