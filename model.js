/**
 * Represents the model of the grid. Responsible for
 * maintaining the state of the game and advancing it.
 */
class Model {
  constructor() {
    this.tiles = [];
    this.actors = [];
  }

  /**
   * Returns the actors
   * @return{Actor[]}
   */
  get actors() {
    return actors;
  }

  /**
   * Gets an actor by name
   * @param {string} name - The name
   * @return {actor}
   * @throws if the actor doesn't exist
   */
  getByName(name) {
    for (let a of this.actors) if (a.name == name) return a;
    throw new Error("tried to get non-existent actor with name " + name);
    return null;
  }

  /**
   * Returns the number of rows
   * @return{int}
   */
  get cntRows() {
    return this.tiles.length;
  }

  /**
   * Returns the number of columns
   * @return{int}
   */
  get cntCols() {
    return this.tiles[0].length;
  }

  /**
   * Reads a level from a file.
   * TODO: Specify format.
   * @param {string} filePath - path to the .json level file
   * @returns {boolean} - true if read was successful, false otherwise
   */
  readFromFile(filePath) {
    if (filePath.slice(-5) != ".json") {
      throw new Error("Wrong file type!");
    }
    throw new Error("Function not implemented!");
  }

  /**
   * Queries the contents of a tile
   * @param {int} x - the x coordinate in the level grid
   * @param {int} y - the y coordiante in the level grid
   * @returns {Tile} - the tile at those coordinates
   * @throws {Error} - if location is outside of grid.
   */
  queryTile(x, y) {
    if (x < 0 || y < 0 || x >= this.cntRows || y >= this.cntCols)
      throw new Error(
        "queried tile position outside of array: (" + x + "," + y + ")"
      );

    return tiles[x][y];
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
    for (a of actors) if (a.shouldTerminate) return true;

    // 2. get movements
    for (a of actors) {
      var target = a.shouldMove;
      a.position = target;
      tiles[target.row][target.column].onEnter();
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
    this.name = n;
    this.follows = f;
    this.position = p;
  }

  /**
   * Returns the name of an actor. This will be used
   * to coordinate actors that follow after one another
   */
  get name() {
    return this.name;
  }

  /**
   * Returns position of actor
   */
  get position() {
    return this.position;
  }

  /**
   * Sets position of actor
   */
  set position(p) {
    this.position = p;
  }

  /**
   * Returns if the game ought to terminate
   */
  get shouldTerminate() {
    var target = this.model.getByName(this.follows);
    return target.position == this.position;
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

    var target = this.model.getByName(this.follows);

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

    var my_neighbours = this.position.getNeighbours(this.model);

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
    var row = row;
    var col = col;
  }

  /**
   * Gets the row of the point
   * @returns {int}
   */
  get row() {
    return this.row;
  }

  /**
   * Gets the column of the point
   * @returns {int}
   */
  get column() {
    return this.col;
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
      m.queryTile(this.row, this.col).canEnter &&
      this.row >= 0 &&
      this.col >= 0 &&
      this.row < m.cntRows &&
      this.col < m.cntCols
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
 * TODO: draw
 */
class FreeTile extends GenericTile {
  constructor() {
    this.name = "this doesn't matter";
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
    return this.name;
  }

  /**
   * The action we take when we enter. Here
   * this is nothing
   */
  onEnter() {}
}

/**
 * Represents an impassable tile in the level grid.
 * TODO: draw
 */
class ObstacleTile extends GenericTile {
  constructor() {
    this.name = "This also doesn't matter";
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
    return this.name;
  }

  /**
   * The action we take when we enter. Here
   * this is nothing
   */
  onEnter() {}
}
