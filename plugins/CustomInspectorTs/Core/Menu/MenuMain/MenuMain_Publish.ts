import { FairyEditor, FairyGUI } from "csharp";
import EditorUtils from "../../EditorUtils";
import { ConfigType } from "../../Types";
import MenuMain_Base from "./MenuMain_Base";

type Partial<T> = {
    [ P in keyof T ]?: Partial<T[ P ]>;
};

export default class MenuMain_Publish extends MenuMain_Base {
    /** 主菜单按钮 */
    private menuBtn: FairyGUI.GButton;
    /** 平台配置文件 */
    private platformCfg: { [ key: string ]: string };
    private settingsMap: { [ key: string ]: Partial<FairyEditor.GlobalPublishSettings> } = {};
    protected InitMenData(): void {
        this.platformCfg = EditorUtils.GetConfig(ConfigType.PublishSettings, "PlatformConfig");
        if (this.platformCfg) {
            const _this = this;
            this.menuData = {
                text: "发布",
                childEnable: true,
                childs: Object.keys(this.platformCfg).map(key => ({ name: key, text: key, selectCallback: (str) => { _this.translatePublishPlatform(str); } }))
            };
        }
    }

    private getSetting(platform: string) {
        FairyEditor.ProjectType.Egret
        let setting = this.settingsMap[ platform ];
        if (!setting){
            setting = this.settingsMap[ platform ] = EditorUtils.GetConfig(ConfigType.PublishSettings, this.platformCfg[ platform ]);
            if(!setting) return FairyEditor.App.Alert(`${platform} 平台配置文件不存在，检查配置文件是否存在或者 PlatformConfig.json 中平台配置文件名称是否正确`);
        }
        return setting;
    }

    private copySetting(target: any, source: any) {
        //只读字段，更改会报错
        const readOnlyKey = [ "fileName" ];
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (readOnlyKey.indexOf(key) >= 0) continue;
                const element = source[ key ];
                if (element != null && key in target) {
                    if (typeof element == "object") this.copySetting(target[ key ], element);
                    else target[ key ] = element;
                }
            }
        }
    }
    /**切换发布平台 */
    private translatePublishPlatform(platform: string) {
        const newSetting = this.getSetting(platform);
        if (!newSetting) return;

        //设置全局设置并保存
        const globalSetting = FairyEditor.App.project.GetSettings("Publish") as FairyEditor.GlobalPublishSettings;
        this.copySetting(globalSetting, newSetting);
        globalSetting.Save();

        //设置项目类型并保存
        FairyEditor.App.project.type = platform;
        FairyEditor.App.project.Save();
        this.menuBtn.title = `当前发布到[color=#ff0000]${ FairyEditor.App.project.type }[/color]`;
        FairyEditor.App.ShowWaiting("切换发布平台到" + FairyEditor.App.project.type);
        setTimeout(() => {
            FairyEditor.App.CloseWaiting();
        }, 500);
    }
    protected OnCreate(): void {
        const list = FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList;
        this.menuBtn = list.GetChildAt(list.numChildren - 1).asButton;
        this.menuBtn.GetChild('title').asTextField.UBBEnabled = true;
        this.translatePublishPlatform(FairyEditor.App.project.type);
    }
    protected OnDestroy(): void {

    }
}