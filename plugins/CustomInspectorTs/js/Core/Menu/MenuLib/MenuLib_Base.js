"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const MenuBase_1 = require("../MenuBase");
/** 抽出来一层处理资源库菜单 */
class MenuLib_Base extends MenuBase_1.default {
    constructor() {
        super(csharp_1.FairyEditor.App.libView.contextMenu);
    }
}
exports.default = MenuLib_Base;
