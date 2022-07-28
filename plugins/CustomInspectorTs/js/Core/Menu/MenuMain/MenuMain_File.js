"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuMain_Base_1 = require("./MenuMain_Base");
class MenuMain_File extends MenuMain_Base_1.default {
    constructor() { super("file" /* MainMenuType.File */); }
    InitMenData() {
        this.menuData = {
            name: "MenuMain_File",
            text: "MenuMain_File",
        };
    }
    OnCreate() {
    }
    OnDestroy() {
    }
}
exports.default = MenuMain_File;
