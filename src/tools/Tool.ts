import Phaser from "phaser";

export default class Tool extends Phaser.GameObjects.Sprite {
    private Durability!: number;
    private FireRate!: number; // longer the slower fire rate
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, fireRate: number) {
        super(scene, x, y, texture);
        this.FireRate = fireRate;
    }
    public getDurability(){
        return this.Durability;
    }

    public setDurability(durability: number){
        this.Durability = durability;
    }
    public getFireRate(){
        return this.FireRate;
    }
}