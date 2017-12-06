window.onload = function() {

    var leftBorder = bigInt(0);
    var rightBorder = bigInt(0);
    var bottomBorder = bigInt(0);
    var matrix = bigInt(49200);

    for (var i = 0; i < 191; i += 10) {
        leftBorder = leftBorder.add(bigInt(2).pow(i));
    }
    for (var i = 9; i < 200; i += 10) {
        rightBorder = rightBorder.add(bigInt(2).pow(i));
    }
    for (var i = 191; i < 200; i++) {
        bottomBorder = bottomBorder.add(bigInt(2).pow(i));
    }

    renderDisplay();
    refreshDisplay(matrix);

    document.onkeydown = function(event) {
        switch (event.key) {
            case "ArrowLeft":
                if (leftBorder.and(matrix) == 0) {
                    matrix = matrix.divide(2);
                }
                break;
            case "ArrowRight":
                if (rightBorder.and(matrix) == 0) {
                    matrix = matrix.multiply(2);
                }
                break;
            case "ArrowDown":
                if (bottomBorder.and(matrix) == 0) {
                    matrix = matrix.multiply(2 ** 10);
                }
        }
        refreshDisplay(matrix);
    }
};

