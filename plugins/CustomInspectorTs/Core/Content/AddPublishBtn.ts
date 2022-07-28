import { FairyEditor, FairyGUI } from "csharp";
import { IDestroy } from "../Types";

type Partial<T> = {
    [P in keyof T]?: Partial<T[P]>;
};

export class AddPublishBtn implements IDestroy {
    private btn: FairyGUI.GButton;
    private btnClick: FairyGUI.EventCallback1;
    private config: Partial<{ [key: string]: Partial<FairyEditor.GlobalPublishSettings> }> = {
        Layabox: {
            path: "D:\\paihun\\paihun-client-web\\bin\\UI",
            fileExtension: "fui",
            atlasSetting: {
                maxSize: 1024,
                sizeOption: "npot"
            }
        },
        Unity: {
            path: "D:\\paihun\\paihun_unity_project\\Assets\\MyAssets\\uipackage\\{publish_file_name}",
            fileExtension: "bytes",
            atlasSetting: {
                maxSize: 2048,
                sizeOption: "pot"
            }
        }
    }
    constructor() {
        if (!this.btn) {
            this.btn = FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList.AddItemFromPool().asButton;
            this.btn.GetChild("title").asTextField.UBBEnabled = true;
            this.btnClick = new FairyGUI.EventCallback1((event) => {
                if (FairyEditor.App.project.type === FairyEditor.ProjectType.Layabox)
                    this.setType(FairyEditor.ProjectType.Unity);
                else if (FairyEditor.App.project.type === FairyEditor.ProjectType.Unity)
                    this.setType(FairyEditor.ProjectType.Layabox);
                else return;
            });
            this.btn.onClick.Add(this.btnClick);
        }
        this.setType(FairyEditor.App.project.type);
    }

    private setType(type: string, showTip:boolean = true) {
        const newSetting = this.config[type];
        if (!newSetting) return;

        //保存发布全局设置
        const globalSetting = FairyEditor.App.project.GetSettings("Publish") as FairyEditor.GlobalPublishSettings;
        globalSetting.path = newSetting.path;
        globalSetting.fileExtension = newSetting.fileExtension;
        globalSetting.atlasSetting.maxSize = newSetting.atlasSetting.maxSize;
        globalSetting.atlasSetting.sizeOption = newSetting.atlasSetting.sizeOption;
        globalSetting.Save();
        //保存项目类型
        FairyEditor.App.project.type = type;
        FairyEditor.App.project.Save();
        this.btn.title = `当前发布到[color=#ff0000]${FairyEditor.App.project.type}[/color]`;
        // showTip && (FairyEditor.App.Alert("切换发布平台到" + FairyEditor.App.project.type));
        FairyEditor.App.ShowWaiting("切换发布平台到" + FairyEditor.App.project.type);
        setTimeout(() => {
            FairyEditor.App.CloseWaiting();
        }, 500);
    }

    Destroy(): void {
        if (this.btn) {
            this.btn.onClick.Remove(this.btnClick);
            FairyEditor.App.mainView.panel.GetChild('menuBar').asCom.GetChild('list').asList.RemoveChildToPool(this.btn);
        }
    }
}