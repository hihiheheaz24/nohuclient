import App from "./Script/common/App";
import MiniGameNetworkClient from "../LobbyScript/Script/networks/MiniGameNetworkClient";
import cmd from "../LobbyScript/Lobby.Cmd";
import Dialog from "./Script/common/Dialog";
import TabSecurityLogin from "./Profile/TabSecurityLogin";
import TabSecurityBox from "./Profile/TabSecurityBox";
import TabProfileSecurity from "./Profile/TabProfileSecurity";
import InPacket from "../LobbyScript/Script/networks/Network.InPacket";
import Configs from "../../Loading/src/Configs";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PopupSecurity2 extends Dialog {
    @property(cc.ToggleContainer)
    tabs: cc.ToggleContainer = null;
    @property(cc.Node)
    tabContents: cc.Node = null;
    private tabSelectedIdx = 0;
    @property(TabProfileSecurity)
    tabProfile: TabProfileSecurity = null;
    @property(TabSecurityLogin)
    tabSecurityLogin: TabSecurityLogin = null;
    @property(TabSecurityBox)
    tabSecurityBox: TabSecurityBox = null;
    start() {
        for (let i = 0; i < this.tabs.toggleItems.length; i++) {
            this.tabs.toggleItems[i].node.on("toggle", () => {
                if (this.tabSelectedIdx != i) {
                    this.tabSelectedIdx = i;
                    this.onTabChanged();
                }
            });
        } 
        var sefl = this;
        MiniGameNetworkClient.getInstance().addListener((data) => {
            if (!this.node.active) return;
            let inpacket = new InPacket(data);
            //  //Utils.Log(inpacket.getCmdId());
            switch (inpacket.getCmdId()) {
                case cmd.Code.GET_SECURITY_INFO: {
                    App.instance.showLoading(false);
                    let res = new cmd.ResGetSecurityInfo(data);
                    //Utils.Log("GET_SECURITY_INFO=", res);
                    Configs.Login.Mail = res.email;
                    Configs.Login.Address = res.address;
                    Configs.Login.Gender = res.gender;
                    Configs.Login.VerifyMobile = res.isVerifyPhone;
                    Configs.Login.Coin = res.moneyUse;
                    Configs.Login.SAFE = res.safe;
                    let msg = App.instance.getTextLang("txt_not_config");
                    Configs.Login.PhoneNumner = res.mobile == "" ? msg : res.mobile.substring(0, res.mobile.length - 3) + "***";        
                    sefl.tabProfile.updateInfo();
                    break;
                }
            }
        }, this);
    }
    show() {
        super.show();
        this.tabSelectedIdx = 0;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        this.onTabChanged();
        App.instance.showLoading(true);
        MiniGameNetworkClient.getInstance().send(new cmd.ReqGetSecurityInfo());
    }

    private onTabChanged() {
        for (let i = 0; i < this.tabContents.childrenCount; i++) {
            this.tabContents.children[i].active = i == this.tabSelectedIdx;
        }
        switch (this.tabSelectedIdx) {
            case 0:
                this.tabProfile.show();
                break;
            case 1:
                this.tabSecurityLogin.show();
                break;
            case 2:
                this.tabSecurityBox.show();
                break;
        }
    }

    showTab(tab) {
        this.tabSelectedIdx = tab;
        this.tabs.toggleItems[this.tabSelectedIdx].isChecked = true;
        for (let i = 0; i < this.tabContents.childrenCount; i++) {
            this.tabContents.children[i].active = i == this.tabSelectedIdx;
        }
        switch (this.tabSelectedIdx) {
            case 0:
                this.tabProfile.show();
                break;
            case 1:
                this.tabSecurityLogin.show();
                break;
            case 2:
                this.tabSecurityBox.show();
                break;
        }
    }

}
