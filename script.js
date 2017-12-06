function getLastNthDigitOfBigInt(matrix, n) {
    var divider = bigInt(2).pow(n);
    return matrix.divide(divider).mod(2).value;
}

window.onload = function() {
    var matrix = bigInt(49200);
    var display = document.querySelector(".display");

    for (var i = 0; i < 200; i++) {
        var status;
        if (getLastNthDigitOfBigInt(matrix, i)) {
            status = "pixel-active";
        } else {
            status = "pixel-inactive";
        }
        display.insertAdjacentHTML(
            'beforeend',
            '<div class="' + status + '"></div>'
        );
    }
};