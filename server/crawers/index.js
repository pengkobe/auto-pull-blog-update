var yiwang = require('./tasks/yiwang.org');

module.exports = async function() {
    // 爬 yinwang.org
    var data = await yiwang();
    if (data && data.length > 0) {
        console.log('crawler yiwang task:', data[0]);
    }
    return data;
}
