"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = void 0;
const csharp_1 = require("csharp");
const BaseClass_1 = require("./Core/BaseClass");
const Const_1 = require("./Core/Common/Const");
const InspectorInfo_1 = require("./Core/InspectorInfo");
const BtnInspector_1 = require("./Core/Inspectors/BtnInspector");
const MenuDoc_CreateRelation_1 = require("./Core/Menu/MenuDoc/MenuDoc_CreateRelation");
const MenuMain_Publish_1 = require("./Core/Menu/MenuMain/MenuMain_Publish");
const EditorUtils_1 = require("./Core/Utils/EditorUtils");
/** 加载插件UI包 */
csharp_1.FairyEditor.App.pluginManager.LoadUIPackage(EditorUtils_1.default.GetFilePath(Const_1.PkgName));
//编辑区菜单
const docMenus = [
    // new MenuDoc_CreateComponent(),
    new MenuDoc_CreateRelation_1.default(),
    // new MenuDoc_CreateLuaName(),
    // new MenuDoc_Test(),
];
//资源库菜单
const libsMenus = [
// new MenuLib_CreateController(),
// new MenuLib_Test(),
];
//主菜单
const mainMenu = [
    new MenuMain_Publish_1.default(),
];
docMenus.forEach(v => v.Create());
libsMenus.forEach(v => v.Create());
mainMenu.forEach(v => v.Create());
docMenus.length && csharp_1.FairyEditor.App.docFactory.contextMenu.AddSeperator(docMenus.length);
libsMenus.length && csharp_1.FairyEditor.App.libView.contextMenu.AddSeperator(libsMenus.length);
//检查器
const inspectors = [
    new BtnInspector_1.default(new InspectorInfo_1.default(Const_1.PkgName, Const_1.Pkg_BtnInspector, "BtnInspector" /* InspectorName.Custom_BtnInspector */, "按钮自定义数据", "Button" /* ShowObjectType.Button */, true)),
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
function onDestroy() {
    BaseClass_1.default.DestroyInstance();
    inspectors.forEach(v => v.Destroy());
}
exports.onDestroy = onDestroy;
