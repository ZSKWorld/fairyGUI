import { FairyEditor } from "csharp";
import MenuBase from "../MenuBase";
export const enum MainMenuType {
    /** 主菜单=》“文件” */
    File = "file",
    /** 主菜单=》“编辑” */
    Edit = "edit",
    /** 主菜单=》“资源” */
    Assets = "assets",
    /** 主菜单=》“工具” */
    Tool = "tool",
    /** 主菜单=》“视图” */
    View = "view",
    /** 主菜单=》“帮助” */
    Help = "help",
}

/** 
 * 抽出来一层处理主菜单。
 * 注意：构造参数为空时代表在主菜单后追加菜单，这时初始化menuData的 childEnable 必须为true，且 childs 不能为null，至少也得赋值个空数组，否则会报错
 */
export default abstract class MenuMain_Base extends MenuBase {
    constructor(type?: MainMenuType) {
        let menu = FairyEditor.App.menu;
        if (type) menu = menu.GetSubMenu(type);
        super(menu);
    }
}