var level2 = {

    "grid": ["...",

        "#..",

        "#.."
    ],

    "grid_width": 3,

    "grid_height": 3,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 0,

            "dies": "N/A",

            "eats": "Cheese"

        },

        {

            "type": "Cheese",

            "x": 1,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"

        }

    ],

    "items": ["House"]

};



var level1 = {

    "grid": ["...",

        "..#",

        "..."
    ],

    "grid_width": 3,

    "grid_height": 3,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 0,

            "dies": "N/A",

            "eats": "Cheese"

        },

        {

            "type": "House",

            "x": 2,

            "y": 2,

            "dies": "N/A",

            "eats": "N/A"

        }

    ],

    "items": ["Cheese"]

};



var level3 = {

    "grid": ["....",

        "....",

        "...."
    ],

    "grid_width": 4,

    "grid_height": 3,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 0,

            "dies": "N/A",

            "eats": "Cheese"

        },

        {

            "type": "House",

            "x": 0,

            "y": 3,

            "dies": "N/A",

            "eats": "N/A"

        },

        {

            "type": "Cheese",

            "x": 1,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"

        },

        {

            "type": "Cheese",

            "x": 2,

            "y": 2,

            "dies": "N/A",

            "eats": "N/A"

        }

    ],

    "items": ["#", "#", "#"]

};



var level5 = { // level with blue mouse

    "grid": ["...#.",

        ".....",

        "....."
    ],

    "grid_width": 5,

    "grid_height": 3,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 0,

            "dies": "Blue Cheese",

            "eats": "Cheese"

        },

        {

            "type": "Blue Mouse",

            "x": 0,

            "y": 4,

            "dies": "Cheese",

            "eats": "Blue Cheese"

        },

        {

            "type": "Cheese",

            "x": 1,

            "y": 3,

            "dies": "N/A",

            "eats": "N/A"

        },

        {

            "type": "Blue Cheese",

            "x": 1,

            "y": 0,

            "dies": "N/A",

            "eats": "N/A"

        }

    ],

    "items": ["Blue House", "#", "House"]

};



var level6 = { // level with blue mouse 2

    "grid": [".....",

        "...#.",

        ".#...",

        ".###.",

        "....."
    ],

    "grid_width": 5,

    "grid_height": 5,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 0,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "Blue Mouse",

            "x": 0,

            "y": 4,

            "dies": "N/A",

            "eats": "Blue Cheese"


        },

        {

            "type": "Blue House",

            "x": 2,

            "y": 4,

            "dies": "Blue Mouse",

            "eats": "N/A"


        },

        {

            "type": "Blue Cheese",

            "x": 0,

            "y": 2,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue Cheese",

            "x": 4,

            "y": 4,

            "dies": "N/A",

            "eats": "N/A"


        }

    ],

    "items": ["#", "#", "#", "House"],

};



var level7 = {

    "grid": [".....",

        "....#",

        ".#...",

        ".###.",

        "....."
    ],

    "grid_width": 5,

    "grid_height": 5,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 0,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "Blue Mouse",

            "x": 4,

            "y": 0,

            "dies": "N/A",

            "eats": "Blue Cheese"


        },

        {

            "type": "Blue House",

            "x": 0,

            "y": 4,

            "dies": "Blue Mouse",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 0,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "House",

            "x": 1,

            "y": 2,

            "dies": "Mouse",

            "eats": "N/A"

        },

        {

            "type": "Blue Cheese",

            "x": 4,

            "y": 4,

            "dies": "N/A",

            "eats": "N/A"


        }

    ],

    "items": ["#", "#"]

};


var level4 = {

    "grid": ["...",

        "...",

        "..."
    ],

    "grid_width": 3,

    "grid_height": 3,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 2,

            "y": 2,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "House",

            "x": 0,

            "y": 2,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 2,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 2,

            "y": 0,

            "dies": "N/A",

            "eats": "N/A"


        }

    ],

    "items": ["#", "#"]

};

var level8 = {

    "grid": [".....",

        ".....",

        "....."
    ],

    "grid_width": 5,

    "grid_height": 3,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 2,

            "y": 4,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "Blue Mouse",

            "x": 2,

            "y": 0,

            "dies": "N/A",

            "eats": "Blue Cheese"


        },

        {

            "type": "Blue House",

            "x": 0,

            "y": 4,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "House",

            "x": 0,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 2,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue Cheese",

            "x": 1,

            "y": 2,

            "dies": "N/A",

            "eats": "N/A"


        }

    ],

    "items": ["#", "#"]

};

var level9 = {

    "grid": ["....",

        "..#.",

        "..#.",

        "....",

        "...."
    ],

    "grid_width": 4,

    "grid_height": 5,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 3,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "House",

            "x": 3,

            "y": 3,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 4,

            "y": 0,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Cheese",

            "x": 0,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },

    ],

    "items": ["#", "#"]

};

var level10 = {

    "grid": [".....",

        "...#.",

        "..#..",

        ".#...",

        "....."
    ],

    "grid_width": 5,

    "grid_height": 5,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 4,

            "y": 0,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "Blue Mouse",

            "x": 0,

            "y": 4,

            "dies": "N/A",

            "eats": "Blue Cheese"


        },

        {

            "type": "House",

            "x": 0,

            "y": 0,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue House",

            "x": 4,

            "y": 4,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue Cheese",

            "x": 1,

            "y": 2,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Blue Cheese",

            "x": 2,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },

    ],

    "items": ["#", "#"]

};

var level11 = {

    "grid": ["........",

        "........",

        ".#......",

        "........",

        "........",

        "........"
    ],

    "grid_width": 8,

    "grid_height": 6,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 1,

            "y": 2,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "Blue Mouse",

            "x": 0,

            "y": 6,

            "dies": "N/A",

            "eats": "Blue Cheese"


        },

        {

            "type": "House",

            "x": 5,

            "y": 7,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue House",

            "x": 4,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue Cheese",

            "x": 2,

            "y": 6,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Blue Cheese",

            "x": 4,

            "y": 3,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 1,

            "y": 0,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Cheese",

            "x": 4,

            "y": 2,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 5,

            "y": 6,

            "dies": "N/A",

            "eats": "N/A"


        },

    ],

    "items": ["#", "#", "#", "#"]

};

var level12 = {

    "grid": ["...#......",

        "...#.#..##",

        "...#.#....",

        "...#......",

        "...#..##..",

        "...##.....",

        "..........",

        ".#######..",

        ".......#..",

        ".......#.."
    ],

    "grid_width": 10,

    "grid_height": 10,

    "actors": [

        {

            "type": "Normal Mouse",

            "x": 0,

            "y": 2,

            "dies": "N/A",

            "eats": "Cheese"


        },

        {

            "type": "Blue Mouse",

            "x": 0,

            "y": 9,

            "dies": "N/A",

            "eats": "Blue Cheese"


        },

        {

            "type": "House",

            "x": 4,

            "y": 5,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue House",

            "x": 8,

            "y": 3,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue Cheese",

            "x": 5,

            "y": 1,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Blue Cheese",

            "x": 9,

            "y": 3,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Blue Cheese",

            "x": 0,

            "y": 6,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Blue Cheese",

            "x": 5,

            "y": 9,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 0,

            "y": 5,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Cheese",

            "x": 2,

            "y": 6,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 3,

            "y": 7,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 4,

            "y": 9,

            "dies": "N/A",

            "eats": "N/A"


        },
        {

            "type": "Cheese",

            "x": 4,

            "y": 4,

            "dies": "N/A",

            "eats": "N/A"


        },

        {

            "type": "Cheese",

            "x": 5,

            "y": 6,

            "dies": "N/A",

            "eats": "N/A"


        },

    ],

    "items": ["#", "#", "#", "#", "#", "#"]

};

var metadata = {

    "actorTypes": {

        "Normal Mouse": "House",

        "Blue Mouse": "Blue House",

        "Cat": "Yarn",

        "Cheese": "N/A",

        "Blue Cheese": "N/A",

        "House": "N/A",

        "Blue House": "N/A",

        "Yarn": "N/A"

    },

    "tileset": [".", "#"],

    "inaccessibleTiles": ["#"],

    "itemTypes": ["Cheese", "Blue Cheese", "House", "Blue House", "Yarn", "#"]

};

var levels = {
    level1: level1,
    level2: level2,
    level3: level3,
    level4: level4,
    level5: level5,
    level6: level6,
    level7: level7,
    level8: level8,
    level9: level9,
    level10: level10,
    level11: level11,
    level12: level12,
    metadata: metadata,
};
