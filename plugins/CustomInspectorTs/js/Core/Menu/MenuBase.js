"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EditorUtils_1 = require("../EditorUtils");
/**
 * 菜单基类
 */
class MenuBase {
    /** 菜单数据，name属性一般不需要手动设置，默认根据类名作为name */
    menuData;
    parentMenu;
    constructor(_parentMenu) {
        this.parentMenu = _parentMenu;
    }
    Create(index) {
        this.InitMenData();
        this.menuData.name = this.menuData.name || this["__proto__"].constructor.name;
        // this.menuData.atIndex = index;
        EditorUtils_1.default.CreateMenu(this.menuData, this.parentMenu);
        this.OnCreate();
    }
    Destroy() {
        EditorUtils_1.default.RemoveMenu(this.menuData.name, this.parentMenu);
        this.OnDestroy();
    }
}
exports.default = MenuBase;
