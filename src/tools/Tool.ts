import Phaser from "phaser";

export default class Tool extends Phaser.GameObjects.Sprite {
    private Durability!: number;
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
    public getDurability(){
        return this.Durability;
    }

    public setDurability(durability: number){
        this.Durability = durability;
    }
}