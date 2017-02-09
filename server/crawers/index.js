var task = require('./tasks/task');

module.exports = async function() {
    // 爬 yinwang.org
    var data = await task();
    if (data && data.length > 0) {
        console.log('crawler yinwang task:', data[0]);
    }
    return data;
}
