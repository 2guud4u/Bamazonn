import Phaser from "phaser";
import Ranged from "./Ranged";

const BUG_SPRAY_DAMAGE = 1;
export default class BugSpray extends Ranged {
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, BUG_SPRAY_DAMAGE);
        this.scene = scene;
        this.setScale(1,2);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        this.body.setSize(2);
    }
}