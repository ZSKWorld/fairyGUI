"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuMain_Base_1 = require("./MenuMain_Base");
class MenuMain_Main extends MenuMain_Base_1.default {
    constructor() { super(null); }
    InitMenData() {
        this.menuData = {
            name: "MenuMain_Main",
            text: "测试菜单",
            childEnable: true,
            atIndex: 1,
            childs: []
        };
    }
    OnCreate() {
    }
    OnDestroy() {
    }
}
exports.default = MenuMain_Main;
