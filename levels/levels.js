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

var levels = [level1, level2];
