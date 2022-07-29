"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const DecoratorFactory_1 = require("../Utils/DecoratorFactory");
class BaseInspector extends csharp_1.FairyEditor.View.PluginInspector {
    constructor(info) {
        var _a;
        super();
        this.curTarget = (_a = csharp_1.FairyEditor.App.activeDoc) === null || _a === void 0 ? void 0 : _a.inspectingTarget;
        this.info = info;
        this.panel = csharp_1.FairyGUI.UIPackage.CreateObject(this.info.PkgName, this.info.ComponentName).asCom;
        (0, DecoratorFactory_1.ViewChildInit)(this);
        this.updateAction = () => {
            var _a;
            if (((_a = csharp_1.FairyEditor.App.activeDoc) === null || _a === void 0 ? void 0 : _a.inspectingTarget) != this.curTarget) {
                this._lastTarget = this.curTarget;
                this.curTarget = csharp_1.FairyEditor.App.activeDoc.inspectingTarget;
            }
            return this.UpdateUI();
        };
        this.disposeAction = () => { return this.OnDestroy(); };
    }
    get lastInspectingTarget() {
        return this._lastTarget;
    }
    AddInspector() {
        csharp_1.FairyEditor.App.inspectorView.AddInspector(() => this, this.info.InspectorName, this.info.InspectorTitle);
        this.info.ShowInSelection && csharp_1.FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, false, false);
        this.info.ShowInComponent && csharp_1.FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, true, false);
        this.info.ShowInTransition && csharp_1.FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, false, true);
    }
    Destroy() {
        this.curTarget = null;
        this._lastTarget = null;
        this.OnDestroy();
    }
}
exports.default = BaseInspector;
