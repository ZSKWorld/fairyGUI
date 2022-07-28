"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const puerts_1 = require("puerts");
const EditorUtils_1 = require("../../EditorUtils");
const MenuLib_Base_1 = require("./MenuLib_Base");
const List = (0, puerts_1.$generic)(csharp_1.System.Collections.Generic.List$1, csharp_1.FairyEditor.FPackageItem);
class MenuLib_CreateController extends MenuLib_Base_1.default {
    /** libView item 点击事件 */
    itemClick;
    /** “+更多控制” 点击事件 */
    addMoreControlClick;
    /** 资源库选中资源 */
    selectRES;
    createEnable;
    /** 添加的控制器名称 */
    controllerName;
    InitMenData() {
        const _this = this;
        this.menuData = { text: "为编辑对象创建图片控制器", selectCallback: () => { _this.CallBack(); } };
    }
    OnCreate() {
        this.selectRES = new List();
        this.itemClick = new csharp_1.FairyGUI.EventCallback1((event) => { this.OnItemClick(event); });
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("treeView").asList.onClickItem.Add(this.itemClick);
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("listView").asList.onClickItem.Add(this.itemClick);
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("treeView").asList.onRightClickItem.Add(this.itemClick);
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("listView").asList.onRightClickItem.Add(this.itemClick);
        this.addMoreControlClick = new csharp_1.FairyGUI.EventCallback1((event) => {
            try {
                this.OnAddMoreControlClick(event);
            }
            catch (error) {
                return csharp_1.FairyEditor.App.Alert("偶尔有bug很正常，稍安勿躁，重新创建试试!!!");
            }
        });
        csharp_1.FairyEditor.App.inspectorView.GetInspector("gear" /* InspectorName.Gear */).panel.GetChild("add").asButton.onClick.Add(this.addMoreControlClick);
    }
    OnItemClick(event) {
        const targetRES = csharp_1.FairyEditor.App.libView.GetSelectedResources(false);
        let count = this.selectRES.Count;
        let child;
        //去掉未选中的
        for (let i = count - 1; i >= 0; i--) {
            child = this.selectRES.get_Item(i);
            if (targetRES.Contains(child) == false) {
                this.selectRES.RemoveAt(i);
            }
        }
        count = targetRES.Count;
        //添加新选中的
        for (let i = 0; i < count; i++) {
            child = targetRES.get_Item(i);
            if (this.selectRES.Contains(child) == false) {
                this.selectRES.Add(child);
            }
        }
    }
    OnAddMoreControlClick(event) {
        if (!this.createEnable)
            return;
        //点击图标按钮
        let iconButton = csharp_1.FairyEditor.App.groot.GetChildAt(1).asCom.GetChildAt(1).asList.GetChildAt(6 /* MoreControllIndex.Icon */).asButton;
        iconButton.FireClick(true, true);
        //控制器页数
        let pageData = [];
        this.selectRES.ForEach((v) => pageData.push(""));
        //添加控制器
        csharp_1.FairyEditor.App.activeDoc.AddController(EditorUtils_1.default.CreateControllerXML(this.controllerName, pageData));
        const controller = csharp_1.FairyEditor.App.activeDoc.content.GetController(this.controllerName);
        //选择图标控制器
        csharp_1.FairyEditor.App.inspectorView.GetInspector("gear" /* InspectorName.Gear */).panel.GetChild("list").asList.GetChildAt(8 /* InspectorControlListIndex.Icon */).asCom.GetChild("controller").asLabel.onClick.Call();
        let iconControlBtn;
        for (let i = 0; i < csharp_1.FairyEditor.App.groot.GetChildAt(1).asCom.GetChildAt(1).asList.numItems; i++) {
            iconControlBtn = csharp_1.FairyEditor.App.groot.GetChildAt(1).asCom.GetChildAt(1).asList.GetChildAt(i).asButton;
            if (iconControlBtn.title == this.controllerName) {
                iconControlBtn.FireClick(true, true);
                break;
            }
        }
        csharp_1.FairyEditor.App.libView.SetResourcesExported(this.selectRES, true);
        //为控制器每页设置icon
        for (let i = 0; i < this.selectRES.Count; i++) {
            const element = this.selectRES.get_Item(i);
            controller.selectedIndex = i;
            csharp_1.FairyEditor.App.activeDoc.inspectingTarget.icon = element.GetURL();
        }
        //重置控制器选项
        controller.selectedIndex = 0;
        this.createEnable = false;
    }
    CallBack() {
        if (csharp_1.FairyEditor.App.activeDoc.GetSelection().Count == 0)
            return csharp_1.FairyEditor.App.Alert("未选中编辑对象");
        if (csharp_1.FairyEditor.App.activeDoc?.inspectingObjectType != "loader" /* ShowObjectType.Loader */)
            return csharp_1.FairyEditor.App.Alert("编辑对象必须是\"装载器\"");
        // this.selectRES = FairyEditor.App.libView.GetSelectedResources(false);
        let selectStr = "确认控制器图片顺序:\n";
        if (this.selectRES.Count) {
            let notImageFileNames = [];
            let notExportedFileNames = [];
            let index = 0;
            this.selectRES.ForEach((v) => {
                selectStr += `\t${index++}.\t${v.fileName}\n`;
                (v.type != csharp_1.FairyEditor.FPackageItemType.IMAGE) && notImageFileNames.push(v.name);
                (v.exported == false && v.owner != csharp_1.FairyEditor.App.activeDoc.inspectingTarget.pkg) && notExportedFileNames.push(v.name);
            });
            if (notImageFileNames.length)
                return csharp_1.FairyEditor.App.Alert("不能包含非图片资源:\n" + notImageFileNames.join("\n"));
            if (notExportedFileNames.length)
                return csharp_1.FairyEditor.App.Alert("不能使用其他包未导出的图片资源:\n" + notExportedFileNames.join("\n"));
            if (this.selectRES.Count == 1)
                return csharp_1.FairyEditor.App.Alert("就选一个图片？？？直接拖不就行了？");
            csharp_1.FairyEditor.App.Confirm(selectStr, (result) => {
                if (result == "yes" /* AppConfirmResult.Yes */) {
                    this.controllerName = this.GetDefaultControllerName();
                    csharp_1.FairyEditor.App.Input("控制器名字", this.controllerName, (name) => {
                        this.controllerName = name || this.controllerName;
                        //点击“+更多控制”
                        csharp_1.FairyEditor.App.inspectorView.GetInspector("gear" /* InspectorName.Gear */).panel.GetChild("add").asButton.FireClick(true, true);
                        this.createEnable = true;
                    });
                }
            });
        }
    }
    /** 获取新建控制器默认名称 */
    GetDefaultControllerName() {
        const oldNames = [];
        csharp_1.FairyEditor.App.activeDoc.content.controllers.ForEach((v) => oldNames.push(v.name));
        const count = csharp_1.FairyEditor.App.activeDoc.content.controllers.Count;
        for (let i = 1; i <= count; i++) {
            if (oldNames.indexOf("c" + i) == -1) {
                return "c" + i;
            }
        }
        return "c" + (count + 1);
    }
    /** 检查名字是否和已存在控制器名称重复 */
    CheckDuplicateName(name) {
        const controllers = csharp_1.FairyEditor.App.activeDoc.content.controllers;
        for (let i = controllers.Count - 1; i >= 0; i--) {
            if (controllers.get_Item(i).name == name) {
                return true;
            }
        }
    }
    OnDestroy() {
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("treeView").asList.onClickItem.Remove(this.itemClick);
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("listView").asList.onClickItem.Remove(this.itemClick);
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("treeView").asList.onRightClickItem.Remove(this.itemClick);
        csharp_1.FairyEditor.App.libView.GetChildAt(0).asCom.GetChild("listView").asList.onRightClickItem.Remove(this.itemClick);
        csharp_1.FairyEditor.App.inspectorView.GetInspector("gear" /* InspectorName.Gear */).panel.GetChild("add").asButton.onClick.Remove(this.addMoreControlClick);
    }
}
exports.default = MenuLib_CreateController;
