import { FairyEditor, FairyGUI } from "csharp";
import EditorUtils from "../EditorUtils";
import { IMenu, IMenuData } from "../Types";

export default abstract class MenuBase implements IMenu{
    protected menuData: IMenuData;
    protected parentMenu: FairyEditor.Component.IMenu;

    public constructor() {
        this.InitMenData();
    }

    public Create(index:number): void {
        this.menuData.atIndex = index;
        EditorUtils.CreateMenu(this.menuData, this.parentMenu);
        this.OnCreate();
    }

    public Destroy() {
        EditorUtils.RemoveMenu(this.menuData.name, this.parentMenu);
        this.OnDestroy();
    }

    protected abstract InitMenData(): void;
    protected abstract OnDestroy(): void;
    protected abstract OnCreate(): void;
}
