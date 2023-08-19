import Phaser from 'phaser';
import { MeleeConst } from '../../../../constants/entityConst';
export default class AttackBox extends Phaser.Physics.Arcade.Sprite {
    damage!: number;
    body!: Phaser.Physics.Arcade.Body;
    private knockbackStrength!: number;
    private stunStrength!: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, stats: MeleeConst) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.damage = stats.DAMAGE;
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setAllowGravity(false);
        this.visible = false;
        this.knockbackStrength = stats.KNOCKBACK_STRENGTH;
        this.stunStrength = stats.STUN_STRENGTH;
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