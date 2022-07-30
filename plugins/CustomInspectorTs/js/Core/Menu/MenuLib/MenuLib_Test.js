"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuLib_Base_1 = require("./MenuLib_Base");
class MenuLib_Test extends MenuLib_Base_1.default {
    InitMenData() {
        this.menuData = { text: "测试", selectCallback: () => this.CallBack() };
    }
    OnCreate() {
    }
    CallBack() {
        // const selectRES = FairyEditor.App.libView.GetSelectedResource();
        // if (selectRES.type != FairyEditor.FPackageItemType.COMPONENT) return FairyEditor.App.Alert(`无法添加非组件资源 => ${selectRES.fileName}`);
        // if (!selectRES.exported && selectRES.owner != FairyEditor.App.activeDoc.packageItem.owner) return FairyEditor.App.Alert(`无法添加其他包的未导出资源 => ${selectRES.fileName}`);
        // if (selectRES == FairyEditor.App.activeDoc.packageItem) return FairyEditor.App.Alert(`不能把组件放入自身`);
        // FairyEditor.App.activeDoc.InsertObject(selectRES.GetURL());
    }
    OnDestroy() {
    }
}
exports.default = MenuLib_Test;
