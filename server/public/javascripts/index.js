$(function() {
    var dialog = document.querySelector('dialog');
    $(".addblogger-button").on('click', function(evt) {
        dialog.showModal();
    });
    var submit = document.querySelector('#add_blogger');
    var close = dialog.querySelector('.close');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    close.addEventListener('click', function() {
        dialog.close();
    });
    submit.addEventListener('click', function(e) {
    });
} ());