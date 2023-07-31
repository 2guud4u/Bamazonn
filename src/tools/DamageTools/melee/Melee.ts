import Phaser from "phaser";
import Tool from "../../Tool";
import DamageTool from "../DamageTool";
import AttackBox from "./attackbox/attackbox";
import HelloWorldScene from "../../../scenes/HelloWorldScene";
export default class Melee extends DamageTool {
    
    public scene!: HelloWorldScene;
    public attackbox!: AttackBox;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, fireRate: number) {
        
        super(scene, x, y, texture, damage, fireRate);
        this.scene = scene as HelloWorldScene;
        //this.scene.physics.add.existing(this);
        this.attackbox = new AttackBox(this.scene, this.x, this.y, 'attackbox', damage);
    
        this.attackbox.body.setAllowGravity(false);
        this.attackbox.body.pushable = false;
        this.scene.damageEntityStore.attackboxes.add(this.attackbox)

    }
    public attack(aimAngle: number, timeSinceLastFire: number){
        return timeSinceLastFire;
    };
    
}