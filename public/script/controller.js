window.onload = function() {
    game.init();
    game.new();

    document.onkeydown = function(event) {
        switch (event.key) {
            case "ArrowLeft":
                game.interactWithElement("Left");
                break;
            case "ArrowRight":
                game.interactWithElement("Right");
                break;
            case "ArrowDown":
                game.interactWithElement("Down");
                break;
            case "ArrowUp":
                game.interactWithElement("Up");
                break;
        }
    };
};