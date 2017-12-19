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
    elements: [
        bigInt(49200),
        bigInt(120),
        bigInt(57352),
        bigInt(57376),
        bigInt(24624),
        bigInt(49176),
        bigInt(57360)
    ],

    init: function() {
        display.render();
        game.createBorders();
    },

    new: function() {
        game.speed = 1 / (2 ** Math.floor(game.removedRows / 10)) * 1000;
        game.isRunning = true;
        game.isGameOver = false;
        game.score = 0;
        game.removedRows = 0;
        game.world = bigInt(0);
        game.setRandomElement();
        game.run();
    },

    run: function() {
        clearTimeout(game.cycle);
        if(!game.isGameOver) {
            game.descendElement();
            display.refresh(game.getPixels());
            game.cycle = setTimeout(game.run, game.speed);
        } else {
            modalWindow.show(localStorage.name, game.score);
        }
    },

    end: function() {
        clearTimeout(game.cycle);
        modalWindow.show(localStorage.name, game.score);
    },

    setRandomElement: function() {
        game.element = game.elements[Math.floor(Math.random()*7)];
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
        for (i = 191; i < 200; i++) {
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

    moveElement: function(direction) {
        if(!game.isGameOver) {
            switch (direction) {
                case "Left":
                    if (game.leftBorder.and(game.element) == 0 && (game.world.and(game.element.divide(2)) == 0)) {
                        game.element = game.element.divide(2);
                    }
                    break;
                case "Right":
                    if (game.rightBorder.and(game.element) == 0 && (game.world.and(game.element.multiply(2)) == 0)) {
                        game.element = game.element.multiply(2);
                    }
                    break;
                case "Down":
                    game.speed = 20;
                    game.run();
            }
            display.refresh(game.getPixels());
        }
    },

    descendElement: function() {
        if ((game.bottomBorder.and(game.element) == 0) && (game.world.and(game.element.multiply(2 ** 10)) == 0)) {
            game.element = game.element.multiply(2 ** 10);
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