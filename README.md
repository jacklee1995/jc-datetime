# jc-datetime

A Javascript/Node datetime tool.

`<b><font color="blue" size="16">`目录 `</font></b>`

[1. 安装](#1)

[2. 使用教程](#2)

- [2.1 进位器](#2-1)
  - [2.1.1 进位器概念](#2-1-1)
  - [2.1.2 进位器枚举值](#2-1-2)
- [2.2 秒计数器 Second](#2-2)
  - [2.2.1 Second 的引入](#2-2-1)
  - [2.2.2 Second 对象的构造器](#2-2-2)
  - [2.2.3 Second 对象的属性](#2-2-3)
  - [2.2.4 Second 对象的方法](#2-2-4)
- [2.3 分计数器 Minute](#2-3)
  - [2.3.1 Minute 的引入](#2-3-1)
  - [2.3.2 Minute 对象的构造器](#2-3-2)
  - [2.3.3 Minute 对象的属性](#2-3-3)
  - [2.3.4 Minute 对象的方法](#2-3-4)
- [2.4 小时计数器 Hour](#2-4)
  - [2.4.1 Hour 的引入](#2-4-1)
  - [2.4.2 Hour 对象的构造器](#2-4-2)
  - [2.4.3 Hour 对象的属性](#2-4-3)
  - [2.4.4 Hour 对象的方法](#2-4-4)
    - [to_last_second：拨到上一秒](#2-4-4-1)
    - [to_next_second：拨到下一秒](#2-4-4-2)
    - [to_last_minute：拨到上一分钟](#2-4-4-3)
    - [to_next_minute：拨到下一分钟](#2-4-4-4)
    - [to_last：拨到上一小时](#2-4-4-5)
    - [to_next：拨到下一小时](#2-4-4-6)
    - [set_locale_time：同步到本地时间](#2-4-4-7)
    - [start：开始计时](#2-4-4-8)
- [2.5 日期器 Date_](#2-5)
  - [2.5.1 Date_ 的引入](#2-5-1)
  - [2.5.2 `Date_` 对象的构造器](#2-5-2)
  - [2.5.3 `Date_` 对象的属性](#2-5-3)
  - [2.5.4 `Date_` 对象的方法](#2-5-4)
    - [is_leap_year：当前实例的日期值是否是闰年](#2-5-4-1)
    - [to_next：时间拨到明天](#2-5-4-2)
    - [to_last：时间拨到昨天](#2-5-4-3)
    - [ndays_ago：当前实例的日期值的 n 天前](#2-5-4-4)
    - [ndays_later：当前实例的日期值的 n 天后](#2-5-4-5)
    - [ndaylist_next：向后 n-1 个 Date_ 对象构成一个列表返回](#2-5-4-6)
    - [ndaylist_last：当前实例的日期值](#2-5-4-7)
    - [get_value：返回当前实例的日期值](#2-5-4-8)
  - [2.5.5 `Date_` 对象存取器](#2-5-5)
- [2.6 期日时间对象 DateTime](#2-6)
  - [2.6.1 DateTime 的引入](#2-6-1)
  - [2.6.2 `DateTime` 对象的构造器](#2-6-2)
  - [2.6.3 `DateTime` 对象的方法](#2-6-3)
    - [to_last_second: 拨到上一秒](#2-6-3-1)
    - [to_next_second: 拨到下一秒](#2-6-3-2)
    - [to_last_minute: 拨到上一分钟](#2-6-3-3)
    - [to_next_minute: 拨到下一分钟](#2-6-3-4)
    - [to_last_hour:  拨到上一小时](#2-6-3-5)
    - [to_next_hour:  拨到下一小时](#2-6-3-6)
    - [to_last_day:  拨到上一天](#2-6-3-7)
    - [to_next_day:  拨到下一天](#2-6-3-8)
    - [to_next_month: 拨到下个月的这个时候](#2-6-3-9)
    - [to_next_year: 拨到下一年的这个时候](#2-6-3-10)
    - [start: 开启计时](#2-6-3-11)
- [2.7 独立的函数接口](#2-7)
  - [引入方式](#2-7-1)
  - [get_days 函数](#2-7-2)
  - [is_leap_year 函数](#2-7-3)
  - [is_big_month 函数](#2-7-4)
  - [get_calendar 函数](#2-7-5)
  - [datelist 函数](#2-7-6)
  - [next_month 函数](#2-7-7)
  - [next_day 函数](#2-7-8)
  - [last_day 函数](#2-7-9)
- [2.8 关于 List 对象的说明](#2-8)

<div id="1"></div>

# [1. 安装](#1)

可以使用 npm 进行安装：

```shell
npm install jc-datetime
```

或者使用 yarn 进行安装：

```shell
yarn add jc-datetime
```

<div id="2"></div>

# [2. 使用教程](#2)

该模块提供了 `Second`, Minute `, Hour`, Date_`, `DateTime` 五个对象，分别可以用于 秒、分、时、日期、日期时间的处理。

<div id="2-1"></div>

## [2.1 进位器](#2-1)

<div id="2-1-1"></div>

### [2.1.1 进位器概念](#2-1-1)

进位器是一个未直接暴露出来的对象，但是在 `Second`, Minute `, Hour` 中都将其引用为自身的参数。顾名思义，进位器是用以标志是否进位和进位的方式的对象，它用于标志当前计数是否已经溢出。溢出有两种形式，一种是正向计数时超出计数器的计数满值，我们将其称之为 **进位**。另一种时反向计数时直到本位为 `0` 后，再一次到达满值时的溢出，我们将其称之为 **退位**。

进位器对象 Carry 声明如下：

```ts
declare class Carry {
    _value: any;
    constructor(b?: CarryEnum | undefined);
    set(): void;
    set_back(): void;
    clear(): void;
    get_state(): number;
}
```

其中：

| 方法名              | 描述           | 返回值类型 |
| :------------------ | :------------- | :--------- |
| **set**       | 设置进位       | `void`   |
| **set_back**  | 设置退位       | `void`   |
| **clear**     | 清空标志       | `void`   |
| **get_state** | 获取进位器状态 | `number` |

其中进位器的状态是一个枚举，它有三个枚举值：`CarryEnum.CARRY`、`CarryEnum.NONE`、`CarryEnum.BACK` 分别表示 有进位、无进退位、有退位。

<div id="2-1-2"></div>

### [2.1.2 进位器枚举值](#2-1-2)

在某些时候可能需要使用 Carry 的 `get_state`方法以确定当前进位器的状态，即确定是 CarryEnum 的哪一个值。 CarryEnum 是 Typescript 语法表示的枚举，他有三个枚举值，即 `CarryEnum.CARRY`、`CarryEnum.NONE`、`CarryEnum.BACK`，分别对应于数字 1、0、2：

| 枚举值 | 初始化值 |
|:-|:-|
| CarryEnum.CARRY | 1 |
| CarryEnum.NONE | 0 |
| CarryEnum.BACK | 2 |

<div id="2-2"></div>

## [2.2 秒计数器 Second](#2-2)

```ts
declare class Second {
    private _value;
    c: Carry;
    /**
     * @param s 初始秒数，范围为 0~59
     */
    constructor(s?: number);
    /**
     * 正向行走 1 秒（下一秒）
     */
    next(): void;
    /**逆向行走 1 秒（上一秒） */
    last(): void;
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
     * 获取字符串格式的当前秒计数值
     * @returns 被自动补 '0' 的字符串
     * @deprecated since v1.0.6, use getter value() instead.
     */
    get_value(): string;
}
```

<div id="2-2-1"></div>

### [2.2.1 `Second` 的引入](#2-2-1)

可以通过如下方式来引入 Second 对象：

```js
import { Second } from 'jc-datetime'
```

<div id="2-2-2"></div>

### [2.2.2 `Second` 对象的构造器](#2-2-2)

```
Second(s: number=0)
```

| 参数 | 类型   | 默认值 | 描述         |
| :--- | :----- | :----- | :----------- |
| s    | number | 0      | 初始化的秒值 |

<div id="2-2-3"></div>

### [2.2.3 `Second` 对象的属性](#2-2-3)

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。

<div id="2-2-4"></div>

### [2.2.4 `Second` 对象的方法](#2-2-4)

| 方法名              | 描述       | 返回值     |
| :------------------ | :--------- | :--------- |
| **next**      | 下一秒     | `void`   |
| **last**      | 上一秒     | `void`   |
| **start**     | 开始计数   | `void`   |
| **print**     | 打印时间   | `void`   |
| **get_value** | 获取时间值 | `string` |

#### next 方法

```js
let s = new Second(59);
s.print();
s.next();
s.print();
```

`out[]:`

```
59
00
```

#### last 方法

```js
let s = new Second(0);
s.print();
s.last();
s.print();
```

```
00
59
```

#### start 方法

调用 start 方法将启动一个计数器，它每秒使当前 Second 对象实例的计数值增加 1 秒。

```ts
let s = new Second(0);
s.start(()=>{
    s.print()
},s)
```

![WindowsTerminal_lQoPcNRGaN](https://user-images.githubusercontent.com/65340846/192085744-db30758c-9f5c-4555-a915-fde0fe457e0b.gif)

#### get_value 方法

该方法返回表示秒值得字符串，如果秒值只有一位，则会被自动补 0。

<div id="2-3"></div>

## [2.3 分计数器 Minute](#2-3)

```ts

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
     * @since v1.0.6
     */
    set seconds(seconds: number);
    /**
     * 获取秒
     * @since v1.0.6
     */
    get seconds(): number;
    /**
     * 设置分
     * @param {number} seconds Number of minutes.
     * @since v1.0.6
     */
    set minutes(minutes: number);
    /**
     * 获取分
     * @since v1.0.6
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
     * @deprecated since v1.0.6
     */
    get_minute(): number;
    get minute(): number;
    set minute(minute: number);
    /**
     * 返回秒数值
     * @deprecated since v1.0.6
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
```

<div id="2-3-1"></div>

### [2.3.1 `Minute` 的引入](#2-3-1)

```js
import { Minute } from 'jc-datetime'
```

<div id="2-3-2"></div>

### [2.3.2 `Minute` 对象的构造器](#2-3-2)

```js
constructor(m:number=0,s:number=0)
```

| 参数 | 描述 | 类型   | 默认值 |
| :--- | :--- | :----- | :----- |
| m    | 分   | number | 0      |
| s    | 秒   | number | 0      |

如果没有指定任何参数，将默认初始为 0 ，例如：

```ts
let m = new Minute();
m.print();
```

`Out[]:`

```
00:00
```

也可以初始化一个指定的值：

```ts
let m = new Minute(29,59);
m.print();
```

`Out[]:`

```
29:59
```

<div id="2-3-3"></div>

### [2.3.3 Minute 对象的属性](#2-3-3)

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。

<div id="2-3-4"></div>

### [2.3.4 Minute 对象的方法](#2-3-4)

#### next 方法

下一分钟，就地更改当前对象。

```ts
next():void
```

例如：

```ts
let m = new Minute(58,0);
m.print();
m.next();
m.print();
m.next();
m.print();
```

`Out[]:`

```
58:00
59:00
00:00
```

#### last 方法

上一分钟，就地更改当前对象。

```ts
last():void
```

例如：

```ts
let m = new Minute(0,0);
m.print();
m.last();
m.print();
```

`Out[]:`

```
00:00
59:00
```

#### next_second 方法

下一秒种，就地更改当前对象。

```ts
next_second():void
```

例如：

```ts
let m = new Minute(0,0);
m.next_second();
m.print();
```

`Out[]:`

```
00:01
```

#### last_second 方法

上一秒种，就地更改当前对象。

```ts
last_second():void
```

例如：

```ts
let m = new Minute(0,0);
m.last_second();
m.print();
```

`Out[]:`

```
59:59
```

#### get_value 方法

获取当前计数值

```ts
get_value():string
```

例如：

```ts
let m = new Minute(0,0);
m.last_second();
console.log(m.get_value());
```

`Out[]:`

```
59:59
```

#### get_minute 方法

获取分钟

```ts
get_minute():number
```

例如：

```ts
let m = new Minute(17, 46);
console.log(m.get_minute());
```

`Out[]:`

```
17
```

#### get_second 方法

获取秒种值

```ts
get_second():number
```

例如：

```ts
let m = new Minute(17, 46);
console.log(m.get_second());
```

`Out[]:`

```
46
```

#### start 方法

开始计时。

```ts
start(func: Function, ...params: any[]):void
```

例如：

```ts
let m = new Minute(17,46);
m.start(()=>{
    m.print()
},m)
```

<div id="2-4"></div>

## [2.4 小时计数器 Hour](#2-4)

```ts
declare class Hour {
    private _value;
    c: Carry;
    minute: Minute;
    constructor(time: string);
    constructor(time: []);
    constructor(time: [number, number, number]);
    /**下一小时，就地修改 */
    next(): void;
    /**
     * 上一小时，就地修改
     */
    last(): void;
    /**下一分钟，就地修改 */
    next_minute(): void;
    /**上一分钟，就地修改 */
    last_minute(): void;
    /**下一秒，就地修改 */
    next_second(): void;
    /**上一秒，就地修改 */
    last_second(): void;
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
     */
    get_value(): string;
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
```

<div id="2-4-1"></div>

### [2.4.1 Hour 的引入](#2-4-1)

```js
import { Hour } from 'jc-datetime'
```

<div id="2-4-2"></div>

### [2.4.2 Hour 对象的构造器](#2-4-2)


```js
constructor(time: string);
constructor(time: []);
constructor(time: [number, number, number]); 
```

#### 使用小时字符串构造
例如：
```ts
let h = new Hour("21:25:00");
h.print();
```
`Out[]:`
```
21:25:00
```

#### 使用空数组构造
使用空数组将初始化为当前的系统时间，比如我现在是 21:14：
```ts
let h = new Hour([]);
h.print();
```
`Out[]:`
```
21:14:15
```

#### 使用数字数组构造
```ts
let h = new Hour([1, 30, 0]);
h.print();
```
`Out[]:`
```
01:30:00
```

<div id="2-4-3"></div>

### [2.4.3 Hour 对象的属性](#2-4-3)

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。


<div id="2-4-4"></div>

### [2.4.4 Hour 对象的方法](#2-4-4)
<div id="2-4-4-1"></div>

#### [to_last_second：拨到上一秒](#2-4-4-1)

```ts
let h = new Hour("00:00:00");
h.to_last_second();
h.print();
```
`Out[]:`
```
59:59:59
```


<div id="2-4-4-2"></div>

#### [to_next_second：拨到下一秒](#2-4-4-2)

```ts
let h = new Hour("59:59:59");
h.to_next_second();
h.print();
```
`Out[]:`
```
00:00:00
```



<div id="2-4-4-3"></div>

#### [to_last_minute：拨到上一分钟](#2-4-4-3)

```ts
let h = new Hour("00:00:00");
h.to_last_minute();
h.print();
```
`Out[]:`
```
59:59:00
```


<div id="2-4-4-4"></div>

#### [to_next_minute：拨到下一分钟](#2-4-4-4)

```ts
let h = new Hour("00:59:00");
h.to_next_minute();
h.print();
```
`Out[]:`
```
01:00:00
```


<div id="2-4-4-5"></div>

#### [to_last：拨到上一小时](#2-4-4-5)

```ts
let h = new Hour("00:00:00");
h.to_last();
h.print();
```
`Out[]:`
```
59:00:00
```


<div id="2-4-4-6"></div>

#### [to_next：拨到下一小时](#2-4-4-6)

```ts
let h = new Hour("59:00:00");
h.to_next();
h.print();
```
`Out[]:`
```
00:00:00
```



<div id="2-4-4-7"></div>

#### [set_locale_time：同步到本地时间](#2-4-4-7)

```ts
let h = new Hour("00:00:00");
h.set_locale_time(); // 我的当前时间是 21:52:47
h.print();
```
`Out[]:`
```
21:52:47
```



<div id="2-4-4-8"></div>

#### [start：开始计时](#2-4-4-8)

```ts
let h = new Hour("00:00:00");
h.start(()=>{
    h.print()
},h)
```


<div id="2-5"></div>

## [2.5 日期器 Date_](#2-5)

```ts
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
    /**
     * 返回当前年份是否是闰年
     * @returns 一个表示是否是闰年的布尔值
     */
    is_leap_year(): boolean;
    /**
     * 下一天（明天）
     * @returns {Date_} 一个新的 Date_ 对象
     */
    next(): Date_;
    /**
     * 上一天（昨天）
     * @returns {Date_} 一个新的 Date_ 对象
     */
    last(): Date_;
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
     * @since v1.0.6
     */
    get year(): number;
    /**
     * 设置 年
     * @since v1.0.6
     */
    set year(year: number);
    /**
     * 获取 月
     * @since v1.0.6
     */
    get month(): number;
    /**
     * 设置 月
     * @since v1.0.6
     */
    set month(month: number);
    /**
     * 获取 日
     * @since v1.0.6
     */
    get day(): number;
    /**
     * 设置 日
     * @since v1.0.6
     */
    set day(day: number);
    /**
     * 获取日期字符串
     * @since v1.0.6
     */
    get value(): string;
    /**
     * 获取日期字符串
     * @returns {string} 自动补 0 的日期字符串，例如 `2022/09/23`
     * @deprecated since v1.03, please use getter value() instead
     */
    get_value(): string;
    /**打印日期字符串 */
    print(): string;
}
```

<div id="2-5-1"></div>

### [2.5.1 Date_ 的引入](#2-5-1)

```js
import { Date_ } from 'jc-datetime'
```

<div id="2-5-2"></div>

### [2.5.2 `Date_` 对象的构造器](#2-5-2)

```ts
constructor(param: string);
constructor(param: []);
constructor(param: [string]);
constructor(param: [number, number, number]); 
```

你可以使用一个字符串来初始化 Date_对象，字符串需要指定年（yyyy）、月（MM）、日（DD），并使用“/”进行分隔。例如：

```js
let d = new Date_("2022/05/26");
d.print();
```

`Out[]:`

```
2022/5/26
```

也可以为这个字符串套上一个 `[]`，使之成为一个字符串数组参数，这有完全相同的效果：

```js
let d = new Date_(["2022/05/26"]);
d.print();
```

`Out[]:`

```
2022/5/26
```

或者以三个数字构成的数组分别给出年、月、日的数值，例如：

```js
let d = new Date_([2022,5,26]);
d.print();
```

`Out[]:`

```
2022/5/26
```

如果你传入的是一个空数组，则自动初化为当前的日期，例如我电脑当前的系统时间的日期为 2022年8月25日：

```js
let d = new Date_([]);
d.print();
```

`Out[]:`

```
2022/8/25
```

<div id="2-5-3"></div>

### [2.5.3 `Date_` 对象的属性](#2-5-3)

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。


<div id="2-5-4"></div>

### [2.5.4 `Date_` 对象的方法](#2-5-4)
<div id="2-5-4-1"></div>

#### [is_leap_year：当前实例的日期值是否是闰年](#2-5-4-1)

例如：

```js
let d = new Date_([]);
d.print();
console.log(d.is_leap_year());
```

`Out[]:`

```
2022/8/25
false
```
<div id="2-5-4-2"></div>

#### [to_next：时间拨到明天](#2-5-4-2)

```ts

```
`Out[]:`
```

```
<div id="2-5-4-3"></div>

#### [to_last：时间拨到昨天](#2-5-4-3)

```ts

```
`Out[]:`
```

```
<div id="2-5-4-4"></div>

#### [ndays_ago：当前实例的日期值的 n 天前](#2-5-4-4)

例如：

```js
let d = new Date_("2021/01/01");
let nAgo = d.ndays_ago(32);
nAgo.print();
```

`Out[]:`

```
2020/11/30
```
<div id="2-5-4-5"></div>

#### [ndays_later：当前实例的日期值的 n 天后](#2-5-4-5)

例如：

```js
let d = new Date_("2021/01/01");
let nAgo = d.ndays_later(59);
nAgo.print();
```

`Out[]:`

```
2021/3/1
```
<div id="2-5-4-6"></div>

#### [ndaylist_next：向后 n-1 个 Date_ 对象构成一个列表返回](#2-5-4-6)

例如：

```js
let d = new Date_("2021/01/01");
let nLextNext = d.ndaylist_next(32);
console.log(nLextNext);
```

`Out[]:`

```
List(32) [
  Date_ { year: 2021, month: 1, day: 1 },
  Date_ { year: 2021, month: 1, day: 2 },
  Date_ { year: 2021, month: 1, day: 3 },
  Date_ { year: 2021, month: 1, day: 4 },
  Date_ { year: 2021, month: 1, day: 5 },
  Date_ { year: 2021, month: 1, day: 6 },
  Date_ { year: 2021, month: 1, day: 7 },
  Date_ { year: 2021, month: 1, day: 8 },
  Date_ { year: 2021, month: 1, day: 9 },
  Date_ { year: 2021, month: 1, day: 10 },
  Date_ { year: 2021, month: 1, day: 11 },
  Date_ { year: 2021, month: 1, day: 12 },
  Date_ { year: 2021, month: 1, day: 13 },
  Date_ { year: 2021, month: 1, day: 14 },
  Date_ { year: 2021, month: 1, day: 15 },
  Date_ { year: 2021, month: 1, day: 16 },
  Date_ { year: 2021, month: 1, day: 17 },
  Date_ { year: 2021, month: 1, day: 18 },
  Date_ { year: 2021, month: 1, day: 19 },
  Date_ { year: 2021, month: 1, day: 20 },
  Date_ { year: 2021, month: 1, day: 21 },
  Date_ { year: 2021, month: 1, day: 22 },
  Date_ { year: 2021, month: 1, day: 23 },
  Date_ { year: 2021, month: 1, day: 24 },
  Date_ { year: 2021, month: 1, day: 25 },
  Date_ { year: 2021, month: 1, day: 26 },
  Date_ { year: 2021, month: 1, day: 27 },
  Date_ { year: 2021, month: 1, day: 28 },
  Date_ { year: 2021, month: 1, day: 29 },
  Date_ { year: 2021, month: 1, day: 30 },
  Date_ { year: 2021, month: 1, day: 31 },
  Date_ { year: 2021, month: 2, day: 1 }
]
```
<div id="2-5-4-7"></div>

#### [ndaylist_last：当前实例的日期值](#2-5-4-7)

例如：

```js
let d = new Date_("2020/03/6");
let nLextLast = d.ndaylist_last(9);
console.log(nLextLast);
```

`Out[]:`

```
List(9) [
  Date_ { year: 2020, month: 3, day: 6 },
  Date_ { year: 2020, month: 3, day: 5 },
  Date_ { year: 2020, month: 3, day: 4 },
  Date_ { year: 2020, month: 3, day: 3 },
  Date_ { year: 2020, month: 3, day: 2 },
  Date_ { year: 2020, month: 3, day: 1 },
  Date_ { year: 2020, month: 2, day: 29 },
  Date_ { year: 2020, month: 2, day: 28 },
  Date_ { year: 2020, month: 2, day: 27 }
]
```
<div id="2-5-4-8"></div>

#### [get_value：返回当前实例的日期值](#2-5-4-8)

> deprecated since v1.03, please use getter `value()` instead


例如：

```js

```



### [2.5.5 `Date_` 对象存取器](#2-5-5)

#### year

> since v1.0.6

作为 setter 使用：

```ts

```

作为 getter 使用：

```ts

```

#### month

> since v1.0.6
> 作为 setter 使用：

```ts

```

作为 getter 使用：

```ts

```

#### day

> since v1.0.6
> 作为 setter 使用：

```ts

```

作为 getter 使用：

```ts

```

#### value

> since v1.0.6
> 作为 setter 使用：

```ts

```

作为 getter 使用：

```ts

```

#### next：后一天对应的新 Date_ 对象

返回当前实例的日期值的下一天
例如：

```js
let d = new Date_("2019/12/31");
let nextDay = d.next;
nextDay.print();
```

`Out[]:`

```
2020/1/1
```

#### last：前一天对应的新 Date_ 对象

例如：

```js
let d = new Date_("2019/01/01");
let lastDay = d.last();
lastDay.print();
```

`Out[]:`

```
2018/12/31
```

<div id="2-6"></div>

## [2.6 期日时间对象 DateTime](#2-6)

```ts
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
     * 下一秒，就地修改
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
    next_day(): void;
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
```

<div id="2-6-1"></div>

### [2.6.1 DateTime 的引入](#2-6-1)

```js
import { DateTime } from 'jc-datetime'
```

<div id="2-6-2"></div>

### [2.6.2 `DateTime` 对象的构造器](#2-6-2)

```ts
constructor(param: []);
constructor(param:string);
constructor(param:[date:Date_, time:Hour]);
```

通过传入日期时间字符串构造：

```ts
let dt = new DateTime("2022/05/26 20:59:25");
dt.print();
```

`Out[]:`

```
2022/05/26 20:59:25
```

也可以通过传入一个空数组，初始化为当前的系统时间，比如我当前系统时间是2022年8月25日12点22，则：

```ts
let dt = new DateTime([])
dt.print();
```

`Out[]:`

```
2022/08/25 12:22:14
```

你还可以先构造一个 Date_ 对象的实例 和 一个 Hour 对象的实例，再将他们作为参数传入构造器

<div id="2-6-3"></div>

### [2.6.3 `DateTime` 对象的方法](#2-6-3)

<div id="2-6-3-1"></div>

#### [to_last_second: 拨到上一秒](#2-6-3-1)
例如：

```ts
let dt = new DateTime("2022/01/01 00:00:00");
dt.to_last_second();
dt.print()
```
`Out[]:`
```
2021/12/31 59:59:59
```

<div id="2-6-3-2"></div>

#### [to_next_second: 拨到下一秒](#2-6-3-2)
例如：

```ts
let dt = new DateTime("2021/12/31 59:59:59");
dt.to_next_second();
dt.print();
```
`Out[]:`
```
2022/01/01 00:00:00
```

<div id="2-6-3-3"></div>


#### [to_last_minute: 拨到上一分钟](#2-6-3-3)
例如：
```ts
let dt = new DateTime("2022/01/01 00:00:00");
dt.to_last_minute();
dt.print();
```
`Out[]:`
```
2021/12/31 59:59:00
```

<div id="2-6-3-4"></div>

#### [to_next_minute: 拨到下一分钟](#2-6-3-4)
例如：
```ts
let dt = new DateTime("2021/12/31 59:59:00");
dt.to_next_minute();
dt.print();
```
`Out[]:`
```
2022/01/01 00:00:00
```

<div id="2-6-3-5"></div>

#### [to_last_hour:  拨到上一小时](#2-6-3-5)
例如：
```ts
let dt = new DateTime("2022/01/01 00:00:00");
dt.to_last_hour();
dt.print();
```
`Out[]:`
```
2021/12/31 59:00:00
```

<div id="2-6-3-6"></div>

#### [to_next_hour:  拨到下一小时](#2-6-3-6)
例如：
```ts
let dt = new DateTime("2021/12/31 59:00:00");
dt.to_next_hour();
dt.print();
```
`Out[]:`
```
2022/01/01 00:00:00
```

<div id="2-6-3-7"></div>

#### [to_last_day:  拨到上一天](#2-6-3-7)
例如：
```ts
let dt = new DateTime("2020/01/01 00:00:00");
dt.to_last_day();
dt.print();
```
`Out[]:`
```
2019/12/31 00:00:00
```

<div id="2-6-3-8"></div>

#### [to_next_day:  拨到下一天](#2-6-3-8)
例如：
```ts
let dt = new DateTime("2020/02/29 01:02:03");
dt.to_next_day();
dt.print();
```
`Out[]:`
```
2020/03/01 01:02:03
```

<div id="2-6-3-9"></div>

#### [to_next_month: 拨到下个月的这个时候](#2-6-3-9)
例如：
```ts
let dt = new DateTime("2020/01/29 12:06:00");
dt.to_next_month();
dt.print();
```
`Out[]:`
```
2020/02/29 12:06:00
```

再例如
```ts
let dt = new DateTime("2020/01/29 12:00:00");
dt.to_next_month();
dt.print();
```
`Out[]:`
```
2020/03/02 12:00:00
```

<div id="2-6-3-10"></div>

#### [to_next_year: 拨到下一年的这个时候](#2-6-3-10)
例如：
```ts
let dt = new DateTime("2020/01/31 12:06:00");
dt.to_next_year();
dt.print();
```
`Out[]:`
```
2021/01/31 12:06:00
```

<div id="2-6-3-11"></div>

#### [start: 开启计时](#2-6-3-11)
例如：
```ts
let dt = new DateTime("2020/01/01 00:00:00");
dt.start(()=>{
    dt.print()
},dt)
```



<div id="2-7"></div>

## [2.7 独立的函数接口](#2-7)

> v1.03

除了上面提到的这几个对象外，本模块还提供了一些独立的函数。他们可以被视作一些小工具，以补充功能。

| 函数         | 描述                                   |
| :----------- | :------------------------------------- |
| is_leap_year | 是否是闰年                             |
| is_big_month | 是否是大月                             |
| get_calendar | 获取某月日历列表                       |
| get_days     | 获取某个月的天数                       |
| datelist     | 获取某两个日期间所有日期构成的日期列表 |
| next_month   | 下个月                                 |
| next_day     | 明天（下一天）                         |
| last_day     | 昨天（上一天）                         |

<div id="2-7-1"></div>

### [2.7.1 引入方式](#2-7-1)

你可以根据需要，参考如下方式进行引入：

```js
import { 
    is_leap_year, is_big_month, 
    get_days, get_calendar, datelist, 
    next_day, last_day, next_month 
} from 'jc-datetime'
```

<div id="2-7-2"></div>

### [get_days 函数](#2-7-2)

```ts
/**
 * 返回某个月的天数
 * @param {string} yearmonth 表示某个月的字符串，形如 `2022/05/26`
 * @returns {number} 指定月份的日期
 */
get_days(yearmonth: string): number | undefined;
```

例如：

```js
for (let i = 1; i <= 12; i++) {
    let days = get_days(`2022/${i}`);
    console.log(i<10?`2022/0${i} 有 ${days} 天`:`2022/${i} 有 ${days} 天`);
} 
```

`out[]:`

```
2022/01 有 31 天
2022/02 有 28 天
2022/03 有 31 天
2022/04 有 30 天
2022/05 有 31 天
2022/06 有 30 天
2022/07 有 31 天
2022/08 有 31 天
2022/09 有 30 天
2022/10 有 31 天
2022/11 有 30 天
2022/12 有 31 天
```

<div id="2-7-3"></div>

### [is_leap_year 函数](#2-7-3)

```ts
/**
 * 判断某年是否是闰年
 * @param {number} year 年号值
 * @returns {boolean} 如果是闰年则返回 true
 */
is_leap_year(year: number): boolean;
```

例如：

```js
[1999,2000,2001,2020,2021,2022,3000].forEach(year => {
    let word = is_leap_year(year)?"润":"平";
    console.log(`${year} 年是${word}年`);
});
```

`out[]:`

```
1999 年是平年
2000 年是润年
2001 年是平年
2020 年是润年
2021 年是平年
2022 年是平年
3000 年是润年
```

<div id="2-7-4"></div>

### [is_big_month 函数](#2-7-4)

```ts
/**
 * 判断某个月是否是大月（31天的月）
 * @param {number} month 月号，如 `12`
 * @returns {boolean} 如果是大月则返回 true
 */
is_big_month(month: number): boolean;
```

```js
for (let i = 1; i <= 12; i++) {
    let isBigMonth = is_big_month(i);
    console.log(`${i}月是`+(isBigMonth?`大月`:`小月`));
} 
```

`out[]:`

```
1月是大月
2月是小月
3月是大月
4月是小月
5月是大月
6月是小月
7月是大月
8月是大月
9月是小月
10月是大月
11月是小月
12月是大月
```

<div id="2-7-5"></div>

### [get_calendar 函数](#2-7-5)

```ts
/**
 * 返回日历表
 * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
 * @returns {string[]}
 */
get_calendar(yearmonth: string): string[];
```

```js
let calendar = get_calendar("2022/02");
console.log(calendar);
```

`out[]:`

```
List(28) [
  '2022/02/01', '2022/02/02', '2022/02/03',
  '2022/02/04', '2022/02/05', '2022/02/06',
  '2022/02/07', '2022/02/08', '2022/02/09',
  '2022/02/10', '2022/02/11', '2022/02/12',
  '2022/02/13', '2022/02/14', '2022/02/15',
  '2022/02/16', '2022/02/17', '2022/02/18',
  '2022/02/19', '2022/02/20', '2022/02/21',
  '2022/02/22', '2022/02/23', '2022/02/24',
  '2022/02/25', '2022/02/26', '2022/02/27',
  '2022/02/28'
]
```

<div id="2-7-6"></div>

### [datelist 函数](#2-7-6)

```ts
static datelist(date_begin: string, date_end: string): List;
```

例如：

```js
let list = datelist("2022/01/29","2022/04/06")
console.log(list);
```

`out[]:`

```
List(120) [
  '2022/01/01', '2022/01/02', '2022/01/03', '2022/01/04', '2022/01/05',
  '2022/01/06', '2022/01/07', '2022/01/08', '2022/01/09', '2022/01/10',
  '2022/01/11', '2022/01/12', '2022/01/13', '2022/01/14', '2022/01/15',
  '2022/01/16', '2022/01/17', '2022/01/18', '2022/01/19', '2022/01/20',
  '2022/01/21', '2022/01/22', '2022/01/23', '2022/01/24', '2022/01/25',
  '2022/01/26', '2022/01/27', '2022/01/28', '2022/01/29', '2022/01/30',
  '2022/01/31', '2022/02/01', '2022/02/02', '2022/02/03', '2022/02/04',
  '2022/02/05', '2022/02/06', '2022/02/07', '2022/02/08', '2022/02/09',
  '2022/02/10', '2022/02/11', '2022/02/12', '2022/02/13', '2022/02/14',
  '2022/02/15', '2022/02/16', '2022/02/17', '2022/02/18', '2022/02/19',
  '2022/02/20', '2022/02/21', '2022/02/22', '2022/02/23', '2022/02/24',
  '2022/02/25', '2022/02/26', '2022/02/27', '2022/02/28', '2022/03/01',
  '2022/03/02', '2022/03/03', '2022/03/04', '2022/03/05', '2022/03/06',
  '2022/03/07', '2022/03/08', '2022/03/09', '2022/03/10', '2022/03/11',
  '2022/03/12', '2022/03/13', '2022/03/14', '2022/03/15', '2022/03/16',
  '2022/03/17', '2022/03/18', '2022/03/19', '2022/03/20', '2022/03/21',
  '2022/03/22', '2022/03/23', '2022/03/24', '2022/03/25', '2022/03/26',
  '2022/03/27', '2022/03/28', '2022/03/29', '2022/03/30', '2022/03/31',
  '2022/04/01', '2022/04/02', '2022/04/03', '2022/04/04', '2022/04/05',
  '2022/04/06', '2022/04/07', '2022/04/08', '2022/04/09', '2022/04/10',
  ... 20 more items
]
```

<div id="2-7-7"></div>

### [next_month 函数](#2-7-7)

```ts
static next_month(year: number, month: number): string;
```

例如：

```js
let nextmonth = next_month(2021,12);
console.log(nextmonth);
```

`out[]:`

```
2022/01
```

<div id="2-7-8"></div>

### [next_day 函数](#2-7-8)

```ts
/**
 * 明天
 * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
 * @returns
 */
next_day(yearmonth: string): string;
```

例如：

```js
let nextday = next_day("2020/02/29");
console.log(nextday);
```

`out[]:`

```
2020/03/01
```

<div id="2-7-9"></div>

### [last_day 函数](#2-7-9)

```ts
/**
 * 昨天
 * @param yearmonth 表示月份的字符串，形如 `2022/05/26`
 * @returns
 */
last_day(yearmonth: string): string;
```

例如：

```js
let lastday = last_day("2020/03/01");
console.log(lastday);
```

`out[]:`

```
2020/02/29
```

<div id="2-8"></div>

## [2.8 关于 List 对象的说明](#2-8)

在本模块中 List 是一个内部定义的数据容器，它继承于原生 JavaScript 的 Array 对象。一些返回一组值的方法，如 `dartelist()` ，所返回的都不是原生的 JavaScript Array而是 List。
