function getLastNthDigitOfBigInt(matrix, n) {
    var divider = bigInt(2).pow(n);
    return matrix.divide(divider).mod(2).value;
}

window.onload = function() {
    var matrix = bigInt(49200);
    var display = document.querySelector(".display");
    renderDisplay();

    function renderDisplay() {
        for (var i = 0; i < 200; i++) {
            display.insertAdjacentHTML(
                'beforeend',
                '<div class="pixel"></div>'
            );
        }
    }

    function refreshDisplay() {
        for (var i = 0; i < 200; i++) {

            if (getLastNthDigitOfBigInt(matrix, i)) {
                document.querySelector(".pixel").classList.add("active");
            } else {
                //document.querySelector(".pixel").classList.remove("active");
            }
            document.querySelectorAll(".pixel").forEach(function (element) {
                element.classList.add("active");
            })
        }
    }

    document.onkeydown = function(event) {
        switch (event.key) {
            case "ArrowLeft":
                matrix = matrix.divide(2);
                console.log(matrix);
                refreshDisplay();
                break;
            case "ArrowRight":
                console.log(event.key);

                break;
        }
    }
};

