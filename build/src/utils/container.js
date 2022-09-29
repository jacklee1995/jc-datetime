"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const tools_1 = require("./tools");
class List extends Array {
    constructor(...args) {
        super(...args);
        if (args.length === 1) {
            this[0] = args[0];
        }
        else {
            ;
            for (const i of args) {
                this.push(i);
            }
        }
    }
    append(elem) { this.push(elem); }
    add(elem) { this.push(elem); }
    pop_left() { return this.shift(); }
    has(searchElement, fromIndex) { return this.includes(searchElement, fromIndex); }
    append_left(elem) {
        for (let i = this.length; i > 0; i--) {
            this[i] = this[i - 1];
        }
        this[0] = elem;
    }
    /**删除给定索引处的元素 */
    drop(index) {
        delete this[index];
        for (let i = index; i < this.length - index + 1; i++) {
            this[i] = this[i + 1];
        }
        this.pop();
    }
    /**移除第一个值为 x 的值 */
    remove(x) {
        let iterator = this[Symbol.iterator]();
        let ct = 1;
        while (iterator.next().value == x) {
            ct = ct + 1;
        }
        this.drop(ct);
    }
    /**
     * 查找第一个值为 x 的元素所对应的索引
     * @param x 要查找的那个值
     * @returns 该值第一次出现时对应的索引
     */
    first(x) {
        let iterator = this[Symbol.iterator]();
        let index = 0;
        function _() {
            let item = iterator.next();
            if (item.value != x) {
                index = index + 1;
                _();
            }
        }
        _();
        return index;
    }
    /**
     * 查找所有值为 x 的元素的索引
     * @param x 要查找的那个值
     * @returns A List of numbers.
     */
    search(x) {
        let iterator = this[Symbol.iterator]();
        let index = 0;
        let res = new List();
        function _() {
            let item = iterator.next();
            if (item.value == x) {
                res.push(index);
            }
            ;
            if (!item.done) {
                index = index + 1;
                _();
            }
        }
        _();
        return res;
    }
    /**清除所有元素 */
    clear() {
        for (let i = 0; i < this.length; i++) {
            this.pop();
        }
    }
    /**统计元素出现次数 */
    count(i, strict = true) {
        let ct = 0;
        this.forEach(e => {
            if (strict) {
                if (e === i) {
                    ct = ct + 1;
                }
            }
            else {
                if (e == i) {
                    ct = ct + 1;
                }
            }
        });
        return ct;
    }
    /**
     * 与另一个可迭代对象 映射（Map）并返回
     * 另一个可迭代对象的所有元素将映射为对应于本列表各个元素为键时的值
     * @param ar 映射为值的另一个数组
     * @returns
     */
    zip(ar) {
        let mp = new Map();
        // let len = 0;
        // if(this.length > )
        for (let i = 0; i < this.length; i++) {
            mp.set(this[i], ar[i]);
        }
        return mp;
    }
    toStringArray() {
        let _ = [];
        this.forEach(e => {
            if ((0, tools_1.isString)(e)) {
                _.push(e.toString());
            }
            else if ((0, tools_1.isNumber)(e)) {
                _.push(e.toString());
            }
            else if ((0, tools_1.isObject)(e)) {
                _.push((0, tools_1.strfyObj)(e));
            }
            else {
                _.push(e.toString());
            }
        });
        return _;
    }
    toString(inDetail = false, _isOuter = true) {
        let str = ``;
        if (_isOuter) {
            str = `List(${this.length})[ `;
        }
        else {
            str = `[ `;
        }
        _isOuter = false;
        this.forEach(e => {
            if ((0, tools_1.isString)(e)) {
                str += "\"" + e.toString() + "\", ";
            }
            else if ((0, tools_1.isNumber)(e)) {
                str += e.toString() + ", ";
            }
            else if ((0, tools_1.isObject)(e)) {
                if (inDetail) {
                    str += `\n  ${(0, tools_1.strfyObj_indetail)(e)}, \n  `;
                }
                else {
                    str += `\n  ${(0, tools_1.strfyObj)(e)}, \n  `;
                }
            }
            else if (e instanceof List) {
                if (inDetail) {
                    str += `\n  ${e.toString(true, false)},`;
                }
                else {
                    str += `\n  ${e.toString(false, false)},`;
                }
                str = str.slice(0, str.length - 3) + "],\n  ";
            }
            else if (e instanceof Array) {
                let _t = new List(...e);
                str = str + `\n  ${_t.toString(false, false)}`;
                str = str.slice(0, str.length - 3);
                str = str + "], \n  ";
            }
            else {
                str += e.toString(false, false) + "\", ";
            }
        });
        if (this.length > 0) {
            str = str.slice(0, str.length - 1);
        }
        str += `\n]`;
        return str;
    }
    print(inDetail = false) {
        console.log(this.toString(inDetail));
    }
}
exports.List = List;
class AA {
    constructor() {
        this.a = 1;
        this.b = 2;
    }
    c() { return 0; }
}
AA.d = 1;
// let l = new List(1,2,3,4,5,6);
// let r = new List()
// r.add(new AA());
// r.add("1");
// r.add(2);
// l.add(new AA());
// l.add("1");
// l.add(2);
// l.add(r);
// l.add("1");
// l.add(["6E","DWQ","54D","DWE"]);
// l.add(2);
// l.add(new AA());
// l.add("1");
// l.add(2);
// l.print();
