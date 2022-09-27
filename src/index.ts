/*****************************************************************************
 Mouule: jcstudio.datetime
 Author: jclee95
 Chinese name: 李俊才
 Email: 291148484@163.com
 Author blog: https://blog.csdn.net/qq_28550263?spm=1001.2101.3001.5343
 Copyright Jack Lee. All rights reserved.
 Licensed under the MIT License.
*****************************************************************************/

import { ValueError } from "./utils/abnormal";
import { List } from "./utils/container";
import { range,zeroFill } from "./utils/tools";



class StaticFuncs {
    /**
     * 返回某个月的天数
     * @param {string} yearmonth 表示某个月的字符串，形如 `2022/05/26`
     * @returns {number} 指定月份的日期
     */
    static get_days(yearmonth:string):number|undefined{
        let [year, month] = yearmonth.split("/");
        let days_map = new Map<number, number>(
            [[1,31], [3,31], [5,31], [7,31], [8,31], [10,31], [12,31], [4,30],[ 6,30], [9,30], [11,30]]
        );
        // 闰年
        if(parseInt(year)%4 != 0){
            days_map.set(2,28);
        }
        else{
            days_map.set(2,29);
        }
        let days = days_map.get(parseInt(month));
        if(typeof(days) === "number"){
            return days;
        }else{
            new ValueError("Got a wrong or irregular month.");
        }
    }

    /**
     * 判断某个月是否是大月（31天的月）
     * @param {number} month 月号，如 `12`
     * @returns {boolean} 如果是大月则返回 true
     */
    static is_big_month(month:number):boolean{
        if(month > 12 || month <=0){
            new ValueError("Invalid month.");
        }
        return [1,3,5,7,8,10,12].includes(month)?true:false;
    }

    /**
     * 判断某年是否是闰年
     * @param {number} year 年号值 
     * @returns {boolean} 如果是闰年则返回 true
     */
    static is_leap_year(year:number):boolean{
        if((year % 4) === 0){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 返回日历表
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns {string[]}
     */
    static get_calendar(yearmonth:string):string[] {
        let [year, month] = yearmonth.split("/");
        let days = StaticFuncs.get_days(yearmonth) as number;
        let calendar_list = new List();
        range([1, days+1]).forEach(i => {
            let temp_j = i.toString();
            let j;
            if(i.toString().length === 1){
                j = '0' + temp_j
            }
            else{
                j = temp_j
            }
            let aday = year + "/" + month + "/" + j
            calendar_list.add(aday)
        });
        return calendar_list
    }

    /**
     * 返回下个月
     * @param year 当前年
     * @param month 当前月
     * @returns {string} 表示下个月的字符串，格式形如 `2022/05/26`
     */
    static next_month(year:number, month:number):string{
        if(month < 12){
            return (year.toString() + "/0" +  (month + 1).toString());
        }
        else if (month === 12) {
            return (year + 1).toString() + "/" + "01"; 
        }
        else{
            new ValueError("Month must be less than or equal to 12.");
        }
        return ""
    }

    // 指定起始日期，返回以这两个日期为起止期日的日期段列表 date_begin 或 date_end 的格式如 2022/08/15 
    static datelist(date_begin:string, date_end:string) {
        let [year_begin, month_begin, day_begin] = date_begin.split("/");
        let [year_end,   month_end,   day_end]   = date_end.split("/");
        let date_list =  new List(); // 日期容器

        let yearmonth = year_begin + month_begin;
        let yearmonth_end = year_end + month_end;

        // 只要还没到截止日期就插入日期到日期表中去
        while(parseInt(yearmonth) <= parseInt(yearmonth_end)){
            let month_calendar = StaticFuncs.get_calendar(year_begin + "/" + month_begin);
            month_calendar.forEach((i)=>{
                if (
                    parseInt(i.replace("/","")) >= parseInt(date_begin.replace("/","")) 
                ) {
                    
                    if(
                        parseInt(i.replace("/","")) <= parseInt(date_end.replace("/",""))
                    ){
                        date_list.add(i);
                    }
                }
            })
            yearmonth = StaticFuncs.next_month(
                parseInt(yearmonth.substr(0,4)),
                parseInt(yearmonth.substr(5,2))
            )
            year_begin = yearmonth.split("/")[0].toString()
            month_begin = yearmonth.split("/")[1].toString()
            yearmonth = yearmonth.replace("/","")
        }
        return date_list
    }

    /**
     * 明天
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns 
     */
    static next_day(yearmonth:string):string {
        let [y,m,d] = yearmonth.split("/");
        let [year,month,day] = [parseInt(y),parseInt(m),parseInt(d)]
        let days = StaticFuncs.get_days(yearmonth) as number;

        let _zero_fill = (s: string|number)=>{
            let _="";
            if (typeof s === "number"){_ = s.toString()}
            return (_.length === 1)?("0"+s):s;
        }
        
        if(day < days) {
            let next_day = day +1;
            let next_month = month;
            let next_year = year;
            return next_year.toString()+'/'+_zero_fill(next_month)+'/'+next_day.toString();
        }
        else if (day === days) {
            let next_day = "01";
            if(month < 1){
                new ValueError("An impossible year, which is less than 1.")
            }
            else if(month < 12) {
                let next_month = (month+1);
                let this_year = year;
                return this_year.toString()+'/'+_zero_fill(next_month)+'/'+next_day;
            }
            else if(month === 12){
                let next_month = "01";
                let next_year = (year + 1).toString();
                return next_year+'/'+next_month+'/'+next_day; 
            }
            else{
                new ValueError("An impossible year, which is greater than 12.")
            }
            
        }
        else{
            new ValueError("An impossible date, which is greater than the number of days in the month.")
        }
        return "";
    }

    /**
     * 昨天
     * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
     * @returns 
     */
    static last_day(yearmonth:string):string {
        let [y,m,d] = yearmonth.split("/");
        let [year,month,day] = [parseInt(y),parseInt(m),parseInt(d)]
        // day != 1
        if (day != 1) {
            let last_day = (day - 1).toString()
            let last_month = month.toString();
            let this_year = year.toString();
            return this_year+'/'+last_month+'/'+last_day; 
        }
        // day === 1
        else{
            if(month != 1){

                let last_month = (month -1).toString();
                if(last_month.length === 1){
                    last_month = '0' + last_month;
                }

                let last_year = year.toString();
                let yearmonth = last_year + "/" + last_month;
                let days = StaticFuncs.get_days(yearmonth) as number;
                let last_day = days.toString();

                return last_year+'/'+last_month+'/'+last_day; 
            }
            // month === 1
            else{
                let last_month = "12";
                let last_year = (year-1).toString();
                let yearmonth = year.toString() + "/" + month.toString();
                let days = StaticFuncs.get_days(yearmonth) as number;
                let last_day = days.toString();
                return last_year+'/'+last_month+'/'+last_day; 
            }
        }
    }
}

/**进位器状态枚举 */
enum CarryEnum {
    CARRY = 1,    // 有进位
    NONE = 0,     // 无进退位
    BACK = 2      // 有退位
}

/**
 * 进位器，用于描述各中计数器的进位状态
 */
class Carry{
    private _value
    constructor(b: CarryEnum | undefined=undefined){
        if(b == undefined) {
            this._value = CarryEnum.NONE;
        }else{
            this._value = b;
        }
    }

    // 标志进位 
    set():void{
        this._value = CarryEnum.CARRY;
    }

    // 标志退位 
    set_back():void{
        this._value = CarryEnum.BACK;
    }

    // 清空标志 
    clear():void{
        this._value =CarryEnum.NONE;
    }

    /**
     * 获取进位器状态枚举数值
     * @deprecated since v1.0.7, please use getter state() instead.
     * @returns {number} v 进位枚举数值
     */
     get_state():number{
        return this._value;
    }

    /**
     * 获取进位器状态枚举数值
     */
    get state():number{
        return this._value;
    }
}

interface Counter{
    // private _value:number;
    c: Carry;
    to_last():void;
    to_next():void;
    start(func:Function, ...params:any[]):void;
    print():void;
    get last():any;
    get next():any;
    get value():string;
    get seconds():number;
    set seconds(seconds: number);
}

/**
 * 秒计数器
 */
class Second implements Counter {
    private _value: number = 0
    c: Carry

    /**
     * @param s 初始秒数，范围为 0~59
     */
    constructor(s:number=0){
        this.c = new Carry()
        this.c.clear();
        if(s < 0){
            new ValueError("Seconds must be greater than or equal to 0.")
        }else if (s > 59) {
            new ValueError("Seconds must be less than or equal to 59.")
        }
        this._value = parseInt(s.toString());
    }

    /** 将时间拨到上一秒 */
    to_last():void{
        // 已到 0
        if(this._value <= 0){
            this._value = 59;   // 置满
            this.c.set_back();  // 标志退位
        }
        else{
            this._value = this._value - 1;
        }
    }

    /**
     * 将时间拨到下一秒
     */ 
    to_next():void{
        // 已达 59
        if(this._value >= 59){
            this._value = 0;     // 置空
            this.c.set();        // 标志进位
        }
        else{
            this._value = this._value + 1;
        }
    }

    /**
     * 开始计时
     * @param func 回调函数
     * @param params 回调函数的参数
     */
    start(func:Function, ...params:any[]):void{
        let that = this;
        setInterval((...params:any) => {
            that.to_next();
            func(...params);
        },1000,...params);
    }

    /**打印秒计数值 */
    print():void{
        console.log(this.value);
    }

    /**
     * 获取字符串格式的当前秒技术值
     * @returns 被自动补 '0' 的字符串
     * @deprecated since v1.0.4, use getter value() instead.
     */
    get_value():string{
        return zeroFill(this._value)
    }

    /**
     * 取：以上一秒的时间返回一个新的 Second 对象
     * @return {Second} 一个新的 Second 对象实例
     * @since 1.0.7
     */ 
     get last():Second {
        let s = new Second(this._value);
        s.to_last();
        return s;
    }

    /**
     * 取：以下一秒的时间返回一个新的 Second 对象
     * @return {Second} 一个新的 Second 对象实例
     * @since 1.0.7
     */ 
    get next():Second {
        let s = new Second(this._value);
        s.to_next();
        return s;
    }

    /**
     * 存：秒
     * @param {number} seconds 将更改的秒的数值
     */
    set seconds(seconds:number){
        this._value = seconds;
    }
    
    /**
     * 取：秒
     * @return {number} 将被去除的当前的秒值
     */
    get seconds():number{
        return this._value;
    }

    /**
     * 取：当前（秒）值字符串
     * 这个字符串的长度（length）为 2 ，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串
     */
    get value():string{
        return zeroFill(this._value)
    }
}

/**分计数器 */
class Minute implements Counter {
    private _value:number=0;           // 分针位
    private _second:Second;            // 秒针位
    public c:Carry;                    // 进位
    
    /**
     * @param {number} m 分值
     * @param {number} s 秒值 
     */
    constructor(m:number=0,s:number=0) {
        // 初始化分进退位标志引用对象
        this.c = new Carry();
        this.c.clear();

        // 初始值校验
        if(m < 0){
            new ValueError("Minutes must be greater than or equal to 0.")
        }else if (m > 59) {
            new ValueError("Minutes must be less than or equal to 59.")
        }

        // 初始化秒位引用对象
        this._second = new Second(s);

        // 设置分初值
        this._value = m;
    }

    /**
     * 将时间拨到上一分钟
     * @since v1.0.7
     */
    to_last():void{
        // 已到 0
        if(this._value <= 0){
            this._value = 59;   // 置满
            this.c.set_back();  // 标志退位
        }
        else{
            this._value = this._value - 1;
        }
    }

    /**
     * 将时间拨到下一分钟
     * @since v1.0.7
     */
    to_next():void{
        // 已达 59
        if(this._value >= 59){
            this._value = 0;     // 置空
            this.c.set();        // 标志进位
        }
        else{
            this._value = this._value + 1;
        }
    }

    /**
     * 将时间拨到上一秒钟
     */
    to_last_second():void{
        // 直接调用 Second 类的上一秒
        this._second.to_last();
        // 判断退位
        if(this._second.c.state === CarryEnum.BACK){
            // 先完成退位
            this.to_last();
            // 再将进位标志清空
            this._second.c.clear();
        }
    }

    /**
     * 将时间拨到下一秒 钟
     */
    to_next_second():void{
        // 直接调用 Second 类的下一秒
        this._second.to_next();
        
        // 判断进位
        if(this._second.c.state === CarryEnum.CARRY){
            // 先完成进位
            this.to_next();
            // 再将进位标志清空
            this._second.c.clear();
        }
    }

    /**
     * 打印当前的分计数值
     */
    print():void{
        console.log(this.value);
    }

    /**
     * 输出当前的分计数值
     * @returns 被自动补零的 `分:秒` 字符串
     * @deprecated use getter value() instead.
     */
    get_value():string{
        return  zeroFill(this._value) + ":" + this._second.value.toString();
    }

    /**
     * 开始计时
     * @param func 秒级回调
     * @param params 回调函数的参数
     */
    start(func: Function, ...params: any[]):void{
        let that = this;
        setInterval((...params:any) => {
            that.to_next_second();
            func(...params);
        },1000,...params);
    }

    /**
     * 获取上一分钟对应的 Minute 对象实例
     * 注意：该接口在 v1.0.6及以前，功能是将当前 Minute 对象实例 拨到下一分钟，并且不会返回任何值
     * @since v1.0.7
     */
     get last():Minute {
        let m = new Minute(this._value, this._second.seconds);
        m.c = this.c;
        m.to_last();
        return m;
    }

    /**
     * 获取下一分钟对应的 Minute 对象实例
     * 注意：该接口在 v1.0.6及以前，功能是将当前 Minute 对象实例 拨到下一分钟，并且不会返回任何值
     * @since v1.0.7
     */
     get next():Minute {
        let m = new Minute(this._value, this._second.seconds);
        m.c = this.c;
        m.to_next();
        return m;
    }

    /**
     * 存：秒值
     * @param {number} seconds Number of seconds.
     * @since v1.0.4
     */
    set seconds(seconds:number){
        this._second.seconds = seconds;
    }

    /**
     * 取：秒值
     * @since v1.0.4
     */
    get seconds():number{
        return this._second.seconds;
    }

    /**
     * 存：分值
     * @param {number} seconds Number of minutes.
     * @since v1.0.4
     */
    set minutes(minutes:number){
        this._value = minutes;
    }

    /**
     * 取：分值
     * @since v1.0.4
     */
    get minutes():number{
        return this._value;
    }

    /**
     * 输出当前的分计数值
     * @returns 被自动补零的 `分:秒` 字符串
     */
    get value():string{
        return  zeroFill(this._value) + ":" + this._second.value.toString();
    }
}

/**时计数器 */
class Hour implements Counter {
    private _value: number = 0;                    // 时针位
    private _minute: Minute;                       // 分针位（带秒位）
    public c: Carry = new Carry();                 // 进位

    constructor(time: string);
    constructor(time: []);
    constructor(time: [number, number, number]); 
    constructor(time: string | number[]=[]){
        // 初始化分进退位标志引用对象
        this.c.clear();
        
        // 使用当前的系统时间进行初始化
        if(time instanceof Array && time.length === 0){
            let _dt = new Date();

            // 初始化秒位引用对象
            this._minute = new Minute(_dt.getMinutes(), _dt.getSeconds());
            
            // 设置小时初值
            this._value = _dt.getHours();
        }
        // 通过字符串表示的时间初始化，字符串形如 20:30:00
        else if(typeof time == "string"){
            let [hours, minutes, seconds] = time.split(":");
            
            // 初始化秒位引用对象
            this._minute = new Minute(parseInt(minutes), parseInt(seconds));
            
            // 设置小时初值
            this._value = parseInt(hours);
        }
        // 指定具体时间进行初始化：分别指定时、分、秒
        else if(typeof time[0] =="number"){
            let [hours, minutes, seconds] = time;
            
            // 初始值校验
            if(hours as number < 0){
                new ValueError("Hours must be greater than or equal to 0.")
            }else if (hours as number > 59) {
                new ValueError("Hours must be less than or equal to 59.")
            }
            // 初始化秒位引用对象
            this._minute = new Minute(minutes, seconds);

            // 设置小时初值
            this._value =  hours as number;
        }
        else{
            this._minute = new Minute(0,0);
            let f_param_type = typeof time[0];
            new ValueError("Type of first param is: "+f_param_type)
        }
    }
    
    /**
     * 拨到上一秒
     * @since v1.0.4
     */
    to_last_second():void {
        // 调用分钟上一秒方法
        this._minute.to_last_second()
        // 只需要观察分种是否退位
        if(this._minute.c.state === CarryEnum.BACK){
            // 先求上一小时
            this.to_last();
            // 再清空分钟的进位标志
            this._minute.c.clear()
        }
    }

    /**
     * 拨到下一秒
     * @since v1.0.4
     */ 
    to_next_second():void {
        // 掉用分的下一秒方法
        this._minute.to_next_second();
        // 只需要观察分种是否进位
        if(this._minute.c.state === CarryEnum.CARRY){
            // 先进位到小时，即求下一小时
            this.to_next();
            // 再清空分钟的进位标志
            this._minute.c.clear()
        }
    }

    /**
     * 拨到上一分钟
     * @since v1.0.4
     */
    to_last_minute():void {
        // 掉用分的上一分钟方法
        this._minute.to_last();
        // 只需要观察分种是否退位
        if(this._minute.c.state === CarryEnum.BACK){
            // 先求上一小时
            this.to_last();
            // 再清空分钟的进位标志
            this._minute.c.clear()
        }
    }

    /**
     * 拨到下一分钟
     * @since v1.0.4
     */ 
    to_next_minute():void {
        // 掉用分的下一分钟方法
        this._minute.to_next();
        // 只需要观察分种是否进位
        if(this._minute.c.state === CarryEnum.CARRY){
            // 先进位到小时，即求下一小时
            this.to_next();
            // 再清空分钟的进位标志
            this._minute.c.clear()
        }
    }

    /** 
     * 拨到上一小时
     * @since v1.0.4
     */
     to_last():void{
        // 已到 0
        if(this._value <= 0){
            this._value = 59;   // 置满
            this.c.set_back();  // 标志退位
        }
        else{
            this._value = this._value - 1;
        }
    }

    /** 
     * 拨到下一小时
     * @since v1.0.4
     */
    to_next():void{
        // 已达 59
        if(this._value >= 59){
            this._value = 0;     // 置空
            this.c.set();        // 标志进位
        }
        else{
            this._value = this._value + 1;
        }
    }

    /**
     * 设定为本地时间
     * @since v1.0.4
     */
    set_locale_time():void{
        let [h,m,s] = Date().toString().split(" ")[4].split(":")
        this._value = parseInt(h);
        this._minute.minutes = parseInt(m);
        this._minute.seconds = parseInt(s);
    }

    /**
     * 开始计时
     * @param func 秒级回调
     * @param params 回调的参数
     */
    start(func: Function, ...params: any[]):void{
        let that = this;
        setInterval((...params:any) => {
            that.to_next_second();
            func(...params);
        },1000,...params);
    }

    /**
     * 打印当前的小时值
     */
    print():void{
        let temp = zeroFill(this._value) + ":" + this._minute.value;
        console.log(temp);
    }

    /**
     * 返回当前的小时值字符串
     * @returns 被自动补 0 的 `小时:分钟:秒` 字符串
     * @deprecated since v1.0.5 use getter value() instead.
     */
    get_value():string{
        return zeroFill(this._value) + ":" + this._minute.value;
    }


    /**
     * 获取小时的数字值
     * @returns 表示当前计数小时的数值
     * @deprecated since v1.0.7 use getter hours() instead.
     */
    get_hour():number{
        return this._value;
    }

    /**
     * 获取分钟的数字值
     * @returns 表示当前计数分钟的数值
     */
    get_minute():number{
        return this._minute.minutes;
    }

    /**
     * 获取秒的数字值
     * @returns 表示当前计数秒的数值
     */
    get_second():number{
        return this._minute.seconds;
    }
    
    /**
     * 存：秒值
     * @param {number} seconds 要设置的秒值.
     * @since v1.0.4
     */
    set seconds(seconds:number){
        this._minute.seconds = seconds;
    }

    /**
     * 获取上一小时对应的 Hour 对象实例
     * @since v1.0.7
     */
    get last():Hour{
        let h = new Hour([this._value, this._minute.minutes, this._minute.seconds]);
        h.to_last();
        return h;
    }

    /**
     * 获取下一小时对应的 Hour 对象实例
     * @since v1.0.7
     */
    get next():Hour{
        let h = new Hour([this._value, this._minute.minutes, this._minute.seconds]);
        h.to_next();
        return h;
    }

    /**
     * 取：秒值
     * @returns {number} 当前实例的秒值
     * @since v1.0.6
     */
    get seconds():number{
        return this._minute.seconds;
    }

    /**
     * 存：分值
     * @param {number} seconds 要设置的分值.
     * @since v1.0.4
     */
    set minutes(minutes:number){
        this._minute.minutes = minutes;
    }

    /**
     * 取：分值
     * @returns {number} 当前实例的分值
     * @since v1.0.6
     */
    get minutes():number{
        return this._minute.minutes;
    }

    /**
     * 存：小时值
     * @param {number} seconds 要设置的小时值.
     * @since v1.0.4
     */
    set hours(hours:number){
        this._value = hours;
    }

    /**
     * 取：小时值
     * @returns {number} 当前实例的小时值
     * @since v1.0.6
     */
    get hours():number{
        return this._value;
    }
    /**
     * 返回当前的小时值字符串
     * @since v1.0.5
     */
     get value():string{
        return zeroFill(this._value) + ":" + this._minute.value;
    }

}

/**日期计数器  */
class Date_ {
    private _year: number
    private _month: number
    private _day: number

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
    constructor(param: string | string[] | number[] = []) {
        // 初始化为当前日期
        if(param instanceof Array && param.length === 0){
            let _dt = new Date(); 
            this._year = _dt.getFullYear();
            this._month = _dt.getMonth()
            this._day = _dt.getDate();

            // 数据校验
            this._d_check();
        }
        // 以字符串初始化指定日期，例如 `2022/05/26`
        else if(typeof param === "string"){
            let [yyyy,mm,dd] = param.split("/");
            this._year = parseInt(yyyy);
            this._month = parseInt(mm);
            this._day = parseInt(dd);

            this._d_check();
        }
        else if(typeof param[0] === "string" && param.length === 1){
            let [yyyy,mm,dd] = param[0].split("/");
            this._year = parseInt(yyyy);
            this._month = parseInt(mm);
            this._day = parseInt(dd);

            this._d_check();
        }
        // 以分别指定的指定年、月、日的形式初始化
        else if(
            typeof param[0] === "number" && 
            typeof param[1] === "number" && 
            typeof param[2] === "number" && 
            param.length === 3
        ){
            this._year = param[0];
            this._month = param[1] as number;
            this._day = param[2] as number;

            this._d_check();
        }else{
            this._year = 0;
            this._month = 0;
            this._day = 0;
            let f_param_type = typeof param[0];
            new ValueError("Type of first param is: "+f_param_type)
        }
    }

    private _d_check(){
        if (this.year <= 0) {
            console.log("year = "+this.year);
            new ValueError("Year must be greater than 0.")
        }
        if (this._month <= 0) {
            new ValueError("Month must be greater than 0.")
        }
        if (this._day <= 0) {
            new ValueError("Day must be greater than 0.")
        }
    }

    /**
     * 返回当前年份是否是闰年 
     * @returns 一个表示是否是闰年的布尔值
     */
    is_leap_year():boolean{
        if((this.year % 4) === 0){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 时间拨到明天
     * @since v_1.0.5
     */
    to_next():void{
        let days = StaticFuncs.get_days(this.year.toString() + "/" + this.month.toString()) as number;
        if(this.day < days) {
            this._day = this.day +1;
            this._month = this.month;
            this._year = this.year;
        }
        else if (this.day === days) {
            if(this.month < 1){
                new ValueError("An impossible year, which is less than 1.")
            }
            else if(this._month < 12) {
                this._month = (this._month+1);
                this._day = 1;
            }
            else if(this.month === 12){
                this._year = this.year + 1;
                this._month = 1;
                this._day = 1;
            }
            else{
                new ValueError("An impossible year, which is greater than 12.")
            }
        }
        else{
            new ValueError("An impossible date, which is greater than the number of days in the month.")
        }
    }

    /**
     * 时间拨到昨天
     * @since v_1.0.5
     */
     to_last():void{
        if (this.day != 1) {
            this._day = this.day - 1;
            this._month = this.month;
            this._year = this.year;
        }
        // this.day === 1
        else{
            if(this.month != 1){
                let last_month = (this.month -1).toString();
                if(last_month.length === 1){
                    last_month = '0' + last_month;
                }
                let last_year = this.year;
                let yearmonth = last_year + "/" + last_month;
                let days = StaticFuncs.get_days(yearmonth) as number;
                let last_day = days;
                this._year = last_year;
                this.month = parseInt(last_month);
                this._day = last_day;
            }
            // this.month === 1
            else{
                let last_month = "12";
                let last_year = this.year-1;
                let yearmonth = this.year.toString() + "/" + this.month.toString();
                let days = StaticFuncs.get_days(yearmonth) as number;
                let last_day = days;
                this._year = last_year;
                this.month = parseInt(last_month);
                this._day = last_day;
            }
        }
    }

    /**
     * n 天前
     * @param {number} n 天数
     * @returns 一个新的 Date_ 对象
     */
    ndays_ago(n:number):Date_{
        let temp = new Date_([this.year, this.month, this.day]);
        for (let i in range([0, n])) {
            temp = temp.last;
        }
        return temp
    }

    /**
     * n 天后
     * @param {number} n 天数
     * @returns {Date_} 一个新的 Date_ 对象 
     */
    ndays_later(n:number):Date_{
        let temp = new Date_([this.year, this.month, this.day]);
        for (let i in range([0, n])) {
            temp = temp.next;
        }
        return temp
    }

    /**
     * 从当前开始，向前 n-1 个 Date_ 对象构成一个列表返回 
     * @param {number} n 天数
     * @returns {Date_[]} n 天的 Date_ 对象 所构成的一个列表
     */
     ndaylist_last(n:number):Date_[]{
        let today = new Date_([this.year, this.month, this.day]);
        let temp = new List();
        for (let i in range(n)) { 
            temp.add(today);
            today = today.last;
        }
        return temp
    }

    /**
     * 从当前开始，向后 n-1 个 Date_ 对象构成一个列表返回 
     * @param {number} n 天数
     * @returns {Date_[]} n 天的 Date_ 对象 所构成的一个列表
     */
    ndaylist_next(n:number):Date_[]{
        let today = new Date_([this.year, this.month, this.day]);
        let temp = new List();
        for (let i in range(n)) { 
            temp.add(today);
            today = today.next;
        }
        return temp
    }

    /**
     * 获取日期字符串
     * @returns {string} 自动补 0 的日期字符串，例如 `2022/09/23`
     * @deprecated since v1.03, please use getter value() instead
     */
    get_value():string{
        return this.year.toString() + "/" + zeroFill(this._month) + "/" +  zeroFill(this._day);
    }

    /**打印日期字符串 */
    print():void{
        let temp = this.year.toString() + "/" + zeroFill(this._month) + "/" +  zeroFill(this._day);
        console.log(temp);
    }

    /**
     * 返回后一天对应的新 Date_ 对象
     * @returns {Date_} 一个新的 Date_ 对象 
     */
     get next():Date_{
        let yearmonth = this.year.toString() + "/" + this.month.toString();
        let days = StaticFuncs.get_days(yearmonth) as number;
        
        if(this.day < days) {
            let next_day = this.day +1;
            let next_month = this.month;
            let next_year = this.year;
            return new Date_([next_year, next_month, next_day]);
        }
        else if (this.day === days) {
            let next_day = "01";
            if(this.month < 1){
                new ValueError("An impossible year, which is less than 1.")
            }
            else if(this.month < 12) {
                let next_month = (this.month+1);
                let this_year = this.year;
                return new Date_([this_year, next_month, parseInt(next_day)]);
            }
            else if(this.month === 12){
                let next_month = "01";
                let next_year = (this.year + 1).toString();
                return new Date_([parseInt(next_year), parseInt(next_month), parseInt(next_day)]);
            }
            else{
                new ValueError("An impossible year, which is greater than 12.")
            }
            
        }
        else{
            new ValueError("An impossible date, which is greater than the number of days in the month.")
        }
        return new Date_([0, 13, 32]);
    }


    /**
     * 返回前一天对应的新 Date_ 对象
     * @returns {Date_} 一个新的 Date_ 对象
     */
    get last():Date_{
        if (this.day != 1) {

            let last_day = (this.day - 1).toString()
            let last_month = this.month.toString();
            let last_year = this.year.toString();

            return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day)])
        }
        // this.day === 1
        else{
            if(this.month != 1){

                let last_month = (this.month -1).toString();
                if(last_month.length === 1){
                    last_month = '0' + last_month;
                }

                let last_year = this.year.toString();
                let yearmonth = last_year + "/" + last_month;
                let days = StaticFuncs.get_days(yearmonth) as number;
                let last_day = days.toString();

                return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day)])
            }
            // this.month === 1
            else{
                let last_month = "12";
                let last_year = (this.year-1).toString();
                let yearmonth = this.year.toString() + "/" + this.month.toString();
                let days = StaticFuncs.get_days(yearmonth) as number;
                let last_day = days.toString();
                return new Date_([parseInt(last_year), parseInt(last_month), parseInt(last_day)]);
            }
        }
    }

    /**
     * 获取 年
     * @since v1.0.4
     */
    get year():number { 
        return this._year; 
    }
    /**
     * 设置 年
     * @since v1.0.4
     */
    set year(year:number) {
        this._year = year;
    }
    /**
     * 获取 月
     * @since v1.0.4
     */
    get month():number { 
        return this._month; 
    }
    /**
     * 设置 月
     * @since v1.0.4
     */
    set month(month:number) {
        this._month = month;
    }
    /**
     * 获取 日
     * @since v1.0.4
     */
    get day():number { 
        return this._day; 
    }
    /**
     * 设置 日
     * @since v1.0.4
     */
    set day(day:number) {
        this._day = day;
    }

    /**
     * 取：日期字符串
     * @since v1.0.4
     */
    get value():string{
        return this.year.toString() + "/" + zeroFill(this._month) + "/" +  zeroFill(this._day);
    }
}

/**
 * 日期时间计数器
 */
class DateTime {
    date:Date_
    time:Hour

    /**
     * 初始化为当前时间
     * @param param 一个空数组
     */
    constructor(param: []);
    /**
     * @param {string} param 表示日期时间的字符串，形如`2022/05/26 20:59:25`
     */
    constructor(param:string);
    /**
     * 通过 Date_对象 和 Hour 对象直接构造
     * @param {[date:Date_, time:Hour]} param 
     */
    constructor(param:[date:Date_, time:Hour]);
    constructor(param:string|[date:Date_, time:Hour]|[] = []){
        if(param instanceof Array && param.length === 0){
            this.date = new Date_([]);
            this.time = new Hour([]);
        }
        else if(typeof param === "string"){
            let [d, t] = param.split(" ");
            this.date = new Date_(d);
            this.time = new Hour(t);
        }
        else if(true){
            this.date = param[0];
            this.time = param[1];
        }
    }

    /**
     * 上一秒，就地修改
     */
    to_last_second():void{
        this.time.to_last_second();
        // 若产生退位
        if(this.time.c.state === CarryEnum.BACK){
            // 完成从时间到日期的退位
            this.date.to_last();
            // 清空退位标志
            this.time.c.clear();
        }
    }

    /**
     * 拨到下一秒，就地修改
     */
    to_next_second():void{
        this.time.to_next_second();
        if(this.time.c.state === CarryEnum.CARRY){
            this.date.to_next();
            this.time.c.clear();
        }
    }

    /**
     * 上一分钟，就地修改
     */
    to_last_minute():void{
        this.time.to_last_minute();
        if(this.time.c.state === CarryEnum.BACK){
            this.date.to_last();
            this.time.c.clear();
        }
    }

    /**
     * 下一分钟，就地修改
     */ 
    to_next_minute():void{
        this.time.to_next_minute();
        if(this.time.c.state === CarryEnum.CARRY){
            this.date.to_next();
            this.time.c.clear();
        }
    }

    /**
     * 上一小时，就地修改
     */
    to_last_hour():void{
        this.time.to_last();
        // 若产生退位
        if(this.time.c.state === CarryEnum.BACK){
            // 完成从时间到日期的退位
            this.date.to_last();
            // 清空退位标志
            this.time.c.clear();
        }
    }

    /**
     * 下一小时，就地修改
     */
    to_next_hour():void{
        this.time.to_next();
        if(this.time.c.state === CarryEnum.CARRY){
            this.date.to_next();
            this.time.c.clear();
        }
    }

    /** 昨天，就地修改 */
    to_last_day():void{
        this.date.to_last();
    }

    /** 明天，就地修改 */
    to_next_day():void{
        this.date.to_next();
    }

    /**下月，就地修改 */
    to_next_month():void{
        if(this.date.month === 2) {
            if(this.date.is_leap_year()){
                this.date = this.date.ndays_later(29);
            }else{
                this.date = this.date.ndays_later(28);
            }
        }
        else if(StaticFuncs.is_big_month(this.date.month)) {
            this.date = this.date.ndays_later(31);
        }
        else{
            this.date = this.date.ndays_later(30);
        }
    }

    /**明年，就地修改 */
    to_next_year():void{
        if(this.date.is_leap_year()){
            if(this.date.year === 2){
                if(this.date.day === 29){
                    this.date.day = 28;
                }
            }
        }
        if(this.date.year === 12){
            this.date.year = 0;
        }else{
            this.date.year = this.date.year + 1;
        }
    }

    /**
     * 开启计时
     * @param func 秒级回调
     * @param params 回调的参数
     */
    start(func: Function, ...params: any[]):void{
        let that = this;
        setInterval((...params:any) => {
            that.to_next_second();
            func(...params);
        },1000,...params);
    }

    /**打印日期时间 */
    print():void{
        console.log(this.date.value + " " + this.time.value);
    }

    /**返回日期时间 */
    get_value():string{
        return this.date.value + " " + this.time.value;
    }
    
    /** 返回对应于昨天的 DateTime 对象 */
    get last():DateTime{
        return new DateTime([this.date.last, this.time])
    }
    /** 返回对应于明天的 DateTime 对象 */
    get next():DateTime{
        return new DateTime([this.date.next, this.time])
    }
}

let get_days = StaticFuncs.get_days;
let is_leap_year = StaticFuncs.is_leap_year;
let is_big_month = StaticFuncs.is_big_month;
let get_calendar = StaticFuncs.get_calendar;
let datelist = StaticFuncs.datelist;
let next_month = StaticFuncs.next_month;
let next_day = StaticFuncs.next_day;
let last_day = StaticFuncs.last_day;

export {
  get_days,
  is_leap_year,
  next_month,
  is_big_month,
  datelist,
  get_calendar,
  next_day,
  last_day,
  Second,
  Minute,
  Hour,
  Date_,
  DateTime,
};


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