function getLastNthDigit(matrix, n) {
    return (Math.floor(matrix / 2 ** n)) % 2;
}

window.onload = function() {

    var matrix = 49200;
    var display = document.querySelector(".display");

    for (var i = 0; i < 200; i++) {
            var status;
            if (getLastNthDigit(matrix, i)) {
                status = "pixel-active";
            } else {
                status = "pixel-inactive";
            }
            display.insertAdjacentHTML(
                'beforeend',
                '<div class="' + status + '"></div>'
            );
    }
}