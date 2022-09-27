"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strfyObj = exports.isObject = exports.isString = exports.isNumber = exports.zeroFill = exports.range = void 0;
var abnormal_1 = require("./abnormal");
function range(x) {
    var ar = [];
    if (typeof x === 'number') {
        for (var i = 0; i < x; i++) {
            ar.push(i);
        }
    }
    else if (x instanceof Array) {
        if (x.length == 1) {
            /**重载：传入数组只有1个元素 */
            for (var i = 0; i < x[0]; i++) {
                ar.push(i);
            }
        }
        else if (x.length == 2) {
            /**重载：传入2元素数组 */
            for (var i = x[0]; i < x[1]; i++) {
                ar.push(i);
            }
        }
        else if (x.length == 3) {
            /**重载：传入3元素数组 */
            for (var i = x[0]; i < x[1]; i += x[2]) {
                ar.push(i);
            }
        }
    }
    return ar;
}
exports.range = range;
function zeroFill(s) {
    var _ = "";
    if (typeof s === "number") {
        _ = s.toString();
    }
    return (_.length === 1) ? ("0" + s) : s;
}
exports.zeroFill = zeroFill;
function isNumber(input) {
    return (typeof input === 'number' ||
        Object.prototype.toString.call(input) === '[object Number]');
}
exports.isNumber = isNumber;
function isString(input) {
    return typeof input === 'string' || input instanceof String;
}
exports.isString = isString;
function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for input != null
    return (input != null &&
        Object.prototype.toString.call(input) === '[object Object]');
}
exports.isObject = isObject;
var keyWords = [
    "constructor", "__defineGetter__", "__defineSetter__",
    "hasOwnProperty", "__lookupGetter__", "__lookupSetter__",
    "isPrototypeOf", "propertyIsEnumerable", "toString",
    "valueOf", "__proto__", "toLocaleString"
];
function strfyObj(obj) {
    var str = "";
    var _ = Object.getOwnPropertyNames(obj.constructor.prototype);
    if (isObject(obj)) {
        str += "[" + obj.constructor.name + " instance: OwnPrpty{";
        var ct = 0;
        for (var key in obj) {
            str += key + ":" + obj[key] + ", ";
            ct += 1;
        }
        if (ct > 0) {
            str = str.slice(0, str.length - 2);
        }
        var ct2_1 = 0;
        str += "} CstrPrtMb{";
        _.forEach(function (e) {
            if (!keyWords.includes(e)) {
                str += e + ", ";
                ct2_1++;
            }
        });
        if (ct2_1 > 0) {
            str = str.slice(0, str.length - 2);
        }
        str += "}]";
    }
    else {
        new abnormal_1.ValueError("Got a wrong param.");
    }
    return str;
}
exports.strfyObj = strfyObj;
