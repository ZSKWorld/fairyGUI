import { FairyEditor } from "csharp";
import MenuBase from "../MenuBase";

/** 抽出来一层处理文档菜单 */
export default abstract class MenuDoc_Base extends MenuBase {
    public constructor() {
        super(FairyEditor.App.docFactory.contextMenu);
    }
}