import { FairyEditor, FairyGUI } from "csharp";
import BaseClass from "../BaseClass";
import { PkgName, Pkg_Tip } from "./Const";

export default class Tip extends BaseClass {
    private static _inst: Tip;
    public static get Inst() { return Tip._inst || (Tip._inst = new Tip()); }

    private interverId: number;

    private comp: FairyGUI.GLabel;
    private showAni: FairyGUI.Transition;

    private constructor() {
        super();
        this.InitComp();
    }

    public Show(msg: string) {
        this.comp.title = msg;
        this.showAni.Play();
    }

    public Destroy(): void {
        if(this.comp){
            this.comp.Dispose();
            this.comp = null;
            this.showAni = null;
        }
    }

    private InitComp() {
        if (!this.comp) {
            this.comp = FairyGUI.UIPackage.CreateObject(PkgName, Pkg_Tip).asLabel;
            this.showAni = this.comp.GetTransitionAt(0);

            const main = FairyEditor.App.mainView.panel;
            main.AddChild(this.comp);

            this.comp.alpha = 0;
            this.comp.touchable = false;
            this.comp.SetXY(main.width / 2, main.height / 2);
            this.comp.AddRelation(main, FairyGUI.RelationType.Center_Center);
            this.comp.AddRelation(main, FairyGUI.RelationType.Middle_Middle);
        }
    }

}