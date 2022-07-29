"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 编辑器基类，所有自定义类都要继承该类，以达到统一销毁的目的
 */
class BaseClass {
    constructor() {
        BaseClass.__instances.push(this);
    }
    static DestroyInstance() {
        this.__instances.forEach(v => v.Destroy());
        this.__instances.length = 0;
    }
}
exports.default = BaseClass;
BaseClass.__instances = [];
