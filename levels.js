const levels = {
  metadata: {
    actorTypes: {
      "Normal Mouse": "House",
      "Blue Mouse": "Blue House",
      Cat: "Yarn",
      Cheese: "N/A",
      "Blue Cheese": "N/A",
      House: "N/A",
      "Blue House": "N/A",
      Yarn: "N/A"
    },
    tileset: [".", "#"],
    inaccessibleTiles: ["#"],
    itemTypes: ["Cheese", "Blue Cheese", "House", "Blue House", "Yarn", "#"]
  },
  level1: {
    grid: ["...", "#..", "#.."],
    grid_width: 3,
    grid_height: 3,
    actors: [
      {
        type: "Normal Mouse",
        x: 0,
        y: 0
      },
      {
        type: "Cheese",
        x: 1,
        y: 1
      }
    ],
    items: ["House"]
  },
  level2: {
    grid: ["...", "..#", "..."],
    grid_width: 3,
    grid_height: 3,
    actors: [
      {
        type: "Normal Mouse",
        x: 0,
        y: 0
      },
      {
        type: "House",
        x: 2,
        y: 2
      }
    ],
    items: ["Cheese"]
  },
  level3: {
    grid: ["....", "....", "...."],
    grid_width: 4,
    grid_height: 4,
    actors: [
      {
        type: "Normal Mouse",
        x: 0,
        y: 0
      },
      {
        type: "House",
        x: 3,
        y: 0
      },
      {
        type: "Cheese",
        x: 1,
        y: 1
      },
      {
        type: "Cheese",
        x: 2,
        y: 2
      }
    ],
    items: ["#", "#", "#"]
  }
};
