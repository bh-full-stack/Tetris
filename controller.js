window.onload = function() {

    createBorders();
    renderDisplay();
    getRandomElement();
    refreshDisplay(element, world);

    gameCycle = setInterval(descendElement, 1000);

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
    };

    document.querySelector("#save_button").onclick = function () {
        var name = document.querySelector("#name").value;
        localStorage.name = name;

        document.querySelector(".gratulation__form").style.display = "none";
        document.querySelector(".gratulation__message").style.display = "block";
        document.querySelector(".gratulation__text").textContent =
            "Thank you for playing" + ((localStorage.name == "") ? "!" : ", " + localStorage.name);

    };

    document.querySelector("#new_game_button").onclick = function () {
        document.querySelector(".gratulation").style.display = "none";
        document.querySelector(".gratulation__message").style.display = "none";
        document.querySelector(".gratulation__form").style.display = "none";
        document.querySelector("#name").value = "";
        world = bigInt(0);
        gameCycle = setInterval(descendElement, 1000);
    };

    document.querySelector("#clear_name_button").onclick = function () {
        localStorage.removeItem("name");
        document.querySelector(".gratulation__message").style.display = "none";
        document.querySelector("#name").value = "";
        document.querySelector(".gratulation__form").style.display = "block";
        document.querySelector("#name").focus();
    };
};
