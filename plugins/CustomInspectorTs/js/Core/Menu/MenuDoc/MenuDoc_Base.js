"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const MenuBase_1 = require("../MenuBase");
/** 抽出来一层处理文档菜单 */
class MenuDoc_Base extends MenuBase_1.default {
    constructor() {
        super(csharp_1.FairyEditor.App.docFactory.contextMenu);
    }
}
exports.default = MenuDoc_Base;
