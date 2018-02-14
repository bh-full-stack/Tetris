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