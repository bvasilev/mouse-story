/**
 * Represents the model of the grid. Responsible for
 * maintaining the state of the game and advancing it.
 */
class Model {
  constructor() {}
  /**
   * Reads a level from a file.
   * TODO: Specify format.
   * @param {string} filePath - path to the .json level file
   * @returns {boolean} - true if read was successful, false otherwise
   */
  readFromFile(filePath) {
    throw new Error("Function not implemented!");
  }
  /**
   *
   * @param {int} x - the x coordinate in the level grid
   * @param {int} y - the y coordiante in the level grid
   * @returns {Tile} - the tile at those coordinates
   * @throws {Error} - if location is outside of grid.
   */
  queryTile(x, y) {
    throw new Error("Function not implemeted!");
  }
  /**
   * Modifies a tile
   * @param {int} x - the x coordinate in the level grid
   * @param {int} y - the y coordiante in the level grid
   * @param {Tile} newTile - the new value of the Tile
   * @returns {boolean} - true if modification was successful, false otherwise
   */
  modifyTile(x, y, newTile) {
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
    throw new Error("Function not implemented!");
  }
}

/**
 * Represents a free tile in the level grid.
 */
class FreeTile {
  constructor() {}
  /**
   * Indicates weather a tile can be entered (stepped on) by an Actor.
   * @returns {boolean} - true if an Actor can enter, false otherwise.
   */
  canEnter() {
    return true;
  }
  /**
   * Returns a drawable representation of the tile.
   * TODO: Figure out what this should be. Possibly path to img?
   * @returns {???}
   */
  draw() {
    throw new Error("Function not implemented!");
  }
}

/**
 * Represents an impassable tile in the level grid.
 */
class ObstacleTile {
  constructor() {}
  /**
   * Indicates weather a tile can be entered (stepped on) by an Actor.
   * @returns {boolean} - true if an Actor can enter, false otherwise.
   */
  canEnter() {
    return false;
  }
  draw() {
    throw new Error("Function not implemented!");
  }
}
