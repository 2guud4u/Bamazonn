import Phaser from 'phaser';
import Mob from './mob';
const damage: number = 5;
const health: number = 10;
const STUN_RESIST: number = 0;
export default class Mosquito extends Mob {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, health, damage, STUN_RESIST);
        
        //size
        this.setScale(.5);
      
        
    }

    update(){
        let playerPosition = this.getPlayerPos();
        const moveSpeed = 100; // Adjust the movement speed as desired

        const targetX = playerPosition.x;
        const targetY = playerPosition.y - this.height/2;

        // // Calculate the direction from the current position to the target position
        const directionX = targetX - this.x;
        
        const directionY = targetY - this.y;

        // Normalize the direction vector
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        
        const normalizedDirectionX = directionX / length;
        const normalizedDirectionY = directionY / length;

        // Set a fixed velocity in the direction of the target position
        if(this.body !== undefined){
            this.setVelocity(normalizedDirectionX * moveSpeed, normalizedDirectionY * moveSpeed);
        }
        

    
    }



}
