import { FairyEditor } from "csharp";
import EditorUtils from "../EditorUtils";
import { IMenu, IMenuData } from "../Types";

/**
 * 菜单基类
 */
export default abstract class MenuBase implements IMenu {
    /** 菜单数据，name属性一般不需要手动设置，默认根据类名作为name */
    protected menuData: IMenuData;
    protected parentMenu: FairyEditor.Component.IMenu;

    constructor(_parentMenu: FairyEditor.Component.IMenu) {
        this.parentMenu = _parentMenu;
    }

    public Create(index: number): void {
        this.InitMenData();
        this.menuData.name = this.menuData.name || this[ "__proto__" ].constructor.name;
        // this.menuData.atIndex = index;
        EditorUtils.CreateMenu(this.menuData, this.parentMenu);
        this.OnCreate();
    }

    public Destroy() {
        EditorUtils.RemoveMenu(this.menuData.name, this.parentMenu);
        this.OnDestroy();
    }

    protected abstract InitMenData(): void;
    protected abstract OnCreate(): void;
    protected abstract OnDestroy(): void;
}
