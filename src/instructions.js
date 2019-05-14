class InstructionsPage extends Phaser.Scene {
        constructor() {
            super({ key: 'instructions' });
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
            this.add.text(width / 2, height /6, 'Instructions', { fontFamily: 'Arial' }).setFontSize(38).setOrigin(0.5);
            var mouse = this.add.sprite(width / 3, height / 2, 'mouse').setScale(x, x);
            this.add.text(width / 2 + 100, height / 2, 'The aim of the game is to get all of the mice\nto eat the cheese and get back to their houses.\nIn each level, you have items in your inventory\nto place on the grid before pressing the Start button.', { fontFamily: 'Arial' }).setFontSize(20).setOrigin(0.5);
            
            var nextButton = this.add.rectangle(0, 0, 80, 40, 0x8b4513);
            var nextText = this.add.text(-20, -8, "Next");
            nextButton.setInteractive();
            nextButton.on("pointerdown", function (ev) {
                $this.scene.start('help', {returnScene: 'levelSelect'});
                console.log("instructions");
                $this.scene.stop();
            });
            var nextContainer = this.add.container(width/2, height - 100, [nextButton, nextText]);
            
            var exitCircle = this.add.circle(0, 0, 30, 0x8b4513);
            var exitSymbol = this.add.text(0, 0, "X", {fontFamily: 'Arial'}).setFontSize(38).setOrigin(0.5);
            this.add.container(40, 40, [exitCircle, exitSymbol]).setSize(80, 80)
                .setInteractive()
                .on('pointerdown', function(ev) {
                    $this.scene.start('levelSelect');
                    $this.scene.stop();
                });
        }
    }
