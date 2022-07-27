import MenuDoc_Base from "./MenuDoc_Base";

export default class MenuDoc_Test extends MenuDoc_Base {
    protected InitMenData(): void {
        const _this = this;
        this.menuData = { name: "MenuDoc_Test", text: "测试", selectCallback: () => { _this.CallBack(); } };
    }
    private CallBack() {
    }
    protected OnCreate(): void {}
    protected OnDestroy(): void {}
}