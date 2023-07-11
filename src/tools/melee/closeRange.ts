import Phaser from "phaser";

export default class Melee extends Phaser.Physics.Arcade.Sprite {
    private Damage!: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
    }
    update(playerloc:{x:number, y:number}) {
        this.x = playerloc.x;
        this.y = playerloc.y;
    }
}