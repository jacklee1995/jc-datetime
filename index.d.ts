/*****************************************************************************
 Mouule: jcstudio.datetime
 Author: jclee95
 Chinese name: 李俊才
 Email: 291148484@163.com
 Author blog: https://blog.csdn.net/qq_28550263?spm=1001.2101.3001.5343
 Copyright Jack Lee. All rights reserved.
 Licensed under the MIT License.
*****************************************************************************/
declare enum CarryEnum {
    CARRY = 1,
    NONE = 0,
    BACK = 2
}
declare class Carry {
    _value: any;
    constructor(b: CarryEnum | undefined);
    set(): void;
    set_back(): void;
    clear(): void;
    get_state(): number;
}
declare class Second {
    _value: number;
    c: Carry;
    constructor(s: number);
    next(): void;
    last(): void;
    start(func: Function, ...params: any[]): void;
    print(): void;
    get_value(): string;
}
declare class Minute {
    _value: number;
    c: Carry;
    second: Second;
    constructor(m: number, s: number);
    next(): void;
    last(): void;
    next_second(): void;
    last_second(): void;
    print(): void;
    get_value(): string;
    get_minute(): number;
    get_second(): number;
    start(func: Function, ...params: any[]): void;
}
declare class Hour {
    _value: number;
    c: Carry;
    minute: Minute;
    constructor(time: undefined);
    constructor(time: string);
    constructor(time: [number, number, number]);
    next(): void;
    last(): void;
    next_minute(): void;
    last_minute(): void;
    next_second(): void;
    last_second(): void;
    start(func: Function, ...params: any[]): void;
    print(): void;
    get_value(): string;
    get_hour(): number;
    get_minute(): number;
    get_second(): number;
}
declare class Date_ {
    year: number;
    month: number;
    day: number;
    constructor(date: undefined);
    constructor(date: string);
    constructor(date: [number, number, number]);
    _d_check(): void;
    is_leap_year(): boolean;
    next(): Date_;
    last(): Date_;
    ndays_ago(n: number): Date_;
    ndays_later(n: number): Date_;
    ndaylist_next(n: number): Date[];
    ndaylist_last(n: number): Date[];
    get_value(): string;
    print(): string;
}
declare class DateTime {
    date: Date_;
    time: Hour;
    constructor(dtm: string);
    last_second(): void;
    next_second(): void;
    last_minute(): void;
    next_minute(): void;
    last_hour(): void;
    next_hour(): void;
    last_day(): void;
    next_day(): void;
    next_month(): void;
    next_year(): void;
    start(func: Function, ...params: any[]): void;
    print(): void;
    get_value(): string;
}
export { Second, Minute, Hour, Date_, DateTime };
