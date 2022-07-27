"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const MenuDoc_Base_1 = require("./MenuDoc_Base");
class MenuDoc_CreateLuaName extends MenuDoc_Base_1.default {
    typeToType = {
        Button: "FairyGUI.GButton",
        text: "FairyGUI.GTextField",
        richtext: "FairyGUI.GRichTextField",
        inputtext: "FairyGUI.GTextInput",
        graph: "FairyGUI.GGraph",
        list: "FairyGUI.GList",
        loader: "FairyGUI.GLoader",
        loader3D: "FairyGUI.GLoader3D",
        Slider: "FairyGUI.GSlider",
        component: "FairyGUI.GComponent",
        image: "FairyGUI.GImage",
        group: "FairyGUI.GGroup",
        ComboBox: "FairyGUI.GComboBox",
        ProgressBar: "FairyGUI.GProgressBar",
        ScrollBar: "FairyGUI.GScrollBar",
    };
    InitMenData() {
        const _this = this;
        this.menuData = { name: "MenuDoc_CreateLuaName", text: "创建Lua名称代码到剪切板", selectCallback: () => { _this.CallBack(); } };
    }
    CallBack() {
        const target = csharp_1.FairyEditor.App.activeDoc.GetSelection();
        const count = target.Count;
        const ctrlCount = csharp_1.FairyEditor.App.activeDoc.content.controllers.Count;
        let result = "";
        if (count) {
            // ---@type CS.FairyGUI.GTextField
            // self.TxtName = com:GetChild("n10")
            for (let i = 0; i < count; i++) {
                const child = target.get_Item(i);
                if (child instanceof csharp_1.FairyEditor.FComponent && child.extention?._type == "Button" /* Button */) {
                    result += `---@type CommonBtnView\n`
                        + `self.${child.name} = self:AddView(com:GetChild("${child.name}"),CommonBtnView.Create())\n`;
                }
                else {
                    result += `---@type CS.${this.typeToType[child.objectType]}\nself.${child.name} = com:GetChild("${child.name}")\n`;
                }
            }
        }
        else if (ctrlCount > 0) {
            for (let i = 0; i < ctrlCount; i++) {
                const child = csharp_1.FairyEditor.App.activeDoc.content.controllers.get_Item(i);
                result += `---@type CS.FairyGUI.Controller\n`;
                result += `self.Ctrl_${child.name} = com:GetController("${child.name}")\n`;
            }
        }
        if (result)
            csharp_1.FairyEditor.Clipboard.SetText(result);
    }
    OnCreate() { }
    OnDestroy() { }
}
exports.default = MenuDoc_CreateLuaName;
