# jc-datetime
A Javascript/Node datetime tool.

# 1. 安装

可以使用 npm 进行安装：

```shell
npm install jc-datetime
```

或者使用 yarn 进行安装：

```shell
yarn add jc-datetime
```

# 2. 使用教程

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
Second(s: number)
```


### 2.2.3 `Second` 对象的属性

### 2.2.4 `Second` 对象的方法

| 方法名 | 描述 | 返回值 |
|:-|:-|:-|
| **next** | 下一秒 | `void` |
| **last** | 上一秒 | `void` |
| **start** | 开始计数 | `void` |
| **print** | 打印时间 | `void` |
| **get_value** | 获取时间值 | `string` |

### 2.2.5 例子

```ts
let s = new Second(0);
s.start(()=>{
    s.print()
},s)
```

![WindowsTerminal_lQoPcNRGaN](https://user-images.githubusercontent.com/65340846/192085744-db30758c-9f5c-4555-a915-fde0fe457e0b.gif)



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

```

```


### 2.3.3 `Minute` 对象的属性



### 2.3.4 `Minute` 对象的方法



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

```

```



### 2.4.3 `Hour` 对象的属性

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

```

```



### 2.5.3 `Date_` 对象的属性

### 2.5.4 `Date_` 对象的方法


## 2.6 期日时间对象 DateTime

```ts
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
```

### 2.6.1 DateTime 的引入

```js
import { DateTime } from 'jc-datetime'
```


### 2.6.2 `DateTime` 对象的构造器

```

```



### 2.6.3 `DateTime` 对象的属性

### 2.6.4 `DateTime` 对象的方法


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

