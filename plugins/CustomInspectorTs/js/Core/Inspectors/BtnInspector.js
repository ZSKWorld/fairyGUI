"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const DecoratorFactory_1 = require("../Utils/DecoratorFactory");
const BaseInspector_1 = require("./BaseInspector");
const App = csharp_1.FairyEditor.App;
class BtnInspector extends BaseInspector_1.default {
    constructor(info) {
        super(info);
        this.panel.GetController("c1").selectedIndex = 0;
        this.btnFunc.onClick.Add((context) => { this.OnBtnFunc(context); });
        this.btnTip.onClick.Add((context) => { this.OnBtnTip(context); });
        this.btnHoldPress.onClick.Add((context) => { this.OnBtnHoldPress(context); });
    }
    UpdateUI() {
        var _a, _b, _c, _d;
        const data = App.activeDoc.inspectingTarget.customData;
        this.customJsonData = data ? JSON.parse(data) : null;
        this.inputFunc.title = ((_b = (_a = this.customJsonData) === null || _a === void 0 ? void 0 : _a.funcId) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        this.inputTip.title = ((_c = this.customJsonData) === null || _c === void 0 ? void 0 : _c.tipType) || "";
        this.inputHoldPress.title = ((_d = this.customJsonData) === null || _d === void 0 ? void 0 : _d.holdPress) || "0";
        return App.activeDoc.GetSelection().Count <= 1;
    }
    OnBtnFunc(context) {
        if (this.inputFunc.title) {
            let funcId = Number(this.inputFunc.title);
            if (isNaN(funcId))
                return App.Alert("必须纯数字");
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
        App.inspectorView.Refresh("etc" /* InspectorName.Etc */);
        App.inspectorView.Refresh("ComInspector" /* InspectorName.Custom_ComInspector */);
        App.activeDoc.SetModified(true);
    }
    OnDestroy() {
        this.btnFunc = null;
        this.inputFunc = null;
        this.btnTip = null;
        this.inputTip = null;
        this.btnHoldPress = null;
        this.inputHoldPress = null;
    }
}
__decorate([
    (0, DecoratorFactory_1.ViewChild)("BtnFunc")
], BtnInspector.prototype, "btnFunc", void 0);
__decorate([
    (0, DecoratorFactory_1.ViewChild)("InputFunc")
], BtnInspector.prototype, "inputFunc", void 0);
__decorate([
    (0, DecoratorFactory_1.ViewChild)("BtnTip")
], BtnInspector.prototype, "btnTip", void 0);
__decorate([
    (0, DecoratorFactory_1.ViewChild)("InputTip")
], BtnInspector.prototype, "inputTip", void 0);
__decorate([
    (0, DecoratorFactory_1.ViewChild)("BtnHoldPress")
], BtnInspector.prototype, "btnHoldPress", void 0);
__decorate([
    (0, DecoratorFactory_1.ViewChild)("InputHoldPress")
], BtnInspector.prototype, "inputHoldPress", void 0);
exports.default = BtnInspector;
