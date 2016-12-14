var yinwang = require('./tasks/yinwang.org');

module.exports = async function() {
    // 爬 yinwang.org
    var data = await yinwang();
    if (data && data.length > 0) {
        console.log('crawler yinwang task:', data[0]);
    }
    return data;
}
