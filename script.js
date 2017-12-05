window.onload = function() {

    var display = document.querySelector(".display");

    for(var i = 1;i < 21;i++) {
        for(var j = 1;j < 11;j++) {
            display.insertAdjacentHTML('beforeend',
            '<div class="pixel" id=' + i + '-' + j + '></div>');
        }
    }

}