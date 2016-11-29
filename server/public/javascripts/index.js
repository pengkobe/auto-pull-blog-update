
/*
* 测试webcomponent
*/
var addBox = document.querySelector('add-box');
var todoList = document.querySelector('todo-list');
addBox.addEventListener('add-item', function (e) {
    todoList.addItem(e.detail);
});


var token = '';
/**
 * 创建Token
 */
$("#createJwt").on('click', function (e) {
    $.ajax({
        type: 'POST',
        url: "tokens",
        dataType: 'json',
        data: { username: 'py', password: '123' },
        success: function (data) {
            token= data.data.token;
        },
        error: function (err) {
            debugger;
        }
    });

});

/**
 * 验证Token
 */
$("#verifyJwt").on('click', function (e) {
    $.ajax({
        type: 'GET',
        url: "/tokens/check",
        dataType: 'json',
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", 'dsd '+token);
        },
        success: function (data) {
            debugger;
        },
        error: function (err) {
            debugger;
        }
    });

});


/**
 * 添加博主
 */
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

/**
 * 开启抓取任务
 */
$("#beginTasks").on('click', function (e) {
    $.ajax({
        type: 'GET',
        url: "begintasks",
        dataType: 'json',
        success: function (data) {
            loadBlognews();
        },
        error: function (err) {
            debugger;
        }
    });
});

/**
 * 加载博客新闻
 */
function loadBlognews() {
    $.ajax({
        type: 'GET',
        url: "blognews",
        dataType: 'json',
        success: function (data) {
            var data = data.data;
            for (var i = 0; i < data.length; i++) {
                var from = data[i].from.name;
                $("#blognews").append("<div>" + from + ":" + data[i].title + "</div>");
            }
        },
        error: function (err) {
            debugger;
        }
    });

}




