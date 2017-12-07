var pixelList = [];

function renderDisplay() {
    var temp;
    for (var i = 0; i < 200; i++) {
        temp = document.createElement("div");
        temp.className = "pixel";
        document
            .querySelector(".display")
            .appendChild(temp);
        pixelList.push(temp);
    }
}

function refreshDisplay(element, world) {
    var temp = world.or(element);
    for (var i = 0; i < 200; i++) {
        if (getLastNthDigitOfBigInt(temp, i)) {
            pixelList[i].classList.add("active");
        } else {
            pixelList[i].classList.remove("active");
        }
    }
}

function getLastNthDigitOfBigInt(element, n) {
    var divider = bigInt(2).pow(n);
    return element.divide(divider).mod(2).value;
}



