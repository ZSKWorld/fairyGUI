"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuDoc_Base_1 = require("./MenuDoc_Base");
class MenuDoc_Test extends MenuDoc_Base_1.default {
    InitMenData() {
        const _this = this;
        this.menuData = { text: "测试", selectCallback: () => { _this.CallBack(); } };
    }
    CallBack() {
    }
    OnCreate() { }
    OnDestroy() { }
}
exports.default = MenuDoc_Test;
