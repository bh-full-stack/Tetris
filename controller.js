window.onload = function() {

    createBorders();
    renderDisplay();
    getRandomElement();
    refreshDisplay(element, world);
    setInterval(descendElement, 100);

    document.onkeydown = function(event) {
        switch (event.key) {
            case "ArrowLeft":
                if (leftBorder.and(element) == 0 && (world.and(element.divide(2)) == 0)) {
                    element = element.divide(2);
                }
                break;
            case "ArrowRight":
                if (rightBorder.and(element) == 0 && (world.and(element.multiply(2)) == 0)) {
                    element = element.multiply(2);
                }
        }
        refreshDisplay(element, world);
    }
};

