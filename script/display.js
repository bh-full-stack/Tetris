var display = {
    pixelList: [],

    render: function() {
        var temp;
        for (var i = 0; i < 200; i++) {
            temp = document.createElement("div");
            temp.className = "pixel";
            document
                .querySelector(".display")
                .appendChild(temp);
            display.pixelList.push(temp);
        }
    },

    refresh: function(pixelList) {
        for (var i = 0; i < 200; i++) {
            if (pixelList[i]) {
                display.pixelList[i].classList.add("active");
            } else {
                display.pixelList[i].classList.remove("active");
            }
        }
    }
};

var modalWindow = {

    show: function(name) {
        document.querySelector(".modal-window").style.display = "block";
        if (name === undefined) {
            document.querySelector(".modal-window__form").style.display = "block";
            document.querySelector("#name").focus();

        } else {
            document.querySelector(".modal-window__message").style.display = "block";
            document.querySelector(".player-name").textContent = (name == "") ? name : ", " + name;
        }
    },

    showMessage: function(name) {
        document.querySelector(".modal-window__form").style.display = "none";
        document.querySelector(".modal-window__message").style.display = "block";
        document.querySelector(".player-name").textContent = (name == "") ? name : ", " + name;
    },

    hide: function() {
        document.querySelector(".modal-window").style.display = "none";
        document.querySelector(".modal-window__message").style.display = "none";
        document.querySelector(".modal-window__form").style.display = "none";
    },

    showForm: function() {
        document.querySelector(".modal-window__message").style.display = "none";
        document.querySelector("#name").value = "";
        document.querySelector(".modal-window__form").style.display = "block";
        document.querySelector("#name").focus();
    }
};




