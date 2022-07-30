import { FairyEditor } from "csharp";
import { MenuBase } from "../MenuBase";
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
 * 注意：构造参数为空时代表在主菜单后追加菜单，这时初始化menuData的 childEnable 必须为true，否则会报错
 */
export abstract class MenuMain_Base extends MenuBase {
    constructor(type?: MainMenuType) {
        let menu = FairyEditor.App.menu;
        if (type) menu = menu.GetSubMenu(type);
        super(menu);
    }
}

/**文件主菜单 */
export abstract class MenuMainFile_Base extends MenuMain_Base {
    constructor() { super(MainMenuType.File); }
}

/**编辑主菜单 */
export abstract class MenuMainEdit_Base extends MenuMain_Base {
    constructor() { super(MainMenuType.Edit); }
}

/**资源主菜单 */
export abstract class MenuMainAssets_Base extends MenuMain_Base {
    constructor() { super(MainMenuType.Assets); }
}

/**工具主菜单 */
export abstract class MenuMainTool_Base extends MenuMain_Base {
    constructor() { super(MainMenuType.Tool); }
}

/**视图主菜单 */
export abstract class MenuMainView_Base extends MenuMain_Base {
    constructor() { super(MainMenuType.View); }
}

/**帮助主菜单 */
export abstract class MenuMainHelp_Base extends MenuMain_Base {
    constructor() { super(MainMenuType.Help); }
}