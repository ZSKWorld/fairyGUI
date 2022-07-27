import { FairyEditor, FairyGUI } from "csharp";
import EditorUtils from "../EditorUtils";
import InspectorInfo from "../InspectorInfo";
export default abstract class BaseInspector extends FairyEditor.View.PluginInspector {
    protected info: InspectorInfo;
    private curTarget: FairyEditor.FObject = FairyEditor.App.activeDoc?.inspectingTarget;
    private _lastTarget: FairyEditor.FObject;
    protected get lastInspectingTarget() {
        return this._lastTarget;
    }
    public constructor(info: InspectorInfo) {
        super();
        this.info = info;
        FairyEditor.App.pluginManager.LoadUIPackage(EditorUtils.GetFilePath(this.info.PkgName));
        this.panel = FairyGUI.UIPackage.CreateObject(this.info.PkgName, this.info.ComponentName).asCom;
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
        this.OnDestroy();
    }

    public abstract UpdateUI(): boolean;
    public abstract OnDestroy(): void;
}