import { FairyEditor } from 'csharp';
import BaseClass from './Core/Common/BaseClass';
import { PkgCustom, PkgCustom_Btn } from './Core/Common/Const';
import InspectorData from './Core/Inspectors/InspectorData';
import BaseInspector from './Core/Inspectors/BaseInspector';
import BtnInspector from './Core/Inspectors/BtnInspector';
import MenuMain_Publish from './Core/Menu/MenuMain/MenuMain_Publish';
import { InspectorName, ShowObjectType } from './Core/Common/Types';
import EditorUtils from './Core/Utils/EditorUtils';
import MenuLib_CreateController from './Core/Menu/MenuLib/MenuLib_CreateController';

/** 加载插件UI包 */
FairyEditor.App.pluginManager.LoadUIPackage(EditorUtils.GetFilePath(PkgCustom));

[
    //编辑区菜单
    // new MenuDoc_CreateComponent(),
    // new MenuDoc_CreateRelation(),
    // new MenuDoc_CreateLuaName(),
    // new MenuDoc_Test(),

    //资源库菜单
    new MenuLib_CreateController(),
    // new MenuLib_Test(),

    //主菜单
    new MenuMain_Publish(),

    //检查器
    new BtnInspector(new InspectorData(PkgCustom, PkgCustom_Btn, InspectorName.Custom_BtnInspector, "按钮自定义数据", ShowObjectType.Button, true)),
    // new ComInspector(new InspectorInfo(PkgName, Pkg_BtnInspector, InspectorName.Custom_ComInspector, "组件自定义数据", ShowObjectType.Component, true, true)),
    // new TextLayoutInspector(new InspectorInfo(PkgName, Pkg_TextInspector, "TextInspector", "文本横竖排", ShowObjectType.Mixed, true)),

].forEach(v => v.Create());

//自定义发布代码
// export function onPublish(handler: FairyEditor.PublishHandler) {
//     if (!handler.genCode) return;
//     handler.genCode = false; //prevent default output

//     console.log('Handling gen code in plugin');
//     genCode(handler); //do it myself
// }

export function onDestroy() {
    BaseClass[ "DestroyInstance" ]();
    BaseInspector[ "DestroyInstance" ]();
}
