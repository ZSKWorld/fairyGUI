"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const EditorUtils_1 = require("../../EditorUtils");
const MenuMain_Base_1 = require("./MenuMain_Base");
class MenuMain_Publish extends MenuMain_Base_1.default {
    /** 主菜单按钮 */
    menuBtn;
    /** 平台配置文件 */
    platformCfg;
    settingsMap = {};
    InitMenData() {
        this.platformCfg = EditorUtils_1.default.GetConfig("publishSettings" /* ConfigType.PublishSettings */, "PlatformConfig");
        if (this.platformCfg) {
            const _this = this;
            this.menuData = {
                text: "发布",
                childEnable: true,
                childs: Object.keys(this.platformCfg).map(key => ({ name: key, text: key, selectCallback: (str) => { _this.translatePublishPlatform(str); } }))
            };
        }
    }
    getSetting(platform) {
        csharp_1.FairyEditor.ProjectType.Egret;
        let setting = this.settingsMap[platform];
        if (!setting) {
            setting = this.settingsMap[platform] = EditorUtils_1.default.GetConfig("publishSettings" /* ConfigType.PublishSettings */, this.platformCfg[platform]);
            if (!setting)
                return csharp_1.FairyEditor.App.Alert(`${platform} 平台配置文件不存在，检查配置文件是否存在或者 PlatformConfig.json 中平台配置文件名称是否正确`);
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
exports.default = MenuMain_Publish;
