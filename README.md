# jc-datetime

<fieldset><legend>About jc-datetime...</legend>
<p><b>Author</b> : <a href="https://blog.csdn.net/qq_28550263?spm=1010.2135.3001.5343"><cite>李俊才 </cite></a></p>
<p><b>Email</b> : <a href="mailto:291148484@163.com"><cite>291148484@163.com</cite></a></p>
<p><b>Version</b> : <a>v0.0.11</a></p>
<p><b>home</b> : <a href="http://thispage.tech:9680/jclee1995/jc-datetime">http://thispage.tech:9680/jclee1995/jc-datetime</a></p>
<p><b>gitee</b> : <a href="https://gitee.com/jacklee1995/jc-datetime">https://gitee.com/jacklee1995/jc-datetime</a></p>
<p><b>github</b> : <a href="https://github.com/jacklee1995/jc-datetime">https://github.com/jacklee1995/jc-datetime</a></p>

<b>bref</b> :  <p> Jc-datetime is a date and time tool module, which provides a counter tool for date and time, and can be conveniently used for date and time calculation. Its main problems are such as finding the number of days in a certain year/month/day, the date of the day before, the day after or several days before and after, and the calculation of date and time such as waiting. It can be used in script programming with a lot of date and time calculation, especially in office automation.</p>
</fieldset><br>

[中文](readme_CN.md) | English

`<b><font color="blue" size="16">``目录 </font>``</b>`

[1. 安装](#1)

[2. 使用教程](#2)

- [2.1 进位器 和 计数器接口](#2-1)
  - [2.1.1 进位器概念](#2-1-1)
  - [2.1.2 进位器枚举值](#2-1-2)
  - [2.1.3 计数器接口](#2-1-3)
- [2.2 秒计数器 Second](#2-2)
  - [2.2.1 Second 的引入](#2-2-1)
  - [2.2.2 Second 对象的构造器](#2-2-2)
  - [2.2.3 Second 对象的属性](#2-2-3)
  - [2.2.4 Second 对象的方法](#2-2-4)
    - [2.2.4.1 to_last 方法](#2-2-4-1)
    - [2.2.4.2 to_next 方法](#2-2-4-2)
    - [2.2.4.3 start 方法](#2-2-4-3)
    - [2.2.4.4 print 方法](#2-2-4-4)
    - [2.2.4.5 get_value](#2-2-4-5)
    - [2.2.4.6 getter last](#2-2-4-6)
    - [2.2.4.7 getter next](#2-2-4-7)
    - [2.2.4.8 setter seconds](#2-2-4-8)
    - [2.2.4.9 getter seconds](#2-2-4-9)
    - [2.2.4.10 getter value](#2-2-4-10)
- [2.3 分计数器 Minute](#2-3)
  - [2.3.1 Minute 的引入](#2-3-1)
  - [2.3.2 Minute 对象的构造器](#2-3-2)
  - [2.3.3 Minute 对象的属性](#2-3-3)
  - [2.3.4 Minute 对象的方法和存取器](#2-3-4)
    - [2.3.4.1 to_last 方法](#2-3-4-1)
    - [2.3.4.2 to_next 方法](#2-3-4-2)
    - [2.3.4.3 to_last_second 方法](#2-3-4-3)
    - [2.3.4.4 to_next_second 方法](#2-3-4-4)
    - [2.3.4.5 print 方法](#2-3-4-5)
    - [2.3.4.6 get_value 方法](#2-3-4-6)
    - [2.3.4.7 start 方法](#2-3-4-7)
    - [2.3.4.8 getter last](#2-3-4-8)
    - [2.3.4.9 getter next](#2-3-4-9)
    - [2.3.4.10 setter seconds](#2-3-4-10)
    - [2.3.4.11 getter seconds](#2-3-4-11)
    - [2.3.4.12 setter minutes](#2-3-4-12)
    - [2.3.4.13 getter minutes](#2-3-4-13)
    - [2.3.4.14 getter value](#2-3-4-14)
- [2.4 小时计数器 Hour](#2-4)
  - [2.4.1 Hour 的引入](#2-4-1)
  - [2.4.2 Hour 对象的构造器](#2-4-2)
  - [2.4.3 Hour 对象的属性](#2-4-3)
  - [2.4.4 Hour 对象的方法](#2-4-4)
    - [2.4.4.1 to_last_second 方法](#2-4-4-1)
    - [2.4.4.2 to_next_second 方法](#2-4-4-2)
    - [2.4.4.3 to_last_minute 方法](#2-4-4-3)
    - [2.4.4.4 to_next_minute 方法](#2-4-4-4)
    - [2.4.4.5 to_last 方法](#2-4-4-5)
    - [2.4.4.6 to_next 方法](#2-4-4-6)
    - [2.4.4.7 set_locale_time 方法](#2-4-4-7)
    - [2.4.4.8 start 方法](#2-4-4-8)
    - [2.4.4.9 print 方法](#2-4-4-9)
    - [2.4.4.10 getter last](#2-4-4-10)
    - [2.4.4.11 getter next](#2-4-4-11)
    - [2.4.4.12 setter seconds](#2-4-4-12)
    - [2.4.4.13 getter seconds](#2-4-4-13)
    - [2.4.4.14 setter minutes](#2-4-4-14)
    - [2.4.4.15 getter minutes](#2-4-4-15)
    - [2.4.4.16 setter hours](#2-4-4-16)
    - [2.4.4.17 getter hours](#2-4-4-17)
- [2.5 日期器 Date_](#2-5)
  - [2.5.1 Date_ 的引入](#2-5-1)
  - [2.5.2 `Date_` 对象的构造器](#2-5-2)
  - [2.5.3 `Date_` 对象的属性](#2-5-3)
  - [2.5.4 `Date_` 对象的方法和存取器](#2-5-4)
    - [2.5.4.1 is_leap_year 方法](#2-5-4-1)
    - [2.5.4.2 to_next 方法](#2-5-4-2)
    - [2.5.4.3 to_last 方法](#2-5-4-3)
    - [2.5.4.4 ndays_ago 方法](#2-5-4-4)
    - [2.5.4.5 ndays_later 方法](#2-5-4-5)
    - [2.5.4.6 ndaylist_next 方法](#2-5-4-6)
    - [2.5.4.7 ndaylist_last](#2-5-4-7)
    - [2.5.4.8 get_value 方法](#2-5-4-8)
    - [2.5.4.9 print 方法](#2-5-4-9)
    - [2.5.4.10 getter next](#2-5-4-10)
    - [2.5.4.11 getter last](#2-5-4-11)
    - [2.5.4.12 getter year](#2-5-4-12)
    - [2.5.4.13 setter year](#2-5-4-13)
    - [2.5.4.14 getter month](#2-5-4-14)
    - [2.5.4.15 setter month](#2-5-4-15)
    - [2.5.4.16 getter day](#2-5-4-16)
    - [2.5.4.17 setter day](#2-5-4-17)
    - [2.5.4.18 getter value](#2-5-4-18)
- [2.6 期日时间对象 DateTime](#2-6)
  - [2.6.1 DateTime 的引入](#2-6-1)
  - [2.6.2 `DateTime` 对象的构造器](#2-6-2)
  - [2.6.3 `DateTime` 对象的方法和存取器](#2-6-3)
    - [2.6.3.1 to_last_second 方法](#2-6-3-1)
    - [2.6.3.2 to_next_second 方法](#2-6-3-2)
    - [2.6.3.3 to_last_minute 方法](#2-6-3-3)
    - [2.6.3.4 to_next_minute 方法](#2-6-3-4)
    - [2.6.3.5 to_last_hour 方法](#2-6-3-5)
    - [2.6.3.6 to_next_hour 方法](#2-6-3-6)
    - [2.6.3.7 to_last_day 方法](#2-6-3-7)
    - [2.6.3.8 to_next_day 方法](#2-6-3-8)
    - [2.6.3.9 to_next_month 方法](#2-6-3-9)
    - [2.6.3.10 to_next_year 方法](#2-6-3-10)
    - [2.6.3.11 start 方法](#2-6-3-11)
    - [2.6.3.12 print 方法](#2-6-3-12)
    - [2.6.3.13 getter last](#2-6-3-13)
    - [2.6.3.14 getter next](#2-6-3-14)
- [2.7 独立的函数接口](#2-7)
  - [2.7.1 引入方式](#2-7-1)
  - [2.7.2 get_days 函数](#2-7-2)
  - [2.7.3 is_leap_year 函数](#2-7-3)
  - [2.7.4 is_big_month 函数](#2-7-4)
  - [2.7.5 get_calendar 函数](#2-7-5)
  - [2.7.6 datelist 函数](#2-7-6)
  - [2.7.7 next_month 函数](#2-7-7)
  - [2.7.8 next_day 函数](#2-7-8)
  - [2.7.9 last_day 函数](#2-7-9)
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

## [2.1 进位器 和 计数器接口](#2-1)

<div id="2-1-1"></div>

### [2.1.1 进位器概念](#2-1-1)

进位器是一个未直接暴露出来的对象，但是在 `Second`, Minute `, Hour` 中都将其引用为自身的参数。顾名思义，进位器是用以标志是否进位和进位的方式的对象，它用于标志当前计数是否已经溢出。溢出有两种形式，一种是正向计数时超出计数器的计数满值，我们将其称之为 **进位**。另一种时反向计数时直到本位为 `0` 后，再一次到达满值时的溢出，我们将其称之为 **退位**。

进位器对象 Carry 声明如下：

```ts
declare class Carry {
    private _value;
    constructor(b?: CarryEnum | undefined);
    set(): void;
    set_back(): void;
    clear(): void;
    /**
     * 获取进位器状态枚举数值
     * @deprecated since v1.0.7, please use getter state() instead.
     * @returns {number} v 进位枚举数值
     */
    get_state(): number;
    /**
     * 获取进位器状态枚举数值
     */
    get state(): number;
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

| 枚举值          | 初始化值 |
| :-------------- | :------- |
| CarryEnum.CARRY | 1        |
| CarryEnum.NONE  | 0        |
| CarryEnum.BACK  | 2        |

<div id="2-1-3"></div>

### [2.1.3 计数器接口](#2-1-3)

从 v1.0.7 开始，本模块提供的 Second、Minute、Hour 计数器，都是计数器接口 **Counter** 的实现：

```ts
interface Counter {
    c: Carry;
    to_last(): void;
    to_next(): void;
    start(func: Function, ...params: any[]): void;
    print(): void;
    get last(): any;
    get next(): any;
    get value(): string;
    get seconds(): number;
    set seconds(seconds: number);
}
```

需要注意的是，在 v1.0.7 版本中，本模块提供的 日期计数器 Date_ 、日期时间计数器 DateTime 不是 Counter 的实现。

<div id="2-2"></div>

## [2.2 秒计数器 Second](#2-2)

```ts
declare class Second implements Counter {
    private _value;
    c: Carry;
    /**
     * @param s 初始秒数，范围为 0~59
     */
    constructor(s?: number);
    /** 将时间拨到上一秒 */
    to_last(): void;
    /**
     * 将时间拨到下一秒
     */
    to_next(): void;
    /**
     * 开始计时
     * @param func 回调函数
     * @param params 回调函数的参数
     */
    start(func: Function, ...params: any[]): void;
    /**打印秒计数值 */
    print(): void;
    /**
     * 获取字符串格式的当前秒计数值
     * @returns 被自动补 '0' 的字符串
     * @deprecated since v1.0.4, use getter value() instead.
     */
    get_value(): string;
    /**
     * 取：以上一秒的时间返回一个新的 Second 对象
     * @return {Second} 一个新的 Second 对象实例
     * @since 1.0.7
     */
    get last(): Second;
    /**
     * 取：以下一秒的时间返回一个新的 Second 对象
     * @return {Second} 一个新的 Second 对象实例
     * @since 1.0.7
     */
    get next(): Second;
    /**
     * 存：秒
     * @param {number} seconds 将更改的秒的数值
     */
    set seconds(seconds: number);
    /**
     * 取：秒
     * @return {number} 将被去除的当前的秒值
     */
    get seconds(): number;
    /**
     * 取：当前（秒）值字符串
     * 这个字符串的长度（length）为 2 ，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串
     */
    get value(): string;
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

### [2.2.4 `Second` 对象的方法和存取器](#2-2-4)

| 方法名                  | 描述                                       | 返回值类型 | 备注                                 |
| :---------------------- | :----------------------------------------- | :--------- | :----------------------------------- |
| **to_last**       | 将时间拨到上一分钟                         | `void`   |                                      |
| **to_next**       | 将时间拨到下一分钟                         | `void`   |                                      |
| **start**         | 开始计时                                   | `void`   |                                      |
| **print**         | 打印秒计数值                               |            |                                      |
| **get_value**     | 取：以上一秒的时间返回一个新的 Second 对象 |            | 已废弃，请改用 getter**value** |
| getter**last**    | 取：以上一秒的时间返回一个新的 Second 对象 |            |                                      |
| getter**next**    | 取：以下一秒的时间返回一个新的 Second 对象 |            |                                      |
| setter**seconds** | 存：秒                                     |            |                                      |
| getter**seconds** | 取：秒                                     |            |                                      |
| getter**value**   | 取：当前（秒）值字符串                     |            |                                      |

<div id="2-2-4-1"></div>

#### [2.2.4.1 to_last 方法](#2-2-4-1)

```js
let s = new Second(0);
s.print();
s.to_last();
s.print();
```

```
00
59
```

<div id="2-2-4-2"></div>

#### [2.2.4.2 to_next 方法](#2-2-4-2)

```js
let s = new Second(59);
s.print();
s.to_next();
s.print();
```

`out[]:`

```
59
00
```

<div id="2-2-4-3"></div>

#### [2.2.4.3 start 方法](#2-2-4-3)

调用 start 方法将启动一个计数器，它每秒使当前 Second 对象实例的计数值增加 1 秒。

```ts
let s = new Second(0);
s.start(()=>{
    s.print()
},s)
```

![WindowsTerminal_lQoPcNRGaN](https://user-images.githubusercontent.com/65340846/192085744-db30758c-9f5c-4555-a915-fde0fe457e0b.gif)

<div id="2-2-4-4"></div>

#### [2.2.4.4 print 方法](#2-2-4-4)

该方法用于打印秒计数值，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串。请参考其它使用了该函数的案例。

<div id="2-2-4-5"></div>

#### [2.2.4.5 get_value](#2-2-4-5)

获取字符串格式的当前秒值

> 从v1.0.4 ，请改用 getter value()

```ts

```

`Out[]:`

```

```

<div id="2-2-4-6"></div>

#### [2.2.4.6 getter last 方法](#2-2-4-6)

取：以上一秒的时间返回一个新的 Second 对象

```ts
let s = new Second(0);
let last_second = s.last;
last_second.print();
```

`Out[]:`

```
59
```

<div id="2-2-4-7"></div>

#### [2.2.4.7 getter next](#2-2-4-7)

取：以下一秒的时间返回一个新的 Second 对象

```ts
let s = new Second(59);
let next_second = s.next;
next_second.print();
```

`Out[]:`

```
00
```

<div id="2-2-4-8"></div>

#### [2.2.4.8 setter seconds](#2-2-4-8)

存：秒

```ts
let s = new Second(0);
s.seconds = 6;
s.print();
```

`Out[]:`

```
06
```

<div id="2-2-4-9"></div>

#### [2.2.4.9 getter seconds](#2-2-4-9)

取：秒

```ts
let s = new Second(0);
console.log(s.seconds);
```

`Out[]:`

```
0
```

<div id="2-2-4-10"></div>

#### [2.2.4.10 getter value](#2-2-4-10)

取：当前（秒）值字符串

> 注：
> 这个字符串的长度（length）为 2 ，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串

```ts
let s = new Second(26);
let v = s.value;
console.log(v);
```

`Out[]:`

```
26
```

<div id="2-3"></div>

## [2.3 分计数器 Minute](#2-3)

```ts
declare class Minute implements Counter {
    private _value;
    private _second;
    c: Carry;
    /**
     * @param {number} m 分值
     * @param {number} s 秒值
     */
    constructor(m?: number, s?: number);
    /**
     * 将时间拨到上一分钟
     * @since v1.0.7
     */
    to_last(): void;
    /**
     * 将时间拨到下一分钟
     * @since v1.0.7
     */
    to_next(): void;
    /**
     * 将时间拨到上一秒钟
     */
    to_last_second(): void;
    /**
     * 将时间拨到下一秒 钟
     */
    to_next_second(): void;
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
     * 开始计时
     * @param func 秒级回调
     * @param params 回调函数的参数
     */
    start(func: Function, ...params: any[]): void;
    /**
     * 获取上一分钟对应的 Minute 对象实例
     * 注意：该接口在 v1.0.6及以前，功能是将当前 Minute 对象实例 拨到下一分钟，并且不会返回任何值
     * @since v1.0.7
     */
    get last(): Minute;
    /**
     * 获取下一分钟对应的 Minute 对象实例
     * 注意：该接口在 v1.0.6及以前，功能是将当前 Minute 对象实例 拨到下一分钟，并且不会返回任何值
     * @since v1.0.7
     */
    get next(): Minute;
    /**
     * 存：秒值
     * @param {number} seconds Number of seconds.
     * @since v1.0.4
     */
    set seconds(seconds: number);
    /**
     * 取：秒值
     * @since v1.0.4
     */
    get seconds(): number;
    /**
     * 存：分值
     * @param {number} seconds Number of minutes.
     * @since v1.0.4
     */
    set minutes(minutes: number);
    /**
     * 取：分值
     * @since v1.0.4
     */
    get minutes(): number;
    /**
     * 输出当前的分计数值
     * @returns 被自动补零的 `分:秒` 字符串
     */
    get value(): string;
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
constructor(time: string);
constructor(time: []);
constructor(time: [number, number]);
```

如果参数为一个形如 `21:30` 的字符串，将依据字符串的 `:` 作为分隔符，前者的数字作为初始后的分钟值，后者的数字作为初始后的秒值。例如：

```ts
let m = new Minute("21:37");
m.print();
```

`Out[]:`

```
21:37
```

如果参数为一个空数组，将默认初始为 0 ，例如：

```ts
let m = new Minute([]);
m.print();
```

`Out[]:`

```
00:00
```

也可以初始化一个指定的值：

```ts
let m = new Minute([29,59]);
m.print();
```

`Out[]:`

```
29:59
```

> Warning：
>
> 在 V 1.0.8 以前的版本中，只可以通过传入一个表示分、秒的数组进行初始化，如 `[8, 30]`。

<div id="2-3-3"></div>

### [2.3.3 Minute 对象的属性](#2-3-3)

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。

<div id="2-3-4"></div>

### [2.3.4 Minute 对象的方法](#2-3-4)

<div id="2-3-4-1"></div>

#### [2.3.4.1 to_last 方法](#2-3-4-1)

将时间拨到上一分钟。

```ts
last():void
```

例如：

```ts
let m = new Minute([]);
m.print();
m.to_last();
m.print();
```

`Out[]:`

```
00:00
59:00
```

<div id="2-3-4-2"></div>

#### [2.3.4.2 to_next 方法](#2-3-4-2)

将时间拨到下一分钟。

```ts
to_next():void
```

例如：

```ts
let m = new Minute([58,0]);
m.print();
m.to_next();
m.print();
m.to_next();
m.print();
```

`Out[]:`

```
58:00
59:00
00:00
```

<div id="2-3-4-3"></div>

#### [2.3.4.3 to_last_second 方法](#2-3-4-3)

上一秒种，就地更改当前对象。

```ts
to_last_second():void
```

例如：

```ts
let m = new Minute([]);
m.to_last_second();
m.print();
```

`Out[]:`

```
59:59
```

<div id="2-3-4-4"></div>

#### [2.3.4.4 to_next_second 方法](#2-3-4-4)

下一秒种，就地更改当前对象。

```ts
to_next_second():void
```

例如：

```ts
let m = new Minute([]);
m.to_next_second();
m.print();
```

`Out[]:`

```
00:01
```

<div id="2-3-4-5"></div>

#### [2.3.4.5 print 方法](#2-3-4-5)

该方法用于打印秒计数值，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串。请参考其它使用了该函数的案例。

<div id="2-3-4-6"></div>

#### [2.3.4.6 get_value 方法](#2-3-4-6)

获取当前计数值，已废弃。请改用 getter value()。

```ts
get_value():string
```

例如：

```ts
let m = new Minute([]);
m.last_second();
console.log(m.get_value());
```

`Out[]:`

```
59:59
```

<div id="2-3-4-7"></div>

#### [2.3.4.7 start 方法](#2-3-4-7)

开始计时。

```ts
start(func: Function, ...params: any[]):void
```

例如：

```ts
let m = new Minute([17,46]);
m.start(()=>{
    m.print()
},m)
```

<div id="2-3-4-8"></div>

#### [2.3.4.8 getter last](#2-3-4-8)

获取上一分钟对应的 Minute 对象实例

> 注意：
> 该接口在 v1.0.6及以前，功能是将当前 Minute 对象实例 拨到下一分钟，并且不会返回任何值

```ts
let m = new Minute([27,25]);
let last_minute = m.last;
last_minute.print()
```

`Out[]:`

```
26:25
```

<div id="2-3-4-9"></div>

#### [2.3.4.9 getter next](#2-3-4-9)

获取下一分钟对应的 Minute 对象实例

> 注意：
> 该接口在 v1.0.6及以前，功能是将当前 Minute 对象实例 拨到下一分钟，并且不会返回任何值

```ts
let m = new Minute(59,56);
let last_minute = m.next;
last_minute.print()
console.log(last_minute.c.state);
```

`Out[]:`

```
00:56
1
```

<div id="2-3-4-10"></div>

#### [2.3.4.10 setter seconds](#2-3-4-10)

存：秒值

```ts
let m = new Minute([52,56]);
m.seconds = 25;             // setter
console.log(m.seconds);     // getter
```

`Out[]:`

```
25
```

<div id="2-3-4-11"></div>

#### [2.3.4.11 getter seconds](#2-3-4-11)

取：秒值

参考 [2.3.4.10 setter seconds](#2-3-4-10) 中给出的案例。

<div id="2-3-4-12"></div>

#### [2.3.4.12 setter minutes](#2-3-4-12)

存：分值

```ts
let m = new Minute([56,56]);
m.minutes = 25;            // setter
console.log(m.minutes);    // getter
```

`Out[]:`

```
25
```

<div id="2-3-4-13"></div>

#### [2.3.4.13 getter minutes](#2-3-4-13)

参考 [2.3.4.12 setter minutes](#2-3-4-12) 中给出的案例。

<div id="2-3-4-14"></div>

#### [2.3.4.14 getter value](#2-3-4-14)

输出当前的 分:秒 值

```ts
let m = new Minute([25,12]);
console.log(m.value);
```

`Out[]:`

```
25:12
```

<div id="2-4"></div>

## [2.4 小时计数器 Hour](#2-4)

```ts
declare class Hour implements Counter {
    private _value;
    private _minute;
    c: Carry;
    constructor(time: string);
    constructor(time: []);
    constructor(time: [number, number, number]);
    /**
     * 拨到上一秒
     * @since v1.0.4
     */
    to_last_second(): void;
    /**
     * 拨到下一秒
     * @since v1.0.4
     */
    to_next_second(): void;
    /**
     * 拨到上一分钟
     * @since v1.0.4
     */
    to_last_minute(): void;
    /**
     * 拨到下一分钟
     * @since v1.0.4
     */
    to_next_minute(): void;
    /**
     * 拨到上一小时
     * @since v1.0.4
     */
    to_last(): void;
    /**
     * 拨到下一小时
     * @since v1.0.4
     */
    to_next(): void;
    /**
     * 设定为本地时间
     * @since v1.0.4
     */
    set_locale_time(): void;
    /**
     * 开始计时
     * @param func 秒级回调
     * @param params 回调的参数
     */
    start(func: Function, ...params: any[]): void;
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
     * 获取小时的数字值
     * @returns 表示当前计数小时的数值
     * @deprecated since v1.0.7 use getter hours() instead.
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
    /**
     * 存：秒值
     * @param {number} seconds 要设置的秒值.
     * @since v1.0.4
     */
    set seconds(seconds: number);
    /**
     * 获取上一小时对应的 Hour 对象实例
     * @since v1.0.7
     */
    get last(): Hour;
    /**
     * 获取下一小时对应的 Hour 对象实例
     * @since v1.0.7
     */
    get next(): Hour;
    /**
     * 取：秒值
     * @returns {number} 当前实例的秒值
     * @since v1.0.6
     */
    get seconds(): number;
    /**
     * 存：分值
     * @param {number} seconds 要设置的分值.
     * @since v1.0.4
     */
    set minutes(minutes: number);
    /**
     * 取：分值
     * @returns {number} 当前实例的分值
     * @since v1.0.6
     */
    get minutes(): number;
    /**
     * 存：小时值
     * @param {number} seconds 要设置的小时值.
     * @since v1.0.4
     */
    set hours(hours: number);
    /**
     * 取：小时值
     * @returns {number} 当前实例的小时值
     * @since v1.0.6
     */
    get hours(): number;
    /**
     * 返回当前的小时值字符串
     * @since v1.0.5
     */
    get value(): string;
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

#### [2.4.4.1 to_last_second 方法](#2-4-4-1)

拨到上一秒

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

#### [2.4.4.2 to_next_second 方法](#2-4-4-2)

拨到下一秒

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

#### [2.4.4.3 to_last_minute 方法](#2-4-4-3)

拨到上一分钟

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

#### [2.4.4.4 to_next_minute 方法](#2-4-4-4)

拨到下一分钟

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

#### [2.4.4.5 to_last 方法](#2-4-4-5)

拨到上一小时

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

#### [2.4.4.6 to_next 方法](#2-4-4-6)

拨到下一小时

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

#### [2.4.4.7 set_locale_time 方法](#2-4-4-7)

同步到本地时间

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

#### [2.4.4.8 start 方法](#2-4-4-8)

开始计时

```ts
let h = new Hour("00:00:00");
h.start(()=>{
    h.print()
},h)
```

<div id="2-4-4-9"></div>

#### [2.4.4.9 print](#2-4-4-9)

该方法用于打印秒计数值，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串。请参考其它使用了该函数的案例。

<div id="2-4-4-10"></div>

#### [2.4.4.10 getter last](#2-4-4-10)

获取上一小时对应的 Hour 对象实例。例如：

```ts
let h = new Hour("21:25:00");
h.last.print();
```

`Out[]:`

```
20:25:00
```

<div id="2-4-4-11"></div>

#### [2.4.4.11 getter next](#2-4-4-11)

获取下一小时对应的 Hour 对象实例。例如：

```ts
let h = new Hour("21:25:00");
h.next.print();
```

`Out[]:`

```
22:25:00
```

<div id="2-4-4-12"></div>

#### [2.4.4.12 setter seconds](#2-4-4-12)

存：当前实例的秒值。

<div id="2-4-4-13"></div>

#### [2.4.4.13 getter seconds](#2-4-4-13)

取：当前实例的秒值。

<div id="2-4-4-14"></div>

#### [2.4.4.14 setter minutes](#2-4-4-14)

存：当前实例的分钟值。

<div id="2-4-4-15"></div>

#### [2.4.4.15 getter minutes](#2-4-4-15)

取：当前实例的分钟值。

<div id="2-4-4-16"></div>

#### [2.4.4.16 setter hours](#2-4-4-16)

存：当前实例的小时值。

<div id="2-4-4-17"></div>

#### [2.4.4.17 getter hours](#2-4-4-17)

取：当前实例的小时值。

<div id="2-5"></div>

## [2.5 日期对象 Date_](#2-5)

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
     * 时间拨到明天
     * @since v_1.0.5
     */
    to_next(): void;
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
     * 从当前开始，向前 n-1 个 Date_ 对象构成一个列表返回
     * @param {number} n 天数
     * @returns {List} n 天的 Date_ 对象 所构成的一个列表
     */
    ndaylist_last(n: number): List;
    /**
     * 从当前开始，向后 n-1 个 Date_ 对象构成一个列表返回
     * @param {number} n 天数
     * @returns {Date_[]} n 天的 Date_ 对象 所构成的一个列表
     */
    ndaylist_next(n: number): Date_[];
    /**
     * 获取日期字符串
     * @returns {string} 自动补 0 的日期字符串，例如 `2022/09/23`
     * @deprecated since v1.03, please use getter value() instead
     */
    get_value(): string;
    /**打印日期字符串 */
    print(): void;
    /**
     * 返回后一天对应的新 Date_ 对象
     * @returns {Date_} 一个新的 Date_ 对象
     */
    get next(): Date_;
    /**
     * 返回前一天对应的新 Date_ 对象
     * @returns {Date_} 一个新的 Date_ 对象
     */
    get last(): Date_;
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
     * 取：日期字符串
     * @since v1.0.4
     */
    get value(): string;
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
2022/05/26
```

也可以为这个字符串套上一个 `[]`，使之成为一个字符串数组参数，这有完全相同的效果：

```js
let d = new Date_(["2022/05/26"]);
d.print();
```

`Out[]:`

```
2022/05/26
```

或者以三个数字构成的数组分别给出年、月、日的数值，例如：

```js
let d = new Date_([2022,5,26]);
d.print();
```

`Out[]:`

```
2022/05/26
```

如果你传入的是一个空数组，则自动初化为当前的日期，例如我电脑当前的系统时间的日期为 2022年8月25日：

```js
let d = new Date_([]);
d.print();
```

`Out[]:`

```
2022/08/25
```

<div id="2-5-3"></div>

### [2.5.3 `Date_` 对象的属性](#2-5-3)

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。

<div id="2-5-4"></div>

### [2.5.4 `Date_` 对象的方法](#2-5-4)

<div id="2-5-4-1"></div>

#### [2.5.4.1 is_leap_year 方法](#2-5-4-1)

当前实例的日期值是否是闰年

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

#### [2.5.4.2 to_next 方法](#2-5-4-2)

将时间拨到明天

```ts
d.print();
d.to_next();
d.print();
```

`Out[]:`

```
2022/08/29
2022/08/30
```

<div id="2-5-4-3"></div>

#### [2.5.4.3 to_last 方法](#2-5-4-3)

将时间拨到昨天

```ts
let d = new Date_([]);
d.print();
d.to_last();
d.print();
```

`Out[]:`

```
2022/08/29
2022/08/28
```

<div id="2-5-4-4"></div>

#### [2.5.4.4 ndays_ago 方法](#2-5-4-4)

当前实例的日期值的 n 天前

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

#### [2.5.4.5 ndays_later 方法](#2-5-4-5)

当前实例的日期值的 n 天后

例如：

```js
let d = new Date_("2021/01/01");
let nAgo = d.ndays_later(59);
nAgo.print();
```

`Out[]:`

```
2021/03/01
```

<div id="2-5-4-6"></div>

#### [2.5.4.6 ndaylist_next 方法](#2-5-4-6)

向后 n-1 个 Date_ 对象构成一个列表返回

例如：

```js
let d = new Date_("2021/01/25");
let nLextNext = d.ndaylist_next(12);
console.log(nLextNext);
```

`Out[]:`

```
List(12) [
  Date_ { _year: 2021, _month: 1, _day: 25 },
  Date_ { _year: 2021, _month: 1, _day: 26 },
  Date_ { _year: 2021, _month: 1, _day: 27 },
  Date_ { _year: 2021, _month: 1, _day: 28 },
  Date_ { _year: 2021, _month: 1, _day: 29 },
  Date_ { _year: 2021, _month: 1, _day: 30 },
  Date_ { _year: 2021, _month: 1, _day: 31 },
  Date_ { _year: 2021, _month: 2, _day: 1 },
  Date_ { _year: 2021, _month: 2, _day: 2 },
  Date_ { _year: 2021, _month: 2, _day: 3 },
  Date_ { _year: 2021, _month: 2, _day: 4 },
  Date_ { _year: 2021, _month: 2, _day: 5 }
]
```

或者使用 List 对象 自带的 print 方法（v1.0.8）：

```ts
nLextNext.print()
```

`Out[]:`

```
List:[
  [Date_ instance: OwnPrpty{_year:2021, _month:1, _day:25} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:1, _day:26} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:1, _day:27} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:1, _day:28} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:1, _day:29} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:1, _day:30} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:1, _day:31} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:2, _day:1} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:2, _day:2} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:2, _day:3} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:2, _day:4} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}], 
  [Date_ instance: OwnPrpty{_year:2021, _month:2, _day:5} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}]]
```

<div id="2-5-4-7"></div>

#### [2.5.4.7 ndaylist_last](#2-5-4-7)

当前实例的日期值

例如：

```js
let d = new Date_("2020/03/6");
let nLextLast = d.ndaylist_last(9);
```

该方法返回的是一个 List 对象，可以将其输出：

```js
console.log(nLextLast);
```

`Out[]:`

```
List(9) [
  Date_ { _year: 2020, _month: 3, _day: 6 },
  Date_ { _year: 2020, _month: 3, _day: 5 },
  Date_ { _year: 2020, _month: 3, _day: 4 },
  Date_ { _year: 2020, _month: 3, _day: 3 },
  Date_ { _year: 2020, _month: 3, _day: 2 },
  Date_ { _year: 2020, _month: 3, _day: 1 },
  Date_ { _year: 2020, _month: 2, _day: 29 },
  Date_ { _year: 2020, _month: 2, _day: 28 },
  Date_ { _year: 2020, _month: 2, _day: 27 }
]
```

也可以使用 List 对象的 print 方法（v1.0.8）：

```js
nLextLast.print();
```

`Out[]:`

```
List:[
  [Date_ instance: OwnPrpty{_year:2020, _month:3, _day:6} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:3, _day:5} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:3, _day:4} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:3, _day:3} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:3, _day:2} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:3, _day:1} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:2, _day:29} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:2, _day:28} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}],
  [Date_ instance: OwnPrpty{_year:2020, _month:2, _day:27} CstrPrtMb{_d_check, is_leap_year, to_next, to_last, ndays_ago, ndays_later, ndaylist_last, ndaylist_next, get_value, print, next, last, year, month, day, value}]]
```

<div id="2-5-4-8"></div>

#### [2.5.4.8 get_value 方法](#2-5-4-8)

返回当前实例的日期值

> deprecated since v1.03, please use getter `value()` instead

例如：

```ts
let d = new Date_("2021/09/25");
let value = d.get_value();
console.log(value);
```

`Out[]:`

```
2021/09/25
```

<div id="2-5-4-9"></div>

#### [2.5.4.9 print 方法](#2-5-4-9)

该方法用于打印秒计数值，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串。请参考其它使用了该函数的案例。

<div id="2-5-4-10"></div>

#### [2.5.4.10 getter next](#2-5-4-10)

```js
let d = new Date_("2019/12/31");
let nextDay = d.next;
nextDay.print();
```

`Out[]:`

```
2020/1/1
```

<div id="2-5-4-11"></div>

#### [2.5.4.11 getter last](#2-5-4-11)

例如：

```js
let d = new Date_("2019/01/01");
let lastDay = d.last;
lastDay.print();
```

`Out[]:`

```
2018/12/31
```

<div id="2-5-4-12"></div>

#### [2.5.4.12 getter year](#2-5-4-12)

```ts
let d = new Date_("2022/07/01");
console.log(d.year);
```

`Out[]:`

```
2022
```

<div id="2-5-4-13"></div>

#### [2.5.4.13 setter year](#2-5-4-13)

```ts
let d = new Date_("2022/07/01");
d.year = 2008;
console.log(d.year);
```

`Out[]:`

```
2008
```

<div id="2-5-4-14"></div>

#### [2.5.4.14 getter month](#2-5-4-14)

```ts
let d = new Date_("2022/07/01");
console.log(d.month);
```

`Out[]:`

```
7
```

<div id="2-5-4-15"></div>

#### [2.5.4.15 setter month](#2-5-4-15)

```ts
let d = new Date_("2019/07/01");
d.month = 12;
console.log(d.month);
```

`Out[]:`

```
12
```

<div id="2-5-4-16"></div>

#### [2.5.4.16 getter day](#2-5-4-16)

```ts
let d = new Date_("2016/06/06");
console.log(d.day);
```

`Out[]:`

```
6
```

<div id="2-5-4-17"></div>

#### [2.5.4.17 setter day](#2-5-4-17)

```ts
let d = new Date_("2016/06/06");
d.day = 16;
console.log(d.day);
```

`Out[]:`

```
16
```

<div id="2-5-4-18"></div>

#### [2.5.4.18 getter value](#2-5-4-18)

```ts
let d = new Date_("2016/06/06");
console.log(d.value);
```

`Out[]:`

```
2016/06/06
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
    /** 明天，就地修改 */
    to_next_day(): void;
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
    /** 返回对应于昨天的 DateTime 对象 */
    get last(): DateTime;
    /** 返回对应于明天的 DateTime 对象 */
    get next(): DateTime;
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

### [2.6.3 `DateTime` 对象的方法和存取器](#2-6-3)

<div id="2-6-3-1"></div>

#### [2.6.3.1 to_last_second 方法](#2-6-3-1)

拨到上一秒

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

#### [2.6.3.2 to_next_second 方法](#2-6-3-2)

拨到下一秒

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

#### [2.6.3.3 to_last_minute 方法](#2-6-3-3)

拨到上一分钟

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

#### [2.6.3.4 to_next_minute 方法](#2-6-3-4)

拨到下一分钟

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

#### [2.6.3.5 to_last_hour 方法](#2-6-3-5)

拨到上一小时

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

#### [2.6.3.6 to_next_hour 方法](#2-6-3-6)

拨到下一小时

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

#### [2.6.3.7 to_last_day 方法](#2-6-3-7)

拨到上一天

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

#### [2.6.3.8 to_next_day 方法](#2-6-3-8)

拨到下一天

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

#### [2.6.3.9 to_next_month 方法](#2-6-3-9)

拨到下个月的这个时候

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

#### [2.6.3.10 to_next_year 方法](#2-6-3-10)

拨到下一年的这个时候

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

#### [2.6.3.11 start 方法](#2-6-3-11)

开启计时

例如：

```ts
let dt = new DateTime("2020/01/01 00:00:00");
dt.start(()=>{
    dt.print()
},dt)
```

<div id="2-6-3-12"></div>

#### [2.6.3.12 print 方法](#2-6-3-12)

该方法用于打印秒计数值，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串。请参考其它使用了该函数的案例。

<div id="2-6-3-13"></div>

#### [2.6.3.13 getter last](#2-6-3-13)

返回对应于昨天的 DateTime 对象

<div id="2-6-3-14"></div>

#### [2.6.3.14 getter next](#2-6-3-14)

返回对应于明天的 DateTime 对象

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

### [2.7.2 get_days 函数](#2-7-2)

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

### [2.7.3 is_leap_year 函数](#2-7-3)

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

### [2.7.4 is_big_month 函数](#2-7-4)

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

### [2.7.5 get_calendar 函数](#2-7-5)

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

### [2.7.6 datelist 函数](#2-7-6)

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

### [2.7.7 next_month 函数](#2-7-7)

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

### [2.7.8 next_day 函数](#2-7-8)

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

### [2.7.9 last_day 函数](#2-7-9)

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

在本模块中 List 是一个内部定义的数据容器，它继承于原生 JavaScript 的 Array 对象。一些返回一组值的方法，所返回的都不是原生的 JavaScript Array而是 List。

其 print() 方法可以展示 List 对象的更多细节。
