window.onload = function() {

    var leftBorder = bigInt(0);
    var rightBorder = bigInt(0);
    var bottomBorder = bigInt(0);
    var element = bigInt(49200);

    for (var i = 0; i < 191; i += 10) {
        leftBorder = leftBorder.add(bigInt(2).pow(i));
    }
    for (i = 9; i < 200; i += 10) {
        rightBorder = rightBorder.add(bigInt(2).pow(i));
    }
    for (i = 191; i < 200; i++) {
        bottomBorder = bottomBorder.add(bigInt(2).pow(i));
    }

    function descend() {
        if (bottomBorder.and(element) == 0) {
            element = element.multiply(2 ** 10);
        }
        refreshDisplay(element);
    }

    renderDisplay();
    refreshDisplay(element);
    setInterval(descend, 1000);

    document.onkeydown = function(event) {
        switch (event.key) {
            case "ArrowLeft":
                if (leftBorder.and(element) == 0) {
                    element = element.divide(2);
                }
                break;
            case "ArrowRight":
                if (rightBorder.and(element) == 0) {
                    element = element.multiply(2);
                }
        }
        refreshDisplay(element);
    }
};

