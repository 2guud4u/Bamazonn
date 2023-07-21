import Phaser from "phaser";
import Melee from "./closeRange";

export default class CandyCane extends Melee{
    body!: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.setScale(.5, 3);
        this.scene.add.existing(this);
        //this.body.allowGravity = false;
       
        
    }
}