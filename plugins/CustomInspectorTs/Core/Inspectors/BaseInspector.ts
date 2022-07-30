import { FairyEditor, FairyGUI } from "csharp";
import InspectorData from "./InspectorData";
import { DestroyInstanceClass, ViewChildInit } from "../Utils/Decorators";

@DestroyInstanceClass("Dispose")
export default abstract class BaseInspector extends FairyEditor.View.PluginInspector {
    protected info: InspectorData;
    public constructor(info: InspectorData) {
        super();
        this.info = info;
        this.panel = FairyGUI.UIPackage.CreateObject(info.PkgName, info.ComponentName).asCom;
        ViewChildInit(this);
        this.updateAction = () => this.OnUpdate();
        this.disposeAction = () => this.OnDestroy();
    }

    public Create(): void {
        const { InspectorName, InspectorTitle, ForObjectType, ShowInSelection, ShowInComponent, ShowInTransition } = this.info;
        FairyEditor.App.inspectorView.AddInspector(() => this, InspectorName, InspectorTitle);
        ShowInSelection && FairyEditor.App.docFactory.ConnectInspector(InspectorName, ForObjectType, false, false);
        ShowInComponent && FairyEditor.App.docFactory.ConnectInspector(InspectorName, ForObjectType, true, false);
        ShowInTransition && FairyEditor.App.docFactory.ConnectInspector(InspectorName, ForObjectType, false, true);
        this.OnCreate();
    }

    protected abstract OnCreate(): void;
    protected abstract OnUpdate(): boolean;
    protected abstract OnDestroy(): void;
}