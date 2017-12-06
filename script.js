function getLastNthDigitOfBigInt(matrix, n) {
    var divider = bigInt(2).pow(n);
    return matrix.divide(divider).mod(2).value;
}

window.onload = function() {
    renderDisplay();

    var leftBorder = bigInt(0);
    var rightBorder = bigInt(0);
    var bottomBorder = bigInt(0);
    var matrix = bigInt(49200);
    var pixelList = document.querySelectorAll(".pixel");

    refreshDisplay();

    for (var i = 0; i < 191; i += 10) {
        leftBorder = leftBorder.add(bigInt(2).pow(i));
    }

    for (var i = 9; i < 200; i += 10) {
        rightBorder = rightBorder.add(bigInt(2).pow(i));
    }

    for (var i = 191; i < 200; i++) {
        bottomBorder = bottomBorder.add(bigInt(2).pow(i));
    }

    function renderDisplay() {
        for (var i = 0; i < 200; i++) {
            document
                .querySelector(".display")
                .insertAdjacentHTML("beforeend", "<div class='pixel'></div>");
        }
    }

    function refreshDisplay() {
        for (var i = 0; i < 200; i++) {
            if (getLastNthDigitOfBigInt(matrix, i)) {
                pixelList[i].classList.add("active");
            } else {
                pixelList[i].classList.remove("active");
            }
        }
    }

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
        refreshDisplay();
    }
};

