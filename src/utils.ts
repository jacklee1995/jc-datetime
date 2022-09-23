declare type index = [a:number,b:number]
export class List extends Array{
  constructor(...args: any){
    if(args.length===1){
      super();
      this[0] = args[0]
    }
    else{
      super();
      for(const i of args){this.push(i)}
    }
  }

  append(elem:any):void{this.push(elem)}
  add(elem:any):void{this.push(elem)}
  
  pop_left(){return this.shift()}
  
  has(searchElement: any, fromIndex?: number):boolean{return this.includes(searchElement,fromIndex)}

  append_left(elem:any):void{
    for(let i=this.length;i>0;i--){
        this[i] = this[i-1]
      }
      this[0] = elem
  }

  /**删除给定索引处的元素 */
  drop(index:number){
    delete this[index];
    for(let i=index;i<this.length-index+1;i++){
      this[i] = this[i+1];
    }
    this.pop();
  }

  /**移除第一个值为 x 的值 */
  remove(x:any):void{
    let iterator:IterableIterator<any> =  this[Symbol.iterator]()
    let ct:number = 1;
    while(iterator.next().value==x){
      ct=ct+1
    }
    this.drop(ct);
  }

  /**
   * 查找第一个值为 x 的元素所对应的索引 
   * @param x 要查找的那个值
   * @returns 该值第一次出现时对应的索引
   */
  first(x:any):number{
    let iterator:IterableIterator<any> =  this[Symbol.iterator]();
    let index:number = 0;
    function _(){
      let item = iterator.next();
      if(item.value != x){
        index = index+1;
        _();
      }
    }
    _()
    return index
  }

  
  range(...args:[number?,number?,number?]):any|any[]{
    if(args.length===0){return new List()}
    else if(args.length===1){
      let a = new List()
      return a.slice(args[0])
    }
    else if(args.length===2){
      let a = new List()
      return a.slice(args[0], args[1])
    }
    else{
      
    }
  }

  /**
   * 查找所有值为 x 的元素的索引
   * @param x 要查找的那个值
   * @returns A List of numbers.
   */
  search(x:any):List{
    let iterator:IterableIterator<any> =  this[Symbol.iterator]();
    let index:number = 0;
    let res:List = new List()
    
    function _() {
      let item =iterator.next();
      if(item.value == x){res.push(index)};
      if(!item.done){ index = index + 1;_();}
    }
    _();
    return res
  }

  /**清除所有元素 */
  clear(){
    for(let i=0;i<this.length;i++){this.pop()}
  }

  /**统计元素出现次数 */
  count(i:any, strict:boolean=true):number{
    let ct = 0;
    this.forEach(e=>{
      if(strict){if(e===i){ct = ct+1}}
      else{if(e==i){ct = ct+1}}
    })
    return ct
  }
  
  /**
   * 与另一个可迭代对象 映射（Map）并返回
   * 另一个可迭代对象的所有元素将映射为对应于本列表各个元素为键时的值
   * @param ar 映射为值的另一个数组
   * @returns 
   */
  zip(ar:any[]|List):Map<any,any>{
    let mp = new Map()
    // let len = 0;
    // if(this.length > )
    for(let i=0;i<this.length;i++){
      mp.set(this[i],ar[i])
    }
    return mp
  }
}


// range()函数的实现
export function range(x:number):number[];                  // end
export function range(x:[number]):number[];                // [end]
export function range(x:[number, number]):number[];         // [start, end]
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
