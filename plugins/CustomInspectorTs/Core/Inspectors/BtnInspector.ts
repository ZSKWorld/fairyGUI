import { FairyEditor, FairyGUI } from "csharp";
import InspectorInfo from "../InspectorInfo";
import { IComponentCustomData, InspectorName } from "../Types";
import BaseInspector from "./BaseInspector";
const App = FairyEditor.App;

export default class BtnInspector extends BaseInspector {
    private btnFunc: FairyGUI.GButton;
    private inputFunc: FairyGUI.GLabel;
    private btnTip: FairyGUI.GButton;
    private inputTip: FairyGUI.GLabel;
    private btnHoldPress: FairyGUI.GButton;
    private inputHoldPress: FairyGUI.GLabel;

    private customJsonData: IComponentCustomData;
    public constructor(info: InspectorInfo) {
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


    public UpdateUI(): boolean {
        const data = App.activeDoc.inspectingTarget.customData;
        this.customJsonData = data ? JSON.parse(data) : null;
        this.inputFunc.title = this.customJsonData?.funcId?.toString() || "";
        this.inputTip.title = this.customJsonData?.tipType || "";
        this.inputHoldPress.title = this.customJsonData?.holdPress || "0";
        return App.activeDoc.GetSelection().Count <= 1;
    }

    private OnBtnFunc(context: FairyGUI.EventContext) {
        if (this.inputFunc.title) {
            let funcId = Number(this.inputFunc.title);
            if (isNaN(funcId)) return FairyEditor.App.Alert("必须纯数字");
            this.customJsonData = this.customJsonData || {};
            this.customJsonData.funcId = Number(this.inputFunc.title);
        }
        else if (this.customJsonData) {
            delete this.customJsonData.funcId;
        } else return;
        this.SetCustomData();
    }

    private OnBtnTip(context: FairyGUI.EventContext) {
        if (this.inputTip.title) {
            this.customJsonData = this.customJsonData || {};
            this.customJsonData.tipType = this.inputTip.title;
        }
        else if (this.customJsonData) {
            delete this.customJsonData.tipType;
        } else return;
        this.SetCustomData();
    }

    private OnBtnHoldPress(context: FairyGUI.EventContext) {
        let text = Number(this.inputHoldPress.title)
        if (text) {
            this.customJsonData = this.customJsonData || {};
            this.customJsonData.holdPress = text.toString();
        } else if (this.customJsonData) {
            delete this.customJsonData.holdPress;
        } else return;
        this.SetCustomData();
    }

    private SetCustomData() {
        const data = JSON.stringify(this.customJsonData);
        App.activeDoc.inspectingTarget.customData = data == "{}" ? null : data;
        App.inspectorView.Refresh(InspectorName.Etc);
        App.inspectorView.Refresh(InspectorName.Custom_ComInspector);
        FairyEditor.App.activeDoc.SetModified(true);
    }

    public OnDestroy() {

    }
}