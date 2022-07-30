import { MenuDoc_Base } from "./MenuDoc_Base";

export class MenuDoc_Test extends MenuDoc_Base {
    protected InitMenuData(): void {
        this.menuData = {
            text: "测试",
            selectCallback: () => this.CallBack()
        };
    }

    protected OnCreate(): void { }

    protected OnDestroy(): void { }

    private CallBack() { }

}