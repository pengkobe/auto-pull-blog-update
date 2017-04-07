const task = require('./tasks/task');
module.exports = async function() {
    const data = await task();
    if (data && data.length > 0) {
        console.log('crawler task ret (the first):', data[0]);
    }
    return data;
}
