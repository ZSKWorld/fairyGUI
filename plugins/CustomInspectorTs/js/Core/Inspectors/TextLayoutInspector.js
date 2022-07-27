"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const BaseInspector_1 = require("./BaseInspector");
class TextLayoutInspector extends BaseInspector_1.default {
    textArea;
    btnSubmit;
    text;
    constructor(info) {
        super(info);
        this.textArea = this.panel.GetChild("TextArea").asLabel;
        this.btnSubmit = this.panel.GetChild("BtnSubmit").asButton;
        this.btnSubmit.onClick.Add(() => { this.OnBtnSubmit(); });
    }
    UpdateUI() {
        const type = csharp_1.FairyEditor.App.activeDoc.inspectingObjectType;
        const show = type == "text" /* Text */ || type == "richtext" /* RichText */;
        if (show) {
            this.textArea.title = this.TransformLine(csharp_1.FairyEditor.App.activeDoc.inspectingTarget.text);
        }
        return show;
    }
    OnBtnSubmit() {
        csharp_1.FairyEditor.App.activeDoc.inspectingTarget.relations.AddItem(csharp_1.FairyEditor.App.activeDoc.content, csharp_1.FairyEditor.FRelationType.Size);
        csharp_1.FairyEditor.App.activeDoc.inspectingTarget.text = this.TransformLine(this.textArea.title);
        const type = csharp_1.FairyEditor.App.activeDoc.inspectingObjectType;
        csharp_1.FairyEditor.App.inspectorView.GetInspector(type == "text" /* Text */ ? "text" /* Text */ : "richtext" /* RichText */).UpdateUI();
    }
    TransformLine(str) {
        let result = str;
        if (result) {
            const arr = result.split("\n");
            let strLen;
            let tempArr;
            const resultArr = [];
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
    FillChar(arr, length) {
        if (arr.length < length) {
            for (let i = arr.length; i < length; i++) {
                arr.push("\t");
            }
        }
    }
    OnDestroy() {
    }
}
exports.default = TextLayoutInspector;
