"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const BaseClass_1 = require("./BaseClass");
const Const_1 = require("./Const");
/** 弹窗提示 */
class Tip extends BaseClass_1.default {
    constructor() {
        super();
        this.InitComp();
    }
    static get Inst() { return Tip._inst || (Tip._inst = new Tip()); }
    Show(msg) {
        this.comp.title = msg;
        this.showAni.Play();
    }
    Destroy() {
        if (this.comp) {
            this.comp.Dispose();
            this.comp = null;
            this.showAni = null;
        }
    }
    InitComp() {
        if (!this.comp) {
            this.comp = csharp_1.FairyGUI.UIPackage.CreateObject(Const_1.PkgCustom, Const_1.PkgCustom_Tip).asLabel;
            this.showAni = this.comp.GetTransitionAt(0);
            const main = csharp_1.FairyEditor.App.mainView.panel;
            main.AddChild(this.comp);
            this.comp.alpha = 0;
            this.comp.touchable = false;
            this.comp.SetXY(main.width / 2, main.height / 2);
            this.comp.AddRelation(main, csharp_1.FairyGUI.RelationType.Center_Center);
            this.comp.AddRelation(main, csharp_1.FairyGUI.RelationType.Middle_Middle);
        }
    }
}
exports.default = Tip;
