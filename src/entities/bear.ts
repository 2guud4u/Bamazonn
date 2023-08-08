import Phaser from "phaser";
import Mob from "./mob";
const damage: number = 20;
const health: number = 30;
const STUN_RESIST: number = 100;
const KNOCKBACK_STRENGTH: number = 1000;
const STUN_STRENGTH: number = 500;
export default class Bear extends Mob{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, damage, health, STUN_RESIST, KNOCKBACK_STRENGTH, STUN_STRENGTH);
        this.scene = scene
        this.setScale(2);
        this.scene.add.existing(this);
        
        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true); 
    }
    update(){
        let playerPos = this.getPlayerPos();
        const moveSpeed = 100; // Adjust the movement speed as desired

        const targetX = playerPos.x-this.x;
        

        
        if(this.body !== undefined){
            this.setVelocityX(moveSpeed*Math.sign(targetX));
            
        }
        //smart jump bear
        if(this.body.blocked.left || this.body.blocked.right){
            this.setVelocityY(-200);
        }
    }
}