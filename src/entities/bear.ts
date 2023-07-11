import Phaser from "phaser";
import Mob from "./mob";
const damage: number = 20;
const health: number = 30;
export default class Bear extends Mob{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, damage, health);
        this.setScale(2);
        this.scene.add.existing(this);
        
        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true); 
    }
    update(playerPosition: {x: number, y: number}){
        const moveSpeed = 100; // Adjust the movement speed as desired

        const targetX = playerPosition.x-this.x;
        

        
        if(this.body !== undefined){
            this.setVelocityX(moveSpeed*Math.sign(targetX));
        }
    }
}