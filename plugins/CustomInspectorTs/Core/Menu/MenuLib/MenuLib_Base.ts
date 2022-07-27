
import { FairyEditor } from "csharp";
import MenuBase from "../MenuBase";

export default abstract class MenuLib_Base extends MenuBase{
    public constructor() {
        super();
        this.parentMenu = FairyEditor.App.libView.contextMenu;
    }
}