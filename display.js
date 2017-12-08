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

function endGame() {
    document.querySelector(".end-game-box").style.display = "block";
    if (localStorage.name === undefined) {
        document.querySelector(".end-game-box__form").style.display = "block";
        document.querySelector("#name").focus();

    } else {
        document.querySelector(".end-game-box__message").style.display = "block";
        document.querySelector(".end-game-box__text").textContent =
            "Thank you for playing" + ((localStorage.name == "") ? "!" : ", " + localStorage.name);
    }
}

function showEndGameBoxMessage(name) {
    document.querySelector(".end-game-box__form").style.display = "none";
    document.querySelector(".end-game-box__message").style.display = "block";
    document.querySelector(".end-game-box__text").textContent =
        "Thank you for playing" + ((name == "") ? "!" : ", " + name);
}

function hideEndGameBox() {
    document.querySelector(".end-game-box").style.display = "none";
    document.querySelector(".end-game-box__message").style.display = "none";
    document.querySelector(".end-game-box__form").style.display = "none";
}

function showEndGameBoxForm() {
    document.querySelector(".end-game-box__message").style.display = "none";
    document.querySelector("#name").value = "";
    document.querySelector(".end-game-box__form").style.display = "block";
    document.querySelector("#name").focus();
}