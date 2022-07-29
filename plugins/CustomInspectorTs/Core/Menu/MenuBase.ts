import { FairyEditor } from "csharp";
import BaseClass from "../BaseClass";
import { IMenu, IMenuData } from "../Types";
import EditorUtils from "../Utils/EditorUtils";

/**
 * 菜单基类
 */
export default abstract class MenuBase extends BaseClass implements IMenu {
    /** 菜单数据，name属性一般不需要手动设置，默认根据类名作为name */
    protected menuData: IMenuData;
    /** 父菜单，现在的菜单都是附加在已有的菜单上的 */
    protected parentMenu: FairyEditor.Component.IMenu;

    constructor(_parentMenu: FairyEditor.Component.IMenu) {
        super();
        this.parentMenu = _parentMenu;
    }

    public Create(): void {
        this.InitMenData();
        this.menuData.name = this.menuData.name || this[ "__proto__" ].constructor.name;
        EditorUtils.CreateMenu(this.menuData, this.parentMenu);
        this.OnCreate();
    }

    public Destroy() {
        EditorUtils.RemoveMenu(this.menuData.name, this.parentMenu);
        this.parentMenu = null;
        this.OnDestroy();
    }

    /**初始化菜单数据 */
    protected abstract InitMenData(): void;

    protected abstract OnCreate(): void;

    protected abstract OnDestroy(): void;

}
