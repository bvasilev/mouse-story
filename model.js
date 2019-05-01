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
   * @return{int}
   */
  get cntRows() {
    if (this._level != null) return this._level.grid_height;
    else return 0;
  }

  /**
   * Returns the number of columns
   * @return{int}
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

    if (!(filePath in levels)) {
      throw new Error("Level not found!");
    }

    let fileData = levels[filePath]; // load the level
    if (!this._validateLevelFile(fileData)) {
      return false;
    }

    this._level = fileData;
    this._grid = this._parseGrid(fileData.grid);
    this._parseActors(fileData.actors);
    this._parseItems(fileData.items);
    return true;
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
   * @param {int} actors.x - the x coordinate of the actor
   * @param {int} actors.y - the y coordiante of the actor
   */
  _parseActors(actors) {
    for (const actor of actors) {
      this._addActor(actor);
    }
  }

  /**
   * Add an actor to the level
   * @param {Object} actor - the actor
   * @param {string} actor.type - the type of the actor
   * @param {int} actor.x - the x coordinate of the actor
   * @param {int} actor.y - the y coordiante of the actor
   */
  _addActor(actor) {
    const type = actor.type;
    const follows = this._meta.actorTypes[type];
    const position = new Point(actor.x, actor.y);
    this._actors.push(new FollowingActor(type, follows, this, position));
  }

  /**
   * Fills the list of items from the given string.
   * @param {string[]} items
   */
  _parseItems(items) {
    this._items = items;
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
          actor.x >= fileData.grid_width ||
          actor.y < 0 ||
          actor.y >= fileData.grid_height
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
   * @param {int} x - the row in the level grid
   * @param {int} y - the column in the level grid
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
   * @param {int} x - the row in the level grid
   * @param {int} y - the column in the level grid
   * @param {string} newTile - the type of the Tile - a one character string
   */
  _modifyTile(x, y, newTile) {
    if (x < 0 || y < 0 || x >= this.cntRows || y >= this.cntCols)
      throw Error("Tried to modify Tile outside of grid!");

    this._grid[x][y] = this._charToTile(newTile);
  }

  /**
   * Place an item on the grid
   * @param {int} x - the row in the level grid
   * @param {int} y - the column in the level grid
   * @param {string} item - the type of the item
   * @returns {boolean} - true if item was places successfully, false otherwise
   * @throws {Error} - If no level is loaded or the item is not in the player's inventory
   */
  placeItem(x, y, item) {
    if (this._level == null)
      throw new Error("Can't place items without a level loaded!");
    if (!(item in this._items))
      throw new Error("Tried to place non-existing item!");

    if (!this._canPlaceItemHere(x, y, item)) return false;

    this._placedItems.push({ type: item, x: x, y: y }); // Put in _placedItems
    this._items.splice(this._items.indexOf(item), 1); // Remove from inventory

    return true;
  }

  /**
   * Remove an item from the grid at position (x,y) if there is one there
   * @param {int} x - row
   * @param {int} y - column
   * @returns {boolean} - true if there was an item and it was removed, false otherwise
   */
  removeItem(x, y) {
    const index = this._getIndexOf(this._placedItems, x, y);
    if (index == -1) return false; // Item not found
    const item = this._placedItems[index].type;
    this._placedItems.splice(index, 1); // Remove item from placed
    this._items.push(item); // Put back in inventory
    return true;
  }

  /**
   * Return weather item can be placed at location (x,y) on the grid
   * @param {int} x - row of grid
   * @param {int} y - column of grid
   * @param {string} item - item type
   */
  _canPlaceItemHere(x, y, item) {
    // Can't place item outside of grid
    if (x < 0 || x >= this.cntRows || y < 0 || y >= this.cntCols) return false;
    // Can't place item on an inaccessible tile
    if (this._grid[x][y] in this._meta.inaccessibleTiles) return false;
    // Can't place item if there is an actor on that tile currenly
    if (this._existsAtLocation(this.actors, x, y)) return false;
    // Can't place item if there is another item already there
    if (this._existsAtLocation(this._placedItems, x, y)) return false;

    // All is good
    return true;
  }

  /**
   * Given an array of objects with coordinates and two coordiante points
   * return weather there is an object in array with coordinates (x,y)
   * @param {Object[]} array - array of objects
   * @param {int} array.x - x coordiante of object
   * @param {int} array.y - y coordiante of object
   * @param {int} x - x coordinate to compare with
   * @param {int} y - y coordiante to compare with
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
   * @param {int} array.x - x coordiante of object
   * @param {int} array.y - y coordiante of object
   * @param {int} x - x coordinate to compare with
   * @param {int} y - y coordiante to compare with
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

  /**
   * Run a single simulation step.
   * This means:
   * 1. Query Actors for actions.
   * 2. Check if all actions are valid.
   * 3. Move actors and reflect any interactions
   *  (e.g. Mouse eats Cheese, Cat eats Mouse, etc.)
   * @returns {boolean} - true if game is not over, false otherwise
   */
  runStep() {
    // 1. check if terminate
    for (const a of this._actors) if (a.shouldTerminate) return true;

    // 2. get movements
    for (const a of this._actors) {
      var target = a.shouldMove;
      a.position = target;
      this._grid[target.row][target.column].onEnter();
    }

    // 3. put further needed actions here

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
   * within model m, at position p
   */
  constructor(n, f, m, p) {
    this._name = n;
    this._follows = f;
    this._model = m;
    this._position = p;
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
   * Returns if the game ought to terminate
   */
  get shouldTerminate() {
    var target = this.model.getByName(this._follows);
    return target.position === this.position;
  }

  /**
   * Returns the place where we think we should move
   */
  get shouldMove() {
    var dist = new Array(model.cntRows);
    for (let a of dist) a = new Array(model.cntCols);

    for (let a of dist) for (let b of a) b = 1000000000;

    // dist[i][j] = distance from my target
    // I will move so as to minimise distance

    var target = this.model.getByName(this._follows);

    var queue = [target];
    while (queue.length > 0) {
      var current = queue.shift;
      var current_dist = dist[current.row][current.column];

      for (let neighbour of current.getNeighbours(this.model)) {
        if (dist[neighbour.row][neighbour.column] > current_dist + 1) {
          dist[neighbour.row][neighbour.column] = current_dist + 1;
          queue.push(neighbour);
        }
      }
    }

    var my_neighbours = this.position.getNeighbours(this._model);

    if (my_neighbours.length == 0) return this.position;
    else
      return my_neighbours.reduce(function(prev, curr) {
        return dist[prev.row][prev.column] < dist[curr.row][curr.column]
          ? prev
          : curr;
      });
  }
}

/**
 * Represents an immutable point the tile grid
 */
class Point {
  /**
   * Constructs a point
   * @param {int} [row=0] - the row of the point
   * @param {int} [col=0] - the column of the point
   */
  constructor(row = 0, col = 0) {
    var _row = row;
    var _col = col;
  }

  /**
   * Gets the row of the point
   * @returns {int}
   */
  get row() {
    return this._row;
  }

  /**
   * Gets the column of the point
   * @returns {int}
   */
  get column() {
    return this._col;
  }

  /**
   * Creates a new point, at some offset from this point
   * @param {int} dlin - The line offset
   * @param {int} dcol - The column offset
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
      m.queryTile(this.row, this.col).canEnter
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
      .map((x, i) => new this.makeAtOffset(x, dys[i]))
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
    return "Obstacle Tile";
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
function phaserPreload() {
  this.load.image("Free Tile", "assets/img/free_tile.png");
  this.load.image("Obstacle Tile", "assets/img/obstacle_tile.png");

  this.load.image("Normal Mouse", "assets/img/normal_mouse.png");
  this.load.image("Cheese", "assets/img/cheese.png");
  this.load.image("House", "assets/img/house.png");
  this.load.image("Blue Mouse", "assets/img/blue_mouse.png");
  this.load.image("Blue Cheese", "assets/img/blue_cheese.png");
  // Misc
  // this.load.image("mouse", "Images/mouse.png");
  // this.load.image(".", "Images/panel.png");
  // this.load.image("#", "Images/obstacle.png");
  // this.load.image("cheese", "Images/cheese.png");
}

// Testing script:
//const m = new Model();
//console.log(m.actors);
//const res = m.readLevelFromFile("level1");
//m.startGame();
//console.log("Level read result:");
//console.log(res);
console.log(m);
