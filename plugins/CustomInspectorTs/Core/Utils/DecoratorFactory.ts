import { FairyEditor, FairyGUI } from "csharp";

export function ViewChild(childName: string) {
    if (!childName) return;
    return function (target: FairyEditor.View.PluginInspector & { __childMap?: any }, propertyKey: string) {
        let childMap = target.__childMap;
        if (!childMap) childMap = target.__childMap = {};
        childMap[ propertyKey ] = childName;
    }
}
export function ViewChildInit(target: FairyEditor.View.PluginInspector & { __childMap?: any }) {
    if (target && target.__childMap) {
        const childMap = target.__childMap;
        for (const key in childMap) {
            const names: string[] = childMap[ key ].split(".");
            if (names.length) {
                let child = target.panel;
                names.forEach(v => {
                    if (v && child && typeof child.GetChild == "function")
                        child = child.GetChild(v).asCom;
                });
                child != target.panel && (target[ key ] = child);
            }
        }
    }
}