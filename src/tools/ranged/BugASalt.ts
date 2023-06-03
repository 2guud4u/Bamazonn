import Phaser from "phaser";
import Projectile from "./projectile";

export default class BugASalt extends Projectile{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, 900, 10);
        this.setScale(.2);
        
        
        
    }
    update() {
        if (this.x > this.scene.sys.canvas.width || 
            this.y < 0 ||
            this.x < 0 ||
            this.y > this.scene.sys.canvas.height) {
            this.destroy(); // Remove the bullet from the scene
        }
    }
 
}