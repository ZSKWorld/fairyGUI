import { FairyEditor } from "csharp";
import { ShowObjectType } from "../../Types";
import MenuDoc_Base from "./MenuDoc_Base";

export default class MenuDoc_CreateLuaName extends MenuDoc_Base {
    private typeToType = {
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
    protected InitMenData(): void {
        const _this = this;
        this.menuData = { name: "MenuDoc_CreateLuaName", text: "创建Lua名称代码到剪切板", selectCallback: () => { _this.CallBack(); } };
    }

    private CallBack() {
        const target = FairyEditor.App.activeDoc.GetSelection();
        const count: number = (target as any).Count;

        const ctrlCount = FairyEditor.App.activeDoc.content.controllers.Count;

        let result = "";
        if (count) {
            // ---@type CS.FairyGUI.GTextField
            // self.TxtName = com:GetChild("n10")
            for (let i = 0; i < count; i++) {
                const child = target.get_Item(i);
                if (child instanceof FairyEditor.FComponent && child.extention?._type == ShowObjectType.Button) {
                    result += `---@type CommonBtnView\n`
                        + `self.${child.name} = self:AddView(com:GetChild("${child.name}"),CommonBtnView.Create())\n`;
                }
                else {
                    result += `---@type CS.${this.typeToType[child.objectType]}\nself.${child.name} = com:GetChild("${child.name}")\n`;
                }
            }
        } else if (ctrlCount > 0) {
            for (let i = 0; i < ctrlCount; i++) {
                const child = FairyEditor.App.activeDoc.content.controllers.get_Item(i);
                result += `---@type CS.FairyGUI.Controller\n`;
                result += `self.Ctrl_${child.name} = com:GetController("${child.name}")\n`;
            }
        }
        if (result) FairyEditor.Clipboard.SetText(result);
    }
    protected OnCreate(): void { }
    protected OnDestroy(): void { }
}
