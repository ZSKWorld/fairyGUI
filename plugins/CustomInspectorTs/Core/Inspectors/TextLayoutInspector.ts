import { FairyEditor, FairyGUI } from "csharp";
import InspectorInfo from "../InspectorInfo";
import { InspectorName, ShowObjectType } from "../Types";
import BaseInspector from "./BaseInspector";

export default class TextLayoutInspector extends BaseInspector {
    private textArea: FairyGUI.GLabel;
    private btnSubmit: FairyGUI.GButton;

    private text: string;
    public constructor(info: InspectorInfo) {
        super(info);
        this.textArea = this.panel.GetChild("TextArea").asLabel;
        this.btnSubmit = this.panel.GetChild("BtnSubmit").asButton;

        this.btnSubmit.onClick.Add(() => { this.OnBtnSubmit(); });
    }
    public UpdateUI(): boolean {
        const type = FairyEditor.App.activeDoc.inspectingObjectType;
        const show = type == ShowObjectType.Text || type == ShowObjectType.RichText;
        if (show) {
            this.textArea.title = this.TransformLine(FairyEditor.App.activeDoc.inspectingTarget.text);
        }
        return show;
    }

    private OnBtnSubmit() {
        FairyEditor.App.activeDoc.inspectingTarget.relations.AddItem(FairyEditor.App.activeDoc.content, FairyEditor.FRelationType.Size);
        FairyEditor.App.activeDoc.inspectingTarget.text = this.TransformLine(this.textArea.title);
        const type = FairyEditor.App.activeDoc.inspectingObjectType;
        FairyEditor.App.inspectorView.GetInspector(type == ShowObjectType.Text ? InspectorName.Text : InspectorName.RichText).UpdateUI();
    }

    private TransformLine(str: string) {
        let result = str;
        if (result) {
            const arr = result.split("\n");
            let strLen: number;
            let tempArr: any[];
            const resultArr: any[][] = [];
            arr.forEach((v, index) => {
                strLen = v.length;
                for (let i = 0; i < strLen; i++) {
                    resultArr[i] = resultArr[i] || [];
                    tempArr = resultArr[i];
                    this.FillChar(tempArr, index);
                    tempArr.push(v[i]);
                }
            });
            result = "";
            resultArr.forEach((v) => {
                result += v.join("") + "\n";
            });
        }
        return result.trim();
    }

    private FillChar(arr: any[], length: number) {
        if (arr.length < length) {
            for (let i = arr.length; i < length; i++) {
                arr.push("\t");
            }
        }
    }
    public OnDestroy(): void {
    }

}