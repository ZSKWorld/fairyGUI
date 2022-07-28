import { FairyEditor, FairyGUI } from 'csharp';
import { InspectorName } from '../../Types';
import MenuDoc_Base from './MenuDoc_Base';


export default class MenuDoc_CreateRelation extends MenuDoc_Base {
    private relationFirst: FairyEditor.FObject;
    private relationSecond: FairyEditor.FObject;
    private rightClickCallback: FairyGUI.EventCallback0;
    protected InitMenData(): void {
        this.menuData = {
            text: "关联",
            childEnable: true,
            childs: []
        };
        const _this = this;
        Object.keys(FairyEditor.FRelationType).slice(0, 25).forEach((v) => {
            //这个地方不能直接赋值 selectCallback = this.CallBack ，selectCallback会绑定到全局执行
            this.menuData.childs.push({ name: v, text: this.GetRelationText(v), selectCallback: (name: string) => { _this.CallBack(name) } });
        });
    }
    private GetRelationText(str: string) {
        str = str.replace(/LeftExt/g, "左延展");
        str = str.replace(/RightExt/g, "右延展");
        str = str.replace(/TopExt/g, "顶延展");
        str = str.replace(/BottomExt/g, "底延展");
        str = str.replace(/Center_Center/g, "左右居中");
        str = str.replace(/Middle_Middle/g, "上下居中");
        str = str.replace(/Left/g, "左");
        str = str.replace(/Right/g, "右");
        str = str.replace(/Center/g, "中");
        str = str.replace(/Width/g, "宽->宽");
        str = str.replace(/Top/g, "顶");
        str = str.replace(/Middle/g, "中");
        str = str.replace(/Bottom/g, "底");
        str = str.replace(/Height/g, "高->高");
        str = str.replace(/Size/g, "宽->宽，高->高");
        str = str.replace(/_/g, "->");
        return str;
    }
    private CallBack(name: string) {
        if (this.relationFirst && this.relationSecond) {
            this.relationFirst.relations.AddItem(this.relationSecond, FairyEditor.FRelationType[name]);
            FairyEditor.App.inspectorView.GetInspector(InspectorName.Relation).UpdateUI();
            FairyEditor.App.activeDoc.SetModified(true);
        }
    }

    protected OnCreate(): void {
        this.rightClickCallback = new FairyGUI.EventCallback0(() => { this.OnRightClick(); });
        FairyEditor.App.docView.docContainer.onRightClick.Add(this.rightClickCallback);
    }

    private OnRightClick() {
        let targets = FairyEditor.App.activeDoc.GetSelection();
        this.relationFirst = null;
        this.relationSecond = null;
        let count: number = (targets as any).Count;
        let name: string;
        if (count == 0) {
            name = "无关联对象";
        } else if (count == 1) {
            this.relationFirst = targets.get_Item(0);
            this.relationSecond = FairyEditor.App.activeDoc.content;
            name = `${this.relationFirst.name} 关联 容器`;
        } else {
            this.relationFirst = targets.get_Item(0);
            this.relationSecond = targets.get_Item(1);
            name = `${this.relationFirst.name} 关联 ${this.relationSecond.name}`;
        }
        this.parentMenu.SetItemText(this.menuData.name, name);
        const curMenu = this.parentMenu.GetSubMenu(this.menuData.name);
        this.menuData.childs.forEach((v) => curMenu.SetItemEnabled(v.name, count > 0));
    }

    protected OnDestroy(): void {
        FairyEditor.App.docView.docContainer.onRightClick.Remove(this.rightClickCallback);
    }
}