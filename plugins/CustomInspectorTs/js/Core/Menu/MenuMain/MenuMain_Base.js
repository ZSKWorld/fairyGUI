"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const MenuBase_1 = require("../MenuBase");
/**
 * 抽出来一层处理主菜单。
 * 注意：构造参数为空时代表在主菜单后追加菜单，这时初始化menuData的 childEnable 必须为true，且 childs 不能为null，至少也得赋值个空数组，否则会报错
 */
class MenuMain_Base extends MenuBase_1.default {
    constructor(type) {
        let menu = csharp_1.FairyEditor.App.menu;
        if (type)
            menu = menu.GetSubMenu(type);
        super(menu);
    }
}
exports.default = MenuMain_Base;
