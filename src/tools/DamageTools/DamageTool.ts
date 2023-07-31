import Phaser from "phaser";
import Tool from "../Tool";
export default class DamageTools extends Tool {
    private Damage!: number;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, fireRate: number) {
        super(scene, x, y, texture, fireRate);
        this.Damage = damage;
        
    }
    public getDamage(){
        return this.Damage;
    }
    
}