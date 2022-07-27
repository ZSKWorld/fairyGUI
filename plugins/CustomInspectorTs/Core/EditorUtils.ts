import { FairyEditor, FairyGUI } from "csharp";
import { IMenuData } from "./Types";
export default class EditorUtils {
    /**
     * @description: 创建目录
     * @param {IMenuData} data 目录数据
     * @param {FairyEditor} parent 父目录
     * @return {*}
     */
    public static CreateMenu(data: IMenuData, parent?: FairyEditor.Component.IMenu): void {
        if (!data) return;
        const nameCheckArr = [];
        EditorUtils.createMenu(data, parent, nameCheckArr);
    }
    private static createMenu(data: IMenuData, parent: FairyEditor.Component.IMenu, nameArr: string[]): void {
        if (nameArr.indexOf(data.name) != -1) return FairyEditor.App.Alert(`目录有重名：${data.name}--${data.text}`);
        nameArr.push(data.name);
        if (data.childs) {
            parent.AddItem(data.text, data.name, data.atIndex ?? 0, true, data.selectCallback);
            if (data.childEnable) {
                const curMenu: FairyEditor.Component.IMenu = parent.GetSubMenu(data.name);
                data.childs.forEach((v) => EditorUtils.createMenu(v, curMenu, nameArr));
            }
        } else {
            parent.AddItem(data.text, data.name, data.atIndex ?? -1, false, data.selectCallback);
        }
    }
    
    /**
     * 创建控制器XML数据
     * @param name 控制器名字
     * @param pageNames 页数量&名字
     * @param exported 是否导出为组件属性
     * @returns 
     */
    public static CreateControllerXML(name: string, pageNames?: (string | number)[], exported?: boolean) {
        const xml = FairyGUI.Utils.XML.Create("");
        xml.SetAttribute("name", name);
        // xml.SetAttribute("alias","asdfas");  //备注名
        // xml.SetAttribute("autoRadioGroupDepth",true);    //自动调整单选组对象层次
        xml.SetAttribute("exported", !!exported);  //导出为组件属性
        // xml.SetAttribute("homePageType","variable"); //首页类型
        // xml.SetAttribute("homePage","Test");
        if (!pageNames || !pageNames.length) {
            pageNames = ["", ""];
        }
        let pageData = "";
        pageNames.forEach((v, index) => { pageData += index + "," + v + (index == pageNames.length - 1 ? "" : ",") });
        xml.SetAttribute("pages", pageData);   //页面
        // xml.SetAttribute("selected",0);
        return xml;
    }
    /**
     * @description: 删除目录
     * @param {string} name
     * @return {*}
     */
    public static RemoveMenu(name: string, parentMenu: FairyEditor.Component.IMenu) {
        parentMenu = parentMenu || FairyEditor.App.docFactory.contextMenu;
        parentMenu.RemoveItem(name);
    }
    /**
     * @description: 向编辑器中添加组件
     * @param {string} url 组件URL
     * @return {*}
     */
    public static AddComponent(url: string): void {
        if (!FairyEditor.App.activeDoc) return;
        if (url.startsWith("ui://") == false) return FairyEditor.App.Alert(`错误的组件URL---${url}\nURL必须以 ui:// 开头`);
        FairyEditor.App.activeDoc.UnselectAll();
        FairyEditor.App.activeDoc.InsertObject(url);
    }

    /**
     * 获取包地址
     * @param name 包名
     * @returns 包地址
     */
    public static GetFilePath(name: string): string {
        return FairyEditor.App.pluginManager.basePath + "/" + (eval("__dirname") as string).replace("/Core", "").replace("/js", "") + "/Packages/" + name;
    }
}

//界面
//fairygui.LibraryView          0   资源库
//fairygui.InspectorView        1   检查器
//fairygui.HierarchyView        2   显示列表
//fairygui.PreviewView          3   预览
//fairygui.TimelineView         4   时间轴
//fairygui.TransitionListView   5   动效
//fairygui.FavoritesView        6   收藏夹
//fairygui.SearchView           7   搜索
//fairygui.ConsoleView          8   控制台
//fairygui.ReferenceView        9   引用
//fairygui.PlugInView           10  插件
//fairygui.DocumentView         11  编辑页面
//fairygui.TestView             12  测试页面
//主界面上方选项变量名
//file      文件
//edit      编辑
//assets    资源
//tool      工具
//view      视图
//help      帮助