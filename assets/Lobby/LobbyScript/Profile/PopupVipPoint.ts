import Configs from "../../../Loading/src/Configs";
import Utils from "./../Script/common/Utils";
import App from "./../Script/common/App";
import Http from "../../../Loading/src/Http";
import MiniGameNetworkClient from "./../Script/networks/MiniGameNetworkClient";
import cmd from "./../Lobby.Cmd";
import ScrollViewControl from "../Script/common/ScrollViewControl";
import InPacket from "../Script/networks/Network.InPacket";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PopupVipPoint extends cc.Component {
    @property(cc.Label)
    lblVipPointName: cc.Label = null;
    @property(cc.Label)
    lblVipPoint: cc.Label = null;
    @property(cc.Label)
    lblTotalVipPoint: cc.Label = null;
    @property(cc.Label)
    lblVipPointNextLevel: cc.Label = null;
    @property(cc.Sprite)
    spriteProgressVipPoint: cc.Sprite = null;
    @property(cc.Node)
    items: cc.Node = null;

    @property(cc.Node)
    nodePolicy: cc.Node = null;
    @property(ScrollViewControl)
    scrAgency: ScrollViewControl = null;
    @property(cc.Sprite)
    sprVip2: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip3: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip4: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip5: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip6: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip7: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip8: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip9: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip10: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip11: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip12: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip13: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip14: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip15: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip2Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip3Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip4Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip5Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip6Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip7Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip8Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip9Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip10Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip11Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip12Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip13Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip14Text: cc.Sprite = null;
    @property(cc.Sprite)
    sprVip15Text: cc.Sprite = null;

    listVippoint = [];

    show(){
        this.node.active = true;
        this.getVipPointInfo();

        var self = this;

        MiniGameNetworkClient.getInstance().addListener((data) => {
            if (!this.node.active) return;
            let inpacket = new InPacket(data);
            console.log(inpacket.getCmdId());
            switch (inpacket.getCmdId()) {
                case cmd.Code.VIPPOINT_RECEIVED_MONEY: {
                    App.instance.showLoading(false);
                    let res = new cmd.ResVippointReceived(data);
                    switch (res.error) {
                        case 0:
                            App.instance.alertDialog.showMsg("Chúc mừng bạn đã nhận thưởng " + Utils.formatMoney(res.money));
                            break;
                        default:
                            App.instance.alertDialog.showMsg(res.message);
                            break;
                    }
                    break;
                }
            }
        }, this);
    }

    hide(){
        this.node.active = false;
    }

    getVipPointInfo() {
        App.instance.showLoading(true);
        Http.get(Configs.App.API, { "c": 126, "nn": Configs.Login.Nickname }, (err, res) => {
            App.instance.showLoading(false);
            if (err != null) {
                return;
            }
            if (!res["success"]) {
                App.instance.alertDialog.showMsg("Lỗi kết nối, vui lòng thử lại.");
                return;
            }
            //Utils.Log("getVipPointInfo:" + JSON.stringify(res));
            Configs.Login.VipPoint = res["vippoint"];
            Configs.Login.VipPointSave = res["vippointSave"];
            Configs.Login.LevelReceived = res["vippointReceive"];
            Configs.Login.LevelCurrent = res["level"];
            // for (let i = 0; i < this.items.childrenCount; i++) {
            //     let item = this.items.children[i];
            //     if (i < res["ratioList"].length) {
            //         item.getChildByName("lblVipPoint").getComponent(cc.Label).string = Utils.formatNumber(Configs.Login.VipPoints[i]);
            //         item.getChildByName("lblCoin").getComponent(cc.Label).string = Utils.formatNumber(Configs.Login.VipPoint * res["ratioList"][i]);
            //         item.getChildByName("btnReceive").active = res["ratioList"][i] > 0;
            //         item.getChildByName("btnReceive").getComponent(cc.Button).interactable = i == Configs.Login.getVipPointIndex() && Configs.Login.VipPoint > 0;
            //         item.getChildByName("btnReceive").getComponentInChildren(cc.Label).node.color = i == Configs.Login.getVipPointIndex() ? cc.Color.YELLOW : cc.Color.GRAY;
            //         item.getChildByName("btnReceive").off("click");
            //         item.getChildByName("btnReceive").on("click", () => {
            //             App.instance.confirmDialog.show2("Bạn có chắc chắn muốn nhận thưởng vippoint\nTương ứng với cấp Vippoint hiện tại bạn nhận được :\n" + Utils.formatNumber(Configs.Login.VipPoint * res["ratioList"][i]) + " Xu", (isConfirm) => {
            //                 if (isConfirm) {
            //                     App.instance.showLoading(true);
            //                     MiniGameNetworkClient.getInstance().send(new cmd.ReqExchangeVipPoint());
            //                 }
            //             });
            //         });
            //         item.active = true;
            //     } else {
            //         item.active = false;
            //     }
            // }

            this.lblVipPointName.string = Configs.Login.getVipPointName();
            this.lblVipPoint.string = Utils.formatNumber(Configs.Login.VipPointSave);
            this.lblTotalVipPoint.string = Utils.formatNumber(Configs.Login.VipPointSave);
            this.lblVipPointNextLevel.string = Utils.formatNumber(Configs.Login.getVipPointNextLevel());

            // let VipPoints = [80, 800, 4500, 8600, 50000, 1000000];
            let VipPoints = Configs.Login.VipPoints;
            let vipPointIdx = 0;
            for (let i = VipPoints.length - 1; i >= 0; i--) {
                if (Configs.Login.VipPointSave > VipPoints[i]) {
                    vipPointIdx = i + 1;
                    break;
                }
            }

            this.sprVip2.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 0);
            this.sprVip3.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 1);
            this.sprVip4.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 2);
            this.sprVip5.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 3);
            this.sprVip6.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 4);
            this.sprVip7.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 5);
            this.sprVip8.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 6);
            this.sprVip9.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 7);
            this.sprVip10.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 8);
            this.sprVip11.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 9);
            this.sprVip12.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 10);
            this.sprVip13.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 11);
            this.sprVip14.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 12);
            this.sprVip15.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 13);

            this.sprVip2Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 0);
            this.sprVip3Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 1);
            this.sprVip4Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 2);
            this.sprVip5Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 3);
            this.sprVip6Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 4);
            this.sprVip7Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 5);
            this.sprVip8Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 6);
            this.sprVip9Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 7);
            this.sprVip10Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 8);
            this.sprVip11Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 9);
            this.sprVip12Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 10);
            this.sprVip13Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 11);
            this.sprVip14Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 12);
            this.sprVip15Text.getComponent(cc.Button).enableAutoGrayEffect = !(vipPointIdx > 13);

            // let vipPointNextLevel = VipPoints[0];
            // for (let i = VipPoints.length - 1; i >= 0; i--) {
            //     if (Configs.Login.VipPointSave > VipPoints[i]) {
            //         if (i == VipPoints.length - 1) {
            //             vipPointNextLevel = VipPoints[i];
            //             break;
            //         }
            //         vipPointNextLevel = VipPoints[i + 1];
            //         break;
            //     }
            // }

            // let vipPointStartLevel = 0;
            // for (let i = VipPoints.length - 1; i >= 0; i--) {
            //     if (Configs.Login.VipPointSave > VipPoints[i]) {
            //         vipPointStartLevel = VipPoints[i];
            //         break;
            //     }
            // }
            //let delta = (Configs.Login.VipPoint - vipPointStartLevel) / (vipPointNextLevel - vipPointStartLevel);
            //Utils.Log("delta: " + delta);
            this.spriteProgressVipPoint.fillRange = (vipPointIdx - 1) / 13;

            this.listVippoint = [];
            let VipPointsMoney = Configs.Login.VipPointsMoney;
            for (let i = 0; i < VipPointsMoney.length; i++) {
               let itemNew = {level: i + 1, money: Utils.formatNumber(VipPointsMoney[i]), name: Configs.Login.VipPointsName[i + 1], vippoint: Utils.formatNumber(Configs.Login.VipPoints[i])};
               this.listVippoint.push(itemNew);
            }
            this.scrAgency.setDataList(this.setDataItem, this.listVippoint);
        });
       
    }

    setDataItem(item, data) {
        item.getChildByName('lbStt').getComponent(cc.Label).string = data['name'];
        item.getChildByName('lbName').getComponent(cc.Label).string = data['vippoint'];
        item.getChildByName('lbNickname').getComponent(cc.Label).string = data['money'];
        item.getChildByName('btnNhan').getComponent(cc.Button).interactable = data["level"] > Configs.Login.LevelReceived;
        item['data'] = data;
        item.active = true;
    }

    policyClicked () {
        this.nodePolicy.active = !this.nodePolicy.active;
    }

    onClickItemReceived(even) {
        App.instance.showLoading(true);
        let dataAgency = even.target.parent['data'];
        MiniGameNetworkClient.getInstance().send(new cmd.ReqVippointReceived(dataAgency["level"]));
        // if (even.target.parent['data'].vippoint > Configs.Login.VipPoint) {
        //     App.instance.showToast("Chưa đạt Vippoint");
        // } else {
        //     let dataAgency = even.target.parent['data'];
        //     MiniGameNetworkClient.getInstance().send(new cmd.ReqVippointReceived(dataAgency["level"]));
        // }
    }
   
}