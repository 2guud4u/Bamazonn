import Phaser from "phaser";
import Projectile from "./projectile";

export default class BugSpray extends Projectile{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, 400, 2);
        this.setScale(.4);
       
        
        
    }
    update() {
        if (this.x > this.scene.sys.canvas.width || 
            this.y < 0 ||
            this.x < 0 ||
            this.y > this.scene.sys.canvas.height) {
            this.destroy(); // Remove the bullet from the scene
        }
    }
    public getDamage(){
        return super.getDamage();
    }   
}