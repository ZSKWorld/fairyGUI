"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const MenuDoc_Base_1 = require("./MenuDoc_Base");
class MenuDoc_CreateRelation extends MenuDoc_Base_1.default {
    InitMenData() {
        this.menuData = {
            atIndex: 0,
            text: "关联",
            childEnable: true,
            childs: []
        };
        Object.keys(csharp_1.FairyEditor.FRelationType).slice(0, 25).forEach((v) => {
            this.menuData.childs.push({ name: v, text: this.GetRelationText(v), selectCallback: (name) => this.CallBack(name) });
        });
    }
    GetRelationText(str) {
        str = str.replace(/LeftExt/g, "左延展");
        str = str.replace(/RightExt/g, "右延展");
        str = str.replace(/TopExt/g, "顶延展");
        str = str.replace(/BottomExt/g, "底延展");
        str = str.replace(/Center_Center/g, "左右居中");
        str = str.replace(/Middle_Middle/g, "上下居中");
        str = str.replace(/Left/g, "左");
        str = str.replace(/Right/g, "右");
        str = str.replace(/Center/g, "中");
        str = str.replace(/Width/g, "宽->宽");
        str = str.replace(/Top/g, "顶");
        str = str.replace(/Middle/g, "中");
        str = str.replace(/Bottom/g, "底");
        str = str.replace(/Height/g, "高->高");
        str = str.replace(/Size/g, "宽->宽，高->高");
        str = str.replace(/_/g, "->");
        return str;
    }
    CallBack(name) {
        if (this.relationFirst && this.relationSecond) {
            this.relationFirst.relations.AddItem(this.relationSecond, csharp_1.FairyEditor.FRelationType[name]);
            csharp_1.FairyEditor.App.inspectorView.GetInspector("relation" /* InspectorName.Relation */).UpdateUI();
            csharp_1.FairyEditor.App.activeDoc.SetModified(true);
        }
    }
    OnCreate() {
        this.rightClickCallback = new csharp_1.FairyGUI.EventCallback0(() => this.OnRightClick());
        csharp_1.FairyEditor.App.docView.docContainer.onRightClick.Add(this.rightClickCallback);
        csharp_1.FairyEditor.App.viewManager.GetView("fairygui.HierarchyView" /* ViewID.HierarchyView */).onRightClick.Add(this.rightClickCallback);
    }
    OnRightClick() {
        //FairyEditor.App.activeDoc.inspectingTarget == FairyEditor.App.activeDoc.content
        let targets = csharp_1.FairyEditor.App.activeDoc.GetSelection();
        this.relationFirst = null;
        this.relationSecond = null;
        let count = targets.Count;
        let name;
        if (count == 0) {
            name = "无关联对象";
        }
        else if (count == 1) {
            this.relationFirst = targets.get_Item(0);
            this.relationSecond = csharp_1.FairyEditor.App.activeDoc.content;
            name = `${this.relationFirst.name} 关联 容器`;
        }
        else {
            this.relationFirst = targets.get_Item(0);
            this.relationSecond = targets.get_Item(1);
            name = `${this.relationFirst.name} 关联 ${this.relationSecond.name}`;
        }
        this.parentMenu.SetItemText(this.menuData.name, name);
        const curMenu = this.parentMenu.GetSubMenu(this.menuData.name);
        this.menuData.childs.forEach(v => curMenu.SetItemEnabled(v.name, count > 0));
    }
    OnDestroy() {
        csharp_1.FairyEditor.App.docView.docContainer.onRightClick.Remove(this.rightClickCallback);
        csharp_1.FairyEditor.App.viewManager.GetView("fairygui.HierarchyView" /* ViewID.HierarchyView */).onRightClick.Remove(this.rightClickCallback);
        this.relationFirst = null;
        this.relationSecond = null;
        this.rightClickCallback = null;
    }
}
exports.default = MenuDoc_CreateRelation;
