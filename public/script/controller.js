window.onload = function() {
    game.init();
    game.new();

    document.onkeydown = function(event) {
        switch (event.key) {
            case "ArrowLeft":
                game.moveElement("Left");
                break;
            case "ArrowRight":
                game.moveElement("Right");
                break;
            case "ArrowDown":
                game.moveElement("Down");
        }
    };
};