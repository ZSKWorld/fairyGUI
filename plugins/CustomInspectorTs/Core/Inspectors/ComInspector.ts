import { FairyEditor, FairyGUI } from "csharp";
import InspectorInfo from "../InspectorInfo";
import { IComponentCustomData, InspectorName } from "../Types";
import BaseInspector from "./BaseInspector";
const App = FairyEditor.App;

export default class ComInspector extends BaseInspector {

    private btnEffectAdd:FairyGUI.GButton;
    private btnEffectRemove:FairyGUI.GButton;
    private inputEffectKey:FairyGUI.GLabel;
    private inputEffectValue:FairyGUI.GLabel;

    private customJsonData: IComponentCustomData;
    public constructor(info: InspectorInfo) {
        super(info);
        this.panel.GetController("c1").selectedIndex = 1;

        this.btnEffectAdd = this.panel.GetChild("BtnEffectAdd").asButton;
        this.btnEffectRemove = this.panel.GetChild("BtnEffectRemove").asButton;
        this.inputEffectKey = this.panel.GetChild("InputEffectKey").asLabel;
        this.inputEffectValue = this.panel.GetChild("InputEffectValue").asLabel;

        // this.inputEffectKey.GetTextField().asTextInput.onChanged.Add(new FairyGUI.EventCallback0(()=>{
        //     console.log(this.inputEffectKey.title);
        // }));

        this.btnEffectAdd.onClick.Add((context)=>{this.OnBtnEffectAdd(context)});
        this.btnEffectRemove.onClick.Add((context)=>{this.OnBtnEffectRemove(context)});
    }


    public UpdateUI(): boolean {
        let data = "";
        let selectCount = App.activeDoc.GetSelection().Count;
        if(selectCount == 0)
            data = App.activeDoc.content.remark;
        else {
            data = App.activeDoc.inspectingTarget.customData;
        }
        this.customJsonData = data ? JSON.parse(data) : null;
        this.inputEffectKey.title = "";
        this.inputEffectValue.title = "";
        return selectCount <= 1;
    }

    private OnBtnEffectAdd(context: FairyGUI.EventContext){
        let key = this.inputEffectKey.title.trim();
        let value = this.inputEffectValue.title.trim();
        if(!key || !value)return;
        this.customJsonData = this.customJsonData || {};
        this.customJsonData.effect = this.customJsonData.effect || {};
        this.customJsonData.effect[key] = value;
        this.SetCustomData();
    }
    private OnBtnEffectRemove(context: FairyGUI.EventContext){
        if(!this.customJsonData.effect)return;
        let key = this.inputEffectKey.title.trim();
        delete this.customJsonData.effect[key];
        if (Object.keys(this.customJsonData.effect).length == 0) {
            delete this.customJsonData.effect;
        }
        this.SetCustomData();
    }

    private SetCustomData() {
        const data = JSON.stringify(this.customJsonData);
        if (App.activeDoc.GetSelection().Count == 0){
            App.activeDoc.content.remark = data == "{}" ? null : data;
            App.inspectorView.Refresh(InspectorName.ComEtc);
        }
        else {
            App.activeDoc.inspectingTarget.customData = data == "{}" ? null : data;
            App.inspectorView.Refresh(InspectorName.Etc);
        }
        App.inspectorView.Refresh(InspectorName.Custom_BtnInspector);
        FairyEditor.App.activeDoc.SetModified(true);
    }

    public OnDestroy() {

    }

    //获取
}