import { FairyEditor } from 'csharp';
import BaseClass from './Core/BaseClass';
import { PkgName, Pkg_BtnInspector } from './Core/Common/Const';
import InspectorInfo from './Core/InspectorInfo';
import BaseInspector from './Core/Inspectors/BaseInspector';
import BtnInspector from './Core/Inspectors/BtnInspector';
import ComInspector from './Core/Inspectors/ComInspector';
import TextLayoutInspector from './Core/Inspectors/TextLayoutInspector';
import MenuDoc_CreateRelation from './Core/Menu/MenuDoc/MenuDoc_CreateRelation';
import MenuMain_Publish from './Core/Menu/MenuMain/MenuMain_Publish';
import { IMenu, InspectorName, ShowObjectType } from './Core/Types';
import EditorUtils from './Core/Utils/EditorUtils';

/** 加载插件UI包 */
FairyEditor.App.pluginManager.LoadUIPackage(EditorUtils.GetFilePath(PkgName));

//编辑区菜单
const docMenus: IMenu[] = [
    // new MenuDoc_CreateComponent(),
    new MenuDoc_CreateRelation(),
    // new MenuDoc_CreateLuaName(),

    // new MenuDoc_Test(),
];

//资源库菜单
const libsMenus: IMenu[] = [
    // new MenuLib_CreateController(),

    // new MenuLib_Test(),
];

//主菜单
const mainMenu: IMenu[] = [
    new MenuMain_Publish(),
];

docMenus.forEach(v => v.Create());
libsMenus.forEach(v => v.Create());
mainMenu.forEach(v => v.Create());

docMenus.length && FairyEditor.App.docFactory.contextMenu.AddSeperator(docMenus.length);
libsMenus.length && FairyEditor.App.libView.contextMenu.AddSeperator(libsMenus.length);

//检查器
const inspectors: BaseInspector[] = [
    new BtnInspector(new InspectorInfo(PkgName, Pkg_BtnInspector, InspectorName.Custom_BtnInspector, "按钮自定义数据", ShowObjectType.Button, true)),
    // new ComInspector(new InspectorInfo(PkgName, Pkg_BtnInspector, InspectorName.Custom_ComInspector, "组件自定义数据", ShowObjectType.Component, true, true)),
    // new TextLayoutInspector(new InspectorInfo(PkgName, Pkg_TextInspector, "TextInspector", "文本横竖排", ShowObjectType.Mixed, true)),
];
inspectors.forEach((v) => v.AddInspector());

// export function onPublish(handler: FairyEditor.PublishHandler) {
//     if (!handler.genCode) return;
//     handler.genCode = false; //prevent default output

//     console.log('Handling gen code in plugin');
//     genCode(handler); //do it myself
// }


export function onDestroy() {
    BaseClass.DestroyInstance();
    inspectors.forEach(v => v.Destroy());
}
