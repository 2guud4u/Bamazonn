import Phaser from "phaser";
import Tool from "../Tool";
export default class DamageTools extends Tool {
    private Damage!: number;
    private KnockbackStrength!: number;
    private StunStrength!: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, fireRate: number, knockbackStrength: number, stunStrength: number) {
        super(scene, x, y, texture, fireRate);
        this.Damage = damage;
        this.KnockbackStrength = knockbackStrength;
        this.StunStrength = stunStrength;
    }
    public getDamage(){
        return this.Damage;
    }
    public getKnockbackStrength(){
        return this.KnockbackStrength;
    }
    public getStunStrength(){
        return this.StunStrength;
    }
    
}