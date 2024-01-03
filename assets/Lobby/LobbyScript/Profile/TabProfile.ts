import App from "./../Script/common/App";
import Configs from "../../../Loading/src/Configs";
import Utils from "./../Script/common/Utils";
import PopupVipPoint from "./PopupVipPoint";
import { Global } from "../../../Loading/src/Global";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TabProfile extends cc.Component {

    @property(cc.Label)
    lbNickName: cc.Label = null;
    @property(cc.Label)
    lbBalance: cc.Label = null;
    @property(cc.Sprite)
    avatar: cc.Sprite = null;

    @property(PopupVipPoint)
    popupVipPoint: PopupVipPoint = null;

    show(){
        this.popupVipPoint.hide();
        this.node.active = true;
        this.lbNickName.string = Configs.Login.Nickname;
        this.lbBalance.string = Utils.formatNumber(Configs.Login.Coin);
        this.avatar.spriteFrame = App.instance.getAvatarSpriteFrame(Configs.Login.Avatar); 
    }

    onClickPopupVipPoint(){
        this.popupVipPoint.show();
    }

    onClickSecurity(){
        Global.LobbyController.actPopupSecurity2();
    }

    
    onClickGanKetOtp() {
        App.instance.openTelegram(Configs.App.getLinkTelegram());
    }

}
