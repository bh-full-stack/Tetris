window.onload = function() {

    renderDisplay();
    game.new();

    document.onkeydown = function(event) {
        switch (event.key) {
            case "ArrowLeft":
                if (game.leftBorder.and(game.element) == 0 && (game.world.and(game.element.divide(2)) == 0)) {
                    game.element = game.element.divide(2);
                }
                break;
            case "ArrowRight":
                if (game.rightBorder.and(game.element) == 0 && (game.world.and(game.element.multiply(2)) == 0)) {
                    game.element = game.element.multiply(2);
                }
        }
        refreshDisplay(game.element, game.world);
    };

    document.querySelector(".end-game-box__form").onsubmit = function (event) {
        event.preventDefault();
        var name = document.querySelector("#name").value;
        localStorage.name = name;
        showEndGameBoxMessage(name);
    };

    document.querySelector("#new_game_button").onclick = function () {
        hideEndGameBox();
        game.new();
    };

    document.querySelector("#clear_name_button").onclick = function () {
        localStorage.removeItem("name");
        showEndGameBoxForm();
    };
};