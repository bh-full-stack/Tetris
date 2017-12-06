function getLastNthDigitOfBigInt(matrix, n) {
    var divider = bigInt(2).pow(n);
    return matrix.divide(divider).mod(2).value;
}

window.onload = function() {
    var matrix = bigInt(49200);
    var display = document.querySelector(".display");
    renderDisplay();

    var pixelList = document.querySelectorAll(".pixel");
    refreshDisplay();

    function renderDisplay() {
        for (var i = 0; i < 200; i++) {
            display.insertAdjacentHTML("beforeend", "<div class='pixel'></div>");
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
                if (!pixelList[0].classList.contains("active")) {
                    matrix = matrix.divide(2);
                }
                break;
            case "ArrowRight":
                if (!pixelList[9].classList.contains("active")) {
                    matrix = matrix.multiply(2);
                }
                break;
        }
        refreshDisplay();
    }
};

