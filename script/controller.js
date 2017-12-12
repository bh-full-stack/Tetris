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
        }
    };

    document.querySelector(".modal-window__form").onsubmit = function(event) {
        event.preventDefault();
        var name = document.querySelector("#name").value;
        localStorage.name = name;
        modalWindow.showMessage(name);
    };

    document.querySelector("#new_game_button").onclick = function() {
        modalWindow.hide();
        game.new();
    };

    document.querySelector("#clear_name_button").onclick = function() {
        localStorage.removeItem("name");
        modalWindow.showForm();
    };
};