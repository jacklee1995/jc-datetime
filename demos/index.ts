
/* --------------- 秒计数器 Second --------------- */
import { Second } from "jc-datetime"

// eg1 构造一个 Second 对象
let s = new Second(0);

// eg2 to_last 方法
s.print();      // 0
s.to_last();    // 这时 s.c（Carry对象实例）发生了退位
s.print();      // 1, 

// eg3 to_next 方法
s.to_last();    // 这时 s.c（Carry对象实例）发生了进位
s.print();      // 0

// eg4 启动计时。下面的代码将循环输出 00、01、...、59
// 效果参考图片 https://user-images.githubusercontent.com/65340846/192085744-db30758c-9f5c-4555-a915-fde0fe457e0b.gif
s.start(()=>{
    s.print()
},s)

// eg5 getter last
// 取以上一秒的时间返回一个新的 Second 对象
let s1 = new Second(0);
let last_second = s1.last;
last_second.print();         // 59

// eg6 getter next
// 取以下一秒的时间返回一个新的 Second 对象
let s2 = new Second(59);
let next_second = s2.next;
next_second.print();        // 00

// eg7 setter/getter seconds
// 同时用作秒的存取器
let s3 = new Second(0);
s3.seconds = 6;            // 用作 setter
console.log(s3.seconds);   // 用作 getter

// eg8 getter value
// 取当前（秒）值字符串，这个字符串的长度（length）为 2 ，如果（秒）数值只有一位，则自动在前面补一个 0 构成两位字符串
let s4 = new Second(26);
let s_v = s4.value;
console.log(s_v);


/* --------------- 分计数器 Minute --------------- */
import { Minute } from "jc-datetime"

// eg1 使用字符串构造 Second 实例：
let m1 = new Minute("21:25");
m1.print();  // 21:25:00

// eg2 使用空数组构造 Minute 实例：

let m2 = new Minute([]);
m2.print(); // 00:00

// eg3 使用数字数组构造 Minute 实例：
let m3 = new Minute([12, 30]);
m3.print(); // 12:30

// eg4 to_last 方法 将时间拨到上一分钟
let m4 = new Minute([]);
m4.print();      // 00:00
m4.to_last();    // 发生退位
m4.print();      // 59:00

// eg5 to_last 方法 将时间拨到下一分钟
let m5 = new Minute([59,0]);
m5.print();      // 59:00
m5.to_next();    // 发生进位
m5.print();      // 00:00


// eg6 to_last_second 方法 将时间拨到上一秒钟
let m6 = new Minute([]);
m6.print();              // 00:00
m6.to_last_second();     // 由 m._seconds.c 记录退位引发的 m.c 记录退位
m6.print();              // 59:59

// eg8 to_next_second 方法 将时间拨到下一秒钟
let m = new Minute([]);  
m.to_next_second();     
m.print();              // 00:01

/* --------------- 小时计数器 Hour --------------- */
import { Hour } from "jc-datetime"

// eg1 使用字符串构造 Hour 实例：
let h1 = new Hour("21:25:00");
h1.print();  // 21:25:00

// eg2 使用空数组构造 Hour 实例：

let h2 = new Hour([]);
h2.print();  // 你的系统时间，例如 21:17:59

// eg2 使用数字数组构造 Hour 实例：
let h3 = new Hour([1, 30, 0]);
h3.print();



/* --------------- 日期器 Date_ --------------- */