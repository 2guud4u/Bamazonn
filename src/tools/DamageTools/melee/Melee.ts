import Phaser from "phaser";
import Tool from "../../Tool";
import DamageTool from "../DamageTool";
import AttackBox from "./attackbox/attackbox";
import HelloWorldScene from "../../../scenes/HelloWorldScene";
import {MeleeConst} from "../../../constants/entityConst";
export default class Melee extends DamageTool {
    
    public scene!: HelloWorldScene;
    public attackbox!: AttackBox;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, stats: MeleeConst) {
        
        super(scene, x, y, texture, stats.FIRE_RATE);
        this.scene = scene as HelloWorldScene;
        //this.scene.physics.add.existing(this);
        this.attackbox = new AttackBox(this.scene, this.x, this.y, 'attackbox', stats);
    
        this.attackbox.body.setAllowGravity(false);
        this.attackbox.body.pushable = false;
        this.scene.damageEntityStore.addAttackbox(this.attackbox)

    }
    public attack(aimAngle: number, timeSinceLastFire: number){
        return timeSinceLastFire;
    };
    
}