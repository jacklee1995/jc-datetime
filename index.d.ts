/*****************************************************************************
 Mouule: jcstudio.datetime
 Author: jclee95
 Chinese name: 李俊才
 Email: 291148484@163.com
 Author blog: https://blog.csdn.net/qq_28550263?spm=1001.2101.3001.5343
 Copyright Jack Lee. All rights reserved.
 Licensed under the MIT License.
*****************************************************************************/
import { List } from "./utils";
declare class StaticFuncs {
    /**
     * 返回某个月的天数
     * @param {string} yearmonth 表示某个月的字符串，形如 `2022/05/26`
     * @returns {number} 指定月份的日期
     */
    static get_days(yearmonth: string): number | undefined;
    /**
     * 判断某个月是否是大月（31天的月）
     * @param {number} month 月号，如 `12`
     * @returns {boolean} 如果是大月则返回 true
     */
    static is_big_month(month: number): boolean;
    /**
     * 判断某年是否是闰年
     * @param {number} year 年号值
     * @returns {boolean} 如果是闰年则返回 true
     */
    static is_leap_year(year: number): boolean;
    /**
     * 返回日历表
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns {string[]}
     */
    static get_calendar(yearmonth: string): string[];
    /**
     * 返回下个月
     * @param year 当前年
     * @param month 当前月
     * @returns {string} 表示下个月的字符串，格式形如 `2022/05/26`
     */
    static next_month(year: number, month: number): string;
    static datelist(date_begin: string, date_end: string): List;
    /**
     * 明天
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns
     */
    static next_day(yearmonth: string): string;
    /**
     * 昨天
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns
     */
    static last_day(yearmonth: string): string;
}
/**进位器状态枚举 */
declare enum CarryEnum {
    CARRY = 1,
    NONE = 0,
    BACK = 2
}
declare class Carry {
    _value: any;
    constructor(b?: CarryEnum | undefined);
    set(): void;
    set_back(): void;
    clear(): void;
    get_state(): number;
}
declare class Second {
    private _value;
    c: Carry;
    /**
     * @param s 初始秒数，范围为 0~59
     */
    constructor(s?: number);
    /**
     * 拨到下一秒
     */
    to_next(): void;
    /**拨到上一秒 */
    to_last(): void;
    /**
     * 开始计时
     * @param func 回调函数
     * @param params 回调函数的参数
     */
    start(func: Function, ...params: any[]): void;
    /**打印秒计数值 */
    print(): void;
    set seconds(seconds: number);
    get seconds(): number;
    get value(): string;
    /**
     * 获取字符串格式的当前秒技术值
     * @returns 被自动补 '0' 的字符串
     * @deprecated since v1.0.4, use getter value() instead.
     */
    get_value(): string;
}
/**分计数器 */
declare class Minute {
    private _value;
    c: Carry;
    private _second;
    /**
     * @param {number} m 分值
     * @param {number} s 秒值
     */
    constructor(m?: number, s?: number);
    /**
     * 正向行走（分针，即下一分钟）
     */
    next(): void;
    /**
     * 逆向行走（分针，即上一分钟）
     */
    last(): void;
    /**
     * 正向行走（秒针，即下一秒）
     */
    next_second(): void;
    /**
     * 逆向行走（秒针，即上一秒）
     */
    last_second(): void;
    /**
     * 设置秒
     * @param {number} seconds Number of seconds.
     * @since v1.0.4
     */
    set seconds(seconds: number);
    /**
     * 获取秒
     * @since v1.0.4
     */
    get seconds(): number;
    /**
     * 设置分
     * @param {number} seconds Number of minutes.
     * @since v1.0.4
     */
    set minutes(minutes: number);
    /**
     * 获取分
     * @since v1.0.4
     */
    get minutes(): number;
    /**
     * 打印当前的分计数值
     */
    print(): void;
    /**
     * 输出当前的分计数值
     * @returns 被自动补零的 `分:秒` 字符串
     * @deprecated use getter value() instead.
     */
    get_value(): string;
    /**
     * 输出当前的分计数值
     * @returns 被自动补零的 `分:秒` 字符串
     */
    get value(): string;
    /**
     * 返回分数值
     * @deprecated since v1.0.4
     */
    get_minute(): number;
    get minute(): number;
    set minute(minute: number);
    /**
     * 返回秒数值
     * @deprecated since v1.0.4
     */
    get_second(): number;
    get second(): number;
    set second(second: number);
    /**
     * 开始计时
     * @param func 秒级回调
     * @param params 回调函数的参数
     */
    start(func: Function, ...params: any[]): void;
}
/**时计数器 */
declare class Hour {
    private _value;
    c: Carry;
    minute: Minute;
    constructor(time: string);
    constructor(time: []);
    constructor(time: [number, number, number]);
    private _zero_fill;
    /**拨到上一秒 */
    to_last_second(): void;
    /**拨到下一秒 */
    to_next_second(): void;
    /** 拨到上一分钟 */
    to_last_minute(): void;
    /** 拨到下一分钟 */
    to_next_minute(): void;
    /**
     * 拨到上一小时
     */
    to_last(): void;
    /** 拨到下一小时 */
    to_next(): void;
    /**设定为本地时间 */
    set_locale_time(): void;
    /**
     * 开始计时
     * @param func 秒级回调
     * @param params 回调的参数
     */
    start(func: Function, ...params: any[]): void;
    set seconds(seconds: number);
    get seconds(): number;
    set minutes(minutes: number);
    get minutes(): number;
    set hours(hours: number);
    get hours(): number;
    /**
     * 打印当前的小时值
     */
    print(): void;
    /**
     * 返回当前的小时值字符串
     * @returns 被自动补 0 的 `小时:分钟:秒` 字符串
     * @deprecated since v1.0.5 use getter value() instead.
     */
    get_value(): string;
    /**
     * 返回当前的小时值字符串
     * @since v1.0.5
     */
    get value(): string;
    /**
     * 获取小时的数字值
     * @returns 表示当前计数小时的数值
     */
    get_hour(): number;
    /**
     * 获取分钟的数字值
     * @returns 表示当前计数分钟的数值
     */
    get_minute(): number;
    /**
     * 获取秒的数字值
     * @returns 表示当前计数秒的数值
     */
    get_second(): number;
}
/**日期计数器  */
declare class Date_ {
    private _year;
    private _month;
    private _day;
    /**
     * 使用当前的系统时间构造日期对象
     */
    constructor(param: []);
    /**
     * 使用一个形如 `2022/05/26` 的期日字符串构造日期对象
     * @param param
     */
    constructor(param: string);
    /**
     * 使用一个形如 ["2022/05/26"] 的期日字符串数组构造日期对象
     * @param param
     */
    constructor(param: [string]);
    /**
     * 使用一组共 3 个数字分别表示 年、月、日构造日期对象
     * @param {number[]} param 分别表示 年、月、日 初始值的数组
     */
    constructor(param: [number, number, number]);
    private _d_check;
    private _zero_fill;
    /**
     * 返回当前年份是否是闰年
     * @returns 一个表示是否是闰年的布尔值
     */
    is_leap_year(): boolean;
    /**
     * 返回后一天对应的新 Date_ 对象
     * @returns {Date_} 一个新的 Date_ 对象
     */
    get next(): Date_;
    /**
     * 时间拨到明天
     * @since v_1.0.5
     */
    to_next(): void;
    /**
     * 返回前一天对应的新 Date_ 对象
     * @returns {Date_} 一个新的 Date_ 对象
     */
    get last(): Date_;
    /**
     * 时间拨到昨天
     * @since v_1.0.5
     */
    to_last(): void;
    /**
     * n 天前
     * @param {number} n 天数
     * @returns 一个新的 Date_ 对象
     */
    ndays_ago(n: number): Date_;
    /**
     * n 天后
     * @param {number} n 天数
     * @returns {Date_} 一个新的 Date_ 对象
     */
    ndays_later(n: number): Date_;
    /**
     * 从当前开始，向后 n-1 个 Date_ 对象构成一个列表返回
     * @param {number} n 天数
     * @returns {Date_[]} n 天的 Date_ 对象 所构成的一个列表
     */
    ndaylist_next(n: number): Date_[];
    /**
     * 从当前开始，向前 n-1 个 Date_ 对象构成一个列表返回
     * @param {number} n 天数
     * @returns {Date_[]} n 天的 Date_ 对象 所构成的一个列表
     */
    ndaylist_last(n: number): Date_[];
    /**
     * 获取 年
     * @since v1.0.4
     */
    get year(): number;
    /**
     * 设置 年
     * @since v1.0.4
     */
    set year(year: number);
    /**
     * 获取 月
     * @since v1.0.4
     */
    get month(): number;
    /**
     * 设置 月
     * @since v1.0.4
     */
    set month(month: number);
    /**
     * 获取 日
     * @since v1.0.4
     */
    get day(): number;
    /**
     * 设置 日
     * @since v1.0.4
     */
    set day(day: number);
    /**
     * 获取日期字符串
     * @since v1.0.4
     */
    get value(): string;
    /**
     * 获取日期字符串
     * @returns {string} 自动补 0 的日期字符串，例如 `2022/09/23`
     * @deprecated since v1.03, please use getter value() instead
     */
    get_value(): string;
    /**打印日期字符串 */
    print(): void;
}
/**
 * 日期时间计数器
 */
declare class DateTime {
    date: Date_;
    time: Hour;
    /**
     * 初始化为当前时间
     * @param param 一个空数组
     */
    constructor(param: []);
    /**
     * @param {string} param 表示日期时间的字符串，形如`2022/05/26 20:59:25`
     */
    constructor(param: string);
    /**
     * 通过 Date_对象 和 Hour 对象直接构造
     * @param {[date:Date_, time:Hour]} param
     */
    constructor(param: [date: Date_, time: Hour]);
    /**
     * 上一秒，就地修改
     */
    to_last_second(): void;
    /**
     * 拨到下一秒，就地修改
     */
    to_next_second(): void;
    /**
     * 上一分钟，就地修改
     */
    to_last_minute(): void;
    /**
     * 下一分钟，就地修改
     */
    to_next_minute(): void;
    /**
     * 上一小时，就地修改
     */
    to_last_hour(): void;
    /**
     * 下一小时，就地修改
     */
    to_next_hour(): void;
    /** 昨天，就地修改 */
    to_last_day(): void;
    /** 返回对应于昨天的 DateTime 对象 */
    get last(): DateTime;
    /** 明天，就地修改 */
    to_next_day(): void;
    /** 返回对应于明天的 DateTime 对象 */
    get next(): DateTime;
    /**下月，就地修改 */
    to_next_month(): void;
    /**明年，就地修改 */
    to_next_year(): void;
    /**
     * 开启计时
     * @param func 秒级回调
     * @param params 回调的参数
     */
    start(func: Function, ...params: any[]): void;
    /**打印日期时间 */
    print(): void;
    /**返回日期时间 */
    get_value(): string;
}
declare let get_days: typeof StaticFuncs.get_days;
declare let is_leap_year: typeof StaticFuncs.is_leap_year;
declare let is_big_month: typeof StaticFuncs.is_big_month;
declare let get_calendar: typeof StaticFuncs.get_calendar;
declare let datelist: typeof StaticFuncs.datelist;
declare let next_month: typeof StaticFuncs.next_month;
declare let next_day: typeof StaticFuncs.next_day;
declare let last_day: typeof StaticFuncs.last_day;
export { get_days, is_leap_year, next_month, is_big_month, datelist, get_calendar, next_day, last_day, Second, Minute, Hour, Date_, DateTime, };
