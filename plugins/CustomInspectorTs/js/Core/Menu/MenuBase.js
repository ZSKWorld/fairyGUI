"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseClass_1 = require("../BaseClass");
const EditorUtils_1 = require("../Utils/EditorUtils");
/**
 * 菜单基类
 */
class MenuBase extends BaseClass_1.default {
    constructor(_parentMenu) {
        super();
        this.parentMenu = _parentMenu;
    }
    Create() {
        this.InitMenData();
        this.menuData.name = this.menuData.name || this["__proto__"].constructor.name;
        EditorUtils_1.default.CreateMenu(this.menuData, this.parentMenu);
        this.OnCreate();
    }
    Destroy() {
        EditorUtils_1.default.RemoveMenu(this.menuData.name, this.parentMenu);
        this.parentMenu = null;
        this.OnDestroy();
    }
}
exports.default = MenuBase;
