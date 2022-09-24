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
进位器是一个未直接暴露出来的对象，但是在 `Second`, Minute`, Hour` 中都将其引用为自身的参数。顾名思义，进位器是用以标志是否进位和进位的方式的对象，

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

### 2.2.1 Second 的导入 `Second` 对象

可以通过如下方式来导入
```js
import { Second } from 'jc-datetime'
```

### 2.2.2 `Second` 对象的构造器

Second(s: number)

### 2.2.3 `Second` 对象的方法

| 方法名 | 描述 | 返回值 |
|:-|:-|:-|
| next | 下一秒 | `void` |
| last | 上一秒 | `void` |
| start | 开始计数 | `void` |
| print | 打印时间 | `void` |
| get_value | 获取时间值 | `string` |

### 2.2.4 例子


## 2.3 分计数器 Minute

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

## 2.4 小时计数器

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

## 2.6 期日时间

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
