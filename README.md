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
| next | 下一秒 | void |
| last |  | void |
| start |  |  |
| print |  |  |
| get_value |  |  |
