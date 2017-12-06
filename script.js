function getLastNthDigitOfBigInt(matrix, n) {
    var divider = bigInt(2).pow(n);
    return matrix.divide(divider).mod(2).value;
}

window.onload = function() {
    renderDisplay();

    var leftWall = bigInt(0);
    var rightWall = bigInt(0);
    var matrix = bigInt(49200);
    var pixelList = document.querySelectorAll(".pixel");
    
    refreshDisplay();

    for (var i = 0; i < 191; i += 10) {
        leftWall = leftWall.add(bigInt(2).pow(i));
    }

    for (var i = 9; i < 200; i += 10) {
        rightWall = rightWall.add(bigInt(2).pow(i));
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
                if (leftWall.and(matrix) == 0) {
                    matrix = matrix.divide(2);
                }
                break;
            case "ArrowRight":
                if (rightWall.and(matrix) == 0) {
                    matrix = matrix.multiply(2);
                }
                break;
            case "ArrowDown":
                matrix = matrix.multiply(2 ** 10);
        }
        refreshDisplay();
    }
};

