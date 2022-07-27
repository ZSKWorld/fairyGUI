import { ShowObjectType } from "./Types";

/**
 * @description: 检查器信息
 * @param {*}
 * @return {*}
 */
export default class InspectorInfo {
    //包名
    public PkgName: string;
    //包内组件名
    public ComponentName: string;
    public InspectorName: string;
    //检查器显示标题
    public InspectorTitle: string;
    //显示元件类型
    public ForObjectType: ShowObjectType
    //组件选择显示
    public ShowInSelection = false;
    //背景选择显示
    public ShowInComponent = true;
    //动效面板显示
    public ShowInTransition = true;

    public constructor(
        PkgName: string,
        ComponentName: string,
        InspectorName: string,
        InspectorTitle: string,
        ForObjectType: ShowObjectType = ShowObjectType.Mixed,
        ShowInSelection: boolean = false,
        ShowInComponent: boolean = false,
        ShowInTransition: boolean = false) {
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