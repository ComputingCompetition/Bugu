//获取今天和指定日期的时间差 
export function GettimeifferenceOfNow(lastDate) {
    var lastDate = lastDate.replace(/\-/g, "/")     //使用replace函数，调用data.replace(/\-/g, "/")将全部的“-”替换为”/“
    var date = new Date(lastDate)
    var date_last = date.getTime();
    var date_now = new Date().getTime();
    var day = Math.round((date_now - date_last) / (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    var hours = Math.round((date_now - date_last) / (1000 * 60 * 60));//核心：时间戳相减，然后除以天数
    var minutes = Math.round((date_now - date_last) / (1000 * 60));//核心：时间戳相减，然后除以天数
    var myYear = date.getFullYear(); //获取完整的年份(4位,1970-????)
    var myMonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var myToday = date.getDate(); //获取当前日(1-31)
    var myDay = date.getDay(); //获取当前星期X(0-6,0代表星期天)
    var myHour = date.getHours(); //获取当前小时数(0-23)
    var myMinute = date.getMinutes(); //获取当前分钟数(0-59)
    var mySecond = date.getSeconds(); //获取当前秒数(0-59)
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var nowTime;

    if (day > 0) {
        return {
            DistanceNow: `${day}天前`,
            Detailed: myYear + '-' + myMonth + '-' + myToday + ' ' + (myHour < 10 ? '0' + myHour : myHour) + ':' + (myMinute < 10 ? '0' + myMinute : myMinute),
            MinuteDifference: minutes,
            HourDifference: hours,

        }
    } else if (hours > 0) {
        return {
            DistanceNow: `${hours}小时前`,
            Detailed: (myHour < 10 ? '0' + myHour : myHour) + ':' + (myMinute < 10 ? '0' + myMinute : myMinute),
            MinuteDifference: minutes,
            HourDifference: hours
        }
    } else if (minutes > 0) {
        return {
            DistanceNow: `${minutes}分钟前`,
            Detailed: (myHour < 10 ? '0' + myHour : myHour) + ':' + (myMinute < 10 ? '0' + myMinute : myMinute),
            MinuteDifference: minutes,
            HourDifference: hours,
        }
    } else {
        return {
            DistanceNow: `刚刚`,
            Detailed: (myHour < 10 ? '0' + myHour : myHour) + ':' + (myMinute < 10 ? '0' + myMinute : myMinute),
            HourDifference: hours,
            MinuteDifference: minutes
        }
    }
};
// 全局变量
const globalData = {};
export const setGlobalData = (global_key, val) => {
    globalData[global_key] = val;
}
export const getGlobalData = (global_key) => {
    return globalData[global_key];
}
export function getTime() {
    var myDate = new Date();
    var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var myToday = myDate.getDate(); //获取当前日(1-31)
    var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    var myHour = myDate.getHours(); //获取当前小时数(0-23)
    var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
    var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var nowTime;

    nowTime = myYear + '-' + myMonth + '-' + myToday + ' ' + (myHour < 10 ? '0' + myHour : myHour) + ':' +
        (myMinute < 10 ? '0' + myMinute : myMinute) + ':' + (mySecond < 10 ? '0' + mySecond : mySecond);
    //console.log(nowTime);
    return nowTime
};