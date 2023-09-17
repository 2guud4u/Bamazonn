import Phaser from "phaser";
import Projectile from "./projectile";
import {BugASalt_Stats} from "../../../../constants/entityConst";
export default class BugASalt extends Projectile{
     
    private growthRate: number = 0.002;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, BugASalt_Stats);
        this.setScale(1);
        
        
        
    }
    update() {
        
        if (!this || !this.active) {
            return;
          }
        if (this.x > this.scene.sys.canvas.width || 
            this.y < 0 ||
            this.x < 0 ||
            this.y > this.scene.sys.canvas.height) {
            this.destroy(); // Remove the bullet from the scene
        }
        //spread logic
        this.spread();
        
    }
    private spread(){
        if(this && this.active && this.scaleX < 2){
            const newScale = this.scaleX + (this.growthRate * this.scene.sys.game.loop.delta);
            this.setScale(newScale);
        } else{
            this.destroy();
        }
    }
 
}