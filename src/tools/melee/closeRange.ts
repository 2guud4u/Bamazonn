import Phaser from "phaser";

export default class Melee extends Phaser.GameObjects.Sprite {
    private Damage!: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        //this.scene.physics.add.existing(this);
    }
    
}