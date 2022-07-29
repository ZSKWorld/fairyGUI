import { FairyEditor, FairyGUI } from "csharp";
import InspectorInfo from "../InspectorInfo";
import { IDestroy } from "../Types";
import { ViewChildInit } from "../Utils/DecoratorFactory";
import EditorUtils from "../Utils/EditorUtils";
export default abstract class BaseInspector extends FairyEditor.View.PluginInspector implements IDestroy {
    protected info: InspectorInfo;
    private curTarget: FairyEditor.FObject = FairyEditor.App.activeDoc?.inspectingTarget;
    private _lastTarget: FairyEditor.FObject;
    protected get lastInspectingTarget() {
        return this._lastTarget;
    }
    public constructor(info: InspectorInfo) {
        super();
        this.info = info;
        this.panel = FairyGUI.UIPackage.CreateObject(this.info.PkgName, this.info.ComponentName).asCom;
        ViewChildInit(this);
        this.updateAction = () => {
            if (FairyEditor.App.activeDoc?.inspectingTarget != this.curTarget) {
                this._lastTarget = this.curTarget;
                this.curTarget = FairyEditor.App.activeDoc.inspectingTarget;
            }
            return this.UpdateUI();
        };
        this.disposeAction = () => { return this.OnDestroy(); };
    }

    public AddInspector(): void {
        FairyEditor.App.inspectorView.AddInspector(() => this, this.info.InspectorName, this.info.InspectorTitle);
        this.info.ShowInSelection && FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, false, false);
        this.info.ShowInComponent && FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, true, false);
        this.info.ShowInTransition && FairyEditor.App.docFactory.ConnectInspector(this.info.InspectorName, this.info.ForObjectType, false, true);
    }
    public Destroy() {
        this.curTarget = null;
        this._lastTarget = null;
        this.OnDestroy();
    }

    public abstract UpdateUI(): boolean;
    protected abstract OnDestroy(): void;
}