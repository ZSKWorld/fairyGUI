"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = void 0;
const csharp_1 = require("csharp");
const BaseClass_1 = require("./Core/Common/BaseClass");
const Const_1 = require("./Core/Common/Const");
const InspectorData_1 = require("./Core/InspectorData");
const BaseInspector_1 = require("./Core/Inspectors/BaseInspector");
const BtnInspector_1 = require("./Core/Inspectors/BtnInspector");
const MenuMain_Publish_1 = require("./Core/Menu/MenuMain/MenuMain_Publish");
const EditorUtils_1 = require("./Core/Utils/EditorUtils");
const MenuLib_CreateController_1 = require("./Core/Menu/MenuLib/MenuLib_CreateController");
/** 加载插件UI包 */
csharp_1.FairyEditor.App.pluginManager.LoadUIPackage(EditorUtils_1.default.GetFilePath(Const_1.PkgCustom));
[
    //编辑区菜单
    // new MenuDoc_CreateComponent(),
    // new MenuDoc_CreateRelation(),
    // new MenuDoc_CreateLuaName(),
    // new MenuDoc_Test(),
    //资源库菜单
    new MenuLib_CreateController_1.default(),
    // new MenuLib_Test(),
    //主菜单
    new MenuMain_Publish_1.default(),
    //检查器
    new BtnInspector_1.default(new InspectorData_1.default(Const_1.PkgCustom, Const_1.PkgCustom_Btn, "BtnInspector" /* InspectorName.Custom_BtnInspector */, "按钮自定义数据", "Button" /* ShowObjectType.Button */, true)),
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
function onDestroy() {
    BaseClass_1.default["DestroyInstance"]();
    BaseInspector_1.default["DestroyInstance"]();
}
exports.onDestroy = onDestroy;
