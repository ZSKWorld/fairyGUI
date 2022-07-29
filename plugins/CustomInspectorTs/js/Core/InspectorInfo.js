"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description: 检查器信息
 * @param {*}
 * @return {*}
 */
class InspectorInfo {
    constructor(PkgName, ComponentName, InspectorName, InspectorTitle, ForObjectType = "mixed" /* ShowObjectType.Mixed */, ShowInSelection = false, ShowInComponent = false, ShowInTransition = false) {
        //组件选择显示
        this.ShowInSelection = false;
        //背景选择显示
        this.ShowInComponent = true;
        //动效面板显示
        this.ShowInTransition = true;
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
