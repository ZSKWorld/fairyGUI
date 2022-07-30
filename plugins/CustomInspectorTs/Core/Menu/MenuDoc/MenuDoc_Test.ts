import MenuDoc_Base from "./MenuDoc_Base";

export default class MenuDoc_Test extends MenuDoc_Base {
    protected InitMenuData(): void {
        this.menuData = { text: "测试", selectCallback: () => this.CallBack() };
    }

    private CallBack() {
    }

    protected OnCreate(): void { }

    protected OnDestroy(): void { }
    
}