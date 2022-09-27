import { ValueError } from "./abnormal"

// range()函数的实现
export function range(x:number):number[];                    // end
export function range(x:[number]):number[];                  // [end]
export function range(x:[number, number]):number[];          // [start, end]
export function range(x:[number, number, number]):number[];  // [start, end, step]
export function range(x: string | number | any[]){
    let ar:number[] = [];
    if(typeof x ==='number'){
      
      for(let i=0; i<x; i++){
        ar.push(i)
      }
    }else if(x instanceof Array){
      if(x.length==1){
          /**重载：传入数组只有1个元素 */
          for(let i=0; i<x[0]; i++){
              ar.push(i)
          }

      }else if(x.length == 2){
          /**重载：传入2元素数组 */
          for(let i=x[0]; i<x[1]; i++){
              ar.push(i);
          }
      }else if(x.length==3){
          /**重载：传入3元素数组 */
          for(let i=x[0]; i<x[1]; i+=x[2]){
              ar.push(i);
          }
      }
    }
    return ar;
}

export function zeroFill(s: string|number):string{
    let _="";
    if (typeof s === "number"){_ = s.toString()}
    return (_.length === 1)?("0"+s):s as string;
}

export function isNumber(input: any) {
    return (
        typeof input === 'number' ||
        Object.prototype.toString.call(input) === '[object Number]'
    );
}

export function isString(input: any) {
    return typeof input === 'string' || input instanceof String;
}

export function isObject(input: any) {
    // IE8 will treat undefined and null as object if it wasn't for input != null
    return (
        input != null &&
        Object.prototype.toString.call(input) === '[object Object]'
    );
}

let keyWords = [
    "constructor","__defineGetter__","__defineSetter__",
    "hasOwnProperty","__lookupGetter__","__lookupSetter__",
    "isPrototypeOf","propertyIsEnumerable","toString",
    "valueOf","__proto__","toLocaleString"
]

export function strfyObj(obj:any){
    let str = "";
    let _ = Object.getOwnPropertyNames(obj.constructor.prototype)
    if(isObject(obj)){
        str +="[" + obj.constructor.name + " instance: OwnPrpty{" 
        let ct = 0;
        for (const key in obj) {
            str += key+":"+obj[key]+", ";
            ct += 1;
        }
        if(ct > 0){
            str = str.slice(0, str.length-2);
        }
        let ct2 = 0;
        str += "} CstrPrtMb{"
        _.forEach(e => {
            if(!keyWords.includes(e)){
                str += e +", ";
                ct2++;
            }
        });
        if(ct2 > 0){
            str = str.slice(0, str.length-2);
        }
        str += "}]";
    }else{
        new ValueError("Got a wrong param.")
    }
    return str;
}

