import Phaser from "phaser";
import Ranged from "./Ranged";

const BUGASALT_DAMAGE = 1;
const FIRE_RATE = 500;
export default class BugAsalt extends Ranged {
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, BUGASALT_DAMAGE, FIRE_RATE);
        this.scene = scene;
        this.setScale(1, 4);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        this.body.setSize(2);
        this.body.setAllowGravity(false);
        
    }
    public shoot(){
        
    }
}