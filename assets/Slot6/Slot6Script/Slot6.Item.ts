

const { ccclass, property } = cc._decorator;

const enum SLOT6_ID_ITEM {
    JACKPOT = 3,
    BONUS = 1,
    WILD = 2,
    SCATTER = 0,
    X500 = 4,
    X375 = 5,
    X275 = 6,
    X150 = 7,
    X50 = 8,
    X25 = 9,
    X5 = 10
}

@ccclass
export default class Slot6Item extends cc.Component {



    @property(sp.Skeleton)
    skeItem: sp.Skeleton = null;
    @property(cc.Sprite)
    sprItem: cc.Sprite = null;

    @property(sp.SkeletonData)
    skeDataSpecical: sp.SkeletonData = null;

    @property(cc.SpriteAtlas)
    sprAtlast: cc.SpriteAtlas = null;
    @property(sp.SkeletonData)
    skeDataWild: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataBonus: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataScatter: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataIcon1: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataIcon2: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataIcon3: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataIcon4: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataIcon5: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataIcon6: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    skeDataIcon7: sp.SkeletonData = null;

    @property(cc.SpriteFrame)
    spriteFrameIcon10: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spriteFrameIcon11: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    spriteFrameIcon10Blur: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spriteFrameIcon11Blur: cc.SpriteFrame = null;

    private mId: number = -1;
    animName = "";

    public getId() {
        return this.mId;
    }

    public setId(pId: number, isWin = false) {
        this.mId = pId;
        this.sprItem.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        switch (this.mId) {
            case SLOT6_ID_ITEM.JACKPOT:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_1")
                this.skeItem.skeletonData = this.skeDataSpecical;
                this.skeItem.animation = isWin ? "jackpot" : "jackpot2";
                this.animName = isWin ? "jackpot" : "jackpot2";
                break;
            case SLOT6_ID_ITEM.WILD:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_2")
                this.skeItem.skeletonData = this.skeDataWild;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.BONUS:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_3");
                this.skeItem.skeletonData = this.skeDataBonus;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.SCATTER:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_4");
                this.skeItem.skeletonData = this.skeDataScatter;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.X500:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_5");
                this.skeItem.skeletonData = this.skeDataIcon1;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.X375:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_6");
                this.skeItem.skeletonData = this.skeDataIcon2;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.X275:
                this.skeItem.skeletonData = this.skeDataIcon3;
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_7");
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.X150:
                this.skeItem.skeletonData = this.skeDataIcon4;
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_8");
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.X50:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_9");
                this.skeItem.skeletonData = this.skeDataIcon5;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.X25:
                this.sprItem.spriteFrame = this.spriteFrameIcon10;
                this.skeItem.skeletonData = this.skeDataIcon6;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
            case SLOT6_ID_ITEM.X5:
                this.sprItem.spriteFrame = this.spriteFrameIcon11;
                this.skeItem.skeletonData = this.skeDataIcon7;
                this.skeItem.animation = "animation";
                this.animName = "animation";
                break;
        }
        this.sprItem.node.setContentSize(cc.size(this.sprItem.node.width / 1.2, this.sprItem.node.height / 1.2));
    }
    showItemAnim() {
        this.skeItem.node.color = cc.Color.WHITE;
        this.skeItem.node.active = true;
        this.sprItem.node.active = false;
        this.skeItem.setAnimation(0, this.animName, true);
    }
    setIdBlur(id) {
        this.sprItem.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        switch (this.mId) {
            case SLOT6_ID_ITEM.JACKPOT:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_1_blur")
                break;
            case SLOT6_ID_ITEM.WILD:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_2_blur")
                break;
            case SLOT6_ID_ITEM.BONUS:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_3_blur");
                break;
            case SLOT6_ID_ITEM.SCATTER:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_4_blur");
                break;
            case SLOT6_ID_ITEM.X500:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_5_blur");
                break;
            case SLOT6_ID_ITEM.X375:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_6_blur");
                break;
            case SLOT6_ID_ITEM.X275:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_7_blur");
                break;
            case SLOT6_ID_ITEM.X150:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_8_blur");
                break;
            case SLOT6_ID_ITEM.X50:
                this.sprItem.spriteFrame = this.sprAtlast.getSpriteFrame("item_9_blur");
                break;
            case SLOT6_ID_ITEM.X25:
                this.sprItem.spriteFrame = this.spriteFrameIcon10Blur;
                break;
            case SLOT6_ID_ITEM.X5:
                this.sprItem.spriteFrame = this.spriteFrameIcon11Blur;
                break;
        }
        this.sprItem.node.setContentSize(cc.size(this.sprItem.node.width / 1.2, this.sprItem.node.height / 1.2));
    }
    offItemAnim() {
        this.sprItem.node.active = true;
        this.skeItem.node.active = false;
    }
}
