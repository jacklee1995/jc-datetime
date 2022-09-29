export declare class List extends Array {
    constructor(...args: any[]);
    append(elem: any): void;
    add(elem: any): void;
    pop_left(): any;
    has(searchElement: any, fromIndex?: number): boolean;
    append_left(elem: any): void;
    /**删除给定索引处的元素 */
    drop(index: number): void;
    /**移除第一个值为 x 的值 */
    remove(x: any): void;
    /**
     * 查找第一个值为 x 的元素所对应的索引
     * @param x 要查找的那个值
     * @returns 该值第一次出现时对应的索引
     */
    first(x: any): number;
    /**
     * 查找所有值为 x 的元素的索引
     * @param x 要查找的那个值
     * @returns A List of numbers.
     */
    search(x: any): List;
    /**清除所有元素 */
    clear(): void;
    /**统计元素出现次数 */
    count(i: any, strict?: boolean): number;
    /**
     * 与另一个可迭代对象 映射（Map）并返回
     * 另一个可迭代对象的所有元素将映射为对应于本列表各个元素为键时的值
     * @param ar 映射为值的另一个数组
     * @returns
     */
    zip(ar: any[] | List): Map<any, any>;
    toStringArray(): string[];
    toString(inDetail?: boolean, _isOuter?: boolean): string;
    print(inDetail?: boolean): void;
}
