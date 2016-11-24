var addBox = document.querySelector('add-box');
var todoList = document.querySelector('todo-list');

addBox.addEventListener('add-item', function (e) {
    todoList.addItem(e.detail);
});


$("#addBlogger").on('click', function (e) {
    $.ajax({
        type: 'POST',
        url: "bloggers",
        dataType: 'json',
        data: { name: 'yiwang', url: 'http://yiwang.org', taskjs: 'yiwang.org.js' },
        success: function (data) {
            debugger;
        },
        error: function (err) {
            debugger;
        }
    });

});


$("#beginTasks").on('click', function (e) {
    $.ajax({
        type: 'GET',
        url: "begintasks",
        dataType: 'json',
        success: function (data) {
            debugger;
        },
        error: function (err) {
            debugger;
        }
    });
});





