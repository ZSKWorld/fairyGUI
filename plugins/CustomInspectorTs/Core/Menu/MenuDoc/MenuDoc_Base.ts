import { FairyEditor } from "csharp";
import MenuBase from "../MenuBase";

export default abstract class MenuDoc_Base extends MenuBase {
    public constructor() {
        super();
        this.parentMenu = FairyEditor.App.docFactory.contextMenu;
    }
}