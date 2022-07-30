import { FairyEditor, FairyGUI } from "csharp";
import { Tip } from "../../common/Tip";
import { ConfigType, SettingName } from "../../common/Types";
import { EditorUtils } from "../../utils/EditorUtils";
import { MenuMain_Base } from "./MenuMain_Base";

type Partial<T> = { [ P in keyof T ]?: Partial<T[ P ]>; };
type PlatformConfig = { [ key: string ]: { enable: boolean, configNames: string[] } };

const CUSTOM_KEY = "SelectedCfgIndex";

export class MenuMain_Publish extends MenuMain_Base {
    /** 主菜单按钮 */
    private menuBtn: FairyGUI.GButton;
    private platformKeys: string[];
    /** 平台配置文件 */
    private platformCfg: PlatformConfig;
    /** 平台发布设置 */
    private settingsMap: { [ key: string ]: Partial<FairyEditor.GlobalPublishSettings>[] } = {};
    /** 选中的平台 */
    private selectedPlatform: string;
    /** 选中的平台配置索引 */
    private selectedCfgIndex: number;

    protected InitMenuData(): void {
        this.platformCfg = EditorUtils.GetConfig(ConfigType.PublishSettings, "PlatformConfig");
        if (this.platformCfg) {
            this.platformKeys = Object.keys(this.platformCfg).filter(v => !!this.platformCfg[ v ].enable && this.platformCfg[ v ].configNames.length > 0);
            this.initSettings();
            this.menuData = {
                text: "未配置的发布平台",
                isSubMenu: true,
                subMenuData: this.platformKeys.map(key => {
                    const configNames = this.platformCfg[ key ].configNames;
                    const isSubMenu = configNames.length > 1;
                    return {
                        name: key,
                        text: key,
                        isSubMenu: isSubMenu,
                        selectCallback: isSubMenu ? ((str) => this.selectedPlatform = str) : ((str) => {
                            this.selectedPlatform = str;
                            this.selectedCfgIndex = 0;
                            this.translatePublishPlatform(true);
                        }),
                        subMenuData: isSubMenu ? configNames.map((cfg, index) => ({
                            name: index.toString(),
                            text: configNames[ index ] + " => " + this.settingsMap[ key ][ index ].path,
                            selectCallback: (str) => {
                                this.selectedCfgIndex = +str;
                                this.translatePublishPlatform(true);
                            }
                        })) : null
                    }
                })
            };
        }
    }

    protected OnCreate(): void {
        const list = FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList;
        this.menuBtn = list.GetChildAt(list.numChildren - 1).asButton;
        this.menuBtn.GetChild('title').asTextField.UBBEnabled = true;
        this.selectedPlatform = FairyEditor.App.project.type;

        if (this.settingsMap[ this.selectedPlatform ]) {
            const settingEles = (FairyEditor.App.project.GetSettings(SettingName.CustomProperties) as FairyEditor.CustomProps).elements;
            this.selectedCfgIndex = settingEles.ContainsKey(CUSTOM_KEY) ? (+settingEles.get_Item(CUSTOM_KEY) || 0) : 0;
            this.selectedCfgIndex = Math.min(this.selectedCfgIndex, this.settingsMap[ this.selectedPlatform ].length - 1);

            this.translatePublishPlatform(false);
        }
    }

    protected OnDestroy(): void {
        this.menuBtn = null;
    }

    private initSettings() {
        this.platformKeys.forEach(key => {
            this.platformCfg[ key ].configNames.forEach(cfgFileName => {
                const setting = EditorUtils.GetConfig(ConfigType.PublishSettings, cfgFileName);
                this.settingsMap[ key ] ||= [];
                this.settingsMap[ key ].push(setting);
            });
        });
    }

    private copySetting(target: any, source: any) {
        //C#只读字段，不能更改
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
    private translatePublishPlatform(showTip: boolean = true) {
        const newSetting = this.settingsMap[ this.selectedPlatform ][ this.selectedCfgIndex ];
        if (newSetting) {
            //设置全局设置并保存
            const globalSetting = FairyEditor.App.project.GetSettings(SettingName.Publish) as FairyEditor.GlobalPublishSettings;
            this.copySetting(globalSetting, newSetting);
            globalSetting.Save();

            //设置项目类型并保存
            FairyEditor.App.project.type = this.selectedPlatform;
            FairyEditor.App.project.Save();

            //设置选择索引并保存
            const customSetting = (FairyEditor.App.project.GetSettings(SettingName.CustomProperties) as FairyEditor.CustomProps);
            customSetting.elements.set_Item(CUSTOM_KEY, this.selectedCfgIndex.toString());
            customSetting.Save();

            let cfgStr = `[color=#ff0000]${ FairyEditor.App.project.type }[/color]`;
            const containCfg = this.platformCfg[ this.selectedPlatform ].configNames.length > 1;
            if (containCfg) cfgStr += ` [color=#0000ff]${ this.platformCfg[ this.selectedPlatform ].configNames[ this.selectedCfgIndex ] }[/color]`;
            this.menuBtn.title = `当前发布到 ${ cfgStr }`;
            showTip && Tip.Inst.Show(`已切换发布平台到 ${ cfgStr }`);

            const curMenu = this.parentMenu.GetSubMenu(this.menuData.name);
            this.platformKeys.forEach(key => {
                curMenu.SetItemChecked(key, key == this.selectedPlatform);
                const curSubMenu = curMenu.GetSubMenu(key);
                if (this.platformCfg[ key ].configNames.length > 1)
                    this.platformCfg[ key ].configNames.forEach((cfgFileName, index) =>
                        curSubMenu.SetItemChecked(index.toString(), key == this.selectedPlatform && index == this.selectedCfgIndex));
            });
        } else FairyEditor.App.Alert(`${ this.selectedPlatform } 平台第 ${ this.selectedCfgIndex } 个配置文件不存在，检查配置文件是否存在或者 PlatformConfig.json 中平台配置文件名称是否正确`)
    }
}