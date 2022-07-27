"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const MenuBase_1 = require("../MenuBase");
class MenuDoc_Base extends MenuBase_1.default {
    constructor() {
        super();
        this.parentMenu = csharp_1.FairyEditor.App.docFactory.contextMenu;
    }
}
exports.default = MenuDoc_Base;
