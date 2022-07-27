"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EditorUtils_1 = require("../EditorUtils");
class MenuBase {
    menuData;
    parentMenu;
    constructor() {
        this.InitMenData();
    }
    Create(index) {
        this.menuData.atIndex = index;
        EditorUtils_1.default.CreateMenu(this.menuData, this.parentMenu);
        this.OnCreate();
    }
    Destroy() {
        EditorUtils_1.default.RemoveMenu(this.menuData.name, this.parentMenu);
        this.OnDestroy();
    }
}
exports.default = MenuBase;
