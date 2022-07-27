"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const BaseInspector_1 = require("./BaseInspector");
const App = csharp_1.FairyEditor.App;
class ComInspector extends BaseInspector_1.default {
    btnEffectAdd;
    btnEffectRemove;
    inputEffectKey;
    inputEffectValue;
    customJsonData;
    constructor(info) {
        super(info);
        this.panel.GetController("c1").selectedIndex = 1;
        this.btnEffectAdd = this.panel.GetChild("BtnEffectAdd").asButton;
        this.btnEffectRemove = this.panel.GetChild("BtnEffectRemove").asButton;
        this.inputEffectKey = this.panel.GetChild("InputEffectKey").asLabel;
        this.inputEffectValue = this.panel.GetChild("InputEffectValue").asLabel;
        // this.inputEffectKey.GetTextField().asTextInput.onChanged.Add(new FairyGUI.EventCallback0(()=>{
        //     console.log(this.inputEffectKey.title);
        // }));
        this.btnEffectAdd.onClick.Add((context) => { this.OnBtnEffectAdd(context); });
        this.btnEffectRemove.onClick.Add((context) => { this.OnBtnEffectRemove(context); });
    }
    UpdateUI() {
        let data = "";
        let selectCount = App.activeDoc.GetSelection().Count;
        if (selectCount == 0)
            data = App.activeDoc.content.remark;
        else {
            data = App.activeDoc.inspectingTarget.customData;
        }
        this.customJsonData = data ? JSON.parse(data) : null;
        this.inputEffectKey.title = "";
        this.inputEffectValue.title = "";
        return selectCount <= 1;
    }
    OnBtnEffectAdd(context) {
        let key = this.inputEffectKey.title.trim();
        let value = this.inputEffectValue.title.trim();
        if (!key || !value)
            return;
        this.customJsonData = this.customJsonData || {};
        this.customJsonData.effect = this.customJsonData.effect || {};
        this.customJsonData.effect[key] = value;
        this.SetCustomData();
    }
    OnBtnEffectRemove(context) {
        if (!this.customJsonData.effect)
            return;
        let key = this.inputEffectKey.title.trim();
        delete this.customJsonData.effect[key];
        if (Object.keys(this.customJsonData.effect).length == 0) {
            delete this.customJsonData.effect;
        }
        this.SetCustomData();
    }
    SetCustomData() {
        const data = JSON.stringify(this.customJsonData);
        if (App.activeDoc.GetSelection().Count == 0) {
            App.activeDoc.content.remark = data == "{}" ? null : data;
            App.inspectorView.Refresh("comEtc" /* ComEtc */);
        }
        else {
            App.activeDoc.inspectingTarget.customData = data == "{}" ? null : data;
            App.inspectorView.Refresh("etc" /* Etc */);
        }
        App.inspectorView.Refresh("BtnInspector" /* Custom_BtnInspector */);
        csharp_1.FairyEditor.App.activeDoc.SetModified(true);
    }
    OnDestroy() {
    }
}
exports.default = ComInspector;
