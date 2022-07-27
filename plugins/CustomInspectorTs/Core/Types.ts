import { System } from "csharp";
export interface IMenu{
    Create(index:number):void;
    Destroy():void;
}
export interface IMenuData {
    name: string;
    text: string;
    url?: string;
    atIndex?: number;
    childEnable?: boolean;
    childs?: IMenuData[];
    selectCallback?: System.Action$1<string>;
};

export interface IComponentCustomData{
    funcId?: number;
    tipType?: string;
    holdPress?: string;
    effect?: { [key: string]: string };
}

export const enum ShowObjectType {
    Mixed = "mixed",
    Button = "Button",              //FairyGUI.GButton
    Text = "text",                  //FairyGUI.GTextField
    RichText = "richtext",          //FairyGUI.GRichTextField
    InputText = "inputtext",        //FairyGUI.GTextInput
    Graph = "graph",                //FairyGUI.GGraph
    List = "list",                  //FairyGUI.GList
    Loader = "loader",              //FairyGUI.GLoader
    Loader3D = "loader3D",          //FairyGUI.GLoader3D
    Slider = "Slider",              //FairyGUI.GSlider
    Component = "component",        //FairyGUI.GComponent
    Image = "image",                //FairyGUI.GImage
    Group = "group",                //FairyGUI.GGroup
    ComboBox = "ComboBox",          //FairyGUI.GComboBox
    ProgressBar = "ProgressBar",    //FairyGUI.GProgressBar
    ScrollBar = "ScrollBar",        //FairyGUI.GScrollBar
}
export const enum InspectorName {
    Info = "info",
    Basic = "basic",
    /** 属性控制 */
    Gear = "gear",
    Relation = "relation",
    Effect = "effect",
    Etc = "etc",
    Progressbar = "progressbar",
    Button = "button",
    Text = "text",
    RichText = "richtext",
    TextEffect = "texteffect",

    
    ComBasic = "comBasic",
    ComRelation = "comRelation",
    ComEtc = "comEtc",
    DesignImage = "designImage",

    //CustomInspector
    Custom_BtnInspector = "BtnInspector",
    Custom_ComInspector = "ComInspector",
}

/** 控制器首页类型 */
export const enum ControllerHomePageType {
    Default = "",
    Specific = "specific",  //后跟 homePage=>页面索引
    Branch = "branch",
    Variable = "variable",  //后跟 homePage=>自定义属性名
}

/** "+更多控制" 弹出面板 索引 */
export const enum MoreControllIndex {
    /**显示-2 */
    Display2,
    /**位置（X/Y） */
    Position,
    /**大小（宽/高/ScaleX/ScaleY） */
    SizeScale,
    /**颜色 */
    Color,
    /**外观（透明度/旋转/变灰/不可触摸） */
    Look,
    /**文本 */
    Text,
    /**图标 */
    Icon,
    /**动画 */
    Animation,
    /**字体大小 */
    FontSize,
}

/** 属性控制 list 索引 */
export const enum InspectorControlListIndex{
    /** 默认显示 */
    Display1,
    /** 显示-2  */
    Display2,
    /** 位置（X/Y）  */
    Position,
    /** 大小（宽/高/ScaleX/ScaleY）  */
    SizeScale,
    /** 外观（透明度/旋转/变灰/不可触摸）  */
    Look,
    /** 颜色  */
    Color,
    /** 动画  */
    Animation,
    /** 文本  */
    Text,
    /** 图标  */
    Icon,
    /** 字体大小  */
    FontSize,
}

export const enum AppConfirmResult{
    Yes = "yes",
    No = "no",
}