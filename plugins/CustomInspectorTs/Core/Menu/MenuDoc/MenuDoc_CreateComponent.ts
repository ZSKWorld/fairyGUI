import MenuDoc_Base from "./MenuDoc_Base";
export default class MenuDoc_CreateComponent extends MenuDoc_Base {
    protected InitMenData(): void {
        this.menuData = {
            name: "MenuDoc_CreateComponent",
            text: "自定义组件",
            childEnable: true,
            selectCallback: this.CallBack,
            childs: [
                { name: "button", text: "按钮组件", url: "ui://38ft0jfga4q55", selectCallback: this.CallBack, },
                { name: "list", text: "列表组件", url: "ui://2pshu6oingyqa7iufv", selectCallback: this.CallBack, },
                { name: "page", text: "分页组件", url: "ui://2pshu6oiau3n5i", selectCallback: this.CallBack, },
                { name: "enum", text: "枚举组件", url: "ui://2pshu6oiau3nh", selectCallback: this.CallBack, },
                { name: "text", text: "文本组件", url: "ui://2pshu6oid8p0a7iuft", selectCallback: this.CallBack, },
                { name: "image", text: "图片组件", url: "ui://2pshu6oioj7qiu9e", selectCallback: this.CallBack, },
            ]
        };
    }

    // public constructor() {
    //     super();
    // }

    private CallBack(name: string) {
        // let url = "";
        // const getUrl = function (data: IMenuData) {
        //     let temp = "";
        //     if (data.childs) {
        //         for (let i = 0; i < data.childs.length; i++) {
        //             const element = data.childs[i];
        //             if (element.childs) {
        //                 temp = getUrl(element);
        //             } else {
        //                 temp = element.name == name ? element.url : null;
        //             }
        //             if (temp) break;
        //         }
        //     } else {
        //         temp = data.name == name ? data.url : null;
        //     }
        //     return temp;
        // }
        // url = getUrl(menuData);
        // url && EditorUtils.AddComponent(url);
        // FairyEditor.App.activeDoc.SetModified(true);
    }
    protected OnCreate(): void {}
    protected OnDestroy(): void {}
}

