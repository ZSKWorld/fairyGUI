"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = void 0;
const csharp_1 = require("csharp");
const MenuMain_Publish_1 = require("./Core/Menu/MenuMain/MenuMain_Publish");
//编辑区菜单
const docMenus = [
// new MenuDoc_CreateComponent(),
// new MenuDoc_CreateRelation(),
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
docMenus.forEach((v, index) => v.Create(index));
libsMenus.forEach((v, index) => v.Create(index));
mainMenu.forEach((v, index) => v.Create(index));
docMenus.length && csharp_1.FairyEditor.App.docFactory.contextMenu.AddSeperator(docMenus.length);
libsMenus.length && csharp_1.FairyEditor.App.libView.contextMenu.AddSeperator(libsMenus.length);
//检查器
const inspectors = [
// new BtnInspector(new InspectorInfo("Custom", "BtnInspector", InspectorName.Custom_BtnInspector, "按钮自定义数据", ShowObjectType.Button, true)),
// new ComInspector(new InspectorInfo("Custom", "BtnInspector", InspectorName.Custom_ComInspector, "组件自定义数据", ShowObjectType.Component, true, true)),
// new TextLayoutInspector(new InspectorInfo("Custom", "TextInspector", "TextInspector", "文本横竖排", ShowObjectType.Mixed, true)),
];
inspectors.forEach((v) => v.AddInspector());
// export function onPublish(handler: FairyEditor.PublishHandler) {
//     if (!handler.genCode) return;
//     handler.genCode = false; //prevent default output
//     console.log('Handling gen code in plugin');
//     genCode(handler); //do it myself
// }
function onDestroy() {
    docMenus.forEach(v => v.Destroy());
    libsMenus.forEach(v => v.Destroy());
    mainMenu.forEach(v => v.Destroy());
    inspectors.forEach(v => v.Destroy());
}
exports.onDestroy = onDestroy;
