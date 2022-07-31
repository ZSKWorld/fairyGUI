import { FairyEditor, FairyGUI } from "csharp";
import { MenuDoc_Base } from "./MenuDoc_Base";

export class MenuDoc_Test extends MenuDoc_Base {
    private clickCb:FairyGUI.EventCallback0;
    protected InitMenuData(): void {
        this.menuData = {
            text: "测试",
            selectCallback: () => this.CallBack()
        };
    }

    protected OnCreate(): void {
        this.clickCb = new FairyGUI.EventCallback0(() =>{
            for (let i = 0; i < FairyEditor.App.groot.numChildren; i++) {
                console.log(FairyEditor.App.groot.GetChildAt(i),FairyEditor.App.groot.GetChildAt(i).name)
                
            }
        });
        FairyEditor.App.groot.onClick.Add(this.clickCb);
     }

    protected OnDestroy(): void { 
        FairyEditor.App.groot.onClick.Remove(this.clickCb);
    }

    private CallBack() { }

}