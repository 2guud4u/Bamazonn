import phaser from 'phaser';

export default class Mob extends phaser.Physics.Arcade.Sprite {

    constructor(scene: phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
    }
    
}