"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const EditorUtils_1 = require("../EditorUtils");
class BaseInspector extends csharp_1.FairyEditor.View.PluginInspector {
    info;
    curTarget = csharp_1.FairyEditor.App.activeDoc?.inspectingTarget;
    _lastTarget;
    get lastInspectingTarget() {
        return this._lastTarget;
    }
    constructor(info) {
        super();
        this.info = info;
        csharp_1.FairyEditor.App.pluginManager.LoadUIPackage(EditorUtils_1.default.GetFilePath(this.info.PkgName));
        this.panel = csharp_1.FairyGUI.UIPackage.CreateObject(this.info.PkgName, this.info.ComponentName).asCom;
        this.updateAction = () => {
            if (csharp_1.FairyEditor.App.activeDoc?.inspectingTarget != this.curTarget) {
                this._lastTarget = this.curTarget;
                this.curTarget = csharp_1.FairyEditor.App.activeDoc.inspectingTarget;
            }
            return this.UpdateUI();
        };
        this.disposeAction = () => { return this.OnDestroy(); };
    }
    AddInspector() {
        csharp_1.FairyEditor.App.inspectorView.AddInspector(() => this, this.info.InspectorName, this.info.InspectorTitle);
        this.info.ShowInSelection && csharp_1.FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, false, false);
        this.info.ShowInComponent && csharp_1.FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, true, false);
        this.info.ShowInTransition && csharp_1.FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, false, true);
    }
    Destroy() {
        this.OnDestroy();
    }
}
exports.default = BaseInspector;
