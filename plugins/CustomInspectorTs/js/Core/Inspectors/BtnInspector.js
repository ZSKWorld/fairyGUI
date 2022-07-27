"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const BaseInspector_1 = require("./BaseInspector");
const App = csharp_1.FairyEditor.App;
class BtnInspector extends BaseInspector_1.default {
    btnFunc;
    inputFunc;
    btnTip;
    inputTip;
    btnHoldPress;
    inputHoldPress;
    customJsonData;
    constructor(info) {
        super(info);
        this.panel.GetController("c1").selectedIndex = 0;
        this.btnFunc = this.panel.GetChild("BtnFunc").asButton;
        this.inputFunc = this.panel.GetChild("InputFunc").asLabel;
        this.btnTip = this.panel.GetChild("BtnTip").asButton;
        this.inputTip = this.panel.GetChild("InputTip").asLabel;
        this.btnHoldPress = this.panel.GetChild("BtnHoldPress").asButton;
        this.inputHoldPress = this.panel.GetChild("InputHoldPress").asLabel;
        this.btnFunc.onClick.Add((context) => { this.OnBtnFunc(context); });
        this.btnTip.onClick.Add((context) => { this.OnBtnTip(context); });
        this.btnHoldPress.onClick.Add((context) => { this.OnBtnHoldPress(context); });
    }
    UpdateUI() {
        const data = App.activeDoc.inspectingTarget.customData;
        this.customJsonData = data ? JSON.parse(data) : null;
        this.inputFunc.title = this.customJsonData?.funcId?.toString() || "";
        this.inputTip.title = this.customJsonData?.tipType || "";
        this.inputHoldPress.title = this.customJsonData?.holdPress || "0";
        return App.activeDoc.GetSelection().Count <= 1;
    }
    OnBtnFunc(context) {
        if (this.inputFunc.title) {
            let funcId = Number(this.inputFunc.title);
            if (isNaN(funcId))
                return csharp_1.FairyEditor.App.Alert("必须纯数字");
            this.customJsonData = this.customJsonData || {};
            this.customJsonData.funcId = Number(this.inputFunc.title);
        }
        else if (this.customJsonData) {
            delete this.customJsonData.funcId;
        }
        else
            return;
        this.SetCustomData();
    }
    OnBtnTip(context) {
        if (this.inputTip.title) {
            this.customJsonData = this.customJsonData || {};
            this.customJsonData.tipType = this.inputTip.title;
        }
        else if (this.customJsonData) {
            delete this.customJsonData.tipType;
        }
        else
            return;
        this.SetCustomData();
    }
    OnBtnHoldPress(context) {
        let text = Number(this.inputHoldPress.title);
        if (text) {
            this.customJsonData = this.customJsonData || {};
            this.customJsonData.holdPress = text.toString();
        }
        else if (this.customJsonData) {
            delete this.customJsonData.holdPress;
        }
        else
            return;
        this.SetCustomData();
    }
    SetCustomData() {
        const data = JSON.stringify(this.customJsonData);
        App.activeDoc.inspectingTarget.customData = data == "{}" ? null : data;
        App.inspectorView.Refresh("etc" /* Etc */);
        App.inspectorView.Refresh("ComInspector" /* Custom_ComInspector */);
        csharp_1.FairyEditor.App.activeDoc.SetModified(true);
    }
    OnDestroy() {
    }
}
exports.default = BtnInspector;
