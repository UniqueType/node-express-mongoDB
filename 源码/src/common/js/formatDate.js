// 获取当前服务器时间 2019-04-05 12:34:03
// time: new Date()
// mark: 连接符 默认2019-04-23 12:56:00
const getYYYYMMDDHHMMSS = (time, mark) => { // 获取时间格式yyyyMMddmmss
    let d;
    if (!time) {
        d = new Date();
    } else {
        d = time;
    }
    let month = d.getMonth() + 1; // 本月
    month = (month < 10 ? `0${month}` : month);
    const year = d.getFullYear();
    const day = d.getDate() > 9 ? d.getDate() : (`0${d.getDate()}`);
    const hour = d.getHours() > 9 ? d.getHours() : (`0${d.getHours()}`);
    const minit = d.getMinutes() > 9 ? d.getMinutes() : (`0${d.getMinutes()}`);
    const sec = d.getSeconds() > 9 ? d.getSeconds() : (`0${d.getSeconds()}`);
    if (mark === '') {
        return `${year}${month}${day}${hour}${minit}${sec}`;
    }
    return `${year}-${month}-${day} ${hour}:${minit}:${sec}`;
};

module.exports = {
	getYYYYMMDDHHMMSS
}