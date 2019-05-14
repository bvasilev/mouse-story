var model = new Model();
var completedLevels = 0;

var width = window.innerWidth-20
var height = window.innerHeight-20

var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {  },
            debug: false
        }
    },
    scene: [WelcomePage, LevelSelect, DisplayModel, OptionsMenu, CompletedLevelMenu, HelpPage, EmailPage, FailedLevelMenu, InstructionsPage],
};

var game = new Phaser.Game(config);
