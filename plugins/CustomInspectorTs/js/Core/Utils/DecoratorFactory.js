"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewChildInit = exports.ViewChild = void 0;
function ViewChild(childName) {
    if (!childName)
        return;
    return function (target, propertyKey) {
        let childMap = target.__childMap;
        if (!childMap)
            childMap = target.__childMap = {};
        childMap[propertyKey] = childName;
    };
}
exports.ViewChild = ViewChild;
function ViewChildInit(target) {
    if (target && target.__childMap) {
        const childMap = target.__childMap;
        for (const key in childMap) {
            const names = childMap[key].split(".");
            if (names.length) {
                let child = target.panel;
                names.forEach(v => {
                    if (v && child && typeof child.GetChild == "function")
                        child = child.GetChild(v).asCom;
                });
                child != target.panel && (target[key] = child);
            }
        }
    }
}
exports.ViewChildInit = ViewChildInit;
