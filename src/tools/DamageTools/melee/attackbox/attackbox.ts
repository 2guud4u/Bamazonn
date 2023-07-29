import Phaser from 'phaser';

export default class AttackBox extends Phaser.Physics.Arcade.Sprite {
    damage!: number;
    body!: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.damage = damage;
        scene.physics.world.enable(this);
        scene.add.existing(this);
    }
    public getDamage(){
        return this.damage;
    }
    
}