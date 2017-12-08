var game = {
    cycle: null,
    isRunning: false,
    world: bigInt(0),
    leftBorder: bigInt(0),
    rightBorder: bigInt(0),
    bottomBorder: bigInt(0),
    element: bigInt(0),
    elements: [
        bigInt(49200),
        bigInt(120),
        bigInt(57352),
        bigInt(57376),
        bigInt(24624),
        bigInt(49176),
        bigInt(57360)
    ],
    new: function() {
        game.isRunning = true;
        game.world = bigInt(0);
        game.createBorders();
        game.setRandomElement();
        game.cycle = setInterval(game.run, 20);
    },
    run: function() {
        game.descendElement();
        refreshDisplay(game.element, game.world);
    },
    end: function() {
        clearInterval(game.cycle);
        game.isRunning = false;
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
    descendElement: function() {
        if ((game.bottomBorder.and(game.element) == 0) && (game.world.and(game.element.multiply(2 ** 10)) == 0)) {
            game.element = game.element.multiply(2 ** 10);
        } else {
            game.world = game.world.or(game.element);
            game.removeFullRows();
            if (game.setRandomElement()) {
                game.end();
                endGame();
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
            }
        }
    }
};

function getPartOfBigInt(binaryNumber, cutFromTail, length) {
    var divider = bigInt(2).pow(cutFromTail);
    var modulo = bigInt(2).pow(length);
    return binaryNumber.divide(divider).mod(modulo);
}