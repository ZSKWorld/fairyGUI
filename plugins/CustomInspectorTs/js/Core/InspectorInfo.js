"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description: 检查器信息
 * @param {*}
 * @return {*}
 */
class InspectorInfo {
    //包名
    PkgName;
    //包内组件名
    ComponentName;
    InspectorName;
    //检查器显示标题
    InspectorTitle;
    //显示元件类型
    ForObjectType;
    //组件选择显示
    ShowInSelection = false;
    //背景选择显示
    ShowInComponent = true;
    //动效面板显示
    ShowInTransition = true;
    constructor(PkgName, ComponentName, InspectorName, InspectorTitle, ForObjectType = "mixed" /* ShowObjectType.Mixed */, ShowInSelection = false, ShowInComponent = false, ShowInTransition = false) {
        this.PkgName = PkgName;
        this.ComponentName = ComponentName;
        this.InspectorName = InspectorName;
        this.InspectorTitle = InspectorTitle;
        this.ForObjectType = ForObjectType;
        this.ShowInSelection = ShowInSelection;
        this.ShowInComponent = ShowInComponent;
        this.ShowInTransition = ShowInTransition;
    }
}
exports.default = InspectorInfo;
