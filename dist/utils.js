"use strict";

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
exports.__esModule = true;
exports.range = exports.List = void 0;
var List = /** @class */function (_super) {
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
        } else {
            _this = _super.call(this) || this;
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var i = args_1[_a];
                _this.push(i);
            }
        }
        return _this;
    }
    List.prototype.append = function (elem) {
        this.push(elem);
    };
    List.prototype.add = function (elem) {
        this.push(elem);
    };
    List.prototype.pop_left = function () {
        return this.shift();
    };
    List.prototype.has = function (searchElement, fromIndex) {
        return this.includes(searchElement, fromIndex);
    };
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
    List.prototype.range = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 0) {
            return new List();
        } else if (args.length === 1) {
            var a = new List();
            return a.slice(args[0]);
        } else if (args.length === 2) {
            var a = new List();
            return a.slice(args[0], args[1]);
        } else {}
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
        if (strict === void 0) {
            strict = true;
        }
        var ct = 0;
        this.forEach(function (e) {
            if (strict) {
                if (e === i) {
                    ct = ct + 1;
                }
            } else {
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
    return List;
}(Array);
exports.List = List;
function range(x) {
    var ar = [];
    if (typeof x === 'number') {
        for (var i = 0; i < x; i++) {
            ar.push(i);
        }
    } else if (x instanceof Array) {
        if (x.length == 1) {
            /**重载：传入数组只有1个元素 */
            for (var i = 0; i < x[0]; i++) {
                ar.push(i);
            }
        } else if (x.length == 2) {
            /**重载：传入2元素数组 */
            for (var i = x[0]; i < x[1]; i++) {
                ar.push(i);
            }
        } else if (x.length == 3) {
            /**重载：传入3元素数组 */
            for (var i = x[0]; i < x[1]; i += x[2]) {
                ar.push(i);
            }
        }
    }
    return ar;
}
exports.range = range;
