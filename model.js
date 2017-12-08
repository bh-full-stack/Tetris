var gameCycle;
var world = bigInt(0);
var leftBorder = bigInt(0);
var rightBorder = bigInt(0);
var bottomBorder = bigInt(0);
var element = bigInt(0);
var elements = [
    bigInt(49200),
    bigInt(120),
    bigInt(57352),
    bigInt(57376),
    bigInt(24624),
    bigInt(49176),
    bigInt(57360)
];

function getRandomElement() {
    element = elements[Math.floor(Math.random()*7)];
    if (world.and(element) != 0) {
        return true;
    }
    return false;
}

function createBorders() {
    for (var i = 0; i < 191; i += 10) {
        leftBorder = leftBorder.add(bigInt(2).pow(i));
    }
    for (i = 9; i < 200; i += 10) {
        rightBorder = rightBorder.add(bigInt(2).pow(i));
    }
    for (i = 191; i < 200; i++) {
        bottomBorder = bottomBorder.add(bigInt(2).pow(i));
    }
}

function descendElement() {
    if ((bottomBorder.and(element) == 0) && (world.and(element.multiply(2 ** 10)) == 0)) {
        element = element.multiply(2 ** 10);
    } else {
        world = world.or(element);
        removeFullRows();
        if (getRandomElement()) {
            clearInterval(gameCycle);
            endGame();
        }
    }
    refreshDisplay(element, world);
}

function removeFullRows() {
    var above, below;
    for (var i = 0; i < 20; i++) {
        if (getPartOfBigInt(world, i * 10, 10) == 1023) {
            above = getPartOfBigInt(world, 0, i * 10).multiply(1024);
            below = getPartOfBigInt(world , (i + 1) * 10, 200 - (i + 1) * 10);
            below = below.multiply(bigInt(2).pow((i + 1) * 10));
            world = above.add(below);
        }
    }
}