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
        if (getPartOfBigInt(temp, i, 1).value) {
            pixelList[i].classList.add("active");
        } else {
            pixelList[i].classList.remove("active");
        }
    }
}

function getPartOfBigInt(binaryNumber, cutFromTail, length) {
    var divider = bigInt(2).pow(cutFromTail);
    var modulo = bigInt(2).pow(length);
    return binaryNumber.divide(divider).mod(modulo);
}



