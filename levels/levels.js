var level1 = { 
  "grid": [ "...",
            "#..",
            "#.."],
  "grid_width": 3,
  "grid_height": 3,
  "actors": [
    {
      "type": "Normal Mouse",
      "x": 0, 
      "y": 0
    },
    {
      "type": "Cheese",
      "x": 1,
      "y": 1
    }
  ],
  "items": ["House"]
};

var level2 = {
  "grid": [ "...",
            "..#",
            "..."],
  "grid_width": 3,
  "grid_height": 3,
  "actors": [
    {
      "type": "Normal Mouse",
      "x": 0, 
      "y": 0
    },
    {
      "type": "House",
      "x": 2,
      "y": 2
    }
  ],
  "items": ["Cheese"]
};

var level3 = {
  "grid": [ "....",
            "....",
            "...."],
  "grid_width": 4,
  "grid_height": 4,
  "actors": [
    {
      "type": "Normal Mouse",
      "x": 0, 
      "y": 0
    },
    {
      "type": "House",
      "x": 3,
      "y": 0
    },
    {
      "type": "Cheese",
      "x": 1,
      "y": 1
    },
    {
      "type": "Cheese",
      "x": 2,
      "y": 2
    }
  ],
  "items": ["#", "#", "#"]
};

var level4 = { // level with blue mouse
  "grid": [ "...#.",
            ".....",
            "....."],
  "grid_width": 5,
  "grid_height": 3,
  "actors": [
    {
      "type": "Normal Mouse",
      "x": 0, 
      "y": 0
    },
    {
      "type": "Blue Mouse",
      "x": 4, 
      "y": 0
    },
    {
      "type": "Cheese",
      "x": 3,
      "y": 1
    },
    {
      "type": "Blue Cheese",
      "x": 0,
      "y": 1
    }
  ],
  "items": ["Blue House", "#"]
};

var level5 = { // level with blue mouse 2
  "grid": [ ".....",
            "....#",
            ".#...",
            ".###.",
            "....."],
  "grid_width": 5,
  "grid_height": 5,
  "actors": [
    {
      "type": "Normal Mouse",
      "x": 0, 
      "y": 0
    },
    {
      "type": "Blue Mouse",
      "x": 4,
      "y": 0
    },
    {
      "type": "Blue House",
      "x": 4,
      "y": 2
    },
    {
      "type": "Blue Cheese",
      "x": 2,
      "y": 0
    },
    {
      "type": "Blue Cheese",
      "x": 4,
      "y": 4
    }
  ],
  "items": ["#", "#", "#"],
};

var level6 = {
  "grid": [ ".....",
            "....#",
            ".#...",
            ".###.",
            "....."],
  "grid_width": 5,
  "grid_height": 5,
  "actors": [
    {
      "type": "Normal Mouse",
      "x": 0, 
      "y": 0
    },
    {
      "type": "Blue Mouse",
      "x": 4,
      "y": 0
    },
    {
      "type": "Blue House",
      "x": 0,
      "y": 4
    },
    {
      "type": "Cheese",
      "x": 2,
      "y": 0
    },
    {
      "type": "Blue Cheese",
      "x": 4,
      "y": 4
    }
  ],
  "items": ["#", "#"]
};

var level7 = { // level with cat
  "grid": [ "....",
            "....",
            "...."],
  "grid_width": 4,
  "grid_height": 4,
  "actors": [
    {
      "type": "Normal Mouse",
      "x": 0, 
      "y": 0
    },
    {
      "type": "Cat",
      "x": 2,
      "y": 2
    },
    {
      "type": "House",
      "x": 3,
      "y": 3
    }
  ],
  "items": ["#", "Yarn", "Yarn"]
};

var levels = [level1, level2, level3, level4, level5, level6, level7];
