/**
 * Represents the model of the grid. Responsible for
 * maintaining the state of the game and advancing it.
 */
class Model {
  constructor() {
    this._meta = require("./levels/metadata.json");
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

  /**
   * Gets an actor by name
   * @param {string} name - The name
   * @return {actor}
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
   * TODO: Specify format.
   * @param {string} filePath - path to the .json level file
   * @returns {boolean} - false if something went wrong,
   * e.g. bad filepath, bad file, etc. true otherwise
   */
  readLevelFromFile(filePath) {
    if (filePath.slice(-5) != ".json") {
      throw new Error("Wrong file type!");
    }

    let fileData = require(filePath); // load the file
    if (!this._validateLevelFile(fileData)) {
      return false;
    }

    this._grid = this._parseGrid(fileData.grid);
    this._actors = this._parseActors(fileData.actors);
    this._items = this._parseItems(fileData.items);
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
    for (const actor in actors) {
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
    const position = { row: actor.x, col: actor.y };
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
   * Checks a level file for any errors (e.g. "width"
   * and "height" not mathcing the grid dimensions,
   * only valid symbols are used, etc.).
   * @param {Object} fileData - the loaded .json data
   * @returns {boolean} - true if it is a valid level, false otherwise
   * TODO: Possibly split this into multiple functions
   */
  _validateLevelFile(fileData) {
    // Has all necessary attributes
    if (
      !(
        "grid" in fileData &&
        "grid_width" in fileData &&
        "grid_height" in fileData &&
        "actors" in fileData &&
        "items" in fileData
      )
    ) {
      return false;
    }
    if (fileData.grid.length == 0) return false;
    if (fileData.grid[0] == 0) return false;
    if (
      // Not every row has equal length
      !fileData.grid.every(element => element.length == fileData.grid[0].length)
    ) {
      return false;
    }

    // Check that specified dimensions match actual dimensions
    if (
      fileData.grid_width != fileData.grid[0].length ||
      fileData.grid_height != fileData.grid.length
    ) {
      return false;
    }

    // Check that all tiles are valid
    const tileset = this._meta.tileset;
    for (const row in fileData.grid) {
      for (const cell in row) {
        if (!(cell in tileset)) return false;
      }
    }

    // Check that all actors are valid types and on accessible tiles
    const inaccessibleTiles = this._meta.inaccessibleTiles;
    const actorTypes = this._meta.actorTypes;
    for (const actor in fileData.grid.actors) {
      if (!(actor.type in actorTypes)) return false; // Invalid type
      if (
        // Out of level bounds
        actor.x < 0 ||
        actor.x >= fileData.grid_width ||
        actor.y < 0 ||
        actor.y >= fileData.grid_height
      ) {
        return false;
      }
      if (fileData.grid[actor.x][actor.y] in inaccessibleTiles) {
        return false;
      }
    }

    // Check that all items are valid types
    const itemTypes = this._meta.items;
    for (const item in fileData.grid.items) {
      if (!(item in itemTypes)) return false;
    }

    // No errors encountered
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
   * @param {int} x - the x coordinate in the level grid
   * @param {int} y - the y coordiante in the level grid
   * @param {Tile} newTile - the new value of the Tile
   * @returns {boolean} - true if modification was successful, false otherwise
   */
  modifyTile(x, y, newTile) {
    if (x < 0 || y < 0 || x >= this.cntRows || y >= this.cntCols) return false;

    throw new Error("Function not implemented!");
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
    for (a of this._actors) if (a.shouldTerminate) return true;

    // 2. get movements
    for (a of this._actors) {
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
   * @returns {string} - texture filename
   */
  get textureFile() {
    switch (this._name) {
      case "Normal Mouse":
        return "normal_mouse.png";
      case "Cheese":
        return "cheese.png";
      case "House":
        return "house.png";
      case "Blue Mouse":
        return "blue_mouse.png";
      case "Blue Cheese":
        return "blue_cheese.png";
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

  /** Get path to texture file.
   * @returns {string} - path to texture file
   */
  get texturePath() {
    return "/assets/img/free_tile.png";
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
  get texturePath() {
    return "/assets/img/obstacle_tile.png";
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
