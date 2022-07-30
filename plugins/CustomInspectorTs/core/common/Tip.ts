import { FairyEditor, FairyGUI } from "csharp";
import { BaseClass } from "../libs/BaseClass";
import { PkgCustom, PkgCustom_Tip } from "./Const";
/** 弹窗提示 */
export class Tip extends BaseClass {
    private static _inst: Tip;
    public static get Inst() { return Tip._inst || (Tip._inst = new Tip()); }

    private label: FairyGUI.GLabel;
    private showAni: FairyGUI.Transition;

    private constructor() {
        super();
        this.InitComp();
    }

    public Show(msg: string) {
        this.label.title = msg;
        this.showAni.Play();
    }

    protected Destroy(): void {
        if (this.label) {
            this.label.Dispose();
            this.label = null;
            this.showAni = null;
        }
    }

    private InitComp() {
        if (!this.label) {
            this.label = FairyGUI.UIPackage.CreateObject(PkgCustom, PkgCustom_Tip).asLabel;
            this.showAni = this.label.GetTransitionAt(0);

            const main = FairyEditor.App.mainView.panel;
            main.AddChildAt(this.label, 5);

            this.label.touchable = false;
            this.label.SetXY(main.width / 2, -28);
            this.label.AddRelation(main, FairyGUI.RelationType.Center_Center);
        }
    }

}