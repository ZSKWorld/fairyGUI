import { FairyEditor } from 'csharp';
import InspectorInfo from './Core/InspectorInfo';
import BaseInspector from './Core/Inspectors/BaseInspector';
import BtnInspector from './Core/Inspectors/BtnInspector';
import ComInspector from './Core/Inspectors/ComInspector';
import TextLayoutInspector from './Core/Inspectors/TextLayoutInspector';
import MenuDoc_CreateLuaName from './Core/Menu/MenuDoc/MenuDoc_CreateLuaName';
import MenuDoc_CreateRelation from './Core/Menu/MenuDoc/MenuDoc_CreateRelation';
import MenuDoc_Test from './Core/Menu/MenuDoc/MenuDoc_Test';
import MenuLib_CreateController from './Core/Menu/MenuLib/MenuLib_CreateController';
import MenuLib_Test from './Core/Menu/MenuLib/MenuLib_Test';
import { IMenu, InspectorName, ShowObjectType } from './Core/Types';

//FairyEditor.App.docFactory.contextMenu
const docMenus: IMenu[] = [
    // new MenuDoc_CreateComponent(),
    new MenuDoc_CreateRelation(),
    new MenuDoc_CreateLuaName(),

    // new MenuDoc_Test(),
];

//FairyEditor.App.libView.contextMenu
const libsMenus: IMenu[] = [
    new MenuLib_CreateController(),

    // new MenuLib_Test(),
]
docMenus.forEach((v, index) => v.Create(index));
libsMenus.forEach((v, index) => v.Create(index));
docMenus.length && FairyEditor.App.docFactory.contextMenu.AddSeperator(docMenus.length);
libsMenus.length && FairyEditor.App.libView.contextMenu.AddSeperator(libsMenus.length);

const inspectors: BaseInspector[] = [
    new BtnInspector(new InspectorInfo("Custom", "BtnInspector", InspectorName.Custom_BtnInspector, "按钮自定义数据", ShowObjectType.Button, true)),
    new ComInspector(new InspectorInfo("Custom", "BtnInspector", InspectorName.Custom_ComInspector, "组件自定义数据", ShowObjectType.Component, true, true)),
    new TextLayoutInspector(new InspectorInfo("Custom", "TextInspector", "TextInspector", "文本横竖排", ShowObjectType.Mixed, true)),
];
inspectors.forEach((v) => v.AddInspector());

// export function onPublish(handler: FairyEditor.PublishHandler) {
//     if (!handler.genCode) return;
//     handler.genCode = false; //prevent default output

//     console.log('Handling gen code in plugin');
//     genCode(handler); //do it myself
// }


export function onDestroy() {
    docMenus.forEach((v) => v.Destroy());
    libsMenus.forEach((v) => v.Destroy());
    inspectors.forEach((v) => v.OnDestroy());
}
