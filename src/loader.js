/**Load levels from the model.js file */

class Loader {

    constructor(filepath, model) {
        this.filepath = filepath;
        this.model = model;
    }

    // function include(file) {

    //     var script = document.createElement('script');
    //     script.src = file;
    //     script.type = 'text/javascript';
    //     script.defer = true;

    //     document.getElementsByTagName('head').item(0).appendChild(script);

    // }
    // include('model.js');

    this.model.readLevelFromFile(this.filepath)

    var gridX = model.cntCols();
    var gridY = model.cntRows();

    var game = new Phaser.Game(config);

    function preload() {
        //this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('mouse', 'assets/img/mouse.png');
        this.load.image('panel', 'assets/img/panel.jpg');
        this.load.image('free_tile', 'assets/img/free_tile.png');
        this.load.image('obstacle_tile', 'assets/img/obstacle_tile.png');
        this.load.image('blue_cheese', 'assets/img/blue_cheese.png');
        this.load.image('cheese', 'assets/img/cheese.png');
        this.load.image('normal_mouse', 'assets/img/normal_mouse.png');
        this.load.image('house', 'assets/img/house.png');

    }


    function create() {
        var panel
        var x = height / (1200 * gridY);
        var y = width / (1200 * gridX);
        if (y < x) x = y;
        for (var i = gridX - 1; i >= 0; i--) {
            for (var j = gridY - 1; j >= 0; j--) {
                var tile = this.model.queryTile(i, j);
                var image_path = tile.texturePath();
                if (image_path == "/assets/img/obstacle_tile.png")
                    var panel = this.add.image(0, 0, 'obstacle_tile').setScale(x, x).setOrigin(i - gridX + 1, j - gridY - (height - 200) / 800);
                else
                    var panel = this.add.image(0, 0, 'free_tile').setScale(x, x).setOrigin(i - gridX + 1, j - gridY - (height - 200) / 800);
            }
        }

        var actors = model.actors();
        val length = actors.length
        for (var i = 0; i < length; i++) {
            var image_path = actors[i].texturePath();
            var position = actors[i].position();
            var actor = this.add.sprite(0, 0, image_path).setOrigin(0, -1 - (height - 200) / 800);
            mouse.displayHeight = x * 800;
            mouse.displayWidth = x * 800;
        }

    }

}
