import Phaser from "phaser";
import Tool from "../../Tool";
import DamageTool from "../DamageTool";

export default class Melee extends DamageTool {
    

    public attackbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number) {
        
        super(scene, x, y, texture, damage);
        
        //this.scene.physics.add.existing(this);
        this.attackbox = this.scene.physics.add.image(-10000, -1, 'wizball');
        this.attackbox.body.setAllowGravity(false);
        this.attackbox.body.pushable = false;
    }
    
}