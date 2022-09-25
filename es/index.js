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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = exports.Date_ = exports.Hour = exports.Minute = exports.Second = exports.last_day = exports.next_day = exports.get_calendar = exports.datelist = exports.is_big_month = exports.next_month = exports.is_leap_year = exports.get_days = void 0;
var utils_1 = require("./utils");
var ValueError = /** @class */ (function () {
    function ValueError(s) {
        throw "[Valueerror]: " + s;
    }
    return ValueError;
}());
var StaticFuncs = /** @class */ (function () {
    function StaticFuncs() {
    }
    /**
     * 返回某个月的天数
     * @param {string} yearmonth 表示某个月的字符串，形如 `2022/05/26`
     * @returns {number} 指定月份的日期
     */
    StaticFuncs.get_days = function (yearmonth) {
        var _a = yearmonth.split("/"), year = _a[0], month = _a[1];
        var days_map = new Map([[1, 31], [3, 31], [5, 31], [7, 31], [8, 31], [10, 31], [12, 31], [4, 30], [6, 30], [9, 30], [11, 30]]);
        // 闰年
        if (parseInt(year) % 4 != 0) {
            days_map.set(2, 28);
        }
        else {
            days_map.set(2, 29);
        }
        var days = days_map.get(parseInt(month));
        if (typeof (days) === "number") {
            return days;
        }
        else {
            new ValueError("Got a wrong or irregular month.");
        }
    };
    /**
     * 判断某个月是否是大月（31天的月）
     * @param {number} month 月号，如 `12`
     * @returns {boolean} 如果是大月则返回 true
     */
    StaticFuncs.is_big_month = function (month) {
        if (month > 12 || month <= 0) {
            new ValueError("Invalid month.");
        }
        return [1, 3, 5, 7, 8, 10, 12].includes(month) ? true : false;
    };
    /**
     * 判断某年是否是闰年
     * @param {number} year 年号值
     * @returns {boolean} 如果是闰年则返回 true
     */
    StaticFuncs.is_leap_year = function (year) {
        if ((year % 4) === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 返回日历表
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns {string[]}
     */
    StaticFuncs.get_calendar = function (yearmonth) {
        var _a = yearmonth.split("/"), year = _a[0], month = _a[1];
        var days = StaticFuncs.get_days(yearmonth);
        var calendar_list = new utils_1.List();
        (0, utils_1.range)([1, days + 1]).forEach(function (i) {
            var temp_j = i.toString();
            var j;
            if (i.toString().length === 1) {
                j = '0' + temp_j;
            }
            else {
                j = temp_j;
            }
            var aday = year + "/" + month + "/" + j;
            calendar_list.add(aday);
        });
        return calendar_list;
    };
    /**
     * 返回下个月
     * @param year 当前年
     * @param month 当前月
     * @returns {string} 表示下个月的字符串，格式形如 `2022/05/26`
     */
    StaticFuncs.next_month = function (year, month) {
        if (month < 12) {
            return (year.toString() + "/0" + (month + 1).toString());
        }
        else if (month === 12) {
            return (year + 1).toString() + "/" + "01";
        }
        else {
            new ValueError("Month must be less than or equal to 12.");
        }
        return "";
    };
    // 指定起始日期，返回以这两个日期为起止期日的日期段列表 date_begin 或 date_end 的格式如 2022/08/15 
    StaticFuncs.datelist = function (date_begin, date_end) {
        var _a = date_begin.split("/"), year_begin = _a[0], month_begin = _a[1], day_begin = _a[2];
        var _b = date_end.split("/"), year_end = _b[0], month_end = _b[1], day_end = _b[2];
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
    /**
     * 明天
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns
     */
    StaticFuncs.next_day = function (yearmonth) {
        var _a = yearmonth.split("/"), y = _a[0], m = _a[1], d = _a[2];
        var _b = [parseInt(y), parseInt(m), parseInt(d)], year = _b[0], month = _b[1], day = _b[2];
        var days = StaticFuncs.get_days(yearmonth);
        var _zero_fill = function (s) {
            var _ = "";
            if (typeof s === "number") {
                _ = s.toString();
            }
            return (_.length === 1) ? ("0" + s) : s;
        };
        if (day < days) {
            var next_day_1 = day + 1;
            var next_month_1 = month;
            var next_year = year;
            return next_year.toString() + '/' + _zero_fill(next_month_1) + '/' + next_day_1.toString();
        }
        else if (day === days) {
            var next_day_2 = "01";
            if (month < 1) {
                new ValueError("An impossible year, which is less than 1.");
            }
            else if (month < 12) {
                var next_month_2 = (month + 1);
                var this_year = year;
                return this_year.toString() + '/' + _zero_fill(next_month_2) + '/' + next_day_2;
            }
            else if (month === 12) {
                var next_month_3 = "01";
                var next_year = (year + 1).toString();
                return next_year + '/' + next_month_3 + '/' + next_day_2;
            }
            else {
                new ValueError("An impossible year, which is greater than 12.");
            }
        }
        else {
            new ValueError("An impossible date, which is greater than the number of days in the month.");
        }
        return "";
    };
    /**
     * 昨天
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns
     */
    StaticFuncs.last_day = function (yearmonth) {
        var _a = yearmonth.split("/"), y = _a[0], m = _a[1], d = _a[2];
        var _b = [parseInt(y), parseInt(m), parseInt(d)], year = _b[0], month = _b[1], day = _b[2];
        // day != 1
        if (day != 1) {
            var last_day_1 = (day - 1).toString();
            var last_month = month.toString();
            var this_year = year.toString();
            return this_year + '/' + last_month + '/' + last_day_1;
        }
        // day === 1
        else {
            if (month != 1) {
                var last_month = (month - 1).toString();
                if (last_month.length === 1) {
                    last_month = '0' + last_month;
                }
                var last_year = year.toString();
                var yearmonth_1 = last_year + "/" + last_month;
                var days = StaticFuncs.get_days(yearmonth_1);
                var last_day_2 = days.toString();
                return last_year + '/' + last_month + '/' + last_day_2;
            }
            // month === 1
            else {
                var last_month = "12";
                var last_year = (year - 1).toString();
                var yearmonth_2 = year.toString() + "/" + month.toString();
                var days = StaticFuncs.get_days(yearmonth_2);
                var last_day_3 = days.toString();
                return last_year + '/' + last_month + '/' + last_day_3;
            }
        }
    };
    return StaticFuncs;
}());
/**进位器状态枚举 */
var CarryEnum;
(function (CarryEnum) {
    CarryEnum[CarryEnum["CARRY"] = 1] = "CARRY";
    CarryEnum[CarryEnum["NONE"] = 0] = "NONE";
    CarryEnum[CarryEnum["BACK"] = 2] = "BACK"; // 有退位
})(CarryEnum || (CarryEnum = {}));
// 进位器 
var Carry = /** @class */ (function () {
    function Carry(b) {
        if (b === void 0) { b = undefined; }
        if (b == undefined) {
            this._value = CarryEnum.NONE;
        }
        else {
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
}());
//秒计数器
var Second = /** @class */ (function () {
    /**
     * @param s 初始秒数，范围为 0~59
     */
    function Second(s) {
        if (s === void 0) { s = 0; }
        this._value = 0;
        this.c = new Carry();
        this.c.clear();
        if (s < 0) {
            new ValueError("Seconds must be greater than or equal to 0.");
        }
        else if (s > 59) {
            new ValueError("Seconds must be less than or equal to 59.");
        }
        this._value = parseInt(s.toString());
    }
    /**
     * 拨到下一秒
     */
    Second.prototype.to_next = function () {
        // 已达 59
        if (this._value >= 59) {
            this._value = 0; // 置空
            this.c.set(); // 标志进位
        }
        else {
            this._value = this._value + 1;
        }
    };
    /**拨到上一秒 */
    Second.prototype.to_last = function () {
        // 已到 0
        if (this._value <= 0) {
            this._value = 59; // 置满
            this.c.set_back(); // 标志退位
        }
        else {
            this._value = this._value - 1;
        }
    };
    /**
     * 开始计时
     * @param func 回调函数
     * @param params 回调函数的参数
     */
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
                that.to_next();
                func.apply(void 0, params);
            }, 1000], params, false));
    };
    /**打印秒计数值 */
    Second.prototype.print = function () {
        var s = this._value.toString();
        if (s.length === 1) {
            s = "0" + s;
        }
        console.log(s);
    };
    Object.defineProperty(Second.prototype, "seconds", {
        get: function () {
            return this._value;
        },
        set: function (seconds) {
            this._value = seconds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Second.prototype, "value", {
        get: function () {
            var s = this._value.toString();
            if (s.length === 1) {
                s = "0" + s;
            }
            return s;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取字符串格式的当前秒技术值
     * @returns 被自动补 '0' 的字符串
     * @deprecated since v1.0.4, use getter value() instead.
     */
    Second.prototype.get_value = function () {
        var s = this._value.toString();
        if (s.length === 1) {
            s = "0" + s;
        }
        return s;
    };
    return Second;
}());
exports.Second = Second;
/**分计数器 */
var Minute = /** @class */ (function () {
    /**
     * @param {number} m 分值
     * @param {number} s 秒值
     */
    function Minute(m, s) {
        if (m === void 0) { m = 0; }
        if (s === void 0) { s = 0; }
        this._value = 0; // 分针位
        // 初始化分进退位标志引用对象
        this.c = new Carry();
        this.c.clear();
        // 初始值校验
        if (m < 0) {
            new ValueError("Minutes must be greater than or equal to 0.");
        }
        else if (m > 59) {
            new ValueError("Minutes must be less than or equal to 59.");
        }
        // 初始化秒位引用对象
        this._second = new Second(s);
        // 设置分初值
        this._value = m;
    }
    /**
     * 正向行走（分针，即下一分钟）
     */
    Minute.prototype.next = function () {
        // 已达 59
        if (this._value >= 59) {
            this._value = 0; // 置空
            this.c.set(); // 标志进位
        }
        else {
            this._value = this._value + 1;
        }
    };
    /**
     * 逆向行走（分针，即上一分钟）
     */
    Minute.prototype.last = function () {
        // 已到 0
        if (this._value <= 0) {
            this._value = 59; // 置满
            this.c.set_back(); // 标志退位
        }
        else {
            this._value = this._value - 1;
        }
    };
    /**
     * 正向行走（秒针，即下一秒）
     */
    Minute.prototype.next_second = function () {
        // 直接调用 Second 类的下一秒
        this._second.to_next();
        // 判断进位
        if (this._second.c.get_state() === CarryEnum.CARRY) {
            // 先完成进位
            this.next();
            // 再将进位标志清空
            this._second.c.clear();
        }
    };
    /**
     * 逆向行走（秒针，即上一秒）
     */
    Minute.prototype.last_second = function () {
        // 直接调用 Second 类的上一秒
        this._second.to_last();
        // 判断退位
        if (this._second.c.get_state() === CarryEnum.BACK) {
            // 先完成退位
            this.last();
            // 再将进位标志清空
            this._second.c.clear();
        }
    };
    Object.defineProperty(Minute.prototype, "seconds", {
        /**
         * 获取秒
         * @since v1.0.4
         */
        get: function () {
            return this._second.seconds;
        },
        /**
         * 设置秒
         * @param {number} seconds Number of seconds.
         * @since v1.0.4
         */
        set: function (seconds) {
            this._second.seconds = seconds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Minute.prototype, "minutes", {
        /**
         * 获取分
         * @since v1.0.4
         */
        get: function () {
            return this._value;
        },
        /**
         * 设置分
         * @param {number} seconds Number of minutes.
         * @since v1.0.4
         */
        set: function (minutes) {
            this._value = minutes;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 打印当前的分计数值
     */
    Minute.prototype.print = function () {
        var m = this._value.toString();
        if (m.length === 1) {
            m = "0" + m;
        }
        var s = this._second.value.toString();
        if (s.length === 1) {
            s = "0" + s;
        }
        console.log(m + ":" + s);
    };
    /**
     * 输出当前的分计数值
     * @returns 被自动补零的 `分:秒` 字符串
     * @deprecated use getter value() instead.
     */
    Minute.prototype.get_value = function () {
        var m = this._value.toString();
        var s = this._second.value.toString();
        if (m.length === 1) {
            m = "0" + m;
        }
        if (s.length === 1) {
            s = "0" + s;
        }
        return m + ":" + s;
    };
    Object.defineProperty(Minute.prototype, "value", {
        /**
         * 输出当前的分计数值
         * @returns 被自动补零的 `分:秒` 字符串
         */
        get: function () {
            var m = this._value.toString();
            var s = this._second.value.toString();
            if (m.length === 1) {
                m = "0" + m;
            }
            if (s.length === 1) {
                s = "0" + s;
            }
            return m + ":" + s;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 返回分数值
     * @deprecated since v1.0.4
     */
    Minute.prototype.get_minute = function () {
        return this._value;
    };
    Object.defineProperty(Minute.prototype, "minute", {
        get: function () {
            return this._value;
        },
        set: function (minute) {
            this._value = minute;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 返回秒数值
     * @deprecated since v1.0.4
     */
    Minute.prototype.get_second = function () {
        return parseInt(this._second.get_value());
    };
    Object.defineProperty(Minute.prototype, "second", {
        get: function () {
            return this._value;
        },
        set: function (second) {
            this._second.seconds = second;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 开始计时
     * @param func 秒级回调
     * @param params 回调函数的参数
     */
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
}());
exports.Minute = Minute;
/**时计数器 */
var Hour = /** @class */ (function () {
    function Hour(time) {
        if (time === void 0) { time = []; }
        this._value = 0; // 时针位
        this.c = new Carry(); // 进位
        // 初始化分进退位标志引用对象
        this.c.clear();
        // 使用当前的系统时间进行初始化
        if (time instanceof Array && time.length === 0) {
            var _dt = new Date();
            // 初始化秒位引用对象
            this.minute = new Minute(_dt.getMinutes(), _dt.getSeconds());
            // 设置小时初值
            this._value = _dt.getHours();
        }
        // 通过字符串表示的时间初始化，字符串形如 20:30:00
        else if (typeof time == "string") {
            var _a = time.split(":"), hours = _a[0], minutes = _a[1], seconds = _a[2];
            // 初始化秒位引用对象
            this.minute = new Minute(parseInt(minutes), parseInt(seconds));
            // 设置小时初值
            this._value = parseInt(hours);
        }
        // 指定具体时间进行初始化：分别指定时、分、秒
        else if (typeof time[0] == "number") {
            var hours = time[0], minutes = time[1], seconds = time[2];
            // 初始值校验
            if (hours < 0) {
                new ValueError("Hours must be greater than or equal to 0.");
            }
            else if (hours > 59) {
                new ValueError("Hours must be less than or equal to 59.");
            }
            // 初始化秒位引用对象
            this.minute = new Minute(minutes, seconds);
            // 设置小时初值
            this._value = hours;
        }
        else {
            this.minute = new Minute(0, 0);
            var f_param_type = typeof time[0];
            new ValueError("Type of first param is: " + f_param_type);
        }
    }
    Hour.prototype._zero_fill = function (s) {
        var _ = "";
        if (typeof s === "number") {
            _ = s.toString();
        }
        return (_.length === 1) ? ("0" + s) : s;
    };
    /**拨到上一秒 */
    Hour.prototype.to_last_second = function () {
        // 调用分钟上一秒方法
        this.minute.last_second();
        // 只需要观察分种是否退位
        if (this.minute.c._value === CarryEnum.BACK) {
            // 先求上一小时
            this.to_last();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    /**拨到下一秒 */
    Hour.prototype.to_next_second = function () {
        // 掉用分的下一秒方法
        this.minute.next_second();
        // 只需要观察分种是否进位
        if (this.minute.c._value === CarryEnum.CARRY) {
            // 先进位到小时，即求下一小时
            this.to_next();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    /** 拨到上一分钟 */
    Hour.prototype.to_last_minute = function () {
        // 掉用分的上一分钟方法
        this.minute.last();
        // 只需要观察分种是否退位
        if (this.minute.c._value === CarryEnum.BACK) {
            // 先求上一小时
            this.to_last();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    /** 拨到下一分钟 */
    Hour.prototype.to_next_minute = function () {
        // 掉用分的下一分钟方法
        this.minute.next();
        // 只需要观察分种是否进位
        if (this.minute.c._value === CarryEnum.CARRY) {
            // 先进位到小时，即求下一小时
            this.to_next();
            // 再清空分钟的进位标志
            this.minute.c.clear();
        }
    };
    /**
     * 拨到上一小时
     */
    Hour.prototype.to_last = function () {
        // 已到 0
        if (this._value <= 0) {
            this._value = 59; // 置满
            this.c.set_back(); // 标志退位
        }
        else {
            this._value = this._value - 1;
        }
    };
    /** 拨到下一小时 */
    Hour.prototype.to_next = function () {
        // 已达 59
        if (this._value >= 59) {
            this._value = 0; // 置空
            this.c.set(); // 标志进位
        }
        else {
            this._value = this._value + 1;
        }
    };
    /**设定为本地时间 */
    Hour.prototype.set_locale_time = function () {
        var _a = Date().toString().split(" ")[4].split(":"), h = _a[0], m = _a[1], s = _a[2];
        this._value = parseInt(h);
        this.minute.minutes = parseInt(m);
        this.minute.seconds = parseInt(s);
    };
    /**
     * 开始计时
     * @param func 秒级回调
     * @param params 回调的参数
     */
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
                that.to_next_second();
                func.apply(void 0, params);
            }, 1000], params, false));
    };
    Object.defineProperty(Hour.prototype, "seconds", {
        get: function () {
            return this.minute.seconds;
        },
        set: function (seconds) {
            this.minute.seconds = seconds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hour.prototype, "minutes", {
        get: function () {
            return this.minute.minutes;
        },
        set: function (minutes) {
            this.minute.minutes = minutes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hour.prototype, "hours", {
        get: function () {
            return this._value;
        },
        set: function (hours) {
            this._value = hours;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 打印当前的小时值
     */
    Hour.prototype.print = function () {
        var temp = this._zero_fill(this._value) + ":" + this.minute.value;
        console.log(temp);
    };
    /**
     * 返回当前的小时值字符串
     * @returns 被自动补 0 的 `小时:分钟:秒` 字符串
     * @deprecated since v1.0.5 use getter value() instead.
     */
    Hour.prototype.get_value = function () {
        return this._zero_fill(this._value) + ":" + this.minute.value;
    };
    Object.defineProperty(Hour.prototype, "value", {
        /**
         * 返回当前的小时值字符串
         * @since v1.0.5
         */
        get: function () {
            var h = (this._value).toString();
            if (h.length === 1) {
                h = "0" + h;
            }
            return h + ":" + this.minute.value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取小时的数字值
     * @returns 表示当前计数小时的数值
     */
    Hour.prototype.get_hour = function () {
        return this._value;
    };
    /**
     * 获取分钟的数字值
     * @returns 表示当前计数分钟的数值
     */
    Hour.prototype.get_minute = function () {
        return this.minute.get_minute();
    };
    /**
     * 获取秒的数字值
     * @returns 表示当前计数秒的数值
     */
    Hour.prototype.get_second = function () {
        return this.minute.get_second();
    };
    return Hour;
}());
exports.Hour = Hour;
/**日期计数器  */
var Date_ = /** @class */ (function () {
    function Date_(param) {
        if (param === void 0) { param = []; }
        // 初始化为当前日期
        if (param instanceof Array && param.length === 0) {
            var _dt = new Date();
            this._year = _dt.getFullYear();
            this._month = _dt.getMonth();
            this._day = _dt.getDate();
            // 数据校验
            this._d_check();
        }
        // 以字符串初始化指定日期，例如 `2022/05/26`
        else if (typeof param === "string") {
            var _a = param.split("/"), yyyy = _a[0], mm = _a[1], dd = _a[2];
            this._year = parseInt(yyyy);
            this._month = parseInt(mm);
            this._day = parseInt(dd);
            this._d_check();
        }
        else if (typeof param[0] === "string" && param.length === 1) {
            var _b = param[0].split("/"), yyyy = _b[0], mm = _b[1], dd = _b[2];
            this._year = parseInt(yyyy);
            this._month = parseInt(mm);
            this._day = parseInt(dd);
            this._d_check();
        }
        // 以分别指定的指定年、月、日的形式初始化
        else if (typeof param[0] === "number" &&
            typeof param[1] === "number" &&
            typeof param[2] === "number" &&
            param.length === 3) {
            this._year = param[0];
            this._month = param[1];
            this._day = param[2];
            this._d_check();
        }
        else {
            this._year = 0;
            this._month = 0;
            this._day = 0;
            var f_param_type = typeof param[0];
            new ValueError("Type of first param is: " + f_param_type);
        }
    }
    Date_.prototype._d_check = function () {
        if (this.year <= 0) {
            console.log("year = " + this.year);
            new ValueError("Year must be greater than 0.");
        }
        if (this._month <= 0) {
            new ValueError("Month must be greater than 0.");
        }
        if (this._day <= 0) {
            new ValueError("Day must be greater than 0.");
        }
    };
    Date_.prototype._zero_fill = function (s) {
        var _ = "";
        if (typeof s === "number") {
            _ = s.toString();
        }
        return (_.length === 1) ? ("0" + s) : s;
    };
    /**
     * 返回当前年份是否是闰年
     * @returns 一个表示是否是闰年的布尔值
     */
    Date_.prototype.is_leap_year = function () {
        if ((this.year % 4) === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(Date_.prototype, "next", {
        /**
         * 返回后一天对应的新 Date_ 对象
         * @returns {Date_} 一个新的 Date_ 对象
         */
        get: function () {
            var yearmonth = this.year.toString() + "/" + this.month.toString();
            var days = StaticFuncs.get_days(yearmonth);
            if (this.day < days) {
                var next_day_3 = this.day + 1;
                var next_month_4 = this.month;
                var next_year = this.year;
                return new Date_([next_year, next_month_4, next_day_3]);
            }
            else if (this.day === days) {
                var next_day_4 = "01";
                if (this.month < 1) {
                    new ValueError("An impossible year, which is less than 1.");
                }
                else if (this.month < 12) {
                    var next_month_5 = (this.month + 1);
                    var this_year = this.year;
                    return new Date_([this_year, next_month_5, parseInt(next_day_4)]);
                }
                else if (this.month === 12) {
                    var next_month_6 = "01";
                    var next_year = (this.year + 1).toString();
                    return new Date_([parseInt(next_year), parseInt(next_month_6), parseInt(next_day_4)]);
                }
                else {
                    new ValueError("An impossible year, which is greater than 12.");
                }
            }
            else {
                new ValueError("An impossible date, which is greater than the number of days in the month.");
            }
            return new Date_([0, 13, 32]);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 时间拨到明天
     * @since v_1.0.5
     */
    Date_.prototype.to_next = function () {
        var yearmonth = this.year.toString() + "/" + this.month.toString();
        var days = StaticFuncs.get_days(yearmonth);
        if (this.day < days) {
            this._day = this.day + 1;
            this._month = this.month;
            this._year = this.year;
        }
        else if (this.day === days) {
            if (this.month < 1) {
                new ValueError("An impossible year, which is less than 1.");
            }
            else if (this._month < 12) {
                this._month = (this._month + 1);
                this._day = 1;
            }
            else if (this.month === 12) {
                this._year = this.year + 1;
                this._month = 1;
                this._day = 1;
            }
            else {
                new ValueError("An impossible year, which is greater than 12.");
            }
        }
        else {
            new ValueError("An impossible date, which is greater than the number of days in the month.");
        }
    };
    Object.defineProperty(Date_.prototype, "last", {
        /**
         * 返回前一天对应的新 Date_ 对象
         * @returns {Date_} 一个新的 Date_ 对象
         */
        get: function () {
            if (this.day != 1) {
                var last_day_4 = (this.day - 1).toString();
                var last_month = this.month.toString();
                var last_year = this.year.toString();
                return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day_4)]);
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
                    var last_day_5 = days.toString();
                    return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day_5)]);
                }
                // this.month === 1
                else {
                    var last_month = "12";
                    var last_year = (this.year - 1).toString();
                    var yearmonth = this.year.toString() + "/" + this.month.toString();
                    var days = StaticFuncs.get_days(yearmonth);
                    var last_day_6 = days.toString();
                    return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day_6)]);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 时间拨到昨天
     * @since v_1.0.5
     */
    Date_.prototype.to_last = function () {
        if (this.day != 1) {
            this._day = this.day - 1;
            this._month = this.month;
            this._year = this.year;
        }
        // this.day === 1
        else {
            if (this.month != 1) {
                var last_month = (this.month - 1).toString();
                if (last_month.length === 1) {
                    last_month = '0' + last_month;
                }
                var last_year = this.year;
                var yearmonth = last_year + "/" + last_month;
                var days = StaticFuncs.get_days(yearmonth);
                var last_day_7 = days;
                this._year = last_year;
                this.month = parseInt(last_month);
                this._day = last_day_7;
            }
            // this.month === 1
            else {
                var last_month = "12";
                var last_year = this.year - 1;
                var yearmonth = this.year.toString() + "/" + this.month.toString();
                var days = StaticFuncs.get_days(yearmonth);
                var last_day_8 = days;
                this._year = last_year;
                this.month = parseInt(last_month);
                this._day = last_day_8;
            }
        }
    };
    /**
     * n 天前
     * @param {number} n 天数
     * @returns 一个新的 Date_ 对象
     */
    Date_.prototype.ndays_ago = function (n) {
        var temp = new Date_([this.year, this.month, this.day]);
        for (var i in (0, utils_1.range)([0, n])) {
            temp = temp.last;
        }
        return temp;
    };
    /**
     * n 天后
     * @param {number} n 天数
     * @returns {Date_} 一个新的 Date_ 对象
     */
    Date_.prototype.ndays_later = function (n) {
        var temp = new Date_([this.year, this.month, this.day]);
        for (var i in (0, utils_1.range)([0, n])) {
            temp = temp.next;
        }
        return temp;
    };
    /**
     * 从当前开始，向后 n-1 个 Date_ 对象构成一个列表返回
     * @param {number} n 天数
     * @returns {Date_[]} n 天的 Date_ 对象 所构成的一个列表
     */
    Date_.prototype.ndaylist_next = function (n) {
        var today = new Date_([this.year, this.month, this.day]);
        var temp = new utils_1.List();
        for (var i in (0, utils_1.range)(n)) {
            temp.add(today);
            today = today.next;
        }
        return temp;
    };
    /**
     * 从当前开始，向前 n-1 个 Date_ 对象构成一个列表返回
     * @param {number} n 天数
     * @returns {Date_[]} n 天的 Date_ 对象 所构成的一个列表
     */
    Date_.prototype.ndaylist_last = function (n) {
        var today = new Date_([this.year, this.month, this.day]);
        var temp = new utils_1.List();
        for (var i in (0, utils_1.range)(n)) {
            temp.add(today);
            today = today.last;
        }
        return temp;
    };
    Object.defineProperty(Date_.prototype, "year", {
        /**
         * 获取 年
         * @since v1.0.4
         */
        get: function () {
            return this._year;
        },
        /**
         * 设置 年
         * @since v1.0.4
         */
        set: function (year) {
            this._year = year;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Date_.prototype, "month", {
        /**
         * 获取 月
         * @since v1.0.4
         */
        get: function () {
            return this._month;
        },
        /**
         * 设置 月
         * @since v1.0.4
         */
        set: function (month) {
            this._month = month;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Date_.prototype, "day", {
        /**
         * 获取 日
         * @since v1.0.4
         */
        get: function () {
            return this._day;
        },
        /**
         * 设置 日
         * @since v1.0.4
         */
        set: function (day) {
            this._day = day;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Date_.prototype, "value", {
        /**
         * 获取日期字符串
         * @since v1.0.4
         */
        get: function () {
            var m = this.month.toString();
            if (m.length === 1) {
                m = "0" + m;
            }
            var d = this.day.toString();
            if (d.length === 1) {
                d = "0" + d;
            }
            return this.year.toString() + "/" + m + "/" + d;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取日期字符串
     * @returns {string} 自动补 0 的日期字符串，例如 `2022/09/23`
     * @deprecated since v1.03, please use getter value() instead
     */
    Date_.prototype.get_value = function () {
        return this.year.toString() + "/" + this._zero_fill(this._month) + "/" + this._zero_fill(this._day);
    };
    /**打印日期字符串 */
    Date_.prototype.print = function () {
        var temp = this.year.toString() + "/" + this._zero_fill(this._month) + "/" + this._zero_fill(this._day);
        console.log(temp);
    };
    return Date_;
}());
exports.Date_ = Date_;
/**
 * 日期时间计数器
 */
var DateTime = /** @class */ (function () {
    function DateTime(param) {
        if (param === void 0) { param = []; }
        if (param instanceof Array && param.length === 0) {
            this.date = new Date_([]);
            this.time = new Hour([]);
        }
        else if (typeof param === "string") {
            var _a = param.split(" "), d = _a[0], t = _a[1];
            this.date = new Date_(d);
            this.time = new Hour(t);
        }
        else if (true) {
            this.date = param[0];
            this.time = param[1];
        }
    }
    /**
     * 上一秒，就地修改
     */
    DateTime.prototype.to_last_second = function () {
        this.time.to_last_second();
        // 若产生退位
        if (this.time.c._value === CarryEnum.BACK) {
            // 完成从时间到日期的退位
            this.date.to_last();
            // 清空退位标志
            this.time.c.clear();
        }
    };
    /**
     * 拨到下一秒，就地修改
     */
    DateTime.prototype.to_next_second = function () {
        this.time.to_next_second();
        if (this.time.c._value === CarryEnum.CARRY) {
            this.date.to_next();
            this.time.c.clear();
        }
    };
    /**
     * 上一分钟，就地修改
     */
    DateTime.prototype.to_last_minute = function () {
        this.time.to_last_minute();
        if (this.time.c._value === CarryEnum.BACK) {
            this.date.to_last();
            this.time.c.clear();
        }
    };
    /**
     * 下一分钟，就地修改
     */
    DateTime.prototype.to_next_minute = function () {
        this.time.to_next_minute();
        if (this.time.c._value === CarryEnum.CARRY) {
            this.date.to_next();
            this.time.c.clear();
        }
    };
    /**
     * 上一小时，就地修改
     */
    DateTime.prototype.to_last_hour = function () {
        this.time.to_last();
        // 若产生退位
        if (this.time.c._value === CarryEnum.BACK) {
            // 完成从时间到日期的退位
            this.date.to_last();
            // 清空退位标志
            this.time.c.clear();
        }
    };
    /**
     * 下一小时，就地修改
     */
    DateTime.prototype.to_next_hour = function () {
        this.time.to_next();
        if (this.time.c._value === CarryEnum.CARRY) {
            this.date.to_next();
            this.time.c.clear();
        }
    };
    /** 昨天，就地修改 */
    DateTime.prototype.to_last_day = function () {
        this.date.to_last();
    };
    Object.defineProperty(DateTime.prototype, "last", {
        /** 返回对应于昨天的 DateTime 对象 */
        get: function () {
            return new DateTime([this.date.last, this.time]);
        },
        enumerable: false,
        configurable: true
    });
    /** 明天，就地修改 */
    DateTime.prototype.to_next_day = function () {
        this.date.to_next();
    };
    Object.defineProperty(DateTime.prototype, "next", {
        /** 返回对应于明天的 DateTime 对象 */
        get: function () {
            return new DateTime([this.date.next, this.time]);
        },
        enumerable: false,
        configurable: true
    });
    /**下月，就地修改 */
    DateTime.prototype.to_next_month = function () {
        if (this.date.month === 2) {
            if (this.date.is_leap_year()) {
                this.date = this.date.ndays_later(29);
            }
            else {
                this.date = this.date.ndays_later(28);
            }
        }
        else if (StaticFuncs.is_big_month(this.date.month)) {
            this.date = this.date.ndays_later(31);
        }
        else {
            this.date = this.date.ndays_later(30);
        }
    };
    /**明年，就地修改 */
    DateTime.prototype.to_next_year = function () {
        if (this.date.is_leap_year()) {
            if (this.date.year === 2) {
                if (this.date.day === 29) {
                    this.date.day = 28;
                }
            }
        }
        if (this.date.year === 12) {
            this.date.year = 0;
        }
        else {
            this.date.year = this.date.year + 1;
        }
    };
    /**
     * 开启计时
     * @param func 秒级回调
     * @param params 回调的参数
     */
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
                that.to_next_second();
                func.apply(void 0, params);
            }, 1000], params, false));
    };
    /**打印日期时间 */
    DateTime.prototype.print = function () {
        console.log(this.date.get_value() + " " + this.time.get_value());
    };
    /**返回日期时间 */
    DateTime.prototype.get_value = function () {
        return this.date.get_value() + " " + this.time.get_value();
    };
    return DateTime;
}());
exports.DateTime = DateTime;
var get_days = StaticFuncs.get_days;
exports.get_days = get_days;
var is_leap_year = StaticFuncs.is_leap_year;
exports.is_leap_year = is_leap_year;
var is_big_month = StaticFuncs.is_big_month;
exports.is_big_month = is_big_month;
var get_calendar = StaticFuncs.get_calendar;
exports.get_calendar = get_calendar;
var datelist = StaticFuncs.datelist;
exports.datelist = datelist;
var next_month = StaticFuncs.next_month;
exports.next_month = next_month;
var next_day = StaticFuncs.next_day;
exports.next_day = next_day;
var last_day = StaticFuncs.last_day;
exports.last_day = last_day;
// /* 测试 get_days 函数功能 */
// for (let i = 1; i <= 12; i++) {
//     let days = get_days(`2022/${i}`);
//     console.log(i<10?`2022/0${i} 有 ${days} 天`:`2022/${i} 有 ${days} 天`);
// } 
// /* 测试 is_leap_year 函数功能 */
// [1999,2000,2001,2020,2021,2022,3000].forEach(year => {
//     let word = is_leap_year(year)?"润":"平";
//     console.log(`${year} 年是${word}年`);
// });
// /* 测试 is_big_month 函数功能 */
// for (let i = 1; i <= 12; i++) {
//     let isBigMonth = is_big_month(i);
//     console.log(`${i}月是`+(isBigMonth?`大月`:`小月`));
// } 
// /* 测试 get_calendar 函数功能 */
// let calendar = get_calendar("2022/02");
// console.log(calendar);
// /* 测试 datelist 函数功能 */
// let list = datelist("2022/01/29","2022/04/06")
// console.log(list);
// /* 测试 next_month 函数功能 */
// let nextmonth = next_month(2021,12);
// console.log(nextmonth);
// /* 测试 next_day 函数功能 */
// let nextday = next_day("2020/02/29");
// console.log(nextday);
// /* 测试 last_day 函数功能 */
// let lastday = last_day("2020/03/01");
// console.log(lastday);
/* 测试 Second 对象 */
// let s = new Second(59);
// s.print();
// s.next();
// s.print();
// let s = new Second(0);
// s.print();
// s.last();
// s.print();
// let s = new Second(59);
// s.start(()=>{
//     s.print()
// },s)
/* 测试 Minute 对象 */
// let m = new Minute();
// m.print();
// let m = new Minute(29,59);
// m.print();
// let m = new Minute(58,0);
// m.print();
// m.next();
// m.print();
// m.next();
// m.print();
// let m = new Minute(0,0);
// m.print();
// m.last();
// m.print();
// let m = new Minute(17,46);
// console.log(m.get_minute());
// let m = new Minute(17,46);
// m.start(()=>{
//     m.print()
// },m)
/* 测试 Hour 对象 */
// let h = new Hour([]);
// h.print();
// let h = new Hour("21:25:00");
// h.print();
// let h = new Hour([1, 30, 0]);
// h.print();
// let h = new Hour("00:00:00");
// h.to_last_second();
// h.print();
// let h = new Hour("59:59:59");
// h.to_next_second();
// h.print();
// let h = new Hour("00:00:00");
// h.to_last_minute();
// h.print();
// let h = new Hour("00:00:00");
// h.to_last();
// h.print();
// let h = new Hour("59:00:00");
// h.set_locale_time();
// h.print();
// let h = new Hour("00:00:00");
// h.start(()=>{
//     h.print()
// },h)
/* 测试 Date_ 对象 */
// let d = new Date_("2021/01/01");
// let nAgo = d.ndays_later(59);
// nAgo.print();
// console.log(d.is_leap_year());
// let d = new Date_("2020/03/6");
// let nLextLast = d.ndaylist_last(9);
// console.log(nLextLast);
// let d = new Date_("2021/12/31");
// d.to_next();
// d.next().print();
// d.print();
/* 测试 DateTime 对象 */
// let dt = new DateTime("2022/05/26 20:59:25");
// dt.print();
// let dt = new DateTime("2022/05/26 20:59:25");
// let dt = new DateTime([])
// dt.print();
// 拨到上一秒
// let dt = new DateTime("2022/01/01 00:00:00");
// dt.to_last_second();
// dt.print()
// 拨到下一秒
// let dt = new DateTime("2021/12/31 59:59:59");
// dt.to_next_second();
// dt.print();
// 拨到上一分钟
// let dt = new DateTime("2022/01/01 00:00:00");
// dt.to_last_minute();
// dt.print();
// 拨到下一分钟
// let dt = new DateTime("2021/12/31 59:59:00");
// dt.to_next_minute();
// dt.print();
// 拨到上一小时
// let dt = new DateTime("2022/01/01 00:00:00");
// dt.to_last_hour();
// dt.print();
// 拨到下一小时
// let dt = new DateTime("2021/12/31 59:00:00");
// dt.to_next_hour();
// dt.print();
// 拨到上一天
// let dt = new DateTime("2020/01/01 00:00:00");
// dt.to_last_day();
// dt.print();
// 拨到下一天
// let dt = new DateTime("2020/02/29 01:02:03");
// dt.to_next_day();
// dt.print();
// 拨到下个月的这个时候
// let dt = new DateTime("2020/01/31 12:06:00");
// dt.to_next_month();
// dt.print();
// 拨到下一年的这个时候
// let dt = new DateTime("2020/01/31 12:06:00");
// dt.to_next_year();
// dt.print();
// 测试 start
// let dt = new DateTime("2020/01/01 00:00:00");
// dt.start(()=>{
//     dt.print()
// },dt)
