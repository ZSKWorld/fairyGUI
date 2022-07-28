"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPublishBtn = void 0;
const csharp_1 = require("csharp");
const EditorUtils_1 = require("../EditorUtils");
class AddPublishBtn {
    btn;
    btnClick;
    settingsMap = {};
    constructor() {
        if (!this.btn) {
            this.btn = csharp_1.FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList.AddItemFromPool().asButton;
            this.btn.GetChild("title").asTextField.UBBEnabled = true;
            this.btnClick = new csharp_1.FairyGUI.EventCallback1((event) => {
                if (csharp_1.FairyEditor.App.project.type == csharp_1.FairyEditor.ProjectType.Layabox)
                    this.setType(csharp_1.FairyEditor.ProjectType.Unity);
                else if (csharp_1.FairyEditor.App.project.type == csharp_1.FairyEditor.ProjectType.Unity)
                    this.setType(csharp_1.FairyEditor.ProjectType.Layabox);
                else
                    return;
            });
            this.btn.onClick.Add(this.btnClick);
        }
        this.setType(csharp_1.FairyEditor.App.project.type);
    }
    getSetting(platform) {
        let setting = this.settingsMap[platform];
        if (!setting) {
            const settingPath = `${csharp_1.FairyEditor.App.pluginManager.projectPluginFolder}/${EditorUtils_1.default.getPluginRootDirName()}/config/publishSetting/${platform}.json`;
            if (csharp_1.System.IO.File.Exists(settingPath) == false)
                return null;
            const settingJson = csharp_1.System.IO.File.ReadAllText(settingPath);
            setting = this.settingsMap[platform] = JSON.parse(settingJson);
        }
        return setting;
    }
    copySetting(target, source) {
        //只读字段，更改会报错
        const readOnlyKey = ["fileName"];
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (readOnlyKey.indexOf(key) >= 0)
                    continue;
                const element = source[key];
                if (element != null && key in target) {
                    if (typeof element == "object")
                        this.copySetting(target[key], element);
                    else
                        target[key] = element;
                }
            }
        }
    }
    setType(type) {
        const newSetting = this.getSetting(type);
        if (!newSetting)
            return;
        //保存发布全局设置
        const globalSetting = csharp_1.FairyEditor.App.project.GetSettings("Publish");
        this.copySetting(globalSetting, newSetting);
        globalSetting.Save();
        //保存项目类型
        csharp_1.FairyEditor.App.project.type = type;
        csharp_1.FairyEditor.App.project.Save();
        this.btn.title = `当前发布到[color=#ff0000]${csharp_1.FairyEditor.App.project.type}[/color]`;
        // showTip && (FairyEditor.App.Alert("切换发布平台到" + FairyEditor.App.project.type));
        csharp_1.FairyEditor.App.ShowWaiting("切换发布平台到" + csharp_1.FairyEditor.App.project.type);
        setTimeout(() => {
            csharp_1.FairyEditor.App.CloseWaiting();
        }, 500);
    }
    Destroy() {
        if (this.btn) {
            this.btn.onClick.Remove(this.btnClick);
            csharp_1.FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList.RemoveChildToPool(this.btn);
        }
    }
}
exports.AddPublishBtn = AddPublishBtn;
