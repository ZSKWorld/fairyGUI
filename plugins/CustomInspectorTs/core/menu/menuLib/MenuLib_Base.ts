
import { FairyEditor } from "csharp";
import { MenuBase } from "../MenuBase";

/** 抽出来一层处理资源库菜单 */
export abstract class MenuLib_Base extends MenuBase {
    public constructor() {
        super(FairyEditor.App.libView.contextMenu);
    }
}