import { IDestroy } from "./Types";
/**
 * 编辑器基类，所有自定义类都要继承该类，以达到统一销毁的目的
 */
export default abstract class BaseClass implements IDestroy {
    private static __instances: BaseClass[] = [];
    public static DestroyInstance() {
        this.__instances.forEach(v => v.Destroy());
        this.__instances.length = 0;
    }

    constructor() {
        BaseClass.__instances.push(this);
    }

    public abstract Destroy(): void;

}