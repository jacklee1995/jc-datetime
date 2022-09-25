

# jc-datetime
A Javascript/Node datetime tool.


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

该模块提供了 `Second`, Minute`, Hour`, Date_`, `DateTime` 五个对象，分别可以用于 秒、分、时、日期、日期时间的处理。

## 2.1 进位器对象

进位器是一个未直接暴露出来的对象，但是在 `Second`, Minute`, Hour` 中都将其引用为自身的参数。顾名思义，进位器是用以标志是否进位和进位的方式的对象，它用于标志当前计数是否已经溢出。溢出有两种形式，一种是正向计数时超出计数器的计数满值，我们将其称之为 **进位**。另一种时反向计数时直到本位为 `0` 后，再一次到达满值时的溢出，我们将其称之为 **退位**。

进位器对象 Carry 提供了以下方法：

| 方法名 | 描述 | 返回值类型 |
| :- | :- | :- |
| **set** | 设置进位 | `void` |
| **set_back** | 设置退位 | `void` |
| **clear** | 清空标志  | `void` |
| **get_state** | 获取进位器状态 | `number` |

其中进位器的状态是一个枚举，它有三个枚举值：`CarryEnum.CARRY`、`CarryEnum.NONE`、`CarryEnum.BACK`分别表示 有进位、无进退位、有退位。

## 2.2 秒计数器 Second

```ts
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
```

### 2.2.1 `Second` 的引入

可以通过如下方式来引入 Second 对象：

```js
import { Second } from 'jc-datetime'
```

### 2.2.2 `Second` 对象的构造器

```
Second(s: number=0)
```

| 参数 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| s | number | 0 | 初始化的秒值 |


### 2.2.3 `Second` 对象的属性
#### 进位标志 c
该标志是一个 Carry 的实例，用于标志是否进位、退位。

### 2.2.4 `Second` 对象的方法

| 方法名 | 描述 | 返回值 |
|:-|:-|:-|
| **next** | 下一秒 | `void` |
| **last** | 上一秒 | `void` |
| **start** | 开始计数 | `void` |
| **print** | 打印时间 | `void` |
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

## 2.3 分计数器 `Minute`

```ts
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
```

### 2.3.1 `Minute` 的引入

```js
import { Minute } from 'jc-datetime'
```

### 2.3.2 `Minute` 对象的构造器

```js
constructor(m:number=0,s:number=0)
```

| 参数 | 描述 | 类型 | 默认值 |
| :- | :- | :- | :- |
| m | 分 | number | 0 |
| s | 秒 | number | 0 |

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

### 2.3.3 `Minute` 对象的属性

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。

### 2.3.4 `Minute` 对象的方法

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

## 2.4 小时计数器 `Hour`

```ts
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
```

### 2.4.1 `Hour` 的引入

```js
import { Hour } from 'jc-datetime'
```


### 2.4.2 `Hour` 对象的构造器

```js
constructor(time: undefined);
constructor(time: string);
constructor(time: [number, number, number])
```



### 2.4.3 `Hour` 对象的属性
#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。


### 2.4.4 `Hour` 对象的方法


## 2.5 日期器 Date_



```ts
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
```

### 2.5.1 Date_ 的引入

```js
import { Date_ } from 'jc-datetime'
```



### 2.5.2 `Date_` 对象的构造器

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
也可以为这个字符串套上一个`[]`，使之成为一个字符串数组参数，这有完全相同的效果：
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

### 2.5.3 `Date_` 对象的属性

#### 进位标志 c

该标志是一个 Carry 的实例，用于标志是否进位、退位。

### 2.5.4 `Date_` 对象的方法

#### is_leap_year
返回当前实例的日期值是否是闰年。

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

#### next
返回当前实例的日期值的下一天
例如：
```js
let d = new Date_("2019/12/31");
let nextDay = d.next();
nextDay.print();
```
`Out[]:`
```
2020/1/1
```

#### last
返回当前实例的日期值前一天
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

#### ndays_ago
返回当前实例的日期值的 n 天前
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

#### ndays_later
返回当前实例的日期值的 n 天后
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

#### ndaylist_next
从当前开始，向后 n-1 个 Date_ 对象构成一个列表返回 
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


#### ndaylist_last
返回当前实例的日期值
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

#### get_value
> deprecated since v1.03, please use getter `value()` instead

返回当前实例的日期值
例如：
```js

```


### 2.5.4 `Date_` 对象存取器
####  year
> since v1.0.4

作为 setter 使用：
```ts

```
作为 getter 使用：
```ts

```
#### month
>since v1.0.4
作为 setter 使用：
```ts

```
作为 getter 使用：
```ts

```
#### day
>since v1.0.4
作为 setter 使用：
```ts

```
作为 getter 使用：
```ts

```

#### value
>since v1.0.4
作为 setter 使用：
```ts

```
作为 getter 使用：
```ts

```

## 2.6 期日时间对象 DateTime

```ts
declare class DateTime {
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
```

### 2.6.1 DateTime 的引入

```js
import { DateTime } from 'jc-datetime'
```


### 2.6.2 `DateTime` 对象的构造器

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

### 2.6.3 `DateTime` 对象的方法

#### to_last_second
上一秒
```ts

```

#### to_next_second
下一秒
```ts

```


#### to_last_minute

```ts

```


#### to_next_minute

```ts

```


#### to_last_hour

```ts

```


#### to_next_hour

```ts

```



#### to_last_day

```ts

```



#### to_next_day

```ts

```


#### to_next_month

```ts

```


#### to_next_year

```ts

```


#### start

```ts

```



## 2.7 独立的函数接口

> v1.03 

除了上面提到的这几个对象外，本模块还提供了一些独立的函数。他们可以被视作一些小工具，以补充功能。

|函数|描述|
|:-|:-|
| is_leap_year | 是否是闰年 |
| is_big_month | 是否是大月 |
| get_calendar | 获取某月日历列表 |
| get_days | 获取某个月的天数 |
| datelist | 获取某两个日期间所有日期构成的日期列表 |
| next_month | 下个月 |
| next_day | 明天（下一天） |
| last_day | 昨天（上一天） |

### 引入方式

你可以根据需要，参考如下方式进行引入：

```js
import { 
    is_leap_year, is_big_month, 
    get_days, get_calendar, datelist, 
    next_day, last_day, next_month 
} from 'jc-datetime'
```

### get_days 函数

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



### is_leap_year 函数

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


### is_big_month 函数

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

### get_calendar 函数

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


### datelist 函数

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

### next_month 函数

```js
let nextmonth = next_month(2021,12);
console.log(nextmonth);
```
`out[]:`
```
2022/01
```


### next_day 函数

```js
let nextday = next_day("2020/02/29");
console.log(nextday);
```
`out[]:`
```
2020/03/01
```


### last_day 函数

```js
let lastday = last_day("2020/03/01");
console.log(lastday);
```
`out[]:`
```
2020/02/29
```

## 2.8 关于 List 对象的说明

在本模块中 List 是一个内部定义的数据容器，它继承于原生 JavaScript 的 Array 对象。一些返回一组值的方法，如 `dartelist()` ，所返回的都不是原生的 JavaScript Array而是 List。

