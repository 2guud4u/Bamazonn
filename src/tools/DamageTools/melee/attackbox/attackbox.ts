import Phaser from 'phaser';

export default class AttackBox extends Phaser.Physics.Arcade.Sprite {
    damage!: number;
    body!: Phaser.Physics.Arcade.Body;
    private knockbackStrength!: number;
    private stunStrength!: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, knockbackStrength: number, stunStrength: number) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.damage = damage;
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setAllowGravity(false);
        this.visible = false;
        this.knockbackStrength = knockbackStrength;
        this.stunStrength = stunStrength;
    }
    public getDamage(){
        return this.damage;
    }
    public getKnockback(){
        return this.knockbackStrength;
    }
    public getStunStrength(){
        return this.stunStrength;
    }
}