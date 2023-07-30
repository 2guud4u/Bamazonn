import Phaser from "phaser";
import Melee from "./Melee";

const FIST_DAMAGE = 1;
const FIRE_RATE = 300
export default class Fist extends Melee {
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, FIST_DAMAGE, FIRE_RATE);
        this.scene = scene;
        this.setScale(.5, 6);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        // this.scene.physics.world.remove(this.body);
        //this.scene.physics.world.enable(this);
        //this.body.setAllowGravity(false);
       
        this.body.pushable = false;
        
    }
}