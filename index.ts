/*****************************************************************************
 Mouule: jcstudio.datetime
 Author: jclee95
 Chinese name: 李俊才
 Email: 291148484@163.com
 Author blog: https://blog.csdn.net/qq_28550263?spm=1001.2101.3001.5343
 Copyright Jack Lee. All rights reserved.
 Licensed under the MIT License.
*****************************************************************************/

import { List, range } from "./utils"

class ValueError {
    constructor(s:string){
        throw "[Valueerror]: "+s
    }
}

class StaticFuncs {

    // 返回某个月的天数 
    static get_days(yearmonth:string):number|undefined{
        let [year, month] = yearmonth.split("/");
        let days_map = new Map<number, number>(
            [[1,31], [3,31], [5,31], [7,31], [8,31], [10,31], [12,31], [4,30],[ 6,30], [9,30], [11,30]]
        );
        // 闰年
        if(parseInt(year)%4 != 0){
            days_map.set(2,28)
        }
        else{
            days_map.set(2,29)
        }
        let days = days_map.get(parseInt(month))
        if(typeof(days) === "number"){
            return days
        }else{
            new ValueError("Got a wrong or irregular month.")
        }
    }

    // 判断某个月是否是大月（31天） 
    static is_big_month(month:number):boolean{
        if(StaticFuncs.get_days(month.toString()) === 31){
            return true;
        }
        else{
            return false
        }
    }

    // 返回日历表 
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
}

// 进位器状态枚举 
enum CarryEnum {
    CARRY = 1,    // 有进位
    NONE = 0,     // 无进退位
    BACK = 2      // 有退位
}

// 进位器 
class Carry{
    _value
    constructor(b: CarryEnum | undefined){
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

    // 获取进位器状态 
    get_state():number{
        return this._value;
    }
}

//秒计数器
class Second{
    _value:number=0
    c:Carry;

    constructor(s:number){
        this.c = new Carry(undefined)
        this.c.clear();
        if(s < 0){
            new ValueError("Seconds must be greater than or equal to 0.")
        }else if (s > 59) {
            new ValueError("Seconds must be less than or equal to 59.")
        }
        this._value = s;
    }
    // 正向行走 
    next():void{
        // 已达 59
        if(this._value >= 59){
            this._value = 0;     // 置空
            this.c.set();        // 标志进位
        }
        else{
            this._value = this._value + 1;
        }
        // Write-Host this._value
    }

    // 逆向行走 
    last():void{
        // 已到 0
        if(this._value <= 0){
            this._value = 59;   // 置满
            this.c.set_back();  // 标志退位
        }
        else{
            this._value = this._value - 1;
        }
        // Write-Host this._value
    }

    // 秒步增
    start(func:Function, ...params:any[]):void{
        let that = this;
        setInterval((...params) => {
            that.next();
            func(...params);
        },1000,...params);
    }

    print():void{
        let temp = this._value.toString();
        console.log(temp);
    }

    get_value():string{
        let s = this._value.toString();
        if(s.length === 1){
            s = "0" + s;
        }
        return  s;
        
    }
}

// 分计数器 
class Minute {
    _value:number=0;               // 分针位
    c:Carry;                    // 进位
    second:Second;                   // 秒针位
    
    constructor(m:number,s:number) {
        // 初始化分进退位标志引用对象
        this.c = new Carry(undefined);
        this.c.clear();

        // 初始值校验
        if(m < 0){
            new ValueError("Minutes must be greater than or equal to 0.")
        }else if (m > 59) {
            new ValueError("Minutes must be less than or equal to 59.")
        }

        // 初始化秒位引用对象
        this.second = new Second(s);

        // 设置分初值
        this._value = m;
    }

    // 正向行走（分针，即下一分钟） 
    next():void{
        // 已达 59
        if(this._value >= 59){
            this._value = 0;     // 置空
            this.c.set();        // 标志进位
        }
        else{
            this._value = this._value + 1;
        }
    }

    // 逆向行走（分针，即上一分钟） 
    last():void{
        // 已到 0
        if(this._value <= 0){
            this._value = 59;   // 置满
            this.c.set_back();  // 标志退位
        }
        else{
            this._value = this._value - 1;
        }
    }

    // 正向行走（秒针，即下一秒） 
    next_second():void{
        // 直接调用 Second 类的下一秒
        this.second.next();
        
        // 判断进位
        if(this.second.c.get_state() === CarryEnum.CARRY){
            // 先完成进位
            this.next();
            // 再将进位标志清空
            this.second.c.clear()
        }
    }


    // 逆向行走（秒针，即上一秒） 
    last_second():void{
        // 直接调用 Second 类的上一秒
        this.second.last();
        // 判断退位
        if(this.second.c.get_state() === CarryEnum.BACK){
            // 先完成退位
            this.last();
            // 再将进位标志清空
            this.second.c.clear()
        }
    }

    print():void{
        let m = this._value.toString();
        if(m.length === 1){
            m = "0" + m;
        }
        let s = this.second._value.toString();
        if(s.length === 1){
            s = "0" + s;
        }
        console.log(m + ":" + s);
    }

    get_value():string{
        let m = this._value.toString();
        let s = this.second._value.toString();
        if(m.length === 1){
            m = "0" + m;
        }
        if(s.length === 1){
            s = "0" + s;
        }
        return  m + ":" + s;
        
    }

    get_minute():number{
        return this._value;
    }

    get_second():number{
        return parseInt(this.second.get_value());
    }

    start(func: Function, ...params: any[]):void{
        let that = this;
        setInterval((...params) => {
            that.next_second();
            func(...params);
        },1000,...params);
    }
}

//时计数器
class Hour {
    _value:number=0;                    // 时针位
    c:Carry=new Carry(undefined);       // 进位
    minute:Minute;                      // 分针位（带秒位）

    constructor(time:undefined);
    constructor(time:string);
    constructor(time:[number, number, number]); 
    constructor(time:undefined | string | number[]){
        // 初始化分进退位标志引用对象
        this.c.clear();
        
        // 使用当前的系统时间进行初始化
        if(time == undefined){
            let [hours, minutes, seconds] = new Date().toLocaleString().split(" ")[1].split(":");
            
            // 初始化秒位引用对象
            this.minute = new Minute(parseInt(minutes), parseInt(seconds));
            
            // 设置小时初值
            this._value = parseInt(hours);
        }
        // 通过字符串表示的时间初始化，字符串形如 20:30:00
        else if(typeof time == "string"){
            let [hours, minutes, seconds] = time.split(":");
            
            // 初始化秒位引用对象
            this.minute = new Minute(parseInt(minutes), parseInt(seconds));
            
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
            this.minute = new Minute(minutes, seconds);

            // 设置小时初值
            this._value =  minutes as number;
        }
        else{
            this.minute = new Minute(0,0);
            let f_param_type = typeof time[0];
            new ValueError("Type of first param is: "+f_param_type)
        }
    }

    // 正向行走（时针，即下一小时） 
    next():void{
        // 已达 59
        if(this._value >= 59){
            this._value = 0;     // 置空
            this.c.set();        // 标志进位
        }
        else{
            this._value = this._value + 1;
        }
    }

    // 逆向行走（时针，即上一小时） 
    last():void{
        // 已到 0
        if(this._value <= 0){
            this._value = 59;   // 置满
            this.c.set_back();  // 标志退位
        }
        else{
            this._value = this._value - 1;
        }
    }

    // 正向行走（分针，即下一分钟） 
    next_minute():void {
        // 掉用分的下一分钟方法
        this.minute.next();
        // 只需要观察分种是否进位
        if(this.minute.c._value === CarryEnum.CARRY){
            // 先进位到小时，即求下一小时
            this.next();
            // 再清空分钟的进位标志
            this.minute.c.clear()
        }
    }


    // 逆向行走（分针，即上一分钟） 
    last_minute():void {
        // 掉用分的上一分钟方法
        this.minute.last();
        // 只需要观察分种是否退位
        if(this.minute.c._value === CarryEnum.BACK){
            // 先求上一小时
            this.last();
            // 再清空分钟的进位标志
            this.minute.c.clear()
        }
    }


    // 正向行走（秒针，即下一秒） 
    next_second():void {
        // 掉用分的下一秒方法
        this.minute.next_second();
        // 只需要观察分种是否进位
        if(this.minute.c._value === CarryEnum.CARRY){
            // 先进位到小时，即求下一小时
            this.next();
            // 再清空分钟的进位标志
            this.minute.c.clear()
        }
    }

    // 逆向行走（秒针，即上一秒） 
    last_second():void {
        // 调用分钟上一秒方法
        this.minute.last_second()
        // 只需要观察分种是否退位
        if(this.minute.c._value === CarryEnum.BACK){
            // 先求上一小时
            this.last();
            // 再清空分钟的进位标志
            this.minute.c.clear()
        }
    }

    start(func: Function, ...params: any[]):void{
        let that = this;
        setInterval((...params) => {
            that.next_second();
            func(...params);
        },1000,...params);
    }

    print():void{
        let temp = this._value.toString() + ":" + this.minute._value.toString() + ":" + this.minute.second._value.toString();
        console.log(temp);
    }

    get_value():string{
        let h = (this._value).toString();
        if(h.length === 1){
            h = "0" + h;
        }
        return h + ":" + this.minute.get_value();
    }

    get_hour():number{
        return this._value;
    }

    get_minute():number{
        return this.minute.get_minute();
    }

    get_second():number{
        return this.minute.get_second();
    }

}

// 日期计数器 
class Date_ {
    year:number
    month:number
    day:number

    constructor(date:undefined);
    constructor(date:string);
    constructor(date:[number, number, number]); 
    constructor(date:undefined | string | number[]) {
        // 初始化为当前日期
        if(date == undefined){
            let [y, m, d] = new Date().toString().split(" ")[0].split("/");
            this.year = parseInt(y);
            this.month = parseInt(m);
            this.day = parseInt(d);

            // 数据校验
            this._d_check();
        }
        // 以字符串初始化指定日期，例如 `2022/05/26`
        else if(typeof date === "string"){
            let [yyyy,mm,dd] = date.split("/");
            this.year = parseInt(yyyy);
            this.month = parseInt(mm);
            this.day = parseInt(dd);

            // 数据校验
            this._d_check();
        }
        // 以分别指定的指定年、月、日的形式初始化
        else if(typeof date[0] === "number"){
            this.year = date[0];
            this.month = date[1];
            this.day = date[2];

            // 数据校验
            this._d_check();
        }else{
            this.year = 0;
            this.month = 0;
            this.day = 0;
            let f_param_type = typeof date[0];
            new ValueError("Type of first param is: "+f_param_type)
        }
    }

    _d_check(){
        if (this.year <= 0) {
            console.log("year = "+this.year);
            new ValueError("Year must be greater than 0.")
        }
        if (this.month <= 0) {
            new ValueError("Month must be greater than 0.")
        }
        if (this.day <= 0) {
            new ValueError("Day must be greater than 0.")
        }
    }

    // 返回当前年份是否是闰年 
    is_leap_year():boolean{
        if((this.year % 4) === 0){
            return true;
        }else{
            return false;
        }
    }

    // 下一天（明天），返回一个新的 Date 对象 
    next():Date_{
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

    // 上一天（昨天），返回一个新的 Date 对象 
    last():Date_{
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

    // n 天前，返回一个新的 Date 对象 
    ndays_ago(n:number):Date_{
        let temp = new Date_([this.year, this.month, this.day]);
        for (let i in range([0, n])) {
            temp = temp.last();
        }
        return temp
    }

    // n 天后，返回一个新的 Date 对象 
    ndays_later(n:number):Date_{
        let temp = new Date_([this.year, this.month, this.day]);
        for (let i in range([0, n])) {
            temp = temp.next();
        }
        return temp
    }

    // 从当前开始，向后 n-1 个 Date 对象构成一个列表返回 
    ndaylist_next(n:number):Date[]{
        let today = new Date_([this.year, this.month, this.day]);
        let temp = new List();
        for (let i in range(n)) { 
            temp.add(today);
            today = today.next();
        }
        return temp
    }

    // 从当前开始，向前 n-1 个 Date 对象构成一个列表返回 
    ndaylist_last(n:number):Date[]{
        let today = new Date_([this.year, this.month, this.day]);
        let temp = new List();
        for (let i in range(n)) { 
            temp.add(today);
            today = today.last();
        }
        return temp
    }

    get_value():string{
        let m = this.month.toString()
        if(m.length === 1){
            m = "0" + m;
        }
        let d = this.day.toString()
        if(d.length === 1){
            d = "0" + d;
        }
        return this.year.toString() + "/" + m + "/" + d;
    }

    print():string{
        let temp = this.year.toString() + "/" + this.month.toString() + "/" + this.day.toString();
        console.log(temp);
        return temp
    }
}

// 日期时间计数器 
class DateTime {
    date:Date_
    time:Hour

    // 例如字符串 `2022/05/26 20:59:25`
    constructor(dtm:string){
        let [d, t] = dtm.split(" ");
        this.date = new Date_(d);
        this.time = new Hour(t);
    }

    // 上一秒，可用作秒倒计时器 
    last_second():void{
        this.time.last_second();
        // 若产生退位
        if(this.time.c._value === CarryEnum.BACK){
            // 完成从时间到日期的退位
            this.date.last();
            // 清空退位标志
            this.time.c.clear();
        }
    }

    // 下一秒，可用作秒计时器 
    next_second():void{
        this.time.next_second();
        if(this.time.c._value === CarryEnum.CARRY){
            this.date.next();
            this.time.c.clear();
        }
    }

    // 上一分钟，可用作分倒计时器 
    last_minute():void{
        this.time.last_minute();
        if(this.time.c._value === CarryEnum.BACK){
            this.date.last();
            this.time.c.clear();
        }
    }

    // 下一分钟，可用作分计时器 
    next_minute():void{
        this.time.next_minute();
        if(this.time.c._value === CarryEnum.CARRY){
            this.date.next();
            this.time.c.clear();
        }
    }

    // 上一小时，可用作小时倒计时器 
    last_hour():void{
        this.time.last();
        // 若产生退位
        if(this.time.c._value === CarryEnum.BACK){
            // 完成从时间到日期的退位
            this.date.last();
            // 清空退位标志
            this.time.c.clear();
        }
    }

    // 下一小时，可用作小时计时器 
    next_hour():void{
        this.time.next();
        if(this.time.c._value === CarryEnum.CARRY){
            this.date.next();
            this.time.c.clear();
        }
    }

    last_day():void{
        this.date.last();
    }

    next_day():void{
        this.date.next();
    }

    next_month():void{
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

    next_year():void{
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

    start(func: Function, ...params: any[]):void{
        let that = this;
        setInterval((...params) => {
            that.next_second();
            func(...params);
        },1000,...params);
    }

    print():void{
        console.log(this.date.get_value() + " " + this.time.get_value());
    }

    get_value():string{
        return this.date.get_value() + " " + this.time.get_value();
    }
}

export {
    Second, Minute, Hour, Date_, DateTime
}

