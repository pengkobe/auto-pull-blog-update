$(function () {
    var isHide = true;
    $(".addblogger-button").on('click', function (evt) {
        if (isHide) {
            $(".formblock").show();
            isHide = false;
        } else {
            $(".formblock").hide();
            isHide = true;
        }
    });
} ());