"use strict";
/*****************************************************************************
 Mouule: jcstudio.datetime
 Author: jclee95
 Chinese name: 李俊才
 Email: 291148484@163.com
 Author blog: https://blog.csdn.net/qq_28550263?spm=1001.2101.3001.5343
 Copyright Jack Lee. All rights reserved.
 Licensed under the MIT License.
*****************************************************************************/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.DateTime = exports.Date_ = exports.Hour = exports.Minute = exports.Second = void 0;
var utils_1 = require("./utils");
var ValueError = /** @class */function () {
    function ValueError(s) {
        throw "[Valueerror]: " + s;
    }
    return ValueError;
}();
var StaticFuncs = /** @class */function () {
    function StaticFuncs() {}
    // 返回某个月的天数 
    StaticFuncs.get_days = function (yearmonth) {
        var _a = yearmonth.split("/"),
            year = _a[0],
            month = _a[1];
        var days_map = new Map([[1, 31], [3, 31], [5, 31], [7, 31], [8, 31], [10, 31], [12, 31], [4, 30], [6, 30], [9, 30], [11, 30]]);
        // 闰年
        if (parseInt(year) % 4 != 0) {
            days_map.set(2, 28);
        } else {
            days_map.set(2, 29);
        }
        var days = days_map.get(parseInt(month));
        if (typeof days === "number") {
            return days;
        } else {
            new ValueError("Got a wrong or irregular month.");
        }
    };
    // 判断某个月是否是大月（31天） 
    StaticFuncs.is_big_month = function (month) {
        if (StaticFuncs.get_days(month.toString()) === 31) {
            return true;
        } else {
            return false;
        }
    };
    // 返回日历表 
    StaticFuncs.get_calendar = function (yearmonth) {
        var _a = yearmonth.split("/"),
            year = _a[0],
            month = _a[1];
        var days = StaticFuncs.get_days(yearmonth);
        var calendar_list = new utils_1.List();
        (0, utils_1.range)([1, days + 1]).forEach(function (i) {
            var temp_j = i.toString();
            var j;
            if (i.toString().length === 1) {
                j = '0' + temp_j;
            } else {
                j = temp_j;
            }
            var aday = year + "/" + month + "/" + j;
            calendar_list.add(aday);
        });
        return calendar_list;
    };
    StaticFuncs.next_month = function (year, month) {
        if (month < 12) {
            return year.toString() + "/0" + (month + 1).toString();
        } else if (month === 12) {
            return (year + 1).toString() + "/" + "01";
        } else {
            new ValueError("Month must be less than or equal to 12.");
        }
        return "";
    };
    // 指定起始日期，返回以这两个日期为起止期日的日期段列表 date_begin 或 date_end 的格式如 2022/08/15 
    StaticFuncs.datelist = function (date_begin, date_end) {
        var _a = date_begin.split("/"),
            year_begin = _a[0],
            month_begin = _a[1],
            day_begin = _a[2];
        var _b = date_end.split("/"),
            year_end = _b[0],
            month_end = _b[1],
            day_end = _b[2];
        var date_list = new utils_1.List(); // 日期容器
        var yearmonth = year_begin + month_begin;
        var yearmonth_end = year_end + month_end;
        // 只要还没到截止日期就插入日期到日期表中去
        while (parseInt(yearmonth) <= parseInt(yearmonth_end)) {
            var month_calendar = StaticFuncs.get_calendar(year_begin + "/" + month_begin);
            month_calendar.forEach(function (i) {
                if (parseInt(i.replace("/", "")) >= parseInt(date_begin.replace("/", ""))) {
                    if (parseInt(i.replace("/", "")) <= parseInt(date_end.replace("/", ""))) {
                        date_list.add(i);
                    }
                }
            });
            yearmonth = StaticFuncs.next_month(parseInt(yearmonth.substr(0, 4)), parseInt(yearmonth.substr(5, 2)));
            year_begin = yearmonth.split("/")[0].toString();
            month_begin = yearmonth.split("/")[1].toString();
            yearmonth = yearmonth.replace("/", "");
        }
        return date_list;
    };
    return StaticFuncs;
}();
// 进位器状态枚举 
var CarryEnum;
(function (CarryEnum) {
    CarryEnum[CarryEnum["CARRY"] = 1] = "CARRY";
    CarryEnum[CarryEnum["NONE"] = 0] = "NONE";
    CarryEnum[CarryEnum["BACK"] = 2] = "BACK"; // 有退位
})(CarryEnum || (CarryEnum = {}));
// 进位器 
var Carry = /** @class */function () {
    function Carry(b) {
        if (b == undefined) {
            this._value = CarryEnum.NONE;
        } else {
            this._value = b;
        }
    }
    // 标志进位 
    Carry.prototype.set = function () {
        this._value = CarryEnum.CARRY;
    };
    // 标志退位 
    Carry.prototype.set_back = function () {
        this._value = CarryEnum.BACK;
    };
    // 清空标志 
    Carry.prototype.clear = function () {
        this._value = CarryEnum.NONE;
    };
    // 获取进位器状态 
    Carry.prototype.get_state = function () {
        return this._value;
    };
    return Carry;
}();
//秒计数器
var Second = /** @class */function () {
    function Second(s) {
        this._value = 0;
        this.c = new Carry(undefined);
        this.c.clear();
        if (s < 0) {
            new ValueError("Seconds must be greater than or equal to 0.");
        } else if (s > 59) {
            new ValueError("Seconds must be less than or equal to 59.");
        }
        this._value = s;
    }
    // 正向行走 
    Second.prototype.next = function () {
        // 已达 59
        if (this._value >= 59) {
            this._value = 0; // 置空
            this.c.set(); // 标志进位
        } else {
            this._value = this._value + 1;
        }
        // Write-Host this._value
    };
    // 逆向行走 
    Second.prototype.last = function () {
        // 已到 0
        if (this._value <= 0) {
            this._value = 59; // 置满
            this.c.set_back(); // 标志退位
        } else {
            this._value = this._value - 1;
        }
        // Write-Host this._value
    };
    // 秒步增
    Second.prototype.start = function (func) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var that = this;
        setInterval.apply(void 0, __spreadArray([function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            that.next();
            func.apply(void 0, params);
        }, 1000], params, false));
    };
    Second.prototype.print = function () {
        var temp = this._value.toString();
        console.log(temp);
    };
    Second.prototype.get_value = function () {
        var s = this._value.toString();
        if (s.length === 1) {
            s = "0" + s;
        }
        return s;
    };
    return Second;
}();
exports.Second = Second;
// 分计数器 
var Minute = /** @class */function () {
    function Minute(m, s) {
        this._value = 0; // 分针位
        // 初始化分进退位标志引用对象
        this.c = new Carry(undefined);
        this.c.clear();
        // 初始值校验
        if (m < 0) {
            new ValueError("Minutes must be greater than or equal to 0.");
        } else if (m > 59) {
            new ValueError("Minutes must be less than or equal to 59.");
        }
        // 初始化秒位引用对象
        this.second = new Second(s);
        // 设置分初值
        this._value = m;
    }
    // 正向行走（分针，即下一分钟） 
    Minute.prototype.next = function () {
        // 已达 59
        if (this._value >= 59) {
            this._value = 0; // 置空
            this.c.set(); // 标志进位
        } else {
            this._value = this._value + 1;
        }
    };
    // 逆向行走（分针，即上一分钟） 
    Minute.prototype.last = function () {
        // 已到 0
        if (this._value <= 0) {
            this._value = 59; // 置满
            this.c.set_back(); // 标志退位
        } else {
            this._value = this._value - 1;
        }
    };
    // 正向行走（秒针，即下一秒） 
    Minute.prototype.next_second = function () {
        // 直接调用 Second 类的下一秒
        this.second.next();
        // 判断进位
        if (this.second.c.get_state() === CarryEnum.CARRY) {
            // 先完成进位
            this.next();
            // 再将进位标志清空
            this.second.c.clear();
        }
    };
    // 逆向行走（秒针，即上一秒） 
    Minute.prototype.last_second = function () {
        // 直接调用 Second 类的上一秒
        this.second.last();
        // 判断退位
        if (this.second.c.get_state() === CarryEnum.BACK) {
            // 先完成退位
            this.last();
            // 再将进位标志清空
            this.second.c.clear();
        }
    };
    Minute.prototype.print = function () {
        var m = this._value.toString();
        if (m.length === 1) {
            m = "0" + m;
        }
        var s = this.second._value.toString();
        if (s.length === 1) {
            s = "0" + s;
        }
        console.log(m + ":" + s);
    };
    Minute.prototype.get_value = function () {
        var m = this._value.toString();
        var s = this.second._value.toString();
        if (m.length === 1) {
            m = "0" + m;
        }
        if (s.length === 1) {
            s = "0" + s;
        }
        return m + ":" + s;
    };
    Minute.prototype.get_minute = function () {
        return this._value;
    };
    Minute.prototype.get_second = function () {
        return parseInt(this.second.get_value());
    };
    Minute.prototype.start = function (func) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var that = this;
        setInterval.apply(void 0, __spreadArray([function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            that.next_second();
            func.apply(void 0, params);
        }, 1000], params, false));
    };
    return Minute;
}();
exports.Minute = Minute;
//时计数器
var Hour = /** @class */function () {
    function Hour(time) {
        this._value = 0; // 时针位
        this.c = new Carry(undefined); // 进位
        // 初始化分进退位标志引用对象
        this.c.clear();
        // 使用当前的系统时间进行初始化
        if (time == undefined) {
            var _a = new Date().toLocaleString().split(" ")[1].split(":"),
                hours = _a[0],
                minutes = _a[1],
                seconds = _a[2];
            // 初始化秒位引用对象
            this.minute = new Minute(parseInt(minutes), parseInt(seconds));
            // 设置小时初值
            this._value = parseInt(hours);
        }
        // 通过字符串表示的时间初始化，字符串形如 20:30:00
        else if (typeof time == "string") {
                var _b = time.split(":"),
                    hours = _b[0],
                    minutes = _b[1],
                    seconds = _b[2];
                // 初始化秒位引用对象
                this.minute = new Minute(parseInt(minutes), parseInt(seconds));
                // 设置小时初值
                this._value = parseInt(hours);
            }
            // 指定具体时间进行初始化：分别指定时、分、秒
            else if (typeof time[0] == "number") {
                    var hours = time[0],
                        minutes = time[1],
                        seconds = time[2];
                    // 初始值校验
                    if (hours < 0) {
                        new ValueError("Hours must be greater than or equal to 0.");
                    } else if (hours > 59) {
                        new ValueError("Hours must be less than or equal to 59.");
                    }
                    // 初始化秒位引用对象
                    this.minute = new Minute(minutes, seconds);
                    // 设置小时初值
                    this._value = minutes;
                } else {
                    this.minute = new Minute(0, 0);
                    var f_param_type = _typeof(time[0]);
                    new ValueError("Type of first param is: " + f_param_type);
                }
    }
    // 正向行走（时针，即下一小时） 
    Hour.prototype.next = function () {
        // 已达 59
        if (this._value >= 59) {
            this._value = 0; // 置空
            this.c.set(); // 标志进位
        } else {
            this._value = this._value + 1;
        }
    };
    // 逆向行走（时针，即上一小时） 
    Hour.prototype.last = function () {
        // 已到 0
        if (this._value <= 0) {
            this._value = 59; // 置满
            this.c.set_back(); // 标志退位
        } else {
            this._value = this._value - 1;
        }
    };
    // 正向行走（分针，即下一分钟） 
    Hour.prototype.next_minute = function () {
        // 掉用分的下一分钟方法
        this.minute.next();
        // 只需要观察分种是否进位
        if (this.minute.c._value === CarryEnum.CARRY) {
            // 先进位到小时，即求下一小时
            this.next();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    // 逆向行走（分针，即上一分钟） 
    Hour.prototype.last_minute = function () {
        // 掉用分的上一分钟方法
        this.minute.last();
        // 只需要观察分种是否退位
        if (this.minute.c._value === CarryEnum.BACK) {
            // 先求上一小时
            this.last();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    // 正向行走（秒针，即下一秒） 
    Hour.prototype.next_second = function () {
        // 掉用分的下一秒方法
        this.minute.next_second();
        // 只需要观察分种是否进位
        if (this.minute.c._value === CarryEnum.CARRY) {
            // 先进位到小时，即求下一小时
            this.next();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    // 逆向行走（秒针，即上一秒） 
    Hour.prototype.last_second = function () {
        // 调用分钟上一秒方法
        this.minute.last_second();
        // 只需要观察分种是否退位
        if (this.minute.c._value === CarryEnum.BACK) {
            // 先求上一小时
            this.last();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    Hour.prototype.start = function (func) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var that = this;
        setInterval.apply(void 0, __spreadArray([function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            that.next_second();
            func.apply(void 0, params);
        }, 1000], params, false));
    };
    Hour.prototype.print = function () {
        var temp = this._value.toString() + ":" + this.minute._value.toString() + ":" + this.minute.second._value.toString();
        console.log(temp);
    };
    Hour.prototype.get_value = function () {
        var h = this._value.toString();
        if (h.length === 1) {
            h = "0" + h;
        }
        return h + ":" + this.minute.get_value();
    };
    Hour.prototype.get_hour = function () {
        return this._value;
    };
    Hour.prototype.get_minute = function () {
        return this.minute.get_minute();
    };
    Hour.prototype.get_second = function () {
        return this.minute.get_second();
    };
    return Hour;
}();
exports.Hour = Hour;
// 日期计数器 
var Date_ = /** @class */function () {
    function Date_(date) {
        // 初始化为当前日期
        if (date == undefined) {
            var _a = new Date().toString().split(" ")[0].split("/"),
                y = _a[0],
                m = _a[1],
                d = _a[2];
            this.year = parseInt(y);
            this.month = parseInt(m);
            this.day = parseInt(d);
            // 数据校验
            this._d_check();
        }
        // 以字符串初始化指定日期，例如 `2022/05/26`
        else if (typeof date === "string") {
                var _b = date.split("/"),
                    yyyy = _b[0],
                    mm = _b[1],
                    dd = _b[2];
                this.year = parseInt(yyyy);
                this.month = parseInt(mm);
                this.day = parseInt(dd);
                // 数据校验
                this._d_check();
            }
            // 以分别指定的指定年、月、日的形式初始化
            else if (typeof date[0] === "number") {
                    this.year = date[0];
                    this.month = date[1];
                    this.day = date[2];
                    // 数据校验
                    this._d_check();
                } else {
                    this.year = 0;
                    this.month = 0;
                    this.day = 0;
                    var f_param_type = _typeof(date[0]);
                    new ValueError("Type of first param is: " + f_param_type);
                }
    }
    Date_.prototype._d_check = function () {
        if (this.year <= 0) {
            console.log("year = " + this.year);
            new ValueError("Year must be greater than 0.");
        }
        if (this.month <= 0) {
            new ValueError("Month must be greater than 0.");
        }
        if (this.day <= 0) {
            new ValueError("Day must be greater than 0.");
        }
    };
    // 返回当前年份是否是闰年 
    Date_.prototype.is_leap_year = function () {
        if (this.year % 4 === 0) {
            return true;
        } else {
            return false;
        }
    };
    // 下一天（明天），返回一个新的 Date 对象 
    Date_.prototype.next = function () {
        var yearmonth = this.year.toString() + "/" + this.month.toString();
        var days = StaticFuncs.get_days(yearmonth);
        if (this.day < days) {
            var next_day = this.day + 1;
            var next_month = this.month;
            var next_year = this.year;
            return new Date_([next_year, next_month, next_day]);
        } else if (this.day === days) {
            var next_day = "01";
            if (this.month < 1) {
                new ValueError("An impossible year, which is less than 1.");
            } else if (this.month < 12) {
                var next_month = this.month + 1;
                var this_year = this.year;
                return new Date_([this_year, next_month, parseInt(next_day)]);
            } else if (this.month === 12) {
                var next_month = "01";
                var next_year = (this.year + 1).toString();
                return new Date_([parseInt(next_year), parseInt(next_month), parseInt(next_day)]);
            } else {
                new ValueError("An impossible year, which is greater than 12.");
            }
        } else {
            new ValueError("An impossible date, which is greater than the number of days in the month.");
        }
        return new Date_([0, 13, 32]);
    };
    // 上一天（昨天），返回一个新的 Date 对象 
    Date_.prototype.last = function () {
        if (this.day != 1) {
            var last_day = (this.day - 1).toString();
            var last_month = this.month.toString();
            var last_year = this.year.toString();
            return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day)]);
        }
        // this.day === 1
        else {
                if (this.month != 1) {
                    var last_month = (this.month - 1).toString();
                    if (last_month.length === 1) {
                        last_month = '0' + last_month;
                    }
                    var last_year = this.year.toString();
                    var yearmonth = last_year + "/" + last_month;
                    var days = StaticFuncs.get_days(yearmonth);
                    var last_day = days.toString();
                    return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day)]);
                }
                // this.month === 1
                else {
                        var last_month = "12";
                        var last_year = (this.year - 1).toString();
                        var yearmonth = this.year.toString() + "/" + this.month.toString();
                        var days = StaticFuncs.get_days(yearmonth);
                        var last_day = days.toString();
                        return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day)]);
                    }
            }
    };
    // n 天前，返回一个新的 Date 对象 
    Date_.prototype.ndays_ago = function (n) {
        var temp = new Date_([this.year, this.month, this.day]);
        for (var i in (0, utils_1.range)([0, n])) {
            temp = temp.last();
        }
        return temp;
    };
    // n 天后，返回一个新的 Date 对象 
    Date_.prototype.ndays_later = function (n) {
        var temp = new Date_([this.year, this.month, this.day]);
        for (var i in (0, utils_1.range)([0, n])) {
            temp = temp.next();
        }
        return temp;
    };
    // 从当前开始，向后 n-1 个 Date 对象构成一个列表返回 
    Date_.prototype.ndaylist_next = function (n) {
        var today = new Date_([this.year, this.month, this.day]);
        var temp = new utils_1.List();
        for (var i in (0, utils_1.range)(n)) {
            temp.add(today);
            today = today.next();
        }
        return temp;
    };
    // 从当前开始，向前 n-1 个 Date 对象构成一个列表返回 
    Date_.prototype.ndaylist_last = function (n) {
        var today = new Date_([this.year, this.month, this.day]);
        var temp = new utils_1.List();
        for (var i in (0, utils_1.range)(n)) {
            temp.add(today);
            today = today.last();
        }
        return temp;
    };
    Date_.prototype.get_value = function () {
        var m = this.month.toString();
        if (m.length === 1) {
            m = "0" + m;
        }
        var d = this.day.toString();
        if (d.length === 1) {
            d = "0" + d;
        }
        return this.year.toString() + "/" + m + "/" + d;
    };
    Date_.prototype.print = function () {
        var temp = this.year.toString() + "/" + this.month.toString() + "/" + this.day.toString();
        console.log(temp);
        return temp;
    };
    return Date_;
}();
exports.Date_ = Date_;
// 日期时间计数器 
var DateTime = /** @class */function () {
    // 例如字符串 `2022/05/26 20:59:25`
    function DateTime(dtm) {
        var _a = dtm.split(" "),
            d = _a[0],
            t = _a[1];
        this.date = new Date_(d);
        this.time = new Hour(t);
    }
    // 上一秒，可用作秒倒计时器 
    DateTime.prototype.last_second = function () {
        this.time.last_second();
        // 若产生退位
        if (this.time.c._value === CarryEnum.BACK) {
            // 完成从时间到日期的退位
            this.date.last();
            // 清空退位标志
            this.time.c.clear();
        }
    };
    // 下一秒，可用作秒计时器 
    DateTime.prototype.next_second = function () {
        this.time.next_second();
        if (this.time.c._value === CarryEnum.CARRY) {
            this.date.next();
            this.time.c.clear();
        }
    };
    // 上一分钟，可用作分倒计时器 
    DateTime.prototype.last_minute = function () {
        this.time.last_minute();
        if (this.time.c._value === CarryEnum.BACK) {
            this.date.last();
            this.time.c.clear();
        }
    };
    // 下一分钟，可用作分计时器 
    DateTime.prototype.next_minute = function () {
        this.time.next_minute();
        if (this.time.c._value === CarryEnum.CARRY) {
            this.date.next();
            this.time.c.clear();
        }
    };
    // 上一小时，可用作小时倒计时器 
    DateTime.prototype.last_hour = function () {
        this.time.last();
        // 若产生退位
        if (this.time.c._value === CarryEnum.BACK) {
            // 完成从时间到日期的退位
            this.date.last();
            // 清空退位标志
            this.time.c.clear();
        }
    };
    // 下一小时，可用作小时计时器 
    DateTime.prototype.next_hour = function () {
        this.time.next();
        if (this.time.c._value === CarryEnum.CARRY) {
            this.date.next();
            this.time.c.clear();
        }
    };
    DateTime.prototype.last_day = function () {
        this.date.last();
    };
    DateTime.prototype.next_day = function () {
        this.date.next();
    };
    DateTime.prototype.next_month = function () {
        if (this.date.month === 2) {
            if (this.date.is_leap_year()) {
                this.date = this.date.ndays_later(29);
            } else {
                this.date = this.date.ndays_later(28);
            }
        } else if (StaticFuncs.is_big_month(this.date.month)) {
            this.date = this.date.ndays_later(31);
        } else {
            this.date = this.date.ndays_later(30);
        }
    };
    DateTime.prototype.next_year = function () {
        if (this.date.is_leap_year()) {
            if (this.date.year === 2) {
                if (this.date.day === 29) {
                    this.date.day = 28;
                }
            }
        }
        if (this.date.year === 12) {
            this.date.year = 0;
        } else {
            this.date.year = this.date.year + 1;
        }
    };
    DateTime.prototype.start = function (func) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var that = this;
        setInterval.apply(void 0, __spreadArray([function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            that.next_second();
            func.apply(void 0, params);
        }, 1000], params, false));
    };
    DateTime.prototype.print = function () {
        console.log(this.date.get_value() + " " + this.time.get_value());
    };
    DateTime.prototype.get_value = function () {
        return this.date.get_value() + " " + this.time.get_value();
    };
    return DateTime;
}();
exports.DateTime = DateTime;
