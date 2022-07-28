"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const EditorUtils_1 = require("../../EditorUtils");
const MenuMain_Base_1 = require("./MenuMain_Base");
class MenuMain_Publish2 extends MenuMain_Base_1.default {
    menuBtn;
    settingsMap = {};
    InitMenData() {
        const _this = this;
        this.menuData = {
            text: "发布",
            childEnable: true,
            childs: [
                { name: "MenuMain_Publish_Layabox", text: "Layabox", selectCallback: () => { _this.translatePublishPlatform(csharp_1.FairyEditor.ProjectType.Layabox); } },
                { name: "MenuMain_Publish_Unity", text: "Unity", selectCallback: () => { _this.translatePublishPlatform(csharp_1.FairyEditor.ProjectType.Unity); } },
            ]
        };
    }
    getSetting(platform) {
        let setting = this.settingsMap[platform];
        if (!setting) {
            const settingPath = `${csharp_1.FairyEditor.App.pluginManager.projectPluginFolder}/${EditorUtils_1.default.getPluginRootDirName()}/config/publishSettings/${platform}.json`;
            if (csharp_1.System.IO.File.Exists(settingPath) == false)
                return console.log("文件不存在" + settingPath);
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
    /**切换发布平台 */
    translatePublishPlatform(platform) {
        const newSetting = this.getSetting(platform);
        if (!newSetting)
            return;
        //设置全局设置并保存
        const globalSetting = csharp_1.FairyEditor.App.project.GetSettings("Publish");
        this.copySetting(globalSetting, newSetting);
        globalSetting.Save();
        //设置项目类型并保存
        csharp_1.FairyEditor.App.project.type = platform;
        csharp_1.FairyEditor.App.project.Save();
        this.menuBtn.title = `当前发布到[color=#ff0000]${csharp_1.FairyEditor.App.project.type}[/color]`;
        // showTip && (FairyEditor.App.Alert("切换发布平台到" + FairyEditor.App.project.type));
        csharp_1.FairyEditor.App.ShowWaiting("切换发布平台到" + csharp_1.FairyEditor.App.project.type);
        setTimeout(() => {
            csharp_1.FairyEditor.App.CloseWaiting();
        }, 500);
    }
    OnCreate() {
        const list = csharp_1.FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList;
        this.menuBtn = list.GetChildAt(list.numChildren - 1).asButton;
        this.menuBtn.GetChild('title').asTextField.UBBEnabled = true;
        this.translatePublishPlatform(csharp_1.FairyEditor.App.project.type);
    }
    OnDestroy() {
    }
}
exports.default = MenuMain_Publish2;
