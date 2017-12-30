var game = {
    cycle: null,
    world: bigInt(0),
    leftBorder: bigInt(0),
    rightBorder: bigInt(0),
    bottomBorder: bigInt(0),
    element: bigInt(0),
    pixelList: [],
    speed: 1000,
    removedRows: 0,
    score: 0,
    isGameOver: false,
    isElementFalling: false,
    elementNumber: 0,
    elementOrientation: 0,
    elementXposition: 4, //Center of rotation X position
    elementYposition: 0, //Center of rotation Y position
    elements: [
        [bigInt(3075), bigInt(3075), bigInt(3075), bigInt(3075)],
        [bigInt(15), bigInt(1074791425), bigInt(15), bigInt(1074791425)],
        [bigInt(7169), bigInt(3147778), bigInt(4103), bigInt(1049603)],
        [bigInt(7172), bigInt(2099203), bigInt(1031), bigInt(3146753)],
        [bigInt(3078), bigInt(2100225), bigInt(3078), bigInt(2100225)],
        [bigInt(6147), bigInt(1051650), bigInt(6147), bigInt(1051650)],
        [bigInt(7170), bigInt(1051649), bigInt(2055), bigInt(2100226)]
    ],
    elementXOffsets: [ //Center of rotation offset from left
        [0, 0, 0, 0],
        [1, 0, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 0, 1, 1],
        [1, 0, 1, 1],
        [1, 0, 1, 1]
    ],
    elementYOffsets: [ //Center of rotation offset from top
        [0, 0, 0, 0],
        [0, 1, 0, 1],
        [1, 1, 0, 1],
        [1, 1, 0, 1],
        [1, 1, 0, 1],
        [1, 1, 0, 1],
        [1, 1, 0, 1]
    ],

    init: function() {
        display.render();
        game.createBorders();
    },

    new: function() {
        game.speed = 1 / (2 ** Math.floor(game.removedRows / 10)) * 1000;
        game.isRunning = true;
        game.isGameOver = false;
        game.isElementFalling = false;
        game.score = 0;
        game.removedRows = 0;
        game.world = bigInt(0);
        game.setRandomElement();
        game.run();
    },

    run: function() {
        clearTimeout(game.cycle);
        if (!game.isGameOver) {
           // display.refresh(game.getPixels());
            game.cycle = setTimeout(game.run, game.speed);
            game.descendElement();
        } else {
            modalWindow.show(localStorage.name, game.score);
        }
    },

    setRandomElement: function() {
        game.elementNumber = Math.floor(Math.random()*7);
        //game.elementNumber = 6;
        game.elementXposition = 4;
        game.elementYposition = 0;
        game.elementOrientation = 0;
        game.element = game.elements[game.elementNumber][game.elementOrientation];
        game.isElementFalling = false;
        if (game.world.and(game.element) != 0) {
            return true;
        }
        return false;
    },

    createBorders: function() {
        for (var i = 0; i < 191; i += 10) {
            game.leftBorder = game.leftBorder.add(bigInt(2).pow(i));
        }
        for (i = 9; i < 200; i += 10) {
            game.rightBorder = game.rightBorder.add(bigInt(2).pow(i));
        }
        for (i = 190; i < 200; i++) {
            game.bottomBorder = game.bottomBorder.add(bigInt(2).pow(i));
        }
    },

    getPixels: function() {
        var temp = game.world.or(game.element);
        for (var i = 0; i < 200; i++) {
            if (getPartOfBigInt(temp, i, 1).value) {
                game.pixelList[i] = 1;
            } else {
                game.pixelList[i] = 0;
            }
        }
        return game.pixelList;
    },

    interactWithElement: function(direction) {
        if(!game.isGameOver) {
            switch (direction) {
                case "Left":
                    if (game.leftBorder.and(game.element) == 0 && (game.world.and(game.element.divide(2)) == 0)) {
                        game.elementXposition -= 1;
                    }
                    break;
                case "Right":
                    if (game.rightBorder.and(game.element) == 0 && (game.world.and(game.element.multiply(2)) == 0)) {
                        game.elementXposition += 1;
                    }
                    break;
                case "Down":
                    game.isElementFalling = true;
                    game.speed = 20;
                    game.run();
                    break;
                case "Up":
                    if (!game.isElementFalling) {
                        game.elementOrientation += 1;
                        if (game.elementOrientation > 3) {
                            game.elementOrientation = 0;
                        }
                        game.refreshElement();

                        if (game.elementXposition < 5 && game.rightBorder.and(game.element) != 0) {
                            game.elementOrientation -= 1;
                            console.log("collide on left side");
                        } else if (game.elementXposition - game.elementXOffsets[game.elementNumber][game.elementOrientation] < 0) {
                            game.elementOrientation -= 1;
                            console.log("Xpos negative :(");
                        } else if (game.elementYposition - game.elementYOffsets[game.elementNumber][game.elementOrientation] < 0) {
                            game.elementOrientation -= 1;
                            console.log("Ypos negative :(");
                        } else if (game.elementXposition > 5 && game.leftBorder.and(game.element) != 0) {
                            game.elementOrientation -= 1;
                            console.log("collide on right side");

                        } else if (game.world.and(game.element) != 0) {
                            game.elementOrientation -=1;
                            console.log("collide with world");
                        } else if (game.elementYposition >= 19) {
                            game.elementOrientation -=1;
                            console.log("collide with bottom");
                        } else if ((game.elementYposition >= 18) && (game.elementNumber == 1)) {
                            game.elementOrientation -=1;
                            console.log("collide with bottom (element number = 1)");
                        }

                        if (game.elementOrientation < 0) {
                            game.elementOrientation = 3;
                        }
                    }
                    break;
            }
            game.refreshElement();
            display.refresh(game.getPixels());
        }
    },

    refreshElement: function() {
        game.element = game.elements[game.elementNumber][game.elementOrientation]
        .multiply(bigInt(2).pow(game.elementXposition - game.elementXOffsets[game.elementNumber][game.elementOrientation]))
        .multiply(bigInt(1024).pow(game.elementYposition - game.elementYOffsets[game.elementNumber][game.elementOrientation]));

    },

    descendElement: function() {
        if ((game.bottomBorder.and(game.element) == 0) && (game.world.and(game.element.multiply(2 ** 10)) == 0)) {
            game.elementYposition += 1;
            game.refreshElement();
            display.refresh(game.getPixels());
        } else {
            game.world = game.world.or(game.element);
            game.removeFullRows();
            if (game.setRandomElement()) {
                game.isGameOver = true;
            } else {
                game.speed = 1 / (2 ** Math.floor(game.removedRows / 10)) * 1000;
            }
        }
    },

    removeFullRows: function() {
        var above, below;
        for (var i = 0; i < 20; i++) {
            if (getPartOfBigInt(game.world, i * 10, 10) == 1023) {
                above = getPartOfBigInt(game.world, 0, i * 10).multiply(1024);
                below = getPartOfBigInt(game.world , (i + 1) * 10, 200 - (i + 1) * 10);
                below = below.multiply(bigInt(2).pow((i + 1) * 10));
                game.world = above.add(below);
                game.removedRows += 1;
                game.score += 10;
            }
        }
    }
};

function getPartOfBigInt(binaryNumber, cutFromTail, length) {
    var divider = bigInt(2).pow(cutFromTail);
    var modulo = bigInt(2).pow(length);
    return binaryNumber.divide(divider).mod(modulo);
}