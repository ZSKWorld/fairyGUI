"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const Tip_1 = require("../../Common/Tip");
const EditorUtils_1 = require("../../Utils/EditorUtils");
const MenuMain_Base_1 = require("./MenuMain_Base");
class MenuMain_Publish extends MenuMain_Base_1.default {
    constructor() {
        super(...arguments);
        this.settingsMap = {};
    }
    InitMenData() {
        this.platformCfg = EditorUtils_1.default.GetConfig("publishSettings" /* ConfigType.PublishSettings */, "PlatformConfig");
        if (this.platformCfg) {
            this.platformKeys = Object.keys(this.platformCfg).filter(v => !!this.platformCfg[v].enable);
            this.menuData = {
                text: "发布",
                childEnable: true,
                childs: this.platformKeys.map(key => ({ name: key, text: key, selectCallback: (str) => this.translatePublishPlatform(str) }))
            };
        }
    }
    getSetting(platform) {
        csharp_1.FairyEditor.ProjectType.Egret;
        let setting = this.settingsMap[platform];
        if (!setting) {
            setting = this.settingsMap[platform] = EditorUtils_1.default.GetConfig("publishSettings" /* ConfigType.PublishSettings */, this.platformCfg[platform].configName);
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
    translatePublishPlatform(platform, showTip = true) {
        const newSetting = this.getSetting(platform);
        if (newSetting) {
            //设置全局设置并保存
            const globalSetting = csharp_1.FairyEditor.App.project.GetSettings("Publish");
            this.copySetting(globalSetting, newSetting);
            globalSetting.Save();
            //设置项目类型并保存
            csharp_1.FairyEditor.App.project.type = platform;
            csharp_1.FairyEditor.App.project.Save();
            this.menuBtn.title = `当前发布到[color=#ff0000]${csharp_1.FairyEditor.App.project.type}[/color]`;
            // FairyEditor.App.ShowWaiting("切换发布平台到" + FairyEditor.App.project.type);
            // setTimeout(() => {
            //     FairyEditor.App.CloseWaiting();
            // }, 500);
            showTip && Tip_1.default.Inst.Show(`切换发布平台到 [color=#ff0000]${csharp_1.FairyEditor.App.project.type}[/color]`);
        }
        const curMenu = this.parentMenu.GetSubMenu(this.menuData.name);
        this.platformKeys.forEach(key => curMenu.SetItemChecked(key, key == csharp_1.FairyEditor.App.project.type));
    }
    OnCreate() {
        const list = csharp_1.FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList;
        this.menuBtn = list.GetChildAt(list.numChildren - 1).asButton;
        this.menuBtn.GetChild('title').asTextField.UBBEnabled = true;
        this.translatePublishPlatform(csharp_1.FairyEditor.App.project.type, false);
    }
    OnDestroy() {
        this.menuBtn = null;
    }
}
exports.default = MenuMain_Publish;
