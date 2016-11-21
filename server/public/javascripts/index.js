var addBox = document.querySelector('add-box');
var todoList = document.querySelector('todo-list');

addBox.addEventListener('add-item', function (e) {
    todoList.addItem(e.detail);
});

// var addBloggerTst = document.getElementById("addBlogger");
// addBloggerTst.addEventListener('click', function (e) {

// });

$("#addBlogger").on('click', function (e) {
    $.ajax({
        type: 'POST',
        url: "bloggers",
        dataType: 'json',
        data: { name: 'byvoid', url: 'http://byvoid.com' },
        success: function (data) {
            debugger;
        },
        error: function (err) {
            debugger;
        }
    });

});