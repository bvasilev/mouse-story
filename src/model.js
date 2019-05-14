/**
 * Represents the model of the grid. Responsible for
 * maintaining the state of the game and advancing it.
 */
//let levels = require("./levels.js");
class Model {
  constructor() {
    this._meta = levels.metadata;
    this._grid = []; // The level grid - a matrix
    this._actors = []; // Actors on the grid, specified by type and coordinates
    this._items = []; // Items the player has, specified by type (string)
    this._placedItems = []; // Items the player has placed - given by type and coordinates
    this._level = null; // The level data loaded directly from a file
    this._name = '';
  }

  /**
   * Returns the actors
   * @return {Actor[]}
   */
  get actors() {
    return this._actors;
  }

  get items() {
    return this._items;
  }

  get name() {
    return this._name;
  }

  /**
   * Gets an actor by name
   * @param {string} name - The name
   * @return {actor} - The actor
   * @throws if the actor doesn't exist
   */
  getByName(name) {
    for (let a of this._actors) if (a.name == name) return a;
    throw new Error("Tried to get non-existent actor with name " + name);
  }

  /**
   * Returns the number of rows
   * @return{number}
   */
  get cntRows() {
    if (this._level != null) return this._level.grid_height;
    else return 0;
  }

  /**
   * Returns the number of columns
   * @return{number}
   */
  get cntCols() {
    if (this._level != null) return this._level.grid_width;
    else return 0;
  }

  /**
   * Reads a level from a file.
   * @param {string} filePath - path to the .json level file
   * @returns {boolean} - false if something went wrong,
   * e.g. bad filepath, bad file, etc. true otherwise
   */
  readLevelFromFile(filePath) {
    // if (filePath.slice(-5) != ".json") {
    //   throw new Error("Wrong file type!");
    // }

    this._name = filePath;

    if (!(filePath in levels)) {
      throw new Error("Level not found!");
    }

    let fileData = levels[filePath]; // load the level
    if (!this._validateLevelFile(fileData)) {
      return false;
    }

    this._level = fileData;
    this._initLevel();
    return true;
  }

  /**
   * Initialise level state once this._level is set to
   * a valid level
   */
  _initLevel() {
    this._grid = this._parseGrid(this._level.grid);
    this._initActors(this._level.actors);
    this._initItems(this._level.items);
    this._placedItems = [];
  }

  /**
   * Reset level to its original state.
   */
  resetLevel() {
    this._initLevel();
  }

  /**
   * Given a char, construct and return the corresponding Tile object
   * @param {string} c - a single character string
   * @returns {Object} - a Tile
   */
  _charToTile(c) {
    switch (c) {
      case ".":
        return new FreeTile();
      case "#":
        return new ObstacleTile();
      default:
        throw new Error("Unexpected tile");
    }
  }

  /**
   * Creates a grid of Tiles from a list of strings, which specify
   * a level.
   * Precondition: The list must contain only valid characters.
   * @param {string[]} grid
   * @returns {Object[][]} - a matrix of tiles, corresponding to the text encoding
   */
  _parseGrid(grid) {
    return grid.map(row => row.split("").map(this._charToTile));
  }

  /**
   * Sets up the list of actors from a given list.
   * @param {Object[]} actors - the list of actors
   * @param {string} actors.type - the type of the actor
   * @param {number} actors.x - the x coordinate of the actor
   * @param {number} actors.y - the y coordiante of the actor
   */
  _initActors(actors) {
    this._actors = []; // Clear actor array
    // Populate it with new actors
    for (const actor of actors) {
      this._addActor(actor);
    }
  }

  /**
   * Add an actor to the level
   * @param {Object} actor - the actor
   * @param {string} actor.type - the type of the actor
   * @param {number} actor.x - the x coordinate of the actor
   * @param {number} actor.y - the y coordiante of the actor
   */
  _addActor(actor) {
    const type = actor.type;
    const follows = this._meta.actorTypes[type];
    const position = new Point(actor.x, actor.y);
    const eats = actor.eats;
    const dies = actor.dies;
    this._actors.push(
      new FollowingActor(type, follows, this, position, eats, dies)
    );
  }

  getActorByNameAndPosition(x, y, name) {
    for (let a of this._actors)
      if (a.position.row == x && a.position.col == y && a.name == name)
        return a;
    throw new Error("Tried to get non-existent actor with name " + name);
  }

  /**
   * Fills the list of items from the given list.
   * @param {string[]} items
   */
  _initItems(items) {
    this._items = Array.from(items);
  }

  /**
   * Checks if a level contains all necessary attributes
   * @param {Object} fileData - the loaded .json data
   * @returns {boolean} - true iff. fileData contains all necessary attributes
   */
  _fileDataHasNecessaryAttributes(fileData) {
    const n_attr = ["grid", "grid_width", "grid_height", "actors", "items"];

    return n_attr.every(attr => attr in fileData);
  }

  /**
   * Checks if fileData.grid is a rectangular matrix of size
   * fileData.grid_height by fileData.grid_width
   * @param {Object} fileData - the loaded .json data
   * @returns {boolean} - true iff. fileData.grid is a rectangular matrix of size fileData.grid_height by fileData.grid_width
   */
  _fileDataHasCorrectGridSize(fileData) {
    // fileData has correct height and width
    return (
      fileData.grid.length == fileData.grid_height &&
      !fileData.grid.some(element => element.length != fileData.grid_width)
    );
  }

  /**
   * Checks if fileData.grid contains only valid tiles
   * (i.e. those in this._meta.tileset)
   * fileData.grid_height by fileData.grid_width
   * @param {Object} fileData - the loaded .json data
   * @returns {boolean} - true iff. fileData.grid contains only valid tiles
   */
  _fileDataHasValidTiles(fileData) {
    const good_tiles = this._meta.tileset;
    const res = fileData.grid.every(row =>
      row.split("").every(cell => good_tiles.indexOf(cell) > -1)
    );
    return res;
  }

  /**
   * Checks if fileData.actors contains only valid actors
   * (i.e. those in this._meta.actorTypes, that are in bounds
   * and that are on passable tiles)
   * fileData.grid_height by fileData.grid_width
   * @param {Object} fileData - the loaded .json data
   * @returns {boolean} - true iff. fileData.actors contains only valid actors
   */
  _fileDataHasValidActors(fileData) {
    // if any invalid actors, return false
    const good_actors = this._meta.actorTypes;
    for (const actor of fileData.actors) {
      if (!(actor.type in good_actors)) return false;
    }

    // if any actors are out of bounds, return false
    if (
      fileData.actors.some(
        actor =>
          actor.x < 0 ||
          actor.x >= fileData.grid_height ||
          actor.y < 0 ||
          actor.y >= fileData.grid_width
      )
    )
      return false;

    // if any actors are on inaccessibleTiles, then reutrn false
    const bad_tiles = this._meta.inaccessibleTiles;
    if (
      fileData.actors.some(
        actor => bad_tiles.indexOf(fileData.grid[actor.x][actor.y]) > -1
      )
    )
      return false;

    //otherwise
    return true;
  }

  /**
   * Checks if fileData.items contains only valid items
   * (i.e. those in this._meta.items)
   * fileData.grid_height by fileData.grid_width
   * @param {Object} fileData - the loaded .json data
   * @returns {boolean} - true iff. fileData.items contains only valid items
   */
  _fileDataHasValidItems(fileData) {
    // Check that all items are valid types
    const good_items = this._meta.itemTypes;
    return fileData.items.every(item => good_items.indexOf(item) > -1);
  }

  /**
   * Checks a level file for any errors (e.g. "width"
   * and "height" not mathcing the grid dimensions,
   * only valid symbols are used, etc.).
   * @param {Object} fileData - the loaded .json data
   * @returns {boolean} - true if it is a valid level, false otherwise
   * @throws {Error} - if level is not correctly specified
   */
  _validateLevelFile(fileData) {
    if (!this._fileDataHasNecessaryAttributes(fileData))
      throw new Error("Level doesn't have necessary attributes");
    if (!this._fileDataHasCorrectGridSize(fileData))
      throw new Error("Level data has incorrect grid size");
    if (!this._fileDataHasValidTiles(fileData))
      throw new Error("Level data has invalid tiles");
    if (!this._fileDataHasValidActors(fileData))
      throw new Error("Level has invalid actors");
    if (!this._fileDataHasValidItems(fileData))
      throw new Error("Level has invalid items");

    return true;
  }

  /**
   * Queries the contents of a tile
   * @param {number} x - the row in the level grid
   * @param {number} y - the column in the level grid
   * @returns {Tile} - the tile at those coordinates
   * @throws {Error} - if location is outside of grid.
   */
  queryTile(x, y) {
    if (x < 0 || y < 0 || x >= this.cntRows || y >= this.cntCols)
      throw new Error(
        "Queried tile position outside of array: (" + x + "," + y + ")"
      );

    return this._grid[x][y];
  }

  /**
   * Modifies a tile
   * @param {number} x - the row in the level grid
   * @param {number} y - the column in the level grid
   * @param {string} newTile - the type of the Tile - a one character string
   */
  _modifyTile(x, y, newTile) {
    if (x < 0 || y < 0 || x >= this.cntRows || y >= this.cntCols)
      throw Error("Tried to modify Tile outside of grid!");

    this._grid[x][y] = this._charToTile(newTile);
  }

  /**
   * Place an item on the grid
   * @param {number} x - the row in the level grid
   * @param {number} y - the column in the level grid
   * @param {string} item - the type of the item
   * @returns {boolean} - true if item was places successfully, false otherwise
   * @throws {Error} - If no level is loaded or the item is not in the player's inventory
   */
  placeItem(x, y, item) {
    if (this._level == null)
      throw new Error("Can't place items without a level loaded!");
    if (this._items.indexOf(item) == -1)
      throw new Error("Tried to place non-existing item!");

    if (!this._canPlaceItemHere(x, y, item)) return false;

    this._placedItems.push({ type: item, x: x, y: y }); // Put in _placedItems
    this._items.splice(this._items.indexOf(item), 1); // Remove from inventory

    return true;
  }

  /**
   * Remove an item from the grid at position (x,y) if there is one there
   * @param {number} x - row
   * @param {number} y - column
   * @returns {boolean} - true if there was an item and it was removed, false otherwise
   */
  removeItem(x, y) {
    const index = this._placedItems.indexOf(this._placedItems.filter(i => i.x==x && i.y==y)[0]);
    if (index == -1) return false; // Item not found
    const item = this._placedItems[index].type;
    this._placedItems.splice(index, 1); // Remove item from placed
    this._items.push(item); // Put back in inventory
    return true;
  }

  /**
   * Return weather item can be placed at location (x,y) on the grid
   * @param {number} x - row of grid
   * @param {number} y - column of grid
   * @param {string} item - item type
   */
  _canPlaceItemHere(x, y, item) {
    // Can't place item outside of grid
    if (x < 0 || x >= this.cntRows || y < 0 || y >= this.cntCols) return false;
    // Can't place item on an inaccessible tile
    if (this._meta.inaccessibleTiles.indexOf(this._grid[x][y]) > -1)
      return false;
    // Can't place item if there is an actor on that tile currenly
    if (this._existsActorAtLocation(x, y)) return false;
    // Can't place item if there is another item already there
    if (this._existsAtLocation(this._placedItems, x, y)) return false;

    // All is good
    return true;
  }

  /**
   * Is there an actor currently occupying that position?
   * @param {number} row - the row of the position in the grid
   * @param {number} col - the column of the position in the grid
   */
  _existsActorAtLocation(row, col) {
    for (const actor of this._actors) {
      if (actor.position.row === row && actor.position.col === col) return true;
    }
    return false;
  }

  /**
   * Given an array of objects with coordinates and two coordiante points
   * return weather there is an object in array with coordinates (x,y)
   * @param {Object[]} array - array of objects
   * @param {number} array.x - row coordiante of object
   * @param {number} array.y - column coordiante of object
   * @param {number} x - row coordinate to compare with
   * @param {number} y - column coordiante to compare with
   */
  _existsAtLocation(array, x, y) {
    for (const element of array) {
      if (element.x === x && element.y === y) return true;
    }
    return false;
  }

  /**
   * Given an array of objects with coordinates and two coordiante points
   * return the index of the first bject in array with coordinates (x,y) or -1
   * if there is none
   * @param {Object[]} array - array of objects
   * @param {number} array.x - row coordiante of object
   * @param {number} array.y - column coordiante of object
   * @param {number} x - row coordinate to compare with
   * @param {number} y - column coordiante to compare with
   */
  _getIndexOf(array, x, y) {
    for (var i = 0; i < this._placedItems.length; i++) {
      if (array[i].x == x && array[y].y == y) return i;
    }
    return -1;
  }

  /**
   * Once all items are placed - put them on the game grid.
   * @throws {Error} - if no level is loaded
   */
  startGame() {
    if (this._level == null)
      throw new Error("Can't start game without a level loaded!");
    for (const item of this._placedItems) {
      // If this item is a tile
      if (this._meta.tileset.indexOf(item.type) > -1)
        this._modifyTile(item.x, item.y, item.type);
      // Else if this item is an actor
      else if (item.type in this._meta.actorTypes) this._addActor(item);
      else throw new Error("Unexpected item type");
    }
  }

  /** Is the game done? I.e. all actors have stopped moving */
  get isGameDone() {
    return this.actors.every(a => a.shouldTerminate);
  }

  /** Has the player won the game? Call this when isGameDone() returns true */
  get playerWins() {
    const actorsReachedTargets = this.actors.every(a => a.reachedTarget);
    var cheeseEaten = true;
    for (const a of this.actors) {
      if (a.name.includes("Cheese")) cheeseEaten = false;
    }

    return actorsReachedTargets && cheeseEaten;
  }

  /**
   * Run a single simulation step.
   * This means:
   * 1. Query Actors for actions.
   * 2. Check if all actions are valid.
   * 3. Move actors and reflect any interactions
   *  (e.g. Mouse eats Cheese, Cat eats Mouse, etc.)
   * @returns {boolean  } - true if game is over, false otherwise
   */
  runStep() {
    // 1. check if terminate
    if (this.isGameDone) return true;

    // 2. get movements

    for (const a of this._actors) {
      var target = a.shouldMove;
      if (target) {
        a.position = target;
        this._grid[target.row][target.col].onEnter();
      }
    }

    // 3. put further needed actions here
    var final_actors = this._actors;

    for (let a of final_actors)
      final_actors = final_actors.filter(
        x =>
          x.name != a.eats ||
          x.position.row != a.position.row ||
          x.position.col != a.position.col
      );

    this._actors = final_actors;

    console.log(this.getByName("Normal Mouse").position);
    for (let a of final_actors)
      if (
        !final_actors.filter(x => x.name == a.dies && x.position == a.position)
          .length == 0
      )
        return true;
    return false;
  }
}

/**
 * Represents an actor that follows
 * another actor, that terminates
 * the game when they meet. In particular
 * such an actor can also represent
 * actors that sit still, by
 * specifying that the actor
 * follow a non-existent other actor.
 */
class FollowingActor {
  /**
   * Constructs an actor with name n
   * that tries to follow any actor
   * with name f. Upon reaching
   * The actor exists
   * within model m, at position p,
   * that eats actors from e
   * and that dies if it eats d
   */
  constructor(n, f, m, p, e, d) {
    this._name = n;
    this._follows = f;
    this._model = m;
    this._position = p;
    this._eats = e;
    this._dies = d;
  }

  // if this actor is over one of these actors,
  // then does actors dissapear.
  get eats() {
    return this._eats;
  }

  // if this actor is over one of these actors,
  // then the game finishes.
  get dies() {
    return this._dies;
  }

  /** Get path to texture file.
   * @returns {string} - path to texture file
   */
  get texturePath() {
    const pathPrefix = "/assets/img/" + this.textureFile();
  }

  /** Get texture filename.
   * @returns {string} - texture alias in phaser
   */
  get phaserTextureAlias() {
    switch (this._name) {
      case "Normal Mouse":
        return "Normal Mouse";
      case "Cheese":
        return "Cheese";
      case "House":
        return "House";
      case "Blue Mouse":
        return "Blue Mouse";
      case "Blue Cheese":
        return "Blue Cheese";
      default:
        throw Error("Actor type " + this._name + " has no texture file!");
    }
  }

  /**
   * Returns the name of an actor. This will be used
   * to coordinate actors that follow after one another
   */
  get name() {
    return this._name;
  }

  /**
   * Returns position of actor
   */
  get position() {
    return this._position;
  }

  /**
   * Sets position of actor
   */
  set position(p) {
    this._position = p;
  }

  /**
   * Returns model of actor
   */
  get model() {
    return this._model;
  }

  /**
   * Returns the place where we think we should move
   */
  get shouldMove() {
    if (this._follows == "N/A") {
      return this.position;
    }

    var dist = Array(this.model.cntRows).fill(0);
    for (let i = 0; i < this.model.cntRows; i++)
      dist[i] = Array(this.model.cntCols).fill(1000000000);

    // dist[i][j] = distance from my target
    // I will move so as to minimise distance

    var target = this.model.getByName(this._follows).position;
    if (this.position._col == target._col && this.position._row == target._row) return this.position;

    dist[target.row][target.col] = 0;

    var queue = [target];
    while (queue.length > 0) {
      var current = queue.shift();
      var current_dist = dist[current.row][current.col];

      for (let neighbour of current.getNeighbours(this.model)) {
        if (dist[neighbour.row][neighbour.col] > current_dist + 1) {
          dist[neighbour.row][neighbour.col] = current_dist + 1;
          queue.push(neighbour);
        }
      }
    }

    var my_neighbours = [];
    my_neighbours = this.position.getNeighbours(this._model);
    my_neighbours.push(this.position);

    console.log(
      my_neighbours.reduce(function(prev, curr) {
        return dist[prev.row][prev.col] < dist[curr.row][curr.col]
          ? prev
          : curr;
      })
    );

    if (my_neighbours.length == 0) return this.position;
    else {
      var ret = my_neighbours.reduce(function(prev, curr) {
        return dist[prev.row][prev.col] < dist[curr.row][curr.col]
          ? prev
          : curr;
      });
      if (dist[ret.row][ret.col] > 100) return this.position;
      return ret;
    }
  }

  /**
   * Returns if the game ought to terminate
   */
  get shouldTerminate() {
    return this.reachedTarget || this.cantMoveTowardsTarget;
  }

  /** Has this actor reached its traget? */
  get reachedTarget() {
    if (this._follows == "N/A") return true;
    const target = this.model.getByName(this._follows);
    return (
      target.position.row == this.position.row &&
      target.position.col == this.position.col
    );
  }

  /** Does this actor have a no good move towards it's target */
  get cantMoveTowardsTarget() {
    if (this._follows == "N/A") return false;
    return (
      this.shouldMove.row == this.position.row &&
      this.shouldMove.col == this.position.col
    );
  }
}

/**
 * Represents an immutable point the tile grid
 */
class Point {
  /**
   * Constructs a point
   * @param {number} [row=0] - the row of the point
   * @param {number} [col=0] - the column of the point
   */
  constructor(row = 0, col = 0) {
    this._row = row;
    this._col = col;
  }

  /**
   * Gets the row of the point
   * @returns {number}
   */
  get row() {
    return this._row;
  }

  /**
   * Gets the column of the point
   * @returns {number}
   */
  get col() {
    return this._col;
  }

  /**
   * Creates a new point, at some offset from this point
   * @param {number} dlin - The line offset
   * @param {number} dcol - The column offset
   * @returns {Point}
   */
  makeAtOffset(dlin, dcol) {
    return new Point(this.row + dlin, this.col + dcol);
  }

  /**
   * Checks if a point is walkable in a model
   * @param {model} m - The model in which the computation takes place
   * @returns {boolean}
   */
  isWalkable(m) {
    return (
      this.row >= 0 &&
      this.col >= 0 &&
      this.row < m.cntRows &&
      this.col < m.cntCols &&
      m.queryTile(this.row, this.col).canEnter()
    );
  }

  /**
   * Get a list of walkable neighbours of the point
   * @param {model} m - The model in which the computation takes place
   * @returns {Point[]}
   */
  getNeighbours(m) {
    var dxs = [0, -1, 0, 1];
    var dys = [1, 0, -1, 0];
    return dxs
      .map((x, i) => this.makeAtOffset(x, dys[i]))
      .filter(x => x.isWalkable(m));
  }
}

/**
 * Represents a free tile in the level grid.
 */
class FreeTile {
  constructor() {
    this._name = "";
  }

  /** Get texture alias in phaser.
   * @returns {string} - path to texture file
   */
  get phaserTextureAlias() {
    return "Free Tile";
  }

  /**
   * Returns if we can enter this tile or not
   * @return {boolean}
   */
  canEnter() {
    return true;
  }

  /**
   * Returns the name of the tile. This will be
   * usefull when tiles take actions on other
   * tiles.
   * @return {string}
   */
  get name() {
    return this._name;
  }

  /**
   * The action we take when we enter. Here
   * this is nothing
   */
  onEnter() {}
}

/**
 * Represents an impassable tile in the level grid.
 */
class ObstacleTile {
  constructor() {
    this._name = "";
  }

  /** Get path to texture file.
   * @returns {string} - path to texture file
   */
  get phaserTextureAlias() {
    //return "Obstacle Tile";
    return "#";
  }

  /**
   * Returns if we can enter this tile or not
   * @return {boolean}
   */
  canEnter() {
    return false;
  }

  /**
   * Returns the name of the tile.
   * @return {string}
   */
  get name() {
    return this._name;
  }

  /**
   * The action we take when we enter. Here
   * this is nothing
   */
  onEnter() {}
}

/**
 * Preload function for the phaser game.
 * Use this in the phaser config when creating the game.
 */
function phaserPreload(scene) {
  scene.load.image("Normal Mouse", "assets/img/mouse.png");
  scene.load.image("Free Tile", "assets/img/panel.png");
  scene.load.image("Obstacle Tile", "assets/img/obstacle.png");
  scene.load.image("#", "assets/img/obstacle.png");
  scene.load.image("Cheese", "assets/img/cheese.png");
  scene.load.image("Blue Mouse", "assets/img/blue-mouse.png");
  scene.load.image("Blue Cheese", "assets/img/blue-cheese.png");
  scene.load.image("House", "assets/img/house.png");
  scene.load.image("Blue House", "assets/img/blue-house.png");
  scene.load.image("Inventory", "assets/img/Inventory.png");
  // Misc
  // this.load.image("mouse", "Images/mouse.png");
  // this.load.image(".", "Images/panel.png");
  // this.load.image("#", "Images/obstacle.png");
  // this.load.image("cheese", "Images/cheese.png");
}

//Testing script:
// const m = new Model();
// const res = m.readLevelFromFile("level3");
// console.log(m._existsActorAtLocation(2, 2));
// m.placeItem(2, 3, "#");
// m.startGame();
// console.log("Level read result:");
// console.log(res);
// console.log(m);
// m.resetLevel();
// console.log(m);
