"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var tools_1 = require("./tools");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        if (args.length === 1) {
            _this = _super.call(this) || this;
            _this[0] = args[0];
        }
        else {
            _this = _super.call(this) || this;
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var i = args_1[_a];
                _this.push(i);
            }
        }
        return _this;
    }
    List.prototype.append = function (elem) { this.push(elem); };
    List.prototype.add = function (elem) { this.push(elem); };
    List.prototype.pop_left = function () { return this.shift(); };
    List.prototype.has = function (searchElement, fromIndex) { return this.includes(searchElement, fromIndex); };
    List.prototype.append_left = function (elem) {
        for (var i = this.length; i > 0; i--) {
            this[i] = this[i - 1];
        }
        this[0] = elem;
    };
    /**删除给定索引处的元素 */
    List.prototype.drop = function (index) {
        delete this[index];
        for (var i = index; i < this.length - index + 1; i++) {
            this[i] = this[i + 1];
        }
        this.pop();
    };
    /**移除第一个值为 x 的值 */
    List.prototype.remove = function (x) {
        var iterator = this[Symbol.iterator]();
        var ct = 1;
        while (iterator.next().value == x) {
            ct = ct + 1;
        }
        this.drop(ct);
    };
    /**
     * 查找第一个值为 x 的元素所对应的索引
     * @param x 要查找的那个值
     * @returns 该值第一次出现时对应的索引
     */
    List.prototype.first = function (x) {
        var iterator = this[Symbol.iterator]();
        var index = 0;
        function _() {
            var item = iterator.next();
            if (item.value != x) {
                index = index + 1;
                _();
            }
        }
        _();
        return index;
    };
    /**
     * 查找所有值为 x 的元素的索引
     * @param x 要查找的那个值
     * @returns A List of numbers.
     */
    List.prototype.search = function (x) {
        var iterator = this[Symbol.iterator]();
        var index = 0;
        var res = new List();
        function _() {
            var item = iterator.next();
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
    };
    /**清除所有元素 */
    List.prototype.clear = function () {
        for (var i = 0; i < this.length; i++) {
            this.pop();
        }
    };
    /**统计元素出现次数 */
    List.prototype.count = function (i, strict) {
        if (strict === void 0) { strict = true; }
        var ct = 0;
        this.forEach(function (e) {
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
    };
    /**
     * 与另一个可迭代对象 映射（Map）并返回
     * 另一个可迭代对象的所有元素将映射为对应于本列表各个元素为键时的值
     * @param ar 映射为值的另一个数组
     * @returns
     */
    List.prototype.zip = function (ar) {
        var mp = new Map();
        // let len = 0;
        // if(this.length > )
        for (var i = 0; i < this.length; i++) {
            mp.set(this[i], ar[i]);
        }
        return mp;
    };
    List.prototype.toStringArray = function () {
        var _ = [];
        this.forEach(function (e) {
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
    };
    List.prototype.toString = function () {
        var str = "List:[";
        this.forEach(function (e) {
            if ((0, tools_1.isString)(e)) {
                str += "\"" + e.toString() + "\", ";
            }
            else if ((0, tools_1.isNumber)(e)) {
                str += e.toString() + ", ";
            }
            else if ((0, tools_1.isObject)(e)) {
                str += "\n  " + (0, tools_1.strfyObj)(e) + ", ";
            }
            else {
                str += e.toString() + "\", ";
            }
        });
        if (this.length > 0) {
            str = str.slice(0, str.length - 2);
        }
        str += "]";
        return str;
    };
    List.prototype.print = function () {
        console.log(this.toString());
    };
    return List;
}(Array));
exports.List = List;
