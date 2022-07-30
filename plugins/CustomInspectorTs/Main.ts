import { FairyEditor } from 'csharp';
import { PkgCustom, PkgCustom_Btn, PkgCustom_Text } from './core/common/Const';
import { InspectorName, ShowObjectType } from './core/common/Types';
import { BaseInspector } from './core/inspectors/BaseInspector';
import { BtnInspector } from './core/inspectors/BtnInspector';
import { ComInspector } from './core/inspectors/ComInspector';
import { InspectorData } from './core/inspectors/InspectorData';
import { TextLayoutInspector } from './core/inspectors/TextLayoutInspector';
import { BaseClass } from './core/libs/BaseClass';
import { MenuDoc_CreateComponent } from './core/menu/menuDoc/MenuDoc_CreateComponent';
import { MenuDoc_CreateLuaName } from './core/menu/menuDoc/MenuDoc_CreateLuaName';
import { MenuDoc_CreateRelation } from './core/menu/menuDoc/MenuDoc_CreateRelation';
import { MenuDoc_Test } from './core/menu/menuDoc/MenuDoc_Test';
import { MenuLib_CreateController } from './core/menu/menuLib/MenuLib_CreateController';
import { MenuLib_Test } from './core/menu/menuLib/MenuLib_Test';
import { MenuMain_Publish } from './core/menu/menuMain/MenuMain_Publish';
import { EditorUtils } from './core/utils/EditorUtils';

/** 加载插件UI包 */
FairyEditor.App.pluginManager.LoadUIPackage(EditorUtils.GetFilePath(PkgCustom));

[
    //编辑区菜单
    // new MenuDoc_CreateComponent(),
    // new MenuDoc_CreateRelation(),
    // new MenuDoc_CreateLuaName(),
    // new MenuDoc_Test(),

    //资源库菜单
    // new MenuLib_CreateController(),
    // new MenuLib_Test(),

    //主菜单
    new MenuMain_Publish(),

    //检查器
    // new BtnInspector(new InspectorData(PkgCustom, PkgCustom_Btn, InspectorName.Custom_BtnInspector, "按钮自定义数据", ShowObjectType.Button, true)),
    // new ComInspector(new InspectorData(PkgCustom, PkgCustom_Btn, InspectorName.Custom_ComInspector, "组件自定义数据", ShowObjectType.Component, true, true)),
    // new TextLayoutInspector(new InspectorData(PkgCustom, PkgCustom_Text, "TextInspector", "文本横竖排", ShowObjectType.Mixed, true)),

].forEach(v => v.Create());

//自定义发布代码
// export function onPublish(handler: FairyEditor.PublishHandler) {
//     if (!handler.genCode) return;
//     handler.genCode = false; //prevent default output

//     console.log('Handling gen code in plugin');
//     genCode_TS(handler); //do it myself
// }

export function onDestroy() {
    const destroyMethodName = "DestroyInstance";
    BaseClass[ destroyMethodName ]();
    BaseInspector[ destroyMethodName ]();
}
