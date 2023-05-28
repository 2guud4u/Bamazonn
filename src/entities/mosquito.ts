import Phaser from 'phaser';

export default class Mosquito extends Phaser.Physics.Arcade.Sprite {
    private health = 100;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true); 
        (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        this.setScale(.5);
    }
    update(playerPosition: {x: number, y: number}){
        const moveSpeed = 100; // Adjust the movement speed as desired

        const targetX = playerPosition.x;
        const targetY = playerPosition.y - this.height/2;

        // Calculate the direction from the current position to the target position
        const directionX = targetX - this.x;
        
        const directionY = targetY - this.y;

        // Normalize the direction vector
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        const normalizedDirectionX = directionX / length;
        const normalizedDirectionY = directionY / length;

        // Set a fixed velocity in the direction of the target position
        this.setVelocity(normalizedDirectionX * moveSpeed, normalizedDirectionY * moveSpeed);


    }
}