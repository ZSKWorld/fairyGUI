"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = void 0;
const csharp_1 = require("csharp");
const InspectorInfo_1 = require("./Core/InspectorInfo");
const BtnInspector_1 = require("./Core/Inspectors/BtnInspector");
const ComInspector_1 = require("./Core/Inspectors/ComInspector");
const TextLayoutInspector_1 = require("./Core/Inspectors/TextLayoutInspector");
const MenuDoc_CreateLuaName_1 = require("./Core/Menu/MenuDoc/MenuDoc_CreateLuaName");
const MenuDoc_CreateRelation_1 = require("./Core/Menu/MenuDoc/MenuDoc_CreateRelation");
const MenuLib_CreateController_1 = require("./Core/Menu/MenuLib/MenuLib_CreateController");
//FairyEditor.App.docFactory.contextMenu
const docMenus = [
    // new MenuDoc_CreateComponent(),
    new MenuDoc_CreateRelation_1.default(),
    new MenuDoc_CreateLuaName_1.default(),
    // new MenuDoc_Test(),
];
//FairyEditor.App.libView.contextMenu
const libsMenus = [
    new MenuLib_CreateController_1.default(),
    // new MenuLib_Test(),
];
docMenus.forEach((v, index) => v.Create(index));
libsMenus.forEach((v, index) => v.Create(index));
docMenus.length && csharp_1.FairyEditor.App.docFactory.contextMenu.AddSeperator(docMenus.length);
libsMenus.length && csharp_1.FairyEditor.App.libView.contextMenu.AddSeperator(libsMenus.length);
const inspectors = [
    new BtnInspector_1.default(new InspectorInfo_1.default("Custom", "BtnInspector", "BtnInspector" /* Custom_BtnInspector */, "按钮自定义数据", "Button" /* Button */, true)),
    new ComInspector_1.default(new InspectorInfo_1.default("Custom", "BtnInspector", "ComInspector" /* Custom_ComInspector */, "组件自定义数据", "component" /* Component */, true, true)),
    new TextLayoutInspector_1.default(new InspectorInfo_1.default("Custom", "TextInspector", "TextInspector", "文本横竖排", "mixed" /* Mixed */, true)),
];
inspectors.forEach((v) => v.AddInspector());
// export function onPublish(handler: FairyEditor.PublishHandler) {
//     if (!handler.genCode) return;
//     handler.genCode = false; //prevent default output
//     console.log('Handling gen code in plugin');
//     genCode(handler); //do it myself
// }
function onDestroy() {
    docMenus.forEach((v) => v.Destroy());
    libsMenus.forEach((v) => v.Destroy());
    inspectors.forEach((v) => v.OnDestroy());
}
exports.onDestroy = onDestroy;
